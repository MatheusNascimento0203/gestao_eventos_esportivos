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
