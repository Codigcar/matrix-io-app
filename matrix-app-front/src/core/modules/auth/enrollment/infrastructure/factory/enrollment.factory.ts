import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import EnrollmentProvider from '../driver-adapter/enrollment.provider';
import EnrollmentProviderMock from '../driver-adapter-mock/enrollment.provider.mock';
import { IEnrollmentRepository } from '../../repository/enrollment.repository';

class EnrollmentFactory {
  static getInstance(typeProvider: string = TypeProviderEnum.PROVIDER): IEnrollmentRepository {
    switch (typeProvider) {
      case TypeProviderEnum.PROVIDER:
        return new EnrollmentProvider();
      case TypeProviderEnum.MOCK:
        return new EnrollmentProviderMock();
      default:
        return new EnrollmentProvider();
    }
  }
}

export default EnrollmentFactory;