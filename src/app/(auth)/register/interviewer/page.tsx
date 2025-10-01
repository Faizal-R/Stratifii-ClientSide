// app/(auth)/register/interviewer/page.tsx
import { Suspense } from "react";
import InterviewerRegistrationPage from "./InterviewerRegistrationPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InterviewerRegistrationPage />
    </Suspense>
  );
}
