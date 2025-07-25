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

export type TCommonErrorResponse = {
  errorType: 'COMMON_ERROR';
  message: string;
};
