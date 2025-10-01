// app/(auth)/forgot-password/page.tsx
import { Suspense } from "react";
import ForgotPasswordPage from "./ForgotPasswordPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
