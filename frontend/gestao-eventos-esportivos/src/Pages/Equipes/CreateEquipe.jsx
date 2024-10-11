import { useEffect, useState } from "react";
import Inputs from "../../Components/Inputs";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import InputMask from "react-input-mask";

export default () => {
    const [evento, setEvento] = useState([]);
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
    const [isSubmite, setIsSubmite] = useState(false);

    //CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const eventos = async () => {
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

        eventos();
    }, []);

    const handleSubmit = async (ev) => {
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
            quantidadeAtletas.trim() === "" ||
            nomeTreinador.trim() === "" ||
            quantidadeTitulos.trim() === "" ||
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

        //CHAMANDO API PARA CRIAÇÃO DA EQUIPE
        try {
            const response = await axios.post(
                "http://localhost:3000/cadastrarEquipe",
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
            toast.success("Equipe cadastrada com sucesso!.", {
                position: "bottom-center",
                style: {
                    border: "2px solid green",
                },
            });
            setEventoSelecionado("");
            setNomeEquipe("");
            setEvento("");
            setNomePresidente("");
            setNomeTreinador("");
            setNomeSede("");
            setContato("");
            setQuantidadeAtletas("");
            setQuantidadeTitulos("");
            setDataFundacao("");
            setObservacaoEquipe("");
            setIsSubmite(!isSubmite);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center pt-8 gap-4 rounded  w-[950px] h-[550px] ml-[200px] mt-[20px] shadow-sm shadow-green-950 border-t-2 border-t-[#26AB3B]">
            <Helmet>
                {/* <link rel="icon" href={iconLogin} /> */}
                <title>Cadastrar Equipe</title>
            </Helmet>
            <div className="flex justify-start">
                <p className="font-montserrat text-xl font-bold pr-[750px]">Cadastro</p>
            </div>
            <hr className="border-2 w-[840px] border-[#26AB3B]" />
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex gap-10 items-center">
                    <Inputs
                        id={nomeEquipe}
                        label={"Nome Equipe"}
                        value={nomeEquipe}
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
                            className="absolute top-[174px] left-[706px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Evento
                        </label>
                        <select
                            name="eventoSelecionado"
                            id="eventoSelecionado"
                            value={eventoSelecionado}
                            onChange={(e) => {
                                setEventoSelecionado(e.target.value);
                            }}
                            className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                            <option value="" className="font-montserrat">
                                Selecione o evento
                            </option>
                            {evento.length !== 0 &&
                                evento?.map((ev) => {
                                    return (
                                        <option key={ev.id} value={ev.id} className="font-montserrat">
                                            {ev.nomeEvento}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <div className="flex gap-10 items-center">
                    <Inputs
                        id={nomePresidente}
                        label={"Presidente"}
                        value={nomePresidente}
                        setValue={setNomePresidente}
                        placeholder={"Nome Presidente"}
                        type={"text"}
                        cssInput={
                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={nomeTreinador}
                        label={"Treinador"}
                        value={nomeTreinador}
                        setValue={setNomeTreinador}
                        placeholder={"Nome Treinador"}
                        type={"text"}
                        cssInput={
                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={nomeSede}
                        label={"Sede"}
                        value={nomeSede}
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
                            className="absolute top-[324px] left-[266px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Contato
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            placeholder="(xx) xxxxx-xxxx"
                            value={contato}
                            onChange={(e) => {
                                setContato(e.target.value);
                            }}
                            className="block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        />
                    </div>
                    <Inputs
                        id={quantidadeAtletas}
                        label={"Quantidade Atletas"}
                        value={quantidadeAtletas}
                        setValue={setQuantidadeAtletas}
                        placeholder={"Quantidade Atletas"}
                        type={"number"}
                        cssInput={
                            "block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={quantidadeTitulos}
                        label={"Quantidade Títulos"}
                        value={quantidadeTitulos}
                        setValue={setQuantidadeTitulos}
                        placeholder={"Quantidade Títulos"}
                        type={"number"}
                        cssInput={
                            "block w-[180px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={dataFundacao}
                        label={"Data Fundação"}
                        value={dataFundacao}
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
                            className="absolute top-[404px] left-[266px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Observação Equipe
                        </label>
                        <textarea
                            name="observacaoEquipe"
                            id={observacaoEquipe}
                            rows={4}
                            className="block w-[836px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            value={observacaoEquipe}
                            onChange={(e) => {
                                setObservacaoEquipe(e.target.value);
                            }}
                            placeholder="Inserir Observação"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <a
                        className="bg-[#76787a] text-white font-montserrat font-bold rounded h-8 hover:bg-gray-900 w-[150px] flex flex-col items-center justify-center"
                        href="/home/searchEquipe">
                        Voltar
                    </a>
                    <button className="bg-[#26AB3B] text-white font-montserrat font-bold rounded h-8 hover:bg-green-600 w-[150px]">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};
