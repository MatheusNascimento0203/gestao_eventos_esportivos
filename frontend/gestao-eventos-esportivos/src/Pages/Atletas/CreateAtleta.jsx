import { useEffect, useState } from "react";
import Inputs from "../../Components/Inputs";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import InputMask from "react-input-mask";
import returnIdade from "../../hooks/returnIdade.js";

export default () => {
    const [atletas, setAtletas] = useState([]);
    const [posicaoSelecionada, setPosicaoSelecionada] = useState("");
    const [equipeSelecionada, setEquipeSelecionada] = useState("");
    const [nomeAtleta, setNomeAtleta] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [idade, setIdade] = useState("");
    const [contato, setContato] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [observacaoJogador, setObservacaoJogador] = useState("");
    const [isSubmite, setIsSubmite] = useState(false);

    //CHAMANDO API PARA PEGAR OS ATLETAS CADASTRADOS
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const atletas = async () => {
            try {
                const response = await axios.get("http://localhost:3000/findManyAtletas", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAtletas(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        atletas();
    }, []);

    useEffect(() => {
        if (dataNascimento) {
            const idadeCalculada = returnIdade(dataNascimento);
            const idadeCalculadaNum = Number(idadeCalculada);
            setIdade(idadeCalculadaNum);
        }
    }, [dataNascimento]);

    const handleSubmit = async (ev) => {
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
            const response = await axios.post(
                "http://localhost:3000/cadastrarEquipe",
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
            toast.success("Atleta cadastrado com sucesso!.", {
                position: "bottom-center",
                style: {
                    border: "2px solid green",
                },
            });
            setPosicaoSelecionada("");
            setEquipeSelecionada("");
            setNomeAtleta("");
            setCpf("");
            setRg("");
            setIdade("");
            setContato("");
            setDataNascimento("");
            setObservacaoJogador("");
            setIsSubmite(!isSubmite);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center pt-8 gap-4 rounded  w-[950px] h-[550px] ml-[200px] mt-[20px] shadow-sm shadow-green-950 border-t-2 border-t-[#26AB3B]">
            <Helmet>
                {/* <link rel="icon" href={iconLogin} /> */}
                <title>Cadastrar Atleta</title>
            </Helmet>
            <div className="flex justify-start">
                <p className="font-montserrat text-xl font-bold pr-[750px]">Cadastro</p>
            </div>
            <hr className="border-2 w-[840px] border-[#26AB3B]" />
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                <div className="flex gap-10 items-center">
                    <Inputs
                        id={nomeAtleta}
                        label={"Nome Atleta"}
                        value={nomeAtleta}
                        setValue={setNomeAtleta}
                        placeholder={"Nome Atleta"}
                        type={"text"}
                        cssInput={
                            "block w-[500px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={dataNascimento}
                        label={"Data Nascimento"}
                        value={dataNascimento}
                        setValue={setDataNascimento}
                        placeholder={"Nome Atleta"}
                        type={"date"}
                        cssInput={
                            "block w-[200px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <Inputs
                        id={idade}
                        label={"Idade"}
                        value={idade}
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
                    </button> */}
                </div>
            </form>
        </div>
    );
};
