import React from 'react'
import AtividadeItem from './AtividadeItem';
import { AtividadeListaProps } from '../../model/atividadeProps';

const AtividadeLista: React.FC<AtividadeListaProps> = ({
			atividades, 
			handleConfirmModal, 
			pegarAtividade
		}: AtividadeListaProps
	) => {
		
	return (
		<div className="mt-3">
			{atividades.map(atividade => (
				<AtividadeItem 
					key={atividade.id}
					atividade={atividade}
					pegarAtividade={pegarAtividade}
					handleConfirmModal={handleConfirmModal}
				/>
			))}
		</div>
	)
}

export default AtividadeLista;
