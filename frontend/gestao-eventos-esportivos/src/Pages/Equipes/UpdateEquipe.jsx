import { useEffect, useState } from "react";
import axios from "axios"; // Não se esqueça de importar o axios
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Inputs from "../../Components/Inputs";
import { toast } from "react-toastify";
import formatDateYDM from "../../hooks/formatDateYDM";
import InputMask from "react-input-mask";

export default ({ open, setOpen, id }) => {
    const [evento, setEvento] = useState(null);
    const [equipe, setEquipe] = useState(null);
    const [eventoSelecionado, setEventoSelecionado] = useState("");
    const [nomeEquipe, setNomeEquipe] = useState("");
    const [nomePresidente, setNomePresidente] = useState("");
    const [quantidadeAtletas, setQuantidadeAtletas] = useState("");
    const [nomeTreinador, setNomeTreinador] = useState("");
    const [quantidadeTitulos, setQuantidadeTitulos] = useState("");
    const [nomeSede, setNomeSede] = useState("");
    const [contato, setContato] = useState("");
    const [dataFundacao, setDataFundacao] = useState("");
    const [observacaoEquipe, setObservacaoEquipe] = useState("");

    //CHAMANDO API PARA PEGAR TODOS OS EVENTOS
    const visualizarEventos = async () => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get("http://localhost:3000/findEventos", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEvento(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // CHAMANDO API PARA PEGAR A EQUIPE
    const visualizarEquipe = async (id) => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:3000/findEquipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const eventoData = response.data;
            const formattedDataFundacao = formatDateYDM(eventoData.dataFundacao);

            setEquipe(eventoData);
            setEventoSelecionado(eventoData.idEvento);
            setNomeEquipe(eventoData.nomeEquipe);
            setNomePresidente(eventoData.nomePresidente);
            setQuantidadeAtletas(eventoData.quantidadeAtletas);
            setNomeTreinador(eventoData.treinador);
            setQuantidadeTitulos(eventoData.quantidadeTitulos);
            setNomeSede(eventoData.nomeSede);
            setContato(eventoData.contato);
            setDataFundacao(formattedDataFundacao);
            setObservacaoEquipe(eventoData.observacaoEquipe);
        } catch (error) {
            toast.error("Error ao visualizar equipe. Contate o administrador!", {
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
        const quantidadeJogadoresNum = Number(quantidadeAtletas);
        const quantidadeTitulosNum = Number(quantidadeTitulos);
        const eventoSelecionadoNum = Number(eventoSelecionado);
        const dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        const dataFormatada = dataAtual.toISOString().split("T")[0];

        //VALIDANDO PREENCHIMENTO DOS CAMPOS.
        if (
            nomeEquipe.trim() === "" ||
            nomePresidente.trim() === "" ||
            quantidadeAtletas === "" ||
            nomeTreinador.trim() === "" ||
            quantidadeTitulos === "" ||
            nomeSede.trim() === "" ||
            contato.trim() === "" ||
            dataFundacao.trim() === "" ||
            observacaoEquipe.trim() === ""
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
        if (
            nomeEquipe.length < 5 ||
            nomePresidente.length < 5 ||
            nomeTreinador.length < 5 ||
            nomeSede.length < 5 ||
            observacaoEquipe.length < 5
        ) {
            toast.error("Campo deve possuir no minimo cinco caracteres.", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
            return;
        }

        //VALIDANDO CAMPOS DE DATA.
        if (dataFundacao > dataFormatada) {
            toast.error("Data fundação não pode ser maior que data atual.", {
                position: "bottom-center",
                style: {
                    border: "2px solid red",
                },
            });
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/updateEquipe/${id}`,
                {
                    idEvento: eventoSelecionadoNum,
                    nomeEquipe,
                    nomePresidente,
                    quantidadeAtletas: quantidadeJogadoresNum,
                    treinador: nomeTreinador,
                    quantidadeTitulos: quantidadeTitulosNum,
                    nomeSede,
                    contato,
                    dataFundacao,
                    observacaoEquipe,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("Evento editado com sucesso!.", {
                position: "bottom-center",
                style: {
                    border: "2px solid green",
                },
            });
            setOpen(false);
        } catch (error) {
            toast.error("Erro ao atualizar o equipe.");
        }
    };

    useEffect(() => {
        visualizarEquipe(id);
        visualizarEventos();
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
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900 pb-10">
                                        Editar Equipe
                                    </DialogTitle>
                                    {equipe ? (
                                        <div>
                                            {console.log(equipe)}
                                            <div className="flex flex-col gap-8">
                                                <div className="flex gap-10 items-center">
                                                    <Inputs
                                                        id={equipe.nomeEquipe}
                                                        label={"Nome Equipe"}
                                                        defaultValue={equipe.nomeEquipe}
                                                        setValue={setNomeEquipe}
                                                        placeholder={"Nome Equipe"}
                                                        type={"text"}
                                                        cssInput={
                                                            "block w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        }
                                                    />
                                                    <div>
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
                                                    </div>
                                                </div>
                                                <div className="flex gap-10 items-center">
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
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>CARREGANDO EQUIPE</p>
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
