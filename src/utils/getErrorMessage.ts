export const getErrorMessage = (error: any) =>
  error?.key ? `errors.${error.key}` : 'errorOcurred';
