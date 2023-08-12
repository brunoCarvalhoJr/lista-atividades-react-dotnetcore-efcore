import { IAtividade } from "./atividade";

export interface AtividadeListaProps {
	atividades: IAtividade[];
	handleConfirmModal: (id: number) => void;
	pegarAtividade: (id: number) => void;
};

export interface AtividadeItemProps {
	atividade: IAtividade;
	handleConfirmModal: (id: number) => void;
	pegarAtividade: (id: number) => void;
}

export interface AtividadeFormProps {
    atividadeSelecionada: IAtividade;
    atualizarAtividade: (atividade: IAtividade) => void;
    addAtividade:  (atividade: IAtividade) => void;
    cancelarAtividade: () => void;
}