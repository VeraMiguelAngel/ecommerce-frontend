/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { validateFormRegister } from '@/lib/validate';
import { register } from '@/services/authService';
import { IRegisterProps } from '@/types/types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterView = () => {
  const router = useRouter();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  };

  const handleSubmit = async (values: IRegisterProps) => {
    try {
      await register(values);
      alert("Usuario registrado correctamente");
      router.push("/login");
    } catch (error: any) {
      if (error.message === "User already exists") {
        alert("Este email ya está registrado. Por favor usa otro.");
      } else {
        alert("Ocurrió un error al registrar el usuario. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-black p-8 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Crear Cuenta</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validateFormRegister}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">Nombre completo</label>
              <Field
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm">Contraseña</label>
              <Field
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 text-sm">Dirección</label>
              <Field
                type="text"
                name="address"
                id="address"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="address" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-1 text-sm">Teléfono</label>
              <Field
                type="tel"
                name="phone"
                id="phone"
                className="w-full px-4 py-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <ErrorMessage name="phone" component="div" className="text-red-400 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="mt-4 bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
            >
              Registrarse
            </button>

            {/* Pregunta hacia login */}
            <p className="text-center text-sm mt-4">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-indigo-600 font-semibold hover:underline transition duration-300"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterView;


