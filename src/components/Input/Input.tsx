import { HTMLAttributes, HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: Exclude<HTMLInputTypeAttribute, 'radio' | 'checkbox'>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
}

export function Input<T extends FieldValues>({
  name,
  label,
  type = 'text',
  errors,
  register,
  ...props
}: Props<T> &
  Exclude<HTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'id'>) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        placeholder={label}
        {...props}
        {...register(name)}
      />
      {errors[name] && (
        <p className="fieldError">{errors[name]?.message as ReactNode}</p>
      )}
    </>
  );
}
