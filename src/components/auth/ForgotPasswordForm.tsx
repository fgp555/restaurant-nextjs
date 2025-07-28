// src/components/auth/ForgotPasswordForm.tsx
"use client";

import { useState } from "react";
import { sendForgotPasswordEmail } from "@/services/authService";
import { validateEmail } from "@/utils/validations";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailError = validateEmail(email);
    if (emailError) return setError(emailError);

    setLoading(true);
    try {
      await sendForgotPasswordEmail(email, window.location.origin);
      setSuccess("Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.");
    } catch (err: any) {
      setError("Ocurrió un error al intentar enviar el enlace. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">¿Olvidaste tu contraseña?</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {loading ? "Enviando..." : "Enviar enlace"}
      </button>
    </form>
  );
};
