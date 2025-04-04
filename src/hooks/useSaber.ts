import { useState } from "react";

interface SaberResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const fetchSaber = async <T>(
  url: string,
  options?: RequestInit
): Promise<SaberResponse<T>> => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return { data, status: res.status, statusText: res.statusText };
  } catch (error) {
    throw error;
  }
};

export type TStatus = "idle" | "loading" | "success" | "error";

export const useSaber = <T>(cb: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<TStatus>("idle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const call = async () => {
    setLoading(true);
    setStatus("loading");
    try {
      const data = await cb();
      setData(data);
      setStatus("success");
    } catch (error) {
      setError(error as Error);
      setStatus("error");
    } finally {
      setLoading(false);
      setStatus("idle");
    }
  };

  return {
    data,
    loading,
    error,
    status,
    call,
  };
};
