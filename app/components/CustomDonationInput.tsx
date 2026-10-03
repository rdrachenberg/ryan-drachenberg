export default function CustomDonationInput({
  name,
  min,
  max,
  step,
  onChange,
  value,
  className,
}: {
  name: string;
  min: number;
  max: number;
  currency: string;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  className?: string;
}) {
  return (
    <input
      id={name}
      type="number"
      inputMode="decimal"
      name={name}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      value={value}
      className={className}
      required
    />
  );
}
