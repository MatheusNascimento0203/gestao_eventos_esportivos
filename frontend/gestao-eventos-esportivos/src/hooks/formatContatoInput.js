export default (value) => {
  // Remove todos os caracteres que não são números
  const apenasNumeros = value.replace(/\D/g, "");

  // Se o campo estiver vazio, retorne vazio
  if (apenasNumeros === "") {
    return "";
  }

  // Se o número for menor ou igual a 2 dígitos, não aplicar a formatação
  if (apenasNumeros.length <= 2) {
    return apenasNumeros;
  }

  // Formata para (XX) XXXX-XXXX para números com até 10 dígitos
  if (apenasNumeros.length <= 10) {
    return apenasNumeros.replace(/(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3");
  }

  // Formata para (XX) XXXXX-XXXX para números com 11 dígitos
  return apenasNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};

{
  /* <input
              type="text"
              value={contato}
              id={contato}
              placeholder="(XX) XXXXX-XXXX"
              onChange={(e) => {
                handleChangeContato(e);
              }}
              className="block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
            /> */
}

// const handleChangeContato = (e) => {
//   const valorDigitado = e.target.value;
//   // Permitir a exclusão completa sem reformatar
//   if (e.nativeEvent.inputType === "deleteContentBackward") {
//     setContato(valorDigitado); // Deixa o campo igual ao valor digitado sem formatação
//     return;
//   }
//   // Aplicar a formatação apenas quando o usuário estiver digitando
//   const valorFormatado = formatContatoInput(valorDigitado);
//   setContato(valorFormatado);
// };
