import { IDataState, DATA_INITIAL_STATE } from './dataProvider';
import { IData } from '../interfaces/publish.interface';

type DataActionType =
  | { type: '[Publication] - init'; payload: IData }
  | { type: '[Publication] - AddPublications'; payload: IData }
  | { type: '[Publication] - reset'; }

export const dataReducer = (state: IDataState = DATA_INITIAL_STATE, action: DataActionType): IDataState => {
    switch (action.type) {

      case '[Publication] - init':
        return {
          ...state,
          last_user: action.payload.last_user,
          publications: action.payload.publications
        };

      case '[Publication] - AddPublications':
        return {
          ...state,
          last_user: action.payload.last_user,
          publications: state.publications.concat(action.payload.publications)
        };
      
      default:
        return state;
    }
  };