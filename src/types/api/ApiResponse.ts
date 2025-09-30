export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T; // optional in case of error
}
