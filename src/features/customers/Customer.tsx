import { useSelector } from "react-redux";
import type { RootState } from "../../rtk-boiterplate-store";

export default function Customer() {
  const customerName = useSelector(
    ({ customer }: RootState) => customer.fullName
  );
  return <h2>👋 Welcome {customerName}</h2>;
}
