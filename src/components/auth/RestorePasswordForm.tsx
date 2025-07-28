"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { restorePassword } from "@/services/authService";
import { validatePassword, validateConfirmPassword } from "@/utils/validations";

export const RestorePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams) {
      const token = searchParams.get("token");
      if (token) {
        setResetToken(token);
      } else {
        setError("Token no encontrado. Asegúrate de ingresar desde el enlace correcto.");
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const passwordError = validatePassword(newPassword);
    const confirmError = validateConfirmPassword(newPassword, confirmPassword);

    if (passwordError || confirmError) {
      return setError(passwordError || confirmError);
    }

    if (!resetToken) {
      return setError("Token inválido o no encontrado.");
    }

    setLoading(true);
    try {
      await restorePassword(resetToken, newPassword);
      setSuccess("Contraseña restablecida con éxito. Redirigiendo al login...");
      setTimeout(() => router.push("/auth/login"), 3000);
    } catch (err: any) {
      setError("El enlace es inválido o expiró.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Restablecer contraseña</h2>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? "Restableciendo..." : "Restablecer contraseña"}
      </button>
    </form>
  );
};
