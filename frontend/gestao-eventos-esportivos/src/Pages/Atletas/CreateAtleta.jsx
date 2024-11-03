import { useEffect, useState } from "react";
import Inputs from "../../Components/Inputs";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import InputMask from "react-input-mask";
import returnIdade from "../../hooks/returnIdade.js";

export default () => {
    const [atletas, setAtletas] = useState([]);
    const [equipes, setEquipes] = useState([]);
    const [posicoes, setPosicoes] = useState([]);
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

    //CHAMANDO API PARA PEGAR AS EQUIPES
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const equipes = async () => {
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

        equipes();
    }, []);

    //CHAMANDO API PARA PEGAR AS POSIÇÕES DO ATLETA
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        const posicoes = async () => {
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

        posicoes();
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
                "http://localhost:3000/cadastrarAtleta",
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
                </div>
                <div className="flex gap-10 items-center">
                    <div>
                        <label
                            htmlFor="equipe"
                            className="absolute top-[250px] left-[264px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Equipe
                        </label>
                        <select
                            name="eventoSelecionado"
                            id="eventoSelecionado"
                            value={equipeSelecionada}
                            onChange={(e) => {
                                setEquipeSelecionada(e.target.value);
                            }}
                            className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                            <option value="" className="font-montserrat">
                                Selecione a Equipe
                            </option>
                            {equipes.length !== 0 &&
                                equipes?.map((eq) => {
                                    return (
                                        <option key={eq.id} value={eq.id} className="font-montserrat">
                                            {eq.nomeEquipe}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="posicao"
                            className="absolute top-[250px] left-[704px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Posição
                        </label>
                        <select
                            name="posicaoSelecionada"
                            id="posicaoSelecionada"
                            value={posicaoSelecionada}
                            onChange={(e) => {
                                setPosicaoSelecionada(e.target.value);
                            }}
                            className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                            <option value="" className="font-montserrat">
                                Selecione a posição do atleta
                            </option>
                            {posicoes.length !== 0 &&
                                posicoes?.map((p) => {
                                    return (
                                        <option key={p.id} value={p.id} className="font-montserrat">
                                            {p.nomePosicao}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                </div>
                <div className="flex gap-10 items-center">
                    <div>
                        <label
                            htmlFor="cpf"
                            className="absolute top-[328px] left-[266px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            CPF
                        </label>
                        <InputMask
                            mask="999.999.999-99"
                            placeholder="xxx.xxx.xxx-xx"
                            value={cpf}
                            onChange={(e) => {
                                setCpf(e.target.value);
                            }}
                            className="block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        />
                    </div>
                    <Inputs
                        id={rg}
                        label={"RG"}
                        value={rg}
                        setValue={setRg}
                        placeholder={"RG"}
                        type={"text"}
                        cssInput={
                            "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        }
                    />
                    <div>
                        <label
                            htmlFor="contato"
                            className="absolute top-[328px] left-[850px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Contato
                        </label>
                        <InputMask
                            mask="(99) 99999-9999"
                            placeholder="(99) 99999-9999"
                            value={contato}
                            onChange={(e) => {
                                setContato(e.target.value);
                            }}
                            className="block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <label
                            htmlFor="observacaoJogador"
                            className="absolute top-[404px] left-[266px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                            Observação Jogador
                        </label>
                        <textarea
                            name="observacaoJogador"
                            id={observacaoJogador}
                            rows={4}
                            className="block w-[836px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                            value={observacaoJogador}
                            onChange={(e) => {
                                setObservacaoJogador(e.target.value);
                            }}
                            placeholder="Inserir Observação"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <a
                        className="bg-[#76787a] text-white font-montserrat font-bold rounded h-8 hover:bg-gray-900 w-[150px] flex flex-col items-center justify-center"
                        href="/home/searchAtleta">
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
