export interface ResponseData {
  data?: any[] | [any] | any;
  success?: boolean;
  message?: string;
  errors?: any[] | [any];
  "api-key"?: string;
}
