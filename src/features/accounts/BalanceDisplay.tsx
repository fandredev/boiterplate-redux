function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function BalanceDisplay() {
  return <div className="balance">{formatCurrency(123456)}</div>;
}
