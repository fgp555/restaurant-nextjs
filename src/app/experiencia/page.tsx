"use client";
import "./page.scss";
import React, { useState } from "react";
import api from "@/lib/axios"; 

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  birthday: string;
  sawAd: string;
  howDidYouKnowUs: string;
  branchVisited: string;
  waiterName: string;
  experienceRating: string;
  improvementSuggestions: string;
}

const ExperienceForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    birthday: "",
    sawAd: "",
    howDidYouKnowUs: "",
    branchVisited: "",
    waiterName: "",
    experienceRating: "",
    improvementSuggestions: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  // Cambiamos 'submitted' para que maneje el estado de visibilidad del cartel de éxito.
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Solo letras y espacios permitidos.";
        else if (!/^[a-zA-Z\s]+$/.test(value))
          error = "Solo letras y espacios permitidos.";
        break;
      case "email":
        if (!value.trim()) error = "Formato de correo inválido.";
        else if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(value))
          error = "Formato de correo inválido.";
        break;
      case "whatsapp":
        if (!value.trim()) error = "Número inválido.";
        else if (!/^\+?[0-9\s\-]{7,15}$/.test(value))
          error = "Número inválido.";
        break;
      case "sawAd":
      case "howDidYouKnowUs":
        if (!value) error = "Seleccioná una opción.";
        break;
      case "experienceRating":
        if (!value) error = "Seleccioná una calificación.";
        break;
      case "improvementSuggestions":
        if (!value.trim()) error = "Este campo es obligatorio.";
        break;
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
   
    setShowSuccessMessage(false);
    setShowErrorMessage(false);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrors = false;
    const requiredFields = [
      "name",
      "email",
      "whatsapp",
      "sawAd",
      "howDidYouKnowUs",
      "experienceRating",
      "improvementSuggestions",
    ];

    
    const newFormErrors: Partial<FormData> = {};
    requiredFields.forEach((field) => {
      const value = formData[field as keyof FormData];
      let error = "";
      switch (field) {
        case "name":
          if (!value.trim()) error = "El nombre es obligatorio.";
          else if (!/^[a-zA-Z\s]+$/.test(value)) error = "Solo letras y espacios permitidos.";
          break;
        case "email":
          if (!value.trim()) error = "El correo es obligatorio.";
          else if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(value)) error = "Formato de correo inválido.";
          break;
        case "whatsapp":
          if (!value.trim()) error = "El número es obligatorio.";
          else if (!/^\+?[0-9\s\-]{7,15}$/.test(value)) error = "Número inválido.";
          break;
        case "sawAd":
        case "howDidYouKnowUs":
        case "experienceRating":
          if (!value) error = "Seleccioná una opción.";
          break;
        case "improvementSuggestions":
          if (!value.trim()) error = "Este campo es obligatorio.";
          break;
      }
      if (error) {
        newFormErrors[field as keyof FormData] = error;
        hasErrors = true;
      }
    });

    setFormErrors(newFormErrors);

    if (hasErrors || Object.values(newFormErrors).some((msg) => msg)) {
      return;
    }

    setLoading(true);
    setShowSuccessMessage(false); 
    setShowErrorMessage(false);
    setErrorMessage("");

    try {
      const payload = {
        ...formData,
        sawAd: formData.sawAd === "Sí" ? true : false,
        experienceRating: Number(formData.experienceRating),
      };
      const respuesta = await api.post("/experience", payload);
      console.log(respuesta);

      setShowSuccessMessage(true); 
      setFormData({ 
        name: "",
        email: "",
        whatsapp: "",
        birthday: "",
        sawAd: "",
        howDidYouKnowUs: "",
        branchVisited: "",
        waiterName: "",
        experienceRating: "",
        improvementSuggestions: "",
      });
      setFormErrors({}); 
      setTimeout(() => {
        setShowSuccessMessage(false); 
      }, 2000);
    } catch (error: any) { 
      console.error("Error al enviar formulario:", error);
      let message = "Ocurrió un error al enviar el formulario. Por favor, intentá nuevamente.";
      if (error.response && error.response.data && error.response.data.message) {
        message = `Error: ${error.response.data.message}`;
      } else if (error.message) {
        message = `Error: ${error.message}`;
      }
      setErrorMessage(message);
      setShowErrorMessage(true); 
      setTimeout(() => {
        setShowErrorMessage(false); 
        setErrorMessage(""); 
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form className="experience-form" onSubmit={handleSubmit}>
        <div className="logo"> Logo </div>

        <div className="container-form">
          <h1 className="form-title">Queremos saber tu opinión</h1>
          <p className="form-text">
            ¡Gracias por enriquecer nuestra experiencia con tu opinión! Esta
            encuesta solo tomará 30 segundos. Tus comentarios son muy
            importantes para seguir mejorando nuestros procesos y hacer de tu
            visita algo inolvidable. Como agradecimiento te enviaremos un
            pequeño detalle a tu correo.
          </p>
          <div className="line"></div>

          {/* Nombre */}
          <label htmlFor="name">Nombre*</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}

          {/* Email */}
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          {/* WhatsApp */}
          <label htmlFor="whatsapp">WhatsApp*</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            placeholder="3116099950"
            value={formData.whatsapp}
            onChange={handleChange}
          />
          {formErrors.whatsapp && (
            <p className="error">{formErrors.whatsapp}</p>
          )}

          {/* Cumpleaños */}
          <label htmlFor="birthday">¿Cuál es tu fecha de cumpleaños?</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />

          {/* Nombre del mesero */}
          <label htmlFor="waiterName">
            ¿Podrías indicarnos el nombre del mesero?
          </label>
          <input
            type="text"
            id="waiterName"
            name="waiterName"
            placeholder="Nombre del mesero"
            value={formData.waiterName}
            onChange={handleChange}
          />

          {/* Anuncio publicitario */}
          <fieldset>
            <legend>
              ¿Viste algún anuncio publicitario que influyó en tu decisión de
              visitarnos? *
            </legend>
            <label>
              <input
                type="radio"
                name="sawAd"
                value="Sí"
                checked={formData.sawAd === "Sí"}
                onChange={handleChange}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                name="sawAd"
                value="No"
                checked={formData.sawAd === "No"}
                onChange={handleChange}
              />
              No
            </label>
            {formErrors.sawAd && <p className="error">{formErrors.sawAd}</p>}
          </fieldset>

          {/* Cómo nos conociste */}
          <fieldset>
            <legend>¿Cómo nos conociste? *</legend>
            <label>
              <input
                type="radio"
                name="howDidYouKnowUs"
                value="Recomendación de alguien"
                checked={
                  formData.howDidYouKnowUs === "Recomendación de alguien"
                }
                onChange={handleChange}
              />
              Recomendación de alguien
            </label>
            <label>
              <input
                type="radio"
                name="howDidYouKnowUs"
                value="Vi un anuncio publicitario en Facebook/Instagram"
                checked={
                  formData.howDidYouKnowUs ===
                  "Vi un anuncio publicitario en Facebook/Instagram"
                }
                onChange={handleChange}
              />
              Vi un anuncio publicitario en Facebook/Instagram
            </label>
            <label>
              <input
                type="radio"
                name="howDidYouKnowUs"
                value="Los vi mientras caminaba y entré"
                checked={
                  formData.howDidYouKnowUs ===
                  "Los vi mientras caminaba y entré"
                }
                onChange={handleChange}
              />
              Los vi mientras caminaba y entré
            </label>
            <label>
              <input
                type="radio"
                name="howDidYouKnowUs"
                value="Ya los conocía, soy cliente"
                checked={
                  formData.howDidYouKnowUs === "Ya los conocía, soy cliente"
                }
                onChange={handleChange}
              />
              Ya los conocía, soy cliente
            </label>
            {formErrors.howDidYouKnowUs && (
              <p className="error">{formErrors.howDidYouKnowUs}</p>
            )}
          </fieldset>

          {/* Estrellas */}
          <label>
            ¿Cómo calificarías la experiencia? (Siendo 1 la menor y 5 la mayor) *
          </label>
          <div className="rating-stars" style={{ display: "flex", gap: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="experienceRating"
                  value={value}
                  checked={formData.experienceRating === String(value)}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <span
                  style={{
                    fontSize: "2rem",
                    color:
                      Number(formData.experienceRating) >= value
                        ? "#FFD700"
                        : "#ccc",
                    cursor: "pointer",
                  }}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
          {formErrors.experienceRating && (
            <p className="error">{formErrors.experienceRating}</p>
          )}

          {/* Sugerencias */}
          <label htmlFor="improvementSuggestions">
            ¿Cómo podemos mejorar nuestra experiencia? *
          </label>
          <input
            id="improvementSuggestions"
            name="improvementSuggestions"
            placeholder="Escribe aquí tu respuesta"
            value={formData.improvementSuggestions}
            onChange={handleChange}
          />
          {formErrors.improvementSuggestions && (
            <p className="error">{formErrors.improvementSuggestions}</p>
          )}

          {/* Cargando */}
          {loading && (
            <div className="experience-form-loader">
              <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="251"
                  strokeDashoffset="0"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;251"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          )}

          {/* Botón enviar */}
          <input type="submit" className="btn" value="Enviar" />

          {/* Mensaje de éxito */}
          {showSuccessMessage && (
            <article className="modal-overlay"> 
              <div className="experience-form-response">
                <h3>¡Gracias! Su mensaje fue enviado con éxito.</h3>
            
              </div>
            </article>
          )}

          {/* Mensaje de error */}
          {showErrorMessage && (
            <article className="modal-overlay error-modal"> 
              <div className="experience-form-response error-response">
                <h3>{errorMessage}</h3>
              
              
              </div>
            </article>
          )}
        </div>
      </form>
    </section>
  );
};

export default ExperienceForm;