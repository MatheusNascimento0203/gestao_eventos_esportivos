export default ({
  value,
  setValue,
  label,
  id,
  type,
  placeholder,
  cssInput,
  step,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        step={step}
        onChange={(e) => {
          return setValue(e.target.value);
        }}
        className={cssInput}
      />
    </div>
  );
};
