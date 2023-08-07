import { FieldValues, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';

import { getApi } from '@/utils/apiHelper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '..';

import { User } from './AuthContext';

interface ServerData {
  user: User;
  accessToken: string;
}

const commonValidators = {
  email: string()
    .required('Please type your email address.')
    .email('Please type a valid email address, containing "@".'),
  password: string().required('Please provide a password.'),
};

const loginSchema = object(commonValidators);

const registerSchema = object({
  ...commonValidators,
  retype_password: string()
    .required('Please retype your password.')
    .oneOf([ref('password')], 'The two passwords must match.'),
  firstName: string().required('Please tell us your first name.'),
  lastName: string().required('Please tell us your last name.'),
});

const { create: signup } = getApi('register');
const { create: signin } = getApi('login');

export function Auth() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const isRegister = pathname === '/register';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const { login } = useAuth();

  async function onSubmit(formData: FieldValues) {
    const { retype_password, ...cleanFormData } = formData;

    let apiFunc = signin;
    if (isRegister) {
      apiFunc = signup;
    }

    try {
      const data: ServerData = await apiFunc(cleanFormData);
      login(data);
      // redirect the user to either where he came from or the homepage
      const to = state?.from || '/';
      navigate(to);
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <form className="brandForm" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="fullGridWidth">{isRegister ? 'Register' : 'Login'}</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email Address"
        {...register('email')}
      />
      {errors.email && <p className="fieldError">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        {...register('password')}
      />
      {errors.password && (
        <p className="fieldError">{errors.password.message}</p>
      )}

      {isRegister && (
        <>
          <label htmlFor="retype_password">Retype Password</label>
          <input
            type="password"
            id="retype_password"
            placeholder="Retype your password"
            {...register('retype_password')}
          />
          {errors.retype_password && (
            <p className="fieldError">{errors.retype_password.message}</p>
          )}

          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            {...register('firstName')}
          />
          {errors.firstName && (
            <p className="fieldError">{errors.firstName.message}</p>
          )}

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            {...register('lastName')}
          />
          {errors.lastName && (
            <p className="fieldError">{errors.lastName.message}</p>
          )}
        </>
      )}

      <button type="submit" className="brandFormAction">
        {isRegister ? 'Register' : 'Login'}
      </button>
    </form>
  );
}
