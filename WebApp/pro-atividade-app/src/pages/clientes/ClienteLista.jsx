import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitlePage from "../../components/TitlePage";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const clientes = [
    {
        id: 1,
        nome: 'Microsoft',
        responsavel: 'Otto',
        contato: '35211205',
        situacao: 'Ativo'
    },
    {
        id: 2,
        nome: 'Amazon',
        responsavel: 'Kevin',
        contato: '35212250',
        situacao: 'Desativado'
    },
    {
        id: 3,
        nome: 'Google',
        responsavel: 'Jones',
        contato: '35219085',
        situacao: 'Em Análise'
    },
    {
        id: 4,
        nome: 'Facebook',
        responsavel: 'Bones',
        contato: '35218056',
        situacao: 'Desativado'
    },
    {
        id: 5,
        nome: 'Twitter',
        responsavel: 'James',
        contato: '35214545',
        situacao: 'Ativo'
    }
]

export default function ClienteLista() {

    const history =  useHistory();
    const [ termoDeBusca, setTermoDeBusca ] = useState('');

    const handleInputChange = (e) => {
        
        e.preventDefault();
        setTermoDeBusca(e.target.value);
    }

    const clientesFiltrados = clientes.filter((cliente) => {
        return (
            Object.values(cliente)
                .join(' ')
                .toLowerCase()
                .includes(termoDeBusca.toLowerCase())
        )
    })

    const novoCliente = () => {
        history.push('/cliente/detalhe')
    }

    return (
        <>
            <TitlePage title='Cliente Lista'>
				<Button variant="outline-primary" onClick={novoCliente}>
					<FontAwesomeIcon 
						icon={"fas fa-plus"} 
					/> 
				</Button>
            </TitlePage>
            <InputGroup className="mb-3 mt-3">
                <InputGroup.Text >
                    Buscar
                </InputGroup.Text>
                <Form.Control
                    placeholder="Bucar por nome do cliente"
                    onChange={(e) => handleInputChange(e)}
                />
            </InputGroup>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Responsavel</th>
                        <th scope="col">Contato</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientesFiltrados.map(({id, nome, responsavel, contato,  situacao}) => {
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{nome}</td>
                                    <td>{responsavel}</td>
                                    <td>{contato}</td>
                                    <td>{situacao}</td>
                                    <td>
                                        <div>
                                            <button 
                                                className="btn btn-sm btn-outline-primary me-2" 
                                                onClick={() => history.push(
                                                    `/cliente/detalhe/${id}`
                                                )}
                                            >
                                                <FontAwesomeIcon 
                                                    icon={"fas fa-user-edit"} 
                                                    className="me-2"
                                                /> 
                                                Editar
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger me-2">
                                                <FontAwesomeIcon 
                                                    icon={"fas fa-user-times"} 
                                                    className="me-2"
                                                /> 
                                                Desativar  
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
