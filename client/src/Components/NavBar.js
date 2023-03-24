import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';

function NavBar() {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            bg="primary"
            variant="dark"
            className="bg-primary"
        >
            <Container>
                <Nav.Link href="/" className="navbar-brand">
                    Book Your Appointment
                </Nav.Link>
            </Container>
        </Navbar>
    );
}

export default NavBar;
