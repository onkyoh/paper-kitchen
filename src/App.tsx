import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, localStoragePersister } from "./lib/react-query";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { PersistGate } from "./components/Layout/PersistGate";

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: Infinity,
      }}
    >
      <PersistGate>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </PersistQueryClientProvider>
  );
}

export default App;
