'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      await axios.post('/api/auth/forgot-password', {
        email,
        baseURL: window.location.origin,
      });
      setSuccessMsg('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    } catch (error: any) {
      setErrorMsg('Hubo un error. Intentá más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <label htmlFor="email" className="block text-sm font-medium">Email</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
      </button>

      {successMsg && <p className="text-green-600">{successMsg}</p>}
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}
    </form>
  );
}
