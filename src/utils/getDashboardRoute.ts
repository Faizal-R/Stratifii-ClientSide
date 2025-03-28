export const getDashboardRoute = (role: string) => {
    switch (role) {
      case "Admin":
        return "/dashboard/admin";
      case "Company":
        return "/dashboard/company";
      case "Interviewer":
        return "/dashboard/interviewer";
      case "Candidate":
        return "/dashboard/candidate";
      default:
        return "/signin"; // Fallback in case of an unknown role
    }
  };
  