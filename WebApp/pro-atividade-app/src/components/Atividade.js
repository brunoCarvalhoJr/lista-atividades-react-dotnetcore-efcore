import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Atividade({atividade, deleteAtividade, pegarAtividade}) {
  
	function prioridadeLabel(parametro) {
		switch(parametro){
			case '1':
				return 'Baixa';
			case '2':
				return 'Média';
			case '3':
				return 'Alta';
			default:
				return 'Não Definido';
		}
	}

	function prioridadeStyle(parametro, icon) {
		switch(parametro){
			case '1':
				return icon ? 'smile' : 'success';
			case '2':
				return icon ? 'meh' : 'warning';
			case '3':
				return icon ? 'frown' : 'danger';
			default:
				return 'Não Definido';
		}
	}

  return (
    <div key={atividade.id} className={"card mb-2 shadow-sm border border-" +  prioridadeStyle(atividade.prioridade) } >
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <h5 className='card-title'>
            <span className='badge bg-secondary me-2'>{atividade.id}</span>
            - {atividade.titulo}
          </h5>
          <h6>
            Prioridade: 
            <span className={'ms-1 text-' + prioridadeStyle(atividade.prioridade)}>
              {
                (atividade.prioridade === ("1" || "2" || "3")) &&
                <FontAwesomeIcon 
                  icon={"fa-regular fa-face-" + prioridadeStyle(atividade.prioridade, true)} 
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
            <FontAwesomeIcon icon="fa-solid fa-pen"  className='me-2'/>
            Editar
          </button>
          <button 
            className="btn btn-sm btn-outline-danger" 
            onClick={() => deleteAtividade(atividade.id)}
          >
            <FontAwesomeIcon icon="fa-solid fa-trash"  className='me-2'/>
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
