import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useStreams() {
  return useQuery({
    queryKey: [api.streams.list.path],
    queryFn: async () => {
      const res = await fetch(api.streams.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch streams");
      return api.streams.list.responses[200].parse(await res.json());
    },
  });
}
