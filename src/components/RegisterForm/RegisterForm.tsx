// components/RegisterForm.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword) {
      return 'Todos los campos son obligatorios.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'El correo no es válido.';
    }
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (password !== confirmPassword) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await axios.post('https://express-js-login.onrender.com/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Registrarse</h2>

      {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Correo</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm mb-2">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm mb-2">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-300"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default RegisterForm;
