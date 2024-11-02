import { useEffect, useState } from "react";
import axios from "axios"; // Não se esqueça de importar o axios
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Inputs from "../../Components/Inputs";
import { toast } from "react-toastify";
import formatDateYDM from "../../hooks/formatDateYDM";
import InputMask from "react-input-mask";
import returnIdade from "../../hooks/returnIdade.js";

export default ({ open, setOpen, id }) => {
    const [atletas, setAtletas] = useState(null);
    const [equipes, setEquipes] = useState(null);
    const [posicoes, setPosicoes] = useState(null);
    const [posicaoSelecionada, setPosicaoSelecionada] = useState("");
    const [equipeSelecionada, setEquipeSelecionada] = useState("");
    const [nomeAtleta, setNomeAtleta] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [idade, setIdade] = useState("");
    const [contato, setContato] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [observacaoJogador, setObservacaoJogador] = useState("");

    //CHAMANDO API PARA PEGAR AS EQUIPES
    const visualizarEquipes = async () => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:3000/findEquipes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEquipes(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    //CHAMANDO API PARA PEGAR AS POSIÇÕES DO ATLETA
    const visualizarPosicoes = async () => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:3000/findManyPosicoesAtleta", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosicoes(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (dataNascimento) {
            const idadeCalculada = returnIdade(dataNascimento);
            const idadeCalculadaNum = Number(idadeCalculada);
            setIdade(idadeCalculadaNum);
        }
    }, [dataNascimento]);

    // CHAMANDO API PARA PEGAR O ATLETA
    const visualizarAtleta = async (id) => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:3000/findAtleta/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const eventoData = response.data;
            const formattedDataNascimento = formatDateYDM(eventoData.dataNascimento);

            console.log(formattedDataNascimento);

            setAtletas(eventoData);
            setPosicaoSelecionada(eventoData.idPosicao);
            setEquipeSelecionada(eventoData.idEquipe);
            setNomeAtleta(eventoData.nomeAtleta);
            setCpf(eventoData.CPF);
            setRg(eventoData.RG);
            setIdade(eventoData.idade);
            setDataNascimento(formattedDataNascimento);
            setContato(eventoData.contato);
            setObservacaoJogador(eventoData.observacaoJogador);
        } catch (error) {
            toast.error("Error ao visualizar atleta. Contate o administrador!", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
        }
    };

    // CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
    const handleSubmitEdit = async (ev) => {
        ev.preventDefault();

        const token = localStorage.getItem("token");
        const idade = returnIdade(dataNascimento);
        const idadeNum = Number(idade);
        const posicaoSelecionadaNum = Number(posicaoSelecionada);
        const equipeSelecionadaNum = Number(equipeSelecionada);
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const dataFormatada = dataAtual.toISOString().split("T")[0];

        //VALIDANDO PREENCHIMENTO DOS CAMPOS.
        if (
            nomeAtleta.trim() === "" ||
            cpf.trim() === "" ||
            rg.trim() === "" ||
            contato.trim() === "" ||
            dataNascimento.trim() === "" ||
            observacaoJogador.trim() === ""
        ) {
            toast.error("Preencha todos os campos!", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
            return;
        }

        //VALIDANDO QUANTIDADE DE CARACTERES DOS CAMPOS.
        if (nomeAtleta.length < 5 || observacaoJogador.length < 5) {
            toast.error("Campo deve possuir no minimo cinco caracteres.", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
            return;
        }

        //VALIDANDO CAMPOS DE DATA.
        if (idadeNum < 16) {
            toast.error("Idade do atleta deve ser acima de 15 anos.", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
            return;
        }

        //CHAMANDO API PARA CRIAÇÃO DA EQUIPE
        try {
            const response = await axios.put(
                `http://localhost:3000/updateAtleta/${id}`,
                {
                    idPosicao: posicaoSelecionadaNum,
                    idEquipe: equipeSelecionadaNum,
                    nomeAtleta,
                    CPF: cpf,
                    RG: rg,
                    idade: idadeNum,
                    contato,
                    dataNascimento,
                    observacaoJogador,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Atleta editado com sucesso!.", {
                position: "bottom-center",
                style: {
                    border: "2px solid green",
                },
            });
            setOpen(false);
        } catch (error) {
            toast.error("Erro ao atualizar o Atleta.");
        }
    };

    useEffect(() => {
        visualizarAtleta(id);
        visualizarEquipes();
        visualizarPosicoes();
    }, [id]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <form onSubmit={handleSubmitEdit}>
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-[900px] h-[480px]">
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                {console.log(atletas)}
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900 pb-10 font-montserrat">
                                        Editar Atleta
                                    </DialogTitle>
                                    {atletas ? (
                                        <div>
                                            <div className="flex flex-col gap-8">
                                                <div className="flex gap-10 items-center">
                                                    <Inputs
                                                        id={atletas.nomeAtleta}
                                                        label={"Nome Atleta"}
                                                        defaultValue={atletas.nomeAtleta}
                                                        setValue={setNomeAtleta}
                                                        placeholder={"Nome Atleta"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={atletas.dataNascimento}
                                                        label={"Data Nascimento"}
                                                        defaultValue={atletas.dataNascimento}
                                                        setValue={setDataNascimento}
                                                        placeholder={"Nome Atleta"}
                                                        type={"date"}
                                                        cssInput={
                                                            "block w-[200px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={atletas.idade}
                                                        label={"Idade"}
                                                        defaultValue={atletas.idade}
                                                        setValue={setIdade}
                                                        placeholder={"00"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[60px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    {/* <div>
                                                        <label
                                                            htmlFor="evento"
                                                            className="absolute top-[80px] left-[488px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                            Evento
                                                        </label>
                                                        <select
                                                            name="eventoSelecionado"
                                                            id="eventoSelecionado"
                                                            value={eventoSelecionado} // Use value para manter o estado controlado
                                                            onChange={(e) => {
                                                                setEventoSelecionado(e.target.value);
                                                            }}
                                                            className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                                                            <option value={equipe.idEvento} className="font-montserrat">
                                                                {equipe.evento.nomeEvento}
                                                            </option>
                                                            {evento.length !== 0 &&
                                                                evento
                                                                    .filter(
                                                                        (ev) =>
                                                                            ev.nomeEvento !== equipe.evento.nomeEvento
                                                                    ) // Filtra o evento já selecionado
                                                                    .map((ev) => (
                                                                        <option
                                                                            key={ev.id}
                                                                            value={ev.id}
                                                                            className="font-montserrat">
                                                                            {ev.nomeEvento}
                                                                        </option>
                                                                    ))}
                                                        </select>
                                                    </div> */}
                                                </div>
                                                {/* <div className="flex gap-10 items-center">
                                                    <Inputs
                                                        id={equipe.nomePresidente}
                                                        label={"Presidente"}
                                                        defaultValue={equipe.nomePresidente}
                                                        setValue={setNomePresidente}
                                                        placeholder={"Nome Presidente"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={equipe.treinador}
                                                        label={"Treinador"}
                                                        defaultValue={equipe.treinador}
                                                        setValue={setNomeTreinador}
                                                        placeholder={"Nome Treinador"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={equipe.nomeSede}
                                                        label={"Sede"}
                                                        defaultValue={equipe.nomeSede}
                                                        setValue={setNomeSede}
                                                        placeholder={"Nome Sede Equipe"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                </div>
                                                <div className="flex gap-10 items-center">
                                                    <div>
                                                        <label
                                                            htmlFor="contato"
                                                            className="absolute top-[218px] left-[48px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                            Contato
                                                        </label>
                                                        <InputMask
                                                            mask="(99) 99999-9999"
                                                            placeholder="(xx) xxxxx-xxxx"
                                                            defaultValue={equipe.contato}
                                                            onChange={(e) => {
                                                                setContato(e.target.value);
                                                            }}
                                                            className="block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        />
                                                    </div>
                                                    <Inputs
                                                        id={equipe.quantidadeAtletas}
                                                        label={"Quantidade Atletas"}
                                                        defaultValue={equipe.quantidadeAtletas}
                                                        setValue={setQuantidadeAtletas}
                                                        placeholder={"Quantidade Atletas"}
                                                        type={"number"}
                                                        cssInput={
                                                            "block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={equipe.quantidadeTitulos}
                                                        label={"Quantidade Títulos"}
                                                        defaultValue={equipe.quantidadeTitulos}
                                                        setValue={setQuantidadeTitulos}
                                                        placeholder={"Quantidade Títulos"}
                                                        type={"number"}
                                                        cssInput={
                                                            "block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <Inputs
                                                        id={equipe.dataFundacao}
                                                        label={"Data Fundação"}
                                                        defaultValue={dataFundacao}
                                                        setValue={setDataFundacao}
                                                        placeholder={"Data Fundação"}
                                                        type={"date"}
                                                        cssInput={
                                                            "block w-[176px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        <label
                                                            htmlFor="ObservacaoEquipe"
                                                            className="absolute top-[286px] left-[48px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                            Observação Equipe
                                                        </label>
                                                        <textarea
                                                            name="observacaoEquipe"
                                                            id={equipe.observacaoEquipe}
                                                            rows={4}
                                                            className="block w-[836px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                            defaultValue={equipe.observacaoEquipe}
                                                            onChange={(e) => {
                                                                setObservacaoEquipe(e.target.value);
                                                            }}
                                                            placeholder="Inserir Observação"
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    ) : (
                                        <p>CARREGANDO ATLETA</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto">
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};
