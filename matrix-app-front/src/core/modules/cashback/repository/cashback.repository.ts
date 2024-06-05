import { ObtainCashbackDto } from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback.dto';
import { ObtainCashbackRuleDto } from 'src/core/modules/cashback/dtos/obtain-cashback-rule/obtain-rules.dto';
import { RedemptionRequestDto } from '../dtos/redemption/redemption-request.dto';
import { RedemptionDto } from '../dtos/redemption/redemption.dto';
import { RedemptionResponseDto } from '../dtos/redemption/redemption-response.dto';

export interface ICashbackRepository {
  obtainCashback(): Promise<ObtainCashbackDto>;
  obtainCashbackRule(): Promise<ObtainCashbackRuleDto>;
  redemption(data: RedemptionRequestDto): Promise<RedemptionDto>;
  redemptionStatus(data: string): Promise<RedemptionResponseDto>;
}
