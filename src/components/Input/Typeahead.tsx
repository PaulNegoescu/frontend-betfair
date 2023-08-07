import { ChangeEvent, HTMLAttributes, ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  useFieldArray,
  Control,
  FieldArray,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: Array<{ label: string; id: string }>;
  errors: FieldErrors<T>;
  control: Control<any>;
  register: UseFormRegister<T>;
}

export function Typeahead<T extends FieldValues>({
  name,
  label,
  errors,
  options,
  control,
  register,
  ...props
}: Props<T> &
  Exclude<HTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id'>) {
  // const [selected, setSelected] = useState<Props<T>['options'] | []>([]);
  const { fields, append, remove } = useFieldArray({ name, control });

  function handleSelectOption(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const option = options.find((o) => o.label === value);
    if (option) {
      if (!fields.find((f) => f.label === option.label)) {
        append(option as any);
        e.target.value = '';
      }
    }
  }

  function handleRemoveOption(index: number) {
    remove(index);
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type="text"
          id={name}
          placeholder={label}
          list={`${name}-list`}
          onChange={handleSelectOption}
          {...props}
        />
        <datalist id={`${name}-list`}>
          {options.map((o) => (
            <option key={o.id} value={o.label}></option>
          ))}
        </datalist>
        <div>
          {fields.map((s, index) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleRemoveOption(index)}
              {...register(`${name}.${index}.${s.id}` as Path<T>)}
              value={s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {errors[name] && (
        <p className="fieldError">{errors[name]?.message as ReactNode}</p>
      )}
    </>
  );
}
