/* eslint-env jest */
import TypeProviderEnum from 'src/core/enums/type-provider.enum';
import EnrollmentFactory from './enrollment.factory';
import EnrollmentProviderMock from '../driver-adapter-mock/enrollment.provider.mock';
import EnrollmentProvider from '../driver-adapter/enrollment.provider';

jest.mock('../driver-adapter/enrollment.provider');
jest.mock('../driver-adapter-mock/enrollment.provider.mock');

describe('EnrollmentFactory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return EnrollmentProvider instance for PROVIDER', () => {
    const instance = EnrollmentFactory.getInstance(TypeProviderEnum.PROVIDER);
    expect(instance).toBeInstanceOf(EnrollmentProvider);
  });

  it('should return EnrollmentProviderMock instance for MOCK', () => {
    const instance = EnrollmentFactory.getInstance(TypeProviderEnum.MOCK);
    expect(instance).toBeInstanceOf(EnrollmentProviderMock);
  });

  it('should return EnrollmentProvider instance as default', () => {
    const instance = EnrollmentFactory.getInstance('someRandomValue');
    expect(instance).toBeInstanceOf(EnrollmentProvider);
  });
});
