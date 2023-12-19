import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 5 * 60 * 100,
      gcTime: Infinity,
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  key: "paperkitchen_cache",
  storage: window.localStorage,
});

export { queryClient, localStoragePersister };
