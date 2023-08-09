import { useEffect, useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from './api/atividade.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas, far)

function App() {
	
	const [showAtividadeModal, setShowAtividadeModal] = useState(false);
	const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
	const [atividades, setAtividades] = useState([]);
	const [atividade, setAtividade] = useState({id:0});

	const handleAtividadeModal = () => {

		if(showAtividadeModal)
			setAtividade({
				id: 0
			});
		
		setShowAtividadeModal(!showAtividadeModal);
	}

	const handleConfirmModal = (idAtividade) => {
		if(idAtividade !==  0 && idAtividade !== undefined){
			const atividadeSelecionada = atividades.filter(atividade => atividade.id ===  idAtividade)
			setAtividade(atividadeSelecionada[0])
		}else{
			setAtividade({id:0})
		}
		setSmShowConfirmModal(!smShowConfirmModal);
	}

	const pegaTodasAtividades = async () => {
		const response = await api.get('atividade'); 

		return response.data;
	}

	const novaAtividade = () => {
		handleAtividadeModal();
		setAtividade({
			id: 0
		});
	}

	useEffect(() => {
		async function getAtividades(){
			const todasAtividades = await pegaTodasAtividades();
			if(todasAtividades) setAtividades(todasAtividades);
		}
		getAtividades();
	
	},[])

	const addAtividade = async (atividade) => {
		const response = await api.post('atividade', atividade);
		setAtividades([
			...atividades,
			response.data
		]);
		handleAtividadeModal();
	}

	function cancelarAtividade(){
		handleAtividadeModal();
		setAtividade({
			id: 0
		});
	}

	const atualizarAtividade = async (atividade) => {
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
			setAtividade({
				id: 0
			});
			handleAtividadeModal();
		}
	}

	const deleteAtividade = async (id)  => {
		
		if(await api.delete(`atividade/${id}`)) {
			const atividadesFiltradas = atividades.filter(atividade => atividade.id !==  id)
			setAtividades([
				...atividadesFiltradas
			]);
			handleConfirmModal(0);
		}
	}

	function pegarAtividade(id){
		const atividadeSelecionada = atividades.filter(atividade => atividade.id ===  id)
		setAtividade(atividadeSelecionada[0])
		handleAtividadeModal();
	}

	return (
		<>
			<div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">		
				<h1 className='m-0 p-0'>Atividade {atividade.id !== 0 ? atividade.id : ''}</h1>
				<Button variant="outline-secondary" onClick={novaAtividade}>
					<FontAwesomeIcon 
						icon={"fas fa-plus"} 
					/> 
				</Button>
			</div>

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
						atividadeSelecionada={atividade}
						atividades={atividades}
						addAtividade={addAtividade}
						atualizarAtividade={atualizarAtividade}
						cancelarAtividade={cancelarAtividade}
					/>
				</Modal.Body>
			</Modal>

			<Modal 
				size='sm' 
				show={smShowConfirmModal} 
				onHide={handleConfirmModal}
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
							icon={"fas fa-check"} 
							className='me-2'
						/> 
						Sim
					</button>
					<button className="btn btn-danger me-2" onClick={() => handleConfirmModal(0)}>
						<FontAwesomeIcon 
							icon={"fas fa-times"} 
							className='me-2'
						/> 
						Não
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default App;
