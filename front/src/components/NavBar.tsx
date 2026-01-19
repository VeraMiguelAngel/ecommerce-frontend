'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Registro', href: '/register' },
  { label: 'Carrito', href: '/carrito' },
  { label: 'Mis Compras', href: '/mis-compras' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, handleLogout } = useAuth();
  const router = useRouter();

  const logoutAndRedirect = () => {
    handleLogout();
    router.push('/');
  };

  return (
    <nav className="flex items-center border mt-2 mx-4 max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm bg-black">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo-ecommerce.png" alt="Logo Ecommerce" width={60} height={60} />
      </Link>

      {/* Links */}
      <div className="hidden md:flex items-center gap-6 ml-7">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item.label}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
              {item.label}
            </span>
          </Link>
        ))}

        {userData && (
          <>
            <Link
              href="/dashboard"
              className="relative overflow-hidden h-6 group"
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                Dashboard
              </span>
              <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
                Dashboard
              </span>
            </Link>
            <button
              onClick={logoutAndRedirect}
              className="relative overflow-hidden h-6 group"
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                Cerrar Sesión
              </span>
              <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300">
                Cerrar Sesión
              </span>
            </button>
          </>
        )}
      </div>

      {/* Botón separado (luminoso) */}
      <div className="hidden ml-14 md:flex items-center gap-4">
        {!userData && (
          <Link href="/login">
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
              Iniciar Sesión
            </button>
          </Link>
        )}
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 bg-black w-full flex-col items-center gap-4 flex py-4">
          {navLinks.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-indigo-600">
              {item.label}
            </Link>
          ))}

          {userData ? (
            <>
              <Link href="/dashboard" className="hover:text-indigo-600">
                Dashboard
              </Link>
              <button onClick={logoutAndRedirect} className="hover:text-indigo-600">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link href="/login">
              <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
                Iniciar Sesión
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

