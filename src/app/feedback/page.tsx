"use client";

import { useState } from "react";
import "./feedback-form.scss";
import axiosInstance from "@/lib/axios";
import { validateField } from "./validate.feedback";

export default function FeedbackForm() {
  const [socialSource, setSocialSource] = useState("");
  const [howMet, setHowMet] = useState("");
  const [rating, setRating] = useState(0);
  const [showImprovementBox, setShowImprovementBox] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [outputObject, setOutputObject] = useState({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSocialSelect = (source: string) => setSocialSource(source);

  const handleRating = (value: number) => {
    setRating(value);
    setShowImprovementBox(value < 5);
    setErrors((prev) => ({ ...prev, rating: value ? "" : "Por favor califica tu experiencia." }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      howDidYouKnowUs: howMet,
      socialMediaSource: howMet === "anuncio" ? socialSource : "",
      experienceRating: rating,
      acceptTerms: !!formData.get("acceptTerms"),
    };

    // Validar campos requeridos
    const fieldsToValidate = ["name", "email", "whatsapp", "birthday", "rating"];
    const newErrors: Record<string, string> = {};
    fieldsToValidate.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = field === "rating" ? rating.toString() : (data as any)[field];

      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post("/experience", payload);
      alert("Formulario enviado correctamente.");
      formElement.reset();
      setRating(0);
      setHowMet("");
      setSocialSource("");
      setShowImprovementBox(false);
      setShowOutput(false);
      setErrors({});
    } catch (err) {
      alert("Error al enviar el formulario.");
      console.error(err);
    }
  };

  const mostrarObjeto = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      howDidYouKnowUs: howMet,
      socialMediaSource: howMet === "anuncio" ? socialSource : "",
      experienceRating: rating,
      acceptTerms: !!formData.get("acceptTerms"),
    };

    setOutputObject(payload);
    setShowOutput(true);
  };

  return (
    <div className="form-container">
      <h2>Formulario de Feedback</h2>
      <form onSubmit={handleSubmit} onReset={mostrarObjeto}>
        <label>Nombre</label>
        <input type="text" name="name" onBlur={handleBlur} />
        {errors.name && <span className="error-message">{errors.name}</span>}

        <label>Email</label>
        <input type="email" name="email" onBlur={handleBlur} />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label>WhatsApp</label>
        <input type="text" name="whatsapp" onBlur={handleBlur} />
        {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}

        <label>¿Cuál es tu fecha de cumpleaños?</label>
        <input type="date" name="birthday" onBlur={handleBlur} />
        {errors.birthday && <span className="error-message">{errors.birthday}</span>}

        <label>¿Recuerdas el nombre del Meser@ que te atendió durante la visita?</label>
        <input type="text" name="waiterName" onBlur={handleBlur} />

        <label>¿Cómo nos conociste?</label>
        <div className="howMet">
          {["recomendacion", "anuncio", "camino", "cliente"].map((opt) => (
            <label key={opt}>
              <input type="radio" name="howMet" value={opt} required onChange={() => setHowMet(opt)} />
              {opt === "recomendacion"
                ? "Recomendación de alguien"
                : opt === "anuncio"
                ? "Vi un anuncio publicitario en Facebook/Instagram/Tiktok"
                : opt === "camino"
                ? "Los ví mientras caminaba y entré"
                : "Ya los conocía, soy cliente"}
            </label>
          ))}
        </div>

        {howMet === "anuncio" && (
          <div className="social-buttons">
            <strong>¿Dónde viste el anuncio?</strong>
            {["facebook", "instagram", "tiktok"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSocialSelect(s)}
                className={socialSource === s ? "active" : ""}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        )}

        <input type="hidden" name="socialMediaSource" value={socialSource} />

        <label>¿Cómo calificarías tu experiencia?</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((val) => (
            <i
              key={val}
              className={`fas fa-star ${val <= rating ? "selected" : ""}`}
              onClick={() => handleRating(val)}
            />
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {errors.rating && <span className="error-message">{errors.rating}</span>}

        {showImprovementBox && (
          <div>
            <label>Si no obtuvimos un 5 en tu valoración, por favor indícanos cómo podemos mejorar 👇</label>
            <textarea name="improvementSuggestions" rows={3} onBlur={handleBlur}></textarea>
          </div>
        )}

        <label>
          <input type="checkbox" name="acceptTerms" required />
          Acepto los términos y condiciones de la empresa. Al proporcionar mi número de WhatsApp acepto recibir
          promociones esporádicas.
        </label>

        <button type="submit">Enviar</button>
        <button type="reset" className="btn">
          Mostrar objeto
        </button>
      </form>

      {showOutput && <pre className="outputBox">{JSON.stringify(outputObject, null, 2)}</pre>}
    </div>
  );
}
