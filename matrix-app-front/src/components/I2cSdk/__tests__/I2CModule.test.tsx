import I2CModule from '../I2CModule';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

describe('I2CModule', () => {
  let i2cModule: typeof I2CModule;

  beforeEach(() => {
    i2cModule = I2CModule;
  });

  it('should reveal card info', () => {
    const startTaskSpy = jest.spyOn(i2cModule, 'revealCardInfo');
    i2cModule.revealCardInfo('mockToken', 'mockReference');
    expect(startTaskSpy).toHaveBeenCalledWith('mockToken', 'mockReference');
  });

  it('should change pin for physical card', () => {
    const changePinPhysicalCardSpy = jest.spyOn(i2cModule, 'changePinPhysicalCard');
    i2cModule.changePinPhysicalCard('mockToken', 'mockReference');
    expect(changePinPhysicalCardSpy).toHaveBeenCalledWith('mockToken', 'mockReference');
  });
});
