import React from 'react'
import AtividadeItem from './AtividadeItem';

export default function AtividadeLista({atividades, handleConfirmModal, pegarAtividade}) {
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
