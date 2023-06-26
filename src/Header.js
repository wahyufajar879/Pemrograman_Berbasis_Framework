import { Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();

  function logOut() {
    localStorage.clear();
    navigate('/login');
  }
  console.warn(user);

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">E-Book</Navbar.Brand>
          <Nav className="me-auto navbar_wrapper">
            {localStorage.getItem('user-info') ? (
              <>
                <Link className="navbar_link" to="/">Product List</Link>
                <Link className="navbar_link" to="/add">Add Product</Link> 
                <Link className="navbar_link" to="/search">Search Product</Link>
              </>
            ) : (
              <>
                <Link className="navbar_link" to="/login">Login</Link>
                <Link className="navbar_link" to="/register">Register</Link>
              </>
            )}
          </Nav>
          {localStorage.getItem('user-info')?(
          <Nav>
            <NavDropdown title={user ? user.name : 'User'}>
              <NavDropdown.ItemText onClick={logOut}>Log-Out</NavDropdown.ItemText>
            </NavDropdown>
          </Nav>
          ) : null}
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
