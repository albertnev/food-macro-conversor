export const getErrorMessage = (error: any, context: string = '') =>
  error?.key
    ? `errors.${context && `${context}.`}${error.key}`
    : 'errorOcurred';
