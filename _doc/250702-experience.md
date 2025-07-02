# 📌 Historia de Usuario

**Como** comensal o visitante del sitio web del restaurante,  
**quiero** llenar un formulario de experiencia de manera clara y sencilla,  
**para que** pueda enviar mis comentarios y calificaciones sobre mi visita.

---

## ✅ Criterios de Aceptación

- [ ] Mobile Design
- [ ] El formulario contiene los siguientes campos:
  - `name` (input texto requerido)
  - `email` (input tipo email requerido)
  - `whatsapp` (input texto requerido, formato internacional)
  - `birthday` (input tipo fecha)
  - `sawAd` (checkbox)
  - `howDidYouKnowUs` (select: redes sociales, recomendación, publicidad, etc.)
  - `branchVisited` (select dinámico con lista de sedes)
  - `waiterName` (input texto)
  - `experienceRating` (rating del 1 al 5, usando estrellas o similar)
  - `improvementSuggestions` (textarea opcional)
- [ ] Todos los campos requeridos deben validarse antes de enviar.
- [ ] Al hacer submit:
  - Se debe mostrar un **loader/spinner** mientras se envía. (simulacion)
  - Mostrar mensaje de éxito o error según la respuesta del backend.
- [ ] La respuesta del backend debe mostrarse en un alert().
- [ ] Si el formulario se envía correctamente, se debe limpiar o resetear.
- [ ] Debe usarse `axios` para la petición POST. `src\lib\axios.ts`

---

## 📘 Definition of Done (DoD)

- [ ] Se creó la rama `feature/form-experience`.
- [ ] El componente `ExperienceForm` fue implementado.
- [ ] Se validación personalizada.
- [ ] El diseño sigue las variables de estilo definidas en `src/styles/_variables.scss`.
- [ ] Fue integrado en la ruta pública correspondiente del sitio (`/experiencia`).

---

## 🧪 Pruebas Manuales

1. Intentar enviar formulario vacío → muestra errores.
2. Ingresar email inválido → muestra validación.
3. Enviar con datos válidos → muestra spinner y mensaje de éxito.

---

## 🏷️ Prioridad

> Alta

## ⏱️ Estimación

> 2–3 días

## 👤 Asignado a

> Ivana GB

---

## 📎 Referencias

- backend https://giomr.site/api/experience
- [Figma](https://www.figma.com/design/Sb4JnG1Z37KdffD4VsCv6b/restufy?node-id=0-1&t=P3oLHPdEzlwR3I1V-1)
- [Google form](https://docs.google.com/forms/d/1TpsR-GnHzBxAEwM23_tzQWMpYpXyklvEw5RO_TH33Wc/viewform?ts=68652c4e&edit_requested=true)

## Body

instatar REST Client

```json
### 📄 Create new experience
POST https://giomr.site/api/experience
Content-Type: application/json

{
  "name": "Juan Pérez", // Nombre
  "email": "juan@example.com", // Email (Te enviaremos un regalo)
  "whatsapp": "+51999999999", // 
  "birthday": "1990-07-02",
  "sawAd": true,
  "howDidYouKnowUs": "Por Instagram",
  "branchVisited": "Sede Central",
  "waiterName": "Carlos",
  "experienceRating": 5,
  "improvementSuggestions": "Todo excelente, sigan así"
}
```
