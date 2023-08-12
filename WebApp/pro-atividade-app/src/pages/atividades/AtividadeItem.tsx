import React from 'react';
import { Prioridade } from '../../model/atividade';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AtividadeItemProps } from '../../model/atividadeProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, fas } from '@fortawesome/free-solid-svg-icons';
import { 
	far,
	faFaceMeh, 
	faFaceSmile, 
	faFaceFrown
} from '@fortawesome/free-regular-svg-icons';

library.add(fas, far)

const AtividadeItem: React.FC<AtividadeItemProps> = ({
			atividade, 
			handleConfirmModal,
			pegarAtividade
		}: AtividadeItemProps
	) => {
  
	function prioridadeLabel(parametro: string) {
		switch(parametro){
			case Prioridade.Baixa:
			case Prioridade.Normal:
			case Prioridade.Alta:
				return parametro;
			default:
				return  'Não Definido';
		}
	}

	function prioridadeStyle(parametro: string) {
		switch(parametro){
			case Prioridade.Baixa:
				return 'success';
			case Prioridade.Normal:
				return 'dark';
			case Prioridade.Alta:
				return 'warning';
			default:
				return 'Não Definido';
		}
	}

	function prioridadeIcon(parametro: string) {
		switch(parametro){
			case Prioridade.Baixa:
				return faFaceSmile;
			case Prioridade.Normal:
				return faFaceMeh;
			case Prioridade.Alta:
				return faFaceFrown;
			default:
				return faFaceMeh;
		}
	}

	return (
		<div 
			key={atividade.id} 
			className={"card mb-2 shadow-sm border border-" +  prioridadeStyle(atividade.prioridade) } 
		>
			<div className="card-body">
				<div className='d-flex justify-content-between'>
					<h5 className='card-title'>
						<span className='badge bg-secondary me-2'>
							{atividade.id}
						</span>
						- {atividade.titulo}
					</h5>
					<h6>
						Prioridade: 
						<span className={'ms-1 text-' + prioridadeStyle(atividade.prioridade)}>
						{
							(
								atividade.prioridade === Prioridade.Baixa || 
								atividade.prioridade === Prioridade.Normal || 
								atividade.prioridade === Prioridade.Alta
							) &&
							<FontAwesomeIcon 
								icon={prioridadeIcon(atividade.prioridade)} 
								className='me-1'
							/> 
						}
						{prioridadeLabel(atividade.prioridade)}
						</span>
					</h6>
				</div>
				<p className="card-text">
					{atividade.descricao}
				</p>
				<div className="d-flex justify-content-end pt-2 m-0 border-top">
					<button 
						className="btn btn-sm btn-outline-primary me-2"
						onClick={() => pegarAtividade(atividade.id)}
					>
						<FontAwesomeIcon icon={faPen}  className='me-2'/>
						Editar
					</button>
					<button 
						className="btn btn-sm btn-outline-danger" 
						onClick={() => handleConfirmModal(atividade.id)}
					>
						<FontAwesomeIcon icon={faTrash}  className='me-2'/>
						Deletar
					</button>
				</div>
			</div>
		</div>
	)
};

export default AtividadeItem;
