import { useReducer } from "react";
import { postReducer } from "../reducers/requestActionReducer";

export const useUserCreate = (initialState) => {
  const [postState, dispatch] = useReducer(postReducer, initialState);
  return { postState: postState, dispatch: dispatch };
};

export const useBirthdaySelectReducer = (initialDateState) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "selectYear": {
        const date = new Date(action.value, state.selectMonth, 0);
        return state.selectMonth
          ? {
              ...state,
              lastDay: date.getDate(),
              selectYear: action.value,
            }
          : {
              ...state,
              selectYear: action.value,
            };
      }
      case "selectMonth": {
        const date = new Date(state.selectYear, action.value, 0);
        return {
          ...state,
          lastDay: date.getDate(),
          selectMonth: action.value,
        };
      }
      default:
        throw new Error();
    }
  };

  const [dateState, dispatch] = useReducer(reducer, initialDateState);

  return [dateState, dispatch];
};
