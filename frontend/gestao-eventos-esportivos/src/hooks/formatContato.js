export default (numero) => {
  if (numero.length === 11) {
    const ddd = numero.slice(0, 2); // Pega os dois primeiros dígitos (DDD)
    const parte1 = numero.slice(2, 7); // Pega os cinco dígitos seguintes
    const parte2 = numero.slice(7, 11); // Pega os quatro últimos dígitos
    return `(${ddd}) ${parte1}-${parte2}`;
  }
  // Retorna o número formatado no padrão desejado
};
