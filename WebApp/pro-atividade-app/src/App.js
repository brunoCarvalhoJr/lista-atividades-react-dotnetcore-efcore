import { useEffect, useState } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';

library.add(fas, far)

function App() {
	
	const [index, setIndex] = useState(0);
	const [atividades, setAtividades] = useState([]);
	const [atividade, setAtividade] = useState({id:0});

	useEffect(() => {
		atividades.length  <= 0  ? 
		setIndex(1) : 
		setIndex(Math.max.apply(
			Math, 
			atividades.map((item) => item.id) 
		) + 1)
	},[atividades])

	function addAtividade(atividade){
		setAtividades([
			...atividades,
			{
				...atividade,
				id: index
			}
		])
	}

	function cancelarAtividade(){
		setAtividade({
			id: 0
		});
	}

	function atualizarAtividade(atividade){
		setAtividades(atividades.map(item => item.id === atividade.id ? atividade : item));
		setAtividade({
			id: 0
		});
	}

	function deleteAtividade(id){
		const atividadesFiltradas = atividades.filter(atividade => atividade.id !==  id)
		
		setAtividades([
			...atividadesFiltradas
		]);
	}

	function pegarAtividade(id){
		const atividadeSelecionada = atividades.filter(atividade => atividade.id ===  id)

		setAtividade(atividadeSelecionada[0])
	}

	return (
		<>
			<AtividadeForm 
				atividadeSelecionada={atividade}
				atividades={atividades}
				addAtividade={addAtividade}
				atualizarAtividade={atualizarAtividade}
				cancelarAtividade={cancelarAtividade}
			/>
			<AtividadeLista 
				atividades={atividades}
				pegarAtividade={pegarAtividade}
				deleteAtividade={deleteAtividade}
			/>
		</>
	);
}

export default App;
