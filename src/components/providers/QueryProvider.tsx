"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Ensure it's only created on the client

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
