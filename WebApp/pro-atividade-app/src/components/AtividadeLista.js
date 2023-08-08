import React from 'react'
import Atividade from './Atividade';

export default function AtividadeLista({atividades, deleteAtividade, pegarAtividade}) {
  return (
    <div className="mt-3">
      {atividades.map(atividade => (
        <Atividade 
          key={atividade.id}
          atividade={atividade}
          deleteAtividade={deleteAtividade}
          pegarAtividade={pegarAtividade}
        />
      ))}
    </div>
  )
}
