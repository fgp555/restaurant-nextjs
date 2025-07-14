// src/utils/validate.form.ts

export type ValidationError = {
  [field: string]: string;
};

export function validateField(name: string, value: string): string {
  switch (name) {
    case "name":
      if (!value.trim()) return "El nombre es requerido.";
      break;

    case "email":
      if (!value) return "El email es requerido.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email no válido.";
      break;

    case "whatsapp":
      if (!value.trim()) return "El número de WhatsApp es requerido.";
      if (!/^\+?\d{8,15}$/.test(value)) return "Número no válido.";
      break;

    case "birthday":
      if (!value) return "La fecha de cumpleaños es requerida.";
      break;

    case "rating":
      if (!value || Number(value) === 0) return "Por favor califica tu experiencia.";
      break;

    default:
      return "";
  }

  return "";
}
