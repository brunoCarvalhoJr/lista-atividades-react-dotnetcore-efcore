import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import AtividadeForm from './AtividadeForm';
import Button from 'react-bootstrap/Button';
import api from '../../api/atividade';
import AtividadeLista  from './AtividadeLista';
import TitlePage from '../../components/TitlePage';
import { faCheck, faPlus, faTimes, fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAtividade, Prioridade } from '../../model/atividade';
   
const  atividadeInicial: IAtividade = {
    id: 0,
    titulo: '',
    prioridade: Prioridade.NaoDefinido,
    descricao: ''
}

library.add(fas, far)

const Atividade = () => {
	
	const [showAtividadeModal, setShowAtividadeModal] = useState(false);
	const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
	const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);
	const [atividades, setAtividades] = useState<IAtividade[]>([]);

	const handleAtividadeModal = () => {

		if(showAtividadeModal)
			setAtividade(atividadeInicial);
		
		setShowAtividadeModal(!showAtividadeModal);
	}

	const handleCloseModalConfirm = () => {
		setSmShowConfirmModal(!smShowConfirmModal);
	}

	const handleConfirmModal = (idAtividade: any) => {
		if(idAtividade !==  0 && idAtividade !== undefined){
			const atividadeSelecionada = atividades.filter(
				(atividade) => atividade.id === idAtividade
			)
			setAtividade(atividadeSelecionada[0])
		}else{
			setAtividade(atividadeInicial)
		}
		setSmShowConfirmModal(!smShowConfirmModal);
	}

	const pegaTodasAtividades = async () => {
		const response = await api.get('atividade'); 

		return response.data;
	}

	const novaAtividade = () => {
		setAtividade(atividadeInicial);
		handleAtividadeModal();
	}

	useEffect(() => {
		async function getAtividades(){
			const todasAtividades = await pegaTodasAtividades();
			if(todasAtividades) setAtividades(todasAtividades);
		}
		getAtividades();
	
	},[])

	const addAtividade = async (atividade: IAtividade) => {
		const response = await api.post('atividade', atividade);
		setAtividades([
			...atividades,
			response.data
		]);
		handleAtividadeModal();
	}

	function cancelarAtividade(){
		handleAtividadeModal();
		setAtividade(atividadeInicial);
	}

	const atualizarAtividade = async (atividade: IAtividade) => {
		const response = await api.put(`atividade/${atividade.id}`, atividade)
		if(response.data){
			const { id } = response.data;
			setAtividades(
				atividades.map(item => 
					item.id === id ? 
					response.data : 
					item
				)
			);
			setAtividade(atividadeInicial);
			handleAtividadeModal();
		}
	}

	const deleteAtividade = async (id: number)  => {
		
		if(await api.delete(`atividade/${id}`)) {
			const atividadesFiltradas = atividades.filter(atividade => atividade.id !==  id)
			setAtividades([
				...atividadesFiltradas
			]);
			handleConfirmModal(0);
		}
	}

	function pegarAtividade(id: number){
		const atividadeSelecionada = atividades.filter(atividade => atividade.id ===  id)
		setAtividade(atividadeSelecionada[0])
		handleAtividadeModal();
	}

	return (
		<>
			<TitlePage
				title={'Atividade ' + (atividade.id !== 0 ? atividade.id : '')}
			>
				<Button variant="outline-primary" onClick={novaAtividade}>
					<FontAwesomeIcon 
						icon={faPlus} 
					/> 
				</Button>
			</TitlePage>
			<AtividadeLista
				atividades={atividades}
				pegarAtividade={pegarAtividade}
				handleConfirmModal={handleConfirmModal}
			/>
			<Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						<h1 className='m-0 p-0'>
							Atividade {atividade.id !== 0 ? atividade.id : ''}
						</h1>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AtividadeForm
						addAtividade={addAtividade}
						atividadeSelecionada={atividade}
						atualizarAtividade={atualizarAtividade}
						cancelarAtividade={cancelarAtividade}
					/>
				</Modal.Body>
			</Modal>
			<Modal 
				size='sm' 
				show={smShowConfirmModal} 
				onHide={handleCloseModalConfirm}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						<h1 className='m-0 p-0'>
							Excluindo Atividade{' '} 
							{atividade.id !== 0 ? atividade.id : ''}
						</h1>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Tem certeza que deseja excluir a atividade {atividade.id}?
				</Modal.Body>
				<Modal.Footer className={'d-flex justify-content-between'}>
					<button className="btn btn-outline-success me-2" onClick={() => deleteAtividade(atividade.id)}>
						<FontAwesomeIcon 
							icon={faCheck} 
							className='me-2'
						/> 
						Sim
					</button>
					<button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
						<FontAwesomeIcon 
							icon={faTimes} 
							className='me-2'
						/> 
						Não
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Atividade;