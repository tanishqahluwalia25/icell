import { useState, useEffect, useRef } from 'react';

import hrc from "../../assets/poster.png";
import { Navbar, Nav, Row, Col, Form } from "react-bootstrap"

import './style.scss'
import { Button } from "react-bootstrap";
import ReactRotatingText from 'react-rotating-text'
import { NavLink } from 'react-router-dom';
import firebase from '../../config'
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
    const [query, setQuery] = useState(' ')
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

    const handleChange = e => {
        setQuery(e.target.value)
    }
    const navbarRef = useRef();
    const navbarStyleListener = () => {
        if (window.location.pathname === '/' && window.scrollY < 90) {
            navbarRef.current.id = '';
        } else {
            navbarRef.current.id = 'shadow';
        }
    };
    useEffect(() => { window.addEventListener('scroll', navbarStyleListener); }, [])
    const handleSubmit = e => {
        e.preventDefault();

        firebase.database().ref('queries/' + localStorage.getItem('uid') + '/' + new Date()).set({ query: query, email: localStorage.getItem('email') });
        toast("Stay Tuned with us on instagram to get answers to your query!")
        setQuery('')
    }
    return (

        <div>
            <header className='home bg-dark'>
                <Navbar ref={navbarRef} fixed='top' className='px-5' bg='dark' variant="dark" expand='lg'>
                    <Navbar.Brand href="#home">Internship Cell</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home" >Home</Nav.Link>
                            <Nav.Link href="/home" >Companies</Nav.Link>
                            {/* <Nav.Link href="/home" >Home</Nav.Link> */}
                            <Nav.Link target='_blank' href="https://www.placementhansraj.com/internships.html">About</Nav.Link>

                        </Nav>
                        {
                            user?.uid === null ? (<Nav>
                                <NavLink to='/register' className='mx-1 my-1 btn-outline-light btn' variant="outline-light" >Register</NavLink>
                                <NavLink to='/login' className='mx-1 my-1 btn-outline-light btn' variant="outline-light" >Login</NavLink>

                            </Nav>) : (
                                    <Nav>
                                        <Button onClick={handleLogout} className='mx-1 my-1' variant="outline-light" >Logout</Button>
                                        <NavLink to='profile' className='btn-outline-light btn mx-1 my-1' variant="outline-light" >My Profile</NavLink>
                                    </Nav>
                                )
                        }

                    </Navbar.Collapse>
                </Navbar>


                <Row className='h-100 ' id='text1'>
                    <Col md='1' sm='0'>

                    </Col>
                    <Col md={10} sm={12} className='w-75 w-sm-100 ml-sm-5 my-auto'>
                        <Row>
                            <Col>
                                <p className="rot-text ">Are you looking for</p>
                            </Col>
                        </Row>
                        <Row><Col><ReactRotatingText style={{ color: "white" }} className='rot rot-text ' id='' items={['#Opportunties?', '#Exposure?', '#Internships?']} /></Col>
                        </Row>
                        <Row>



                            {
                                localStorage.getItem('uid') ?
                                    (<Col md={10}>
                                        <input className='bg-dark mr-2 py-1 pr-5 pl-1 rounded' style={{
                                            color: "grey"
                                        }} type="text" id='name' onChange={handleChange} />
                                        <button className='mx-0 my-5 btn' id='rot' onClick={handleSubmit}>Submit</button>
                                    </Col>)
                                    : (
                                        <Col md={10}><button className='mx-0 my-5 btn' id='rot'>Register Now</button> </Col>
                                    )
                            }

                        </Row>
                        <Row>
                            <Col md='1' sm='3'><i className="icon fa fa-2x fa-instagram w-25" aria-hidden="true"></i></Col>
                            <Col md='1' sm='3'><i className="icon fa fa-2x fa-linkedin w-25" aria-hidden="true"></i></Col>
                            <Col md='1' sm='3'><i className="icon fa fa-2x fa-envelope-o w-sm-25" aria-hidden="true"></i></Col>
                        </Row>
                    </Col>

                </Row>

                <ToastContainer />
            </header>

            <section style={{ height: '100vh' }} >
                hcfdsujkafdwsa
                fedwsfedwsa
            </section>
        </div>
    );
}