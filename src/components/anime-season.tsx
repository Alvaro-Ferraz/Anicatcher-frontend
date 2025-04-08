

// Função para retornar a temporada com base no mês atual
const getTemporadaAtual = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth() + 1; // Janeiro é 0, então somamos 1

  if (mes >= 1 && mes <= 3) {
    return { nome: "Inverno", ano };
  } else if (mes >= 4 && mes <= 6) {
    return { nome: "Primavera", ano };
  } else if (mes >= 7 && mes <= 9) {
    return { nome: "Verão", ano };
  } else {
    return { nome: "Outono", ano };
  }
};

const TemporadaAtual = () => {
  const temporada = getTemporadaAtual();

  return (
    <div className="w-full h-12 bg-[#272c33] mt-5 mb-5 rounded flex items-center justify-center text-[#D98E04] text-lg font-semibold">
        {temporada.nome} {temporada.ano}
    </div>
  );
};

export default TemporadaAtual;
