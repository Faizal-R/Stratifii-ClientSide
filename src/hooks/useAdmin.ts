import { AdminService } from "@/services/AdminService";
import { useCallback, useState } from "react";

export const useAdminSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      setLoading(true);
    
      try {
        const response = await AdminService.signIn(email, password);
        console.log("res",response)
        return response;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { signIn, loading };
};