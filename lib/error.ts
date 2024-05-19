export const Error = (statusCode: number, message: string) => {
  return {
    statusCode,
    message,
  };
};
