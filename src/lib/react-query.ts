import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { removeOldestQuery } from "@tanstack/react-query-persist-client";
import { compress, decompress } from "lz-string";

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
  serialize: (data) => compress(JSON.stringify(data)),
  deserialize: (data) => JSON.parse(decompress(data)),
  retry: removeOldestQuery,
  storage: window.localStorage,
});

export { queryClient, localStoragePersister };
