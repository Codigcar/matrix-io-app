interface IShareOptions {
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

export default IShareOptions;
