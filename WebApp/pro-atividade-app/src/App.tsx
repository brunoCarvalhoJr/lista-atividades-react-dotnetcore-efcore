import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Atividade from "./pages/atividades/Atividade";
import ClienteLista from "./pages/clientes/ClienteLista";
import ClienteForm from './pages/clientes/ClienteForm';
import PageNotFound from './pages/PageNotFound';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Dashboard/>} />
			<Route path='/atividade/*' element={<Atividade/>} />
			<Route path='/cliente/*' element={<ClienteLista/>} />
			<Route path='/cliente/detalhe/' element={<ClienteForm/>} />
			<Route path='/cliente/detalhe/:id' element={<ClienteForm/>} />
			<Route element={<PageNotFound/>} />
		</Routes>
	);
};

export default App;