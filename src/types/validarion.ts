export type TValidationDetail = {
  property: string;
  value: string;
  messages: string[];
};

export type TValidationErrorResponse = {
  errorType: 'VALIDATION_ERROR';
  message: string;
  details: TValidationDetail[];
};
