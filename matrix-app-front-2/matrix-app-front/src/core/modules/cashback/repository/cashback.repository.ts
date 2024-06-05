import { ObtainCashbackDto } from 'src/core/modules/cashback/dtos/obtain-cashback.dto';
import { ObtainCashbackRuleDto } from 'src/core/modules/cashback/dtos/obtain-rules.dto';

export interface ICashbackRepository {
  obtainCashback(): Promise<ObtainCashbackDto>;
  obtainCashbackRule(): Promise<ObtainCashbackRuleDto>;
}
