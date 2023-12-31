import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';


const Menu = () => {

    const getActiveRoute = useLocation().pathname ? 'Active' : '';

    return (
        <Navbar bg="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={NavLink} to='/'>
                    My World
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            as={NavLink} 
                            to='/cliente'
                            className={getActiveRoute}
                        >
                            Clientes
                        </Nav.Link>
                        <Nav.Link 
                            as={NavLink} 
                            to='/atividade'
                            className={getActiveRoute}
                        >
                            Atividades
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown 
                            align="end" 
                            title="Bruno" 
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Perfil
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Configurações
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">
                                Sair
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;