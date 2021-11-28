import { Button, Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand><NavLink to='/' className='link-underline-off'>Announcement</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink to='/create-new-announcement' className='link-underline-off mx-3'>
                            Add new Announcement
                        </NavLink>

                        <NavLink to='/top-announcement' className='link-underline-off mx-3'>
                            Top Announcement
                        </NavLink>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;