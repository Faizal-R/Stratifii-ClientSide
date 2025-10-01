// app/(auth)/forgot-password/page.tsx

import { Suspense } from "react";
import CandidatePasswordCreation from "./CandidatePasswordCreation";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CandidatePasswordCreation />
    </Suspense>
  );
}
