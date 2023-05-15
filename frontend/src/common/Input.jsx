function Input({ label, type, name, id, value, handler, error, rows, cols }) {
    const inputProps = {
      className: `form-control ${error ? "is-invalid" : ""}`,
      id,
      name,
      value,
      onChange: handler,
    };
    return (
      <div className="form-group mb-3">
        <label htmlFor={id}>{label}</label>
        {type === "textarea" ? (
          <textarea rows={rows} cols={cols} {...inputProps} />
        ) : (
          <input type={type} {...inputProps} />
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
  

export default Input;