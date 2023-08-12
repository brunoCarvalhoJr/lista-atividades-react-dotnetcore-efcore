import React from 'react';
import Button from 'react-bootstrap/Button';
import TitlePage from "../../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ClienteForm: React.FC = () => {

    let navigate =  useNavigate();
	let { id } = useParams();

	return (
		<>
			<TitlePage title={'Cliente Detalhes ' + (id !== undefined ? id : '')}>
				<Button 
					variant="secondary" 
					onClick={() => navigate('/cliente/lista')}
				>
					<FontAwesomeIcon 
						icon={faArrowLeft}
						className='me-2' 
					/> 
					Voltar
				</Button>
			</TitlePage>
			<div>
			
			</div>
		</>
	)
};

export default ClienteForm; 