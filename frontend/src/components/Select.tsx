import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps<T extends FieldValues> {
  label: string;
  id: string;
  name: Path<T>;
  control: Control<T>;
  options: Option[];
  rules?: RegisterOptions<T>;
  disabled?: boolean;
}

const Select = <T extends FieldValues>({
  label,
  id,
  name,
  control,
  options,
  rules,
  disabled = false,
}: SelectProps<T>) => {
  const baseClasses =
    'w-full p-3 border rounded-md border-gray-400 focus:outline-none disabled:cursor-not-allowed';

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={id}>{label}</label>

          <select
            id={id}
            {...field}
            value={field.value ?? ''}
            onChange={(e) => {
              const value = e.target.value;

              field.onChange(isNaN(Number(value)) ? value : Number(value));
            }}
            className={baseClasses}
            disabled={disabled}
          >
            <option value="">선택해주세요</option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {fieldState.error && (
            <span className="text-red-500 text-xs">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Select;
