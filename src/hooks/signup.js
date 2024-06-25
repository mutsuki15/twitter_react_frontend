import { useReducer } from "react";

export const usePostUserReducer = (initialState) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "POSTING":
        return {
          ...state,
          status: "LOADING",
          data: [],
        };
      case "POST_SUCCESS":
        return {
          ...state,
          status: "OK",
          data: {
            messages: "登録完了しました。メールを確認してください",
          },
        };
      case "POST_FAILED":
        return {
          ...state,
          status: "NG",
          data: action.payload.errors,
        };
      default:
        throw new Error();
    }
  };

  const [postState, dispatch] = useReducer(reducer, initialState);

  return [postState, dispatch];
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
