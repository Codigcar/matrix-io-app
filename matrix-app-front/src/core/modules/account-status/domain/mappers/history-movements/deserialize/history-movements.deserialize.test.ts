import { HistoryMovementsDto } from '../../../../dtos/history-movements/history-movements.dto';
import { dtoToHistoryMovements } from './history-movements.deserialize';

describe('dtoToHistoryMovements', () => {
  it('should correctly transform a HistoryMovementsDto to an array of IHistoryMovements', () => {
    const mockHistoryMovementsDto: HistoryMovementsDto = [
      {
        id: 'movement-123',
        period: '2024-01',
      },
    ];

    const results = dtoToHistoryMovements(mockHistoryMovementsDto);

    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(mockHistoryMovementsDto.length);
    results.forEach((result, index) => {
      const mockDto = mockHistoryMovementsDto[index];
      expect(result.id).toBe(mockDto.id);
      expect(result.period).toBe(mockDto.period);
    });
  });
});
