import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, localStoragePersister } from "./lib/react-query";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
}

export default App;
