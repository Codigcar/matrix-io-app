export interface IRNShareOptions {
  title?: string;
  message?: string;
  subject?: string;
  url?: string;
  urls?: string[];
  type?: string;
  email?: string;
  recipient?: string;
  failOnCancel?: boolean;
  showAppsToView?: boolean;
  filename?: string;
  filenames?: string[];
  saveToFiles?: boolean;
  isNewTask?: boolean;
}

export interface IRNShare {
  open(options: IRNShareOptions): Promise<void>;
}
