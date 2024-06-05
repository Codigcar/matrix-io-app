import { deserialize } from 'src/core/helpers/transform';
import { IHistoryMovements } from 'src/core/modules/account-status/dtos';
import { HistoryMovementDto, HistoryMovementScheme, HistoryMovementsDto } from '../../../../dtos/history-movements/history-movements.dto';

export const dtoToHistoryMovement = (dto: HistoryMovementDto): IHistoryMovements =>
  deserialize(dto, {
    outputSchema: HistoryMovementScheme,
    serializationLogic: (validatedDto) => ({
      id: validatedDto.id,
      period: validatedDto.period,
    }),
    defaultOutput: {
      id: '',
      period: '',
    },
  });

export const dtoToHistoryMovements = (dtos: HistoryMovementsDto): IHistoryMovements[] =>
  (dtos || []).map((dto) => dtoToHistoryMovement(dto));
