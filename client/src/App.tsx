import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./features/auth/pages/AuthContext";
import { CartProvider } from "./features/cart/CartContext";

import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;