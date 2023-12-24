import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { compress, decompress } from "lz-string";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 5 * 60 * 1000,
      gcTime: Infinity,
      networkMode: "offlineFirst",
    },
  },
});

const localStoragePersister = createSyncStoragePersister({
  key: "paperkitchen_cache",
  storage: window.localStorage,
  serialize: (data) => compress(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decompress(data)),
});

export { queryClient, localStoragePersister };
