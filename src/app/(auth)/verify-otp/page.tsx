
import { Suspense } from "react";
import OtpVerificationPage from "./OtpVerificationPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpVerificationPage />
    </Suspense>
  );
}
