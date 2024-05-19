export const ServerActionResponse = (
  statusCode: number,
  message: string,
  data?: any
) => {
  return {
    statusCode,
    message,
    data,
  };
};
