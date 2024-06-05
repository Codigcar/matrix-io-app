import { IOnboardingData } from '../../../dtos/onboarding/get-onboarding-data.interface';
import { IOnboardingRepository } from '../../../repository/onboarding.repository';
import { getOnboardingDataToDto } from '../../mappers/onboarding/get-onboarding-data.serialize';
import GetOnboardingDataUseCase from './get-onboarding-data.use-case';

describe('GetOnboardingDataUseCase', () => {
  let getOnboardingDataUseCase: GetOnboardingDataUseCase;
  let mockOnboardingRepository: jest.Mocked<IOnboardingRepository>;

  beforeEach(() => {
    mockOnboardingRepository = {
      getOnboardingData: jest.fn(),
    } as any;
    getOnboardingDataUseCase = new GetOnboardingDataUseCase(mockOnboardingRepository);
  });

  it('should call repository getOnboardingData and return the serialized response', async () => {
    const mockDtoResponse: IOnboardingData = {
      user: {
        documentNumber: '123456789',
        lastName: 'Doe',
        name: 'John',
        location: {
          address: '1234 Main St',
          state: 'NY',
          district: 'New York',
          province: 'New York',
        },
      },
      account: {
        id: '123',
      },
      status: 'active',
    };
    const expectedGetOnboardingData: IOnboardingData = getOnboardingDataToDto(mockDtoResponse);

    mockOnboardingRepository.getOnboardingData.mockResolvedValueOnce(mockDtoResponse);

    const result = await getOnboardingDataUseCase.execute();

    expect(mockOnboardingRepository.getOnboardingData).toHaveBeenCalled();
    expect(result).toEqual(expectedGetOnboardingData);
  });
});
