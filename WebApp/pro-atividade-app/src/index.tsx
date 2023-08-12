import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Menu from './components/Menu';
import 'bootswatch/dist/lumen/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';

let content = (
	<Router>
		<Menu />
		<div className='container'>
			<App />
		</div>
	</Router>
);

ReactDOM.render(content, document.getElementById('root'));