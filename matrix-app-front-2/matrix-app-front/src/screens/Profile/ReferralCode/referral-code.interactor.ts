import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import ShareOptionsUseCase from 'src/core/modules/share/domain/use-case/share-options.use-case';
import CopyTextUseCase from 'src/core/modules/clipboard/domain/use-case/copy-text.use-case';
import GetReferralCodeUseCase from 'src/core/modules/referrals/domain/use-case/get-referral-code.use-case';
import ShareFactory from 'src/core/modules/share/infraestructure/factory/share.factory';
import ClipboardFactory from 'src/core/modules/clipboard/infraestructure/factory/clipboard.factory';
import ReferralsFactory from 'src/core/modules/referrals/infraestructure/factory/referrals.factory';
import IShareOptionsRequest from 'src/core/modules/share/dtos/share-options/share-options-request.interface';
import IGetReferralCode from 'src/core/modules/referrals/dtos/get-referral-code/get-referral-code';

const useReferralCodeInteractor = (
  getReferralCodeUseCase:
    IUseCase<void, IGetReferralCode> =
  new GetReferralCodeUseCase(ReferralsFactory.getInstance()),
  shareOptionsUseCase:
    IUseCase<IShareOptionsRequest, void> =
  new ShareOptionsUseCase(ShareFactory.getInstance()),
  copyTextUseCase:
    IUseCase<string, void> =
  new CopyTextUseCase(ClipboardFactory.getInstance()),
) => {
  const executeGetReferralCode: () => Promise<IGetReferralCode> = async () => {
    try {
      return getReferralCodeUseCase.execute();
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Profile/ReferralCode/referral-code.interactor.ts',
        service: 'GetReferralCode',
        error,
      });

      throw error;
    }
  };

  const executeShareCode: (options: IShareOptionsRequest) =>
    Promise<void> = async (options) => {
      try {
        await shareOptionsUseCase.execute(options);
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'Profile/ReferralCode/referral-code.interactor.ts',
          service: 'ShareCode',
          error,
        });

        throw error;
      }
    };

  const executeCopyCode: (text: string) => void = (text) => {
    try {
      copyTextUseCase.execute(text);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Profile/ReferralCode/referral-code.interactor.ts',
        service: 'CopyCode',
        error,
      });

      throw error;
    }
  };

  return { executeGetReferralCode, executeShareCode, executeCopyCode };
};

export default useReferralCodeInteractor;
