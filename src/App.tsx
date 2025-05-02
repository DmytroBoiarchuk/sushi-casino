import Home from "./pages/Home.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/colors.ts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/*<Header />*/}
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
