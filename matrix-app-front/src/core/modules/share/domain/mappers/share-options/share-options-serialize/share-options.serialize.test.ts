/* eslint-env jest */
import {
  ShareOptionsRequestDto,
  ShareOptionsRequestSchema,
} from 'src/core/modules/share/dtos/share-options/share-options-request.dto';
import IShareReferralCodeRequest from 'src/core/modules/share/dtos/share-options/share-options-request.interface';

import shareOptionsRequestToDto from './share-options.serialize';

describe('shareOptionsRequestToDto', () => {
  it('should return valid IShareReferralCodeRequest with valid input', () => {
    const validShareCodeSet: IShareReferralCodeRequest = {
      title: 'title',
      message: 'message',
      subject: 'subject',
    };

    const result: ShareOptionsRequestDto = shareOptionsRequestToDto(validShareCodeSet);

    expect(ShareOptionsRequestSchema.isValidSync(result)).toBe(true);
    expect(result.subject).toBe(validShareCodeSet.subject);
  });
});
