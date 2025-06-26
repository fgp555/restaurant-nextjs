const Buttons = () => {
  return (
    <div>
      <button className="btn btn-primary btn-medium">Reservar ahora</button>
      <button className="btn btn-secondary btn-small">Menú</button>
      <button className="btn btn-danger btn-large">Cancelar</button>
      <button className="btn btn-disabled btn-medium" disabled>
        Desactivado
      </button>
    </div>
  );
};

export default Buttons;
