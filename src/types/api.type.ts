export type SaveResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
};
