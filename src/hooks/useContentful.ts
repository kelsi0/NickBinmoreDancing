import { useState, useEffect } from 'react';

export function useContentful(
  contentType: string,
  fieldName?: string,
  fieldValue?: string
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

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch content');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [contentType, fieldName, fieldValue]);

  return { data, loading, error };
}