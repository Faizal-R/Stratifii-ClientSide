import apiClient from "@/config/apiClient";
import { isAxiosError } from "axios";

export const  AdminService={
    signIn: async (email: string, password: string) => {
        try {
          const response = await apiClient.post("/admin/signin", {
            email,
            password,
          });
           
          return response.data;
        } catch (error) {
          if (isAxiosError(error)) {
            console.log("axios",error)
          return {success:false,error:
              error.response?.data?.message || "An error occurred during login"};
            }
          return{success:false,error:"Unexpected error occurred While SignIn"};
        }
      },
}