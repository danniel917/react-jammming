const Input = (props) => {
  const { type, name, id, value, placeholder, onChange, style } = props;

  return (
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      style={style}
    />
  );
};

export { Input };
