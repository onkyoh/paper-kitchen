import Main from "./components/Layout/Main";
import { createContext } from "react";
import { IUser } from "./types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const UserContext = createContext<IUser | null>(null);

const queryClient = new QueryClient();

function App() {
  const user = {
    id: 5,
    name: "Adnan",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <Main />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
