import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
   
const  atividadeInicial  = {
    id: 0,
    titulo: '',
    prioridade: 0,
    descricao: ''
}

export default function AtividadeForm({addAtividade, atividadeSelecionada, atualizarAtividade, cancelarAtividade}) {

    const atividadeAtual = () => {
        if(atividadeSelecionada.id !== 0){
            return atividadeSelecionada
        }else{
            return atividadeInicial
        }
    }

    const [atividade, setAtividade] = useState(atividadeAtual());

    useEffect(() => {
        if(atividadeSelecionada.id !== 0){
            setAtividade(atividadeSelecionada)
        }
    },[atividadeSelecionada])

    const inputTextHandler = (e) => {
        const {name, value} = e.target;

        setAtividade({
            ...atividade,
            [name]: value
        });
    }

    const handleCancelar = (e) => {
        e.preventDefault();

        cancelarAtividade();
        
        setAtividade(atividadeInicial);
    }

    const handleSubmit = (e) => {
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
                        onChange={inputTextHandler}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Prioridade</label>
                    <select 
                        id="prioridade" 
                        name="prioridade"
                        className="form-select"
                        onChange={inputTextHandler}
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
                        type="text" 
                        id="descricao" 
                        name="descricao"
                        className='form-control' 
                        placeholder='Descrição'
                        value={atividade.descricao} 
                        onChange={inputTextHandler}
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
                                    icon={"fas fa-plus"} 
                                    className='me-2'
                                /> 
                                Salvar 
                            </button>
                            <button 
                                className='btn btn-outline-warning' 
                                onClick={handleCancelar}
                            >
                                <FontAwesomeIcon 
                                    icon={"fas fa-plus"} 
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
                                    icon={"fas fa-plus"} 
                                    className='me-2'
                                /> 
                                Salvar 
                            </button>
                            <button 
                                className='btn btn-outline-warning' 
                                onClick={handleCancelar}
                            >
                                <FontAwesomeIcon 
                                    icon={"fas fa-plus"} 
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
