import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  id: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  readonly?: boolean;
  type?: 'text' | 'number';
}

const Input = <T extends FieldValues>({
  label,
  id,
  name,
  control,
  rules,
  readonly = false,
  type = 'text',
}: InputProps<T>) => {
  const inputBaseClasses =
    'w-full p-3 peer border rounded-md border-gray-400 focus:outline-none disabled:cursor-not-allowed';

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor={id}>{label}</label>

          <input
            type={type}
            id={id}
            {...field}
            value={field.value ?? ''}
            onChange={(e) => {
              if (type === 'number') {
                field.onChange(
                  e.target.value === '' ? undefined : Number(e.target.value),
                );
              } else {
                field.onChange(e.target.value);
              }
            }}
            className={inputBaseClasses}
            readOnly={readonly}
          />

          {fieldState.error && (
            <span className="text-red-500 text-xs text-left">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default Input;
