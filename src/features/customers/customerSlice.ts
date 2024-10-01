export const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

type CustomerState = typeof initialStateCustomer;

type Actions =
  | {
      type: 'customer/createCustomer';
      payload: {
        fullName: string;
        nationalID: string;
        createdAt: string;
      };
    }
  | {
      type: 'customer/updateName';
      payload: string;
    };

export default function customerReducer(
  state: CustomerState = initialStateCustomer,
  action: Actions
) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}

export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}
