import GetReferralCodeUseCase from 'src/core/modules/referrals/domain/use-case/get-referral-code.use-case';
import { IReferralsRepository } from 'src/core/modules/referrals/repository/referrals.repository';
import { GetReferralCodeDto } from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code.dto';
import dtoToGetReferralCode from 'src/core/modules/referrals/domain/mappers/get-referral-code/get-referral-code-deserialize/get-referral-code.deserialize';

// Mock del repositorio
jest.mock('src/core/modules/referrals/repository/referrals.repository');

describe('GetReferralCodeUseCase', () => {
  let getReferralCodeUseCase: GetReferralCodeUseCase;
  let mockReferralsRepository: jest.Mocked<IReferralsRepository>;

  beforeEach(() => {
    mockReferralsRepository = {
      getReferralCode: jest.fn(),
    } as any;
    getReferralCodeUseCase = new GetReferralCodeUseCase(mockReferralsRepository);
  });

  test('should call repository getReferralCode and return the result from dtoToGetReferralCode', async () => {
    const mockDtoResponse: GetReferralCodeDto = {
      code: 'LRA55O',
    };

    mockReferralsRepository.getReferralCode.mockResolvedValueOnce(mockDtoResponse);

    const result = await getReferralCodeUseCase.execute();

    expect(mockReferralsRepository.getReferralCode).toHaveBeenCalled();
    expect(result).toEqual(dtoToGetReferralCode(mockDtoResponse));
  });
});
