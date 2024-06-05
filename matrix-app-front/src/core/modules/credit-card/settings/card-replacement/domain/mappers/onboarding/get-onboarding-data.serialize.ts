import { serialize } from 'src/core/helpers/transform';

import { OnboardingDataDto } from '../../../dtos/onboarding/get-onboarding-data.dto';
import { IOnboardingData } from '../../../dtos/onboarding/get-onboarding-data.interface';

export const getOnboardingDataToDto = (entity: IOnboardingData): OnboardingDataDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      user: {
        documentNumber: validatedEntity.user.documentNumber,
        lastName: validatedEntity.user.lastName,
        name: validatedEntity.user.name,
        location: {
          address: validatedEntity.user.location.address,
          state: validatedEntity.user.location.state,
          district: validatedEntity.user.location.district,
          province: validatedEntity.user.location.province,
        },
      },
      account: {
        id: validatedEntity.account.id,
      },
      status: validatedEntity.status,
    }),
    defaultOutput: {} as OnboardingDataDto,
  });
