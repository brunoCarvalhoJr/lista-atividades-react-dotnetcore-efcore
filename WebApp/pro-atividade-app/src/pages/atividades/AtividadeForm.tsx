import React from 'react';
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AtividadeFormProps } from '../../model/atividadeProps';
import { IAtividade, Prioridade } from '../../model/atividade';
   
const  atividadeInicial: IAtividade = {
    id: 0,
    titulo: '',
    prioridade: Prioridade.NaoDefinido,
    descricao: ''
}

const AtividadeForm: React.FC<AtividadeFormProps> = ({
            addAtividade, 
            atividadeSelecionada, 
            atualizarAtividade, 
            cancelarAtividade
        } : AtividadeFormProps
    ) => {

    const atividadeAtual = () => {
        if(atividadeSelecionada.id !== 0){
            return atividadeSelecionada
        }else{
            return atividadeInicial
        }
    }

    const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());

    useEffect(() => {
        if(atividadeSelecionada.id !== 0){
            setAtividade(atividadeSelecionada)
        }
    },[atividadeSelecionada])

    const handleValue = (e: any) => {
        const {name, value} = e.target;

        setAtividade({
            ...atividade,
            [name]: value
        });
    }

    const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        cancelarAtividade();
        
        setAtividade(atividadeInicial);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(atividadeSelecionada.id !== 0)
            atualizarAtividade(atividade);
        else
            addAtividade(atividade);

        setAtividade(atividadeInicial);
    }

    return (
        <>
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <label className='form-label'>Titulo</label>
                    <input 
                        id="titulo" 
                        name="titulo"
                        type="text" 
                        placeholder='Título'
                        className='form-control' 
                        value={atividade.titulo} 
                        onChange={handleValue}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Prioridade</label>
                    <select 
                        id="prioridade" 
                        name="prioridade"
                        className="form-select"
                        onChange={handleValue}
                        value={atividade.prioridade} 
                    >
                        <option value="NaoDefinido">Selecionar...</option>
                        <option value={'Baixa'}>Baixa</option>
                        <option value={'Normal'}>Normal</option>
                        <option value={'Alta'}>Alta</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className='form-label'>Descrição</label>
                    <textarea 
                        id="descricao" 
                        name="descricao"
                        className='form-control' 
                        placeholder='Descrição'
                        value={atividade.descricao} 
                        onChange={handleValue}
                    />
                <hr />
                </div>
                <div className='col-12 mt-0'>
                    {
                        atividade.id === 0 ?
                        <>
                            <button 
                                className='btn btn-outline-success me-2' 
                                type="submit"
                            >
                                <FontAwesomeIcon 
                                    icon={faPlus} 
                                    className='me-2'
                                /> 
                                Salvar 
                            </button>
                            <button 
                                className='btn btn-outline-warning' 
                                onClick={handleCancelar}
                            >
                                <FontAwesomeIcon 
                                    icon={faTimes} 
                                    className='me-2'
                                /> 
                                Cancelar 
                            </button>
                        </>
                        :
                        <>
                            <button 
                                className='btn btn-outline-success me-2' 
                                type="submit"
                            >
                                <FontAwesomeIcon 
                                    icon={faPlus} 
                                    className='me-2'
                                /> 
                                Salvar 
                            </button>
                            <button 
                                className='btn btn-outline-warning' 
                                onClick={handleCancelar}
                            >
                                <FontAwesomeIcon 
                                    icon={faTimes} 
                                    className='me-2'
                                /> 
                                Cancelar 
                            </button>
                        </>

                    }
                </div>
            </form>
        </>
    )
}

export default AtividadeForm;