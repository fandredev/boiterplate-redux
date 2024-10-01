import { AppDispatch, RootState } from "../../store";
import { formattedDate } from "../../utils/date-to-currency-api";

type Actions =
  | {
      type: "account/deposit";
      payload: number;
    }
  | {
      type: "account/withdraw";
      payload: number;
    }
  | {
      type: "account/requestLoan";
      payload: { amount: number; porpose: string };
    }
  | {
      type: "account/payLoan";
    }
  | {
      type: "account/convertingCurrency";
    };

// Initial State
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPorpose: "",
  isLoading: false,
};

type AccountState = typeof initialStateAccount;

// Reducer
export default function accountReducer(
  state: AccountState = initialStateAccount,
  action: Actions
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };

    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPorpose: action.payload.porpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPorpose: "",
      };

    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

// Actions Creators
export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // This is a thunk
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // This is a side effect (fetching data from an API)

    const state = getState();
    console.log("Estado atual:", state);

    dispatch({ type: "account/convertingCurrency" });

    const apiKeyCurrencyAPI = import.meta.env.VITE_CURRENCY_API_KEY;
    const response = await fetch(
      `https://api.currencyapi.com/v3/historical?apikey=${apiKeyCurrencyAPI}&base_currency=USD&date=${formattedDate}`
    );

    const data = await response.json();
    const convertedToUSD = data.data["USD"].value;

    dispatch({
      type: "account/deposit",
      payload: convertedToUSD,
    });
  };
}

export function withdraw(amount: number) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount: number, porpose: string) {
  return {
    type: "account/requestLoan",
    payload: { amount, porpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
