import {
  ChangeEvent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  Path,
  UseFormUnregister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  options: Array<{ label: string; id: string }>;
  errors: FieldErrors<T>;
  defaultValues: any;
  register: UseFormRegister<T>;
  unregister: UseFormUnregister<T>;
}

export function Typeahead<T extends FieldValues>({
  name,
  label,
  errors,
  options,
  defaultValues,
  unregister,
  register,
  ...props
}: Props<T> &
  Exclude<HTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id'>) {
  // const [selected, setSelected] = useState<Props<T>['options'] | []>([]);
  const [selected, setSelected] = useState<{ label: string; id: string }[]>([]);

  useEffect(() => {
    if (defaultValues[name]) {
      const defaultSelected = options.filter((o) =>
        defaultValues[name].includes(Number(o.id))
      );
      setSelected(defaultSelected);
    }
  }, [defaultValues, name, options]);

  function handleSelectOption(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const option = options.find((o) => o.label === value);
    if (option) {
      if (!selected.find((f) => f.label === option.label)) {
        setSelected([...selected, option]);
        e.target.value = '';
      }
    }
  }

  function handleRemoveOption(id: string) {
    setSelected(selected.filter((s) => s.id !== id));
  }

  let errorJsx = null;

  if (errors[name]) {
    if (Array.isArray(errors[name])) {
      errorJsx = (errors[name] as any[])?.map((e) => (
        <p className="fieldError">{e.message as ReactNode}</p>
      ));
    } else {
      errorJsx = (
        <p className="fieldError">{errors[name]?.message as string}</p>
      );
    }
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
          {selected.map((s, index) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                handleRemoveOption(s.id);
                unregister(`${name}` as Path<T>);
              }}
              {...register(`${name}.${index}` as Path<T>)}
              value={s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      {errorJsx}
    </>
  );
}
