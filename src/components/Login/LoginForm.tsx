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

    // Validación simple
    if (!email || !password) {
      setError('Por favor completa todos los campos.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresa un correo válido.');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/login', {
        email,
        password,
      });

      const token = res.data.token;
      if (token) {
        localStorage.setItem('token', token); // o usar cookies seguras
        router.push('/dashboard'); // o la ruta protegida que definas
      } else {
        setError('Token no recibido. Contacta soporte.');
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
        <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Cargando...' : 'Ingresar'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
