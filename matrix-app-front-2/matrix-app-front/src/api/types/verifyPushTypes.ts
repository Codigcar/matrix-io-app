export interface VerifyPushGetToken {
  message: {
    resource: string;
    code: 'YF200' | 'YF300';
    metadata?: {
      service: string;
      identity: string;
      token: string;
      factorSid: string;
    }
  }
}

export interface VerifyChallenge {
  user: string;
  challengeId: string;
  status: 'CHALLENGE_CREATED' | 'CHALLENGE_APPROVED' | 'CHALLENGE_DENIED';
}

export interface RetryChallengeResponse {
  accountSid: string;
  challengeSid: string;
  dateCreated: string;
  entitySid: string;
  identity: string;
  priority: string;
  serviceSid: string;
  sid: string;
  ttl: number;
  errorMessage?: string;
  errorType?: string;
}
