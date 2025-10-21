export interface IAMUser {
  UserName: string;
  Arn: string;
  CreateDate?: string;
}

export interface IAMFinding {
  "Time Issue Found": string;
  "Identity Name": string;
  "Issue Name": string;
  [key: string]: string | undefined;
}
