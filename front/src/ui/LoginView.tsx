'use client';
import { useAuth } from '@/context/AuthContext';
import { validateFormLogin } from '@/lib/validate';
import { login } from '@/services/authService';
import { ILoginProps } from '@/types/types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginView = () => {
  const router = useRouter();
  const { setUserData } = useAuth();
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
    <div>
      <div className="w-[22vw] h-[62vh] min-w-[320px] max-w-125 bg-black p-8 rounded-2xl shadow-lg border border-slate-700 text-white flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center drop-shadow-[0_0_10px_white]">
          Iniciar Sesión
        </h2>
        <Formik initialValues={initialValues} validationSchema={validateFormLogin} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="mb-1 text-sm">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-400 text-sm mt-1 min-h-5 wrap-break-word transition-opacity duration-300"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="mb-1 text-sm">Contraseña</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-400 text-sm mt-1 min-h-5 wrap-break-word transition-opacity duration-300"
              />
            </div>

            {/* Botón login */}
            <button
              type="submit"
              className="mt-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
            >
              Ingresar
            </button>

            {/* Link de registro */}
            <p className="text-center text-sm mt-4">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-indigo-400 font-semibold hover:shadow-[0_0_15px_indigo] transition duration-300"
              >
                Regístrate aquí
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginView;




