import { useEffect, useState } from "react";
import { contentfulClient } from "@/lib/contentful";

export function useContentful(contentType: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    contentfulClient
      .getEntries({ content_type: contentType })
      .then((entries) => setData(entries.items))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [contentType]);

  return { data, loading, error };
}