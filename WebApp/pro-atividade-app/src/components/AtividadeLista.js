import React from 'react'
import Atividade from './Atividade';

export default function AtividadeLista({atividades, handleConfirmModal, pegarAtividade}) {
  return (
    <div className="mt-3">
      {atividades.map(atividade => (
        <Atividade 
          key={atividade.id}
          atividade={atividade}
          pegarAtividade={pegarAtividade}
          handleConfirmModal={handleConfirmModal}
        />
      ))}
    </div>
  )
}
