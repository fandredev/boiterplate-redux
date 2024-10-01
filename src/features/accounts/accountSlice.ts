type Actions =
  | {
      type: 'account/deposit';
      payload: number;
    }
  | {
      type: 'account/withdraw';
      payload: number;
    }
  | {
      type: 'account/requestLoan';
      payload: { amount: number; porpose: string };
    }
  | {
      type: 'account/payLoan';
    };

// Initial State
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPorpose: '',
};

type AccountState = typeof initialStateAccount;

// Reducer
export default function accountReducer(
  state: AccountState = initialStateAccount,
  action: Actions
) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPorpose: action.payload.porpose,
        balance: state.balance + action.payload.amount,
      };

    case 'account/payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPorpose: '',
      };

    default:
      return state;
  }
}

// Actions Creators
export function deposit(amount: number) {
  return { type: 'account/deposit', payload: amount };
}

export function withdraw(amount: number) {
  return { type: 'account/withdraw', payload: amount };
}

export function requestLoan(amount: number, porpose: string) {
  return {
    type: 'account/requestLoan',
    payload: { amount, porpose },
  };
}

export function payLoan() {
  return { type: 'account/payLoan' };
}
