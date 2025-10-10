export enum InterviewRoutes {
  GET_MOCK_QUESTIONS = "/candidate/mock-interview/questions", 
  SUBMIT_MOCK_RESULT = "/candidate/mock-interview/submit-result",
  GET_ALL_UPCOMING_INTERVIEWS = "/interviewer/upcoming-interviews",
  UPDATE_INTERVIEW_WITH_FEEDBACK = "/interview/update-with-feedback",
  GET_ALL_SCHEDULED_INTERVIEWS = "/interview",
  GET_ALL_INTERVIEWS_BY_CANDIDATE_ID = "/interview/candidate",
  COMPLETE_CANDIDATE_INTERVIEW_PROCESS = "/interview/complete-process",
  COMPILATION_AND_RUN_CODE = "/interview/compile-and-run",
  HANDLE_NO_SHOW_INTERVIEW = "/interview/no-show"

}
