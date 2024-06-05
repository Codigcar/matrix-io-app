import { deserialize } from 'src/core/helpers/transform';
import {
  BalanceScheme, BalanceDto, IBalance, BalancesDto,
} from '../../../../dtos';

export const dtoToBalance = (dto: BalanceDto): IBalance =>
  deserialize(dto, {
    outputSchema: BalanceScheme,
    serializationLogic: (validatedDto) => ({
      consumed: {
        PEN: {
          amount: validatedDto.consumed.amount,
          currency: validatedDto.consumed.currency,
        },
        USD: {
          amount: 0,
          currency: 'USD',
        },
      },
      available: {
        PEN: {
          amount: validatedDto.available.amount,
          currency: validatedDto.available.currency,
        },
        USD: {
          amount: 0,
          currency: 'USD',
        },
      },
      creditLimit: {
        PEN: {
          amount: validatedDto.creditLimit.amount,
          currency: validatedDto.creditLimit.currency,
        },
        USD: {
          amount: 0,
          currency: 'USD',
        },
      },
      isDelinquent: validatedDto.isDelinquent,
    }),
    defaultOutput: {
      consumed: {
        PEN: {
          amount: 0,
          currency: '',
        },
        USD: {
          amount: 0,
          currency: '',
        },
      },
      available: {
        PEN: {
          amount: 0,
          currency: '',
        },
        USD: {
          amount: 0,
          currency: '',
        },
      },
      creditLimit: {
        PEN: {
          amount: 0,
          currency: '',
        },
        USD: {
          amount: 0,
          currency: '',
        },
      },
      isDelinquent: false,
    },
  });

export const dtoToBalances = (dtos: BalancesDto): IBalance[] =>
  (dtos || []).map((dto) => dtoToBalance(dto));
