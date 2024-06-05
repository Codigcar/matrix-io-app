import {
  InferType,
  array,
  boolean,
  object,
  string,
} from 'yup';

export const ShareOptionsRequestSchema = object({
  title: string().optional(),
  message: string().optional(),
  subject: string().optional(),
  url: string().optional(),
  urls: array().of(string()).optional(),
  type: string().optional(),
  email: string().optional(),
  recipient: string().optional(),
  failOnCancel: boolean().optional(),
  showAppsToView: boolean().optional(),
  filename: string().optional(),
  filenames: array().of(string()).optional(),
  saveToFiles: boolean().optional(),
  isNewTask: boolean().optional(),
});

export type ShareOptionsRequestDto = InferType<typeof ShareOptionsRequestSchema>;
