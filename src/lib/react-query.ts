import { QueryClient, onlineManager } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { compress, decompress } from "lz-string";

// Setup OnlineManager to listen for network changes
onlineManager.setEventListener((setOnline) => {
  // Subscribe to online/offline events
  window.addEventListener("online", () => setOnline(true));
  window.addEventListener("offline", () => setOnline(false));

  // Return a cleanup function
  return () => {
    window.removeEventListener("online", () => setOnline(true));
    window.removeEventListener("offline", () => setOnline(false));
  };
});

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
