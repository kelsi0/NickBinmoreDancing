import {useEffect, useState} from "react";

const cacheTTL = parseInt(process.env.CONTENTFUL_CACHE_TTL || '3600', 10) * 1000;
const cache = new Map<string, { data: any; timestamp: number }>();

export function useContentful(
  contentType: string,
  fieldName?: string,
  fieldValue?: string,
  options?: { include?: number },
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        let url = `/api/content?content_type=${contentType}`;

        if (fieldName && fieldValue) {
          url += `&field_name=${fieldName}&field_value=${encodeURIComponent(fieldValue)}`;
        }

        if (options?.include !== undefined) {
          url += `&include=${options.include}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const result = await response.json();
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    const cacheKey = `${contentType}-${fieldName}-${fieldValue}-${JSON.stringify(options)}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < cacheTTL) {
      setData(cached.data);
      setLoading(false);
      return;
    } else {
      fetchContent()
    }
  }, [contentType, fieldName, fieldValue, options?.include]);

  return {data, loading, error};
}
