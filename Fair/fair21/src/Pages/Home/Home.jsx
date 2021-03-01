import { useState, useEffect } from 'react';

import hrc from "../../assets/poster.png";
import { Navbar, Nav, Row, Col } from "react-bootstrap"

import './style.scss'
import { Button } from "react-bootstrap";
import ReactRotatingText from 'react-rotating-text'
import { NavLink } from 'react-router-dom';
import firebase from '../../config'

export default function Home() {

    const [user, setUser] = useState('');
    useEffect(() => (
        setUser({ email: localStorage.getItem("email"), uid: localStorage.getItem("uid") })
    ), [user])
    const handleLogout = () => {
        firebase.auth().signOut().then().catch(err => console.log(err))
        localStorage.removeItem("uid");
        localStorage.removeItem("email");
        setUser('')
    }
    return (
        <header className='home'>
            <Navbar className='px-5' bg='dark' variant="dark" expand='lg'>
                <Navbar.Brand href="#home">Internship Cell</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">About</Nav.Link>

                    </Nav>
                    {
                        user?.uid === null ? (<Nav>
                            <NavLink to='/register' className='mx-1 my-1 btn-outline-light btn' variant="outline-light" >Register</NavLink>
                            <NavLink to='/login' className='mx-1 my-1 btn-outline-light btn' variant="outline-light" >Login</NavLink>

                        </Nav>) : (
                                <Nav>
                                    <Button onClick={handleLogout} className='mx-1 my-1' variant="outline-light" >Logout</Button>
                                    <Button className='mx-1 my-1' variant="outline-light" >My Profile</Button>
                                </Nav>
                            )
                    }

                </Navbar.Collapse>
            </Navbar>

            <Row className='row1 center'>
                <Col md="4" sm="10" className="center">
                    <img src={hrc} alt="" />
                </Col>

                <Col md="6" sm="10" className="center justify-content-center ">
                    <div className="rot center">
                        <div className="line mx-5 " ></div>
                        <div className='w-100'>
                            <p className="rot-text ">Are you looking for</p>
                            <ReactRotatingText className='rot-text text-danger' items={['Opportunties?', 'Exposure?', 'Internships?']} />
                        </div></div>
                </Col>
            </Row>


        </header>
    );
}