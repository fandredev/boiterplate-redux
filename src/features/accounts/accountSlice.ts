import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../rtk-boiterplate-store";

import { formattedDate } from "../../utils/date-to-currency-api";

// Initial State
const initialState = {
  balance: 0,
  loan: 0,
  loanPorpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Não precisamos mais de spread operator para atualizar o estado porque o Redux Toolkit faz isso automaticamente
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return {
          payload: { amount, purpose },
          meta: {}, // Adicione um objeto vazio ou os dados que você precisa
          error: null, // Adicione `null` ou um objeto de erro se houver
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPorpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPorpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

// Action Creator usando Redux Thunk
export function deposit(amount: number, currency: string) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch: AppDispatch) => {
    // This is a side effect (fetching data from an API)

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

export const { withdraw, requestLoan, payLoan, convertingCurrency } =
  accountSlice.actions;

export default accountSlice.reducer;
