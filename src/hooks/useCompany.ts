import { CompanyService } from "@/services/CompanyService";
import { useCallback, useState } from "react";


export const useFetchCompanyProfile = () => {
  const [loading, setLoading] = useState(false);

  const companyProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CompanyService.getCompanyProfile();
      console.log("res", response);
      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  return { companyProfile, loading };
};

export const useUpadteCompanyProfile = () => {
  const [loading, setLoading] = useState(false);
  const updateCompanyProfile = useCallback(
    async (updatedCompany: FormData) => {
      try {
        setLoading(true);
        const response = await CompanyService.updateCompanyProfile(
          updatedCompany
        );
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateCompanyProfile, loading };
};
