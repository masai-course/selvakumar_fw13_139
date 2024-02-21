import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import {initState,reducer} from "./reducers/books/reducer"

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);


if (window.Cypress) {
  window.reducerInitialState = initState;
  window.reducer = reducer;
}
