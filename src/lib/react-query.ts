import { QueryClient } from "@tanstack/react-query";

// Create a singleton QueryClient instance
const client: QueryClient | null = null;

export const queryClient =
  client ??
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes by default
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
