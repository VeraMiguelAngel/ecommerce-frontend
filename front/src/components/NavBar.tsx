'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

// Heroicons
import { UserIcon, ShoppingBagIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, handleLogout } = useAuth();

  return (
    <nav className="w-[60%] mx-auto bg-black text-white text-sm px-6 py-4 flex justify-between items-center border border-slate-700 rounded-full mt-4">
      {/* Logo */}
      <Link href="/">
        <Image src="/logo-ecommerce.png" alt="Logo Ecommerce" width={50} height={50} />
      </Link>      

      {/* Links en escritorio */}
      <div className="hidden md:flex items-center gap-10">
        {!userData ? (
          <span className="text-2xl font-bold text-white drop-shadow-[0_0_10px_white]">
            ¡Bienvenido a mi Tienda en línea!
          </span>
        ) : (
          <>
            <Link href="/dashboard" className="flex items-center gap-2 hover:text-indigo-400">
              <UserIcon className="w-5 h-5" />
              Mi perfil
            </Link>
            <Link href="/dashboard/orders" className="flex items-center gap-2 hover:text-indigo-400">
              <ShoppingBagIcon className="w-5 h-5" />
              Mis compras
            </Link>
            <Link href="/carrito" className="flex items-center gap-2 hover:text-indigo-400">
              <ShoppingCartIcon className="w-5 h-5" />
              Carrito
            </Link>            
          </>
        )}
      </div>

      {/* Botón sesión en escritorio */}
      <div className="hidden md:flex items-center gap-6">
        {!userData ? (
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
          >
            Iniciar Sesión
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
          >
            Cerrar Sesión
          </button>
        )}
      </div>

      {/* Botón hamburguesa en móvil */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[60%] bg-black flex flex-col items-center gap-8 py-6 border border-slate-700 rounded-lg">
          {!userData ? (
            <>
              <span className="text-xl font-bold text-white drop-shadow-[0_0_10px_white]">
                ¡Bienvenido a mi Tienda en línea!
              </span>
              <Link
                href="/login"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
              >
                Iniciar Sesión
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 hover:text-indigo-400">
                <UserIcon className="w-5 h-5" />
                Mi perfil
              </Link>
              <Link href="/dashboard/orders" className="flex items-center gap-2 hover:text-indigo-400">
                <ShoppingBagIcon className="w-5 h-5" />
                Mis compras
              </Link>
              <Link href="/carrito" className="flex items-center gap-2 hover:text-indigo-400">
                <ShoppingCartIcon className="w-5 h-5" />
                Carrito
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:shadow-[0_0_20px_white] transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}







