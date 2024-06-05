import BenefitsFactory from 'src/core/modules/benefits/infraestructure/factory/benefits.factory'; // Cambia esto por la ruta correcta
import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import BenefitsProvider from 'src/core/modules/benefits/infraestructure/driver-adapter/benefits.provider';
import BenefitsProviderMock from 'src/core/modules/benefits/infraestructure/driver-adapter-mock/benefits.provider.mock';

describe('BenefitsFactory', () => {
  it('should return an instance of BenefitsProvider when a provider is requested', () => {
    const provider: IBenefitsRepository = BenefitsFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(provider).toBeInstanceOf(BenefitsProvider);
  });

  it('should return an instance of BenefitsProviderMock when a mock is requested', () => {
    const provider: IBenefitsRepository = BenefitsFactory.getInstance(TypeProviderEnum.MOCK);
    expect(provider).toBeInstanceOf(BenefitsProviderMock);
  });

  it('should return a default BenefitsProviderMock instance', () => {
    const provider: IBenefitsRepository = BenefitsFactory.getInstance('');
    expect(provider).toBeInstanceOf(BenefitsProviderMock);
  });
});
