/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginProps, IRegisterProps } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function register(userData: IRegisterProps) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  } else {
    alert('Usuario registrado correctamente');
  }
}

export async function login(userData: ILoginProps) {
  try {
      const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if(response.ok) {
        const parsedResponse = await response.json();
        alert('Usuario logueado correctamente');
        return parsedResponse;
    } else {
        throw new Error('Falló el servidor al loguearse');
    }
    
  } catch (error: any) {
    alert('Falló al loguearse');
    throw new Error(error);
  } 
  
}
