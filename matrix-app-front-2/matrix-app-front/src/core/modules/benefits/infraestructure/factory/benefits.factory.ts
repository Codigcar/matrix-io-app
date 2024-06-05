import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import BenefitsProvider from 'src/core/modules/benefits/infraestructure/driver-adapter/benefits.provider';
import BenefitsProviderMock from 'src/core/modules/benefits/infraestructure/driver-adapter-mock/benefits.provider.mock';

class BenefitsFactory {
  static getInstance(typeProvider: string = 'Provider'): IBenefitsRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new BenefitsProvider();
      case TypeProviderEnum.MOCK:
        return new BenefitsProviderMock();
      default:
        return new BenefitsProviderMock();
    }
  }
}

export default BenefitsFactory;
