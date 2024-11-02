import { useEffect, useState } from "react";
import axios from "axios"; // Não se esqueça de importar o axios
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Inputs from "../../Components/Inputs";
import InputMask from "react-input-mask";

export default ({ open, setOpen, id }) => {
    const [atleta, setAtleta] = useState(null);

    // CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
    const visualizarAtleta = async (id) => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:3000/findAtleta/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const atletaData = response.data;
            atletaData.dataNascimento = new Date(atletaData.dataNascimento).toISOString().split("T")[0];
            setAtleta(atletaData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        visualizarAtleta(id);
    }, [id]);

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in  sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-[900px] h-[460px]">
                        <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-white text-red-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="sr-only">Close</span>
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900 pb-10">
                                    ATLETA
                                </DialogTitle>
                                {atleta ? (
                                    <div>
                                        <div className="flex flex-col gap-8">
                                            <div className="flex gap-10 items-center">
                                                <Inputs
                                                    id={atleta.nomeAtleta}
                                                    label={"Nome Atleta"}
                                                    value={atleta.nomeAtleta}
                                                    setValue={atleta.nomeAtleta}
                                                    placeholder={"Nome Atleta"}
                                                    type={"text"}
                                                    cssInput={
                                                        "block w-[500px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                    }
                                                />
                                                <Inputs
                                                    id={atleta.dataNascimento}
                                                    label={"Data Nascimento"}
                                                    value={atleta.dataNascimento}
                                                    setValue={atleta.dataNascimento}
                                                    placeholder={"Nome Atleta"}
                                                    type={"date"}
                                                    cssInput={
                                                        "block w-[200px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                    }
                                                />
                                                <Inputs
                                                    id={atleta.idade}
                                                    label={"Idade"}
                                                    value={atleta.idade}
                                                    setValue={atleta.idade}
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
                                                        className="absolute top-[150px] left-[52px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                        Atleta
                                                    </label>
                                                    <select
                                                        name="equipeSelecionado"
                                                        id="equipeSelecionado"
                                                        value={atleta.idEquipe}
                                                        className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                                                        <option value="equipe.id" className="font-montserrat">
                                                            {atleta.equipe.nomeEquipe}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="posicao"
                                                        className="absolute top-[150px] left-[490px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                        Posição
                                                    </label>
                                                    <select
                                                        name="posicaoSelecionada"
                                                        id="posicaoSelecionada"
                                                        value={atleta.idPosicao}
                                                        className="w-[400px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] focus:rounded sm:text-sm sm:leading-6 font-montserrat h-[36px]">
                                                        <option value="" className="font-montserrat">
                                                            {atleta.posicao.nomePosicao}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex gap-10 items-center">
                                                <div>
                                                    <label
                                                        htmlFor="cpf"
                                                        className="absolute top-[218px] left-[48px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                        CPF
                                                    </label>
                                                    <InputMask
                                                        mask="999.999.999-99"
                                                        placeholder="xxx.xxx.xxx-xx"
                                                        value={atleta.CPF}
                                                        onChange={(e) => {
                                                            setValue(atleta.CPF);
                                                        }}
                                                        className="block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                    />
                                                </div>
                                                <Inputs
                                                    id={atleta.RG}
                                                    label={"RG"}
                                                    value={atleta.RG}
                                                    setValue={atleta.RG}
                                                    placeholder={"RG"}
                                                    type={"text"}
                                                    cssInput={
                                                        "block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                    }
                                                />
                                                <div>
                                                    <label
                                                        htmlFor="contato"
                                                        className="absolute top-[218px] left-[634px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                        Contato
                                                    </label>
                                                    <InputMask
                                                        mask="(99) 99999-9999"
                                                        placeholder="(xx) xxxxx-xxxx"
                                                        value={atleta.contato}
                                                        onChange={(e) => {
                                                            setValue(atleta.contato);
                                                        }}
                                                        className="block w-[252px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <label
                                                        htmlFor="observacaoJogador"
                                                        className="absolute top-[286px] left-[48px] inline-block bg-white px-1 text-xs  text-[#26AB3B] font-bold font-montserrat">
                                                        Observação Jogador
                                                    </label>
                                                    <textarea
                                                        name="observacaoJogador"
                                                        id={atleta.observacaoJogador}
                                                        rows={4}
                                                        className="block w-[836px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#242424] placeholder:text-gray-400 placeholder: pl-4 focus:ring-2 focus:ring-inset focus:ring-[#26AB3B] sm:text-sm sm:leading-6 font-montserrat"
                                                        value={atleta.observacaoJogador}
                                                        onChange={(e) => {
                                                            setValue(atleta.observacaoJogador);
                                                        }}
                                                        placeholder="Inserir Observação"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>CARREGANDO ATLETA</p>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};
