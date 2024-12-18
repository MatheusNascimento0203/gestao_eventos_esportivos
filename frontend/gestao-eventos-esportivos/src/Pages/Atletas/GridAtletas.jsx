import { useEffect, useState } from "react";
import axios from "axios";
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import VisualizarAtleta from "./VisualizarAtleta";
import UpdateAtleta from "./UpdateAtleta";

export default () => {
    const [atletas, setAtletas] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedAtletaId, setSelectedAtletaId] = useState(null);
    const [modalType, setModalType] = useState(null);

    //CHAMANDO API PARA PEGAR OS EVENTOS CADASTRADOS
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
    }, [open]);

    //EXCLUINDO EVENTO
    const deleteAtleta = async (id) => {
        const token = window.localStorage.getItem("token");
        try {
            const response = await axios.delete(`http://localhost:3000/deleteAtleta/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAtletas(
                atletas.filter((atleta) => {
                    if (atleta.id !== id) {
                        return atleta;
                    }
                })
            );
            toast.success("Atleta excluido com sucesso!", {
                position: "bottom-center",
                style: {
                    border: "2px solid green",
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Handle click para abrir o modal com o evento selecionado
    const handleOpenModal = (id, type) => {
        setSelectedAtletaId(id);
        setModalType(type);
        setOpen(true);
    };

    return (
        <div className="px-48 pt-24">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 font-montserrat">Atletas</h1>
                    <p className="mt-2 text-sm text-gray-700 font-montserrat">
                        Segue abaixo a lista de todos os atletas cadastrados.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <a
                        href="/home/createAtleta"
                        className="block rounded-md bg-[#26AB3B] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 font-montserrat">
                        Adicionar Atleta
                    </a>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div
                        className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        style={{ maxHeight: "300px", overflowY: "auto" }}>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-[#26AB3B]">
                                <tr>
                                    <th
                                        scope="col"
                                        className="  py-3.5 pl-4 pr-3 text-left text-sm text-white font-montserrat font-bold sm:pl-4">
                                        Nome Atleta
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Posição
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Equipe
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Idade
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Contato
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm text-white font-montserrat font-bold">
                                        Ações
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {atletas.map((atleta) => {
                                    return (
                                        <tr key={atleta.id}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="font-montserrat text-gray-900">
                                                            {atleta.nomeAtleta}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900 font-montserrat">
                                                    {atleta.posicao.nomePosicao}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {atleta.equipe.nomeEquipe}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {atleta.idade}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-900 font-montserrat">
                                                {atleta.contato}
                                            </td>
                                            <td className="flex gap-3 relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenModal(atleta.id, "visualizar");
                                                    }}
                                                    className="text-[#26AB3B] hover:text-green-700">
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleOpenModal(atleta.id, "editar");
                                                    }}
                                                    className="text-[#2193F3] hover:text-indigo-900">
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        deleteAtleta(atleta.id);
                                                    }}
                                                    className="text-[#D40606] hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {open && modalType === "visualizar" && (
                <VisualizarAtleta open={open} setOpen={setOpen} id={selectedAtletaId} />
            )}

            {open && modalType === "editar" && <UpdateAtleta open={open} setOpen={setOpen} id={selectedAtletaId} />}
        </div>
    );
};
