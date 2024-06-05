export interface StepsProofOfLiveProps {
  status_code: number;
  message: {
    account_id: string;
    s3_key: string;
    signed_url: string;
    instruction: {
      validation_id: string;
      ip_address: string;
      account_id: string;
      type: string;
      validation_status: string;
      threshold: number;
      creation_date: string;
      instructions: {
        file_upload_link: string;
        actions: string[];
      };
    };
  };
}
