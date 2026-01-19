'use client';
import { useAuth } from '@/context/AuthContext';
import { validateFormLogin } from '@/lib/validate';
import { login } from '@/services/authService';
import { ILoginProps } from '@/types/types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

const LoginView = () => {
  const router = useRouter();
  const { setUserData } = useAuth()
  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: ILoginProps) => {
    const response = await login(values);
    const { token, user } = response;
    setUserData({ token, user });
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-black p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar Sesión</h2>
        <Formik initialValues={initialValues} validationSchema={validateFormLogin} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="block mb-1 text-sm">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1 min-h-5 w-full wrap-break-word" />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="block mb-1 text-sm">Contraseña</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1 min-h-5 w-full wrap-break-word" />
            </div>

            <button
              type="submit"
              className="mt-4 bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
            >
              Ingresar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginView;


