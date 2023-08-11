import Button from 'react-bootstrap/Button';
import TitlePage from "../../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function ClienteForm() {

    let history =  useHistory();
	let { id } = useParams();

	return (
		<>
			<TitlePage title={'Cliente Detalhes ' + (id !== undefined ? id : '')}>
				<Button 
					variant="secondary" 
					onClick={() => history.goBack()}
				>
					<FontAwesomeIcon 
						icon={"fas fa-arrow-left"}
						className='me-2' 
					/> 
					Voltar
				</Button>
			</TitlePage>
			<div>
			
			</div>
		</>
	)
}
