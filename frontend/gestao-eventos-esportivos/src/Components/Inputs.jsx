// export default ({ value, setValue, label, id, type }) => {
//   return (
//     <div className="flex flex-col w-48 gap-1">
//       <label htmlFor={id} className="text-white">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={id}
//         id={id}
//         value={value}
//         onChange={(e) => {
//           return setValue(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

export default ({
  value,
  setValue,
  label,
  id,
  type,
  placeholder,
  cssInput,
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
        onChange={(e) => {
          return setValue(e.target.value);
        }}
        className={cssInput}
      />
    </div>
  );
};
