// components/LoginForm.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Correo inválido.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        'https://express-js-login.onrender.com/api/auth/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const token = res.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } else {
        setError('No se recibió el token.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Iniciar Sesión</h2>

      {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Cargando...' : 'Ingresar'}
      </button>
    </form>
  );
};

export default LoginForm;
