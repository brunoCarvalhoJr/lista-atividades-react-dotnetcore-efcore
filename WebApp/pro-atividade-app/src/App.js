import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Atividade from "./pages/atividades/Atividade";
import ClienteLista from "./pages/clientes/ClienteLista";
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';

export default function App() {

	return (
		<Routes>
			<Route path='/' element={<Dashboard/>} />
			<Route path='/atividade/lista' element={<Atividade/>} />
			<Route path='/cliente/lista' element={<ClienteLista/>} />
			<Route path='/cliente/detalhe/' element={<ClienteForm/>} />
			<Route path='/cliente/detalhe/:id' element={<ClienteForm/>} />
			<Route element={<PageNotFound/>} />
		</Routes>
	);
};