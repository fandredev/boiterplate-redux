import { useSelector } from "react-redux";
import { RootState } from "../../rtk-boiterplate-store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function BalanceDisplay() {
  const { balance } = useSelector((state: RootState) => state.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}
