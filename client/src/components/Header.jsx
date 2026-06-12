
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            {/* <style>{`
                .navbar { background-color: transparent !important; padding: 1.2rem 0; position: relative; z-index: 10; }
                .brand {
                    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.35rem;
                    background: linear-gradient(135deg, #fff 40%, #7c6af7);
                    -webkit-background-clip: text; background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-decoration: none;
                }
            `}</style> */}
           <style>{`
    .navbar { 
        background-color: #0f0f1a !important; 
        padding: 1.2rem 0; 
    }
    .brand {
        font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.35rem;
        background: linear-gradient(135deg, #fff 40%, #7c6af7);
        -webkit-background-clip: text; background-clip: text;
        -webkit-text-fill-color: transparent;
        text-decoration: none;
    }
    .navbar .nav-link { color: rgba(255,255,255,0.85) !important; }
    .navbar .nav-link:hover { color: #7c6af7 !important; }
    .navbar .dropdown-toggle { color: rgba(255,255,255,0.85) !important; }
    .navbar .dropdown-toggle:hover { color: #7c6af7 !important; }
    .navbar .dropdown-menu { 
        background-color: #1a1a2e; 
        border: 1px solid rgba(124,106,247,0.3); 
    }
    .navbar .dropdown-item { color: rgba(255,255,255,0.85) !important; }
    .navbar .dropdown-item:hover { 
        background-color: rgba(124,106,247,0.2); 
        color: #fff !important; 
    }

    /* ✅ Fix hamburger icon */
    .navbar-toggler { 
        border-color: rgba(255,255,255,0.5) !important; 
    }
    .navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,255,255,0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
    }
`}</style>

            <Navbar expand="lg" bg="dark" data-bs-theme="dark" className='navbar'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="brand">
                        
                       Employee
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                           {!user && <Nav.Link as={Link} to="/">Home</Nav.Link>}
                            
                            
                            
{/* 
                            {user && user.role === 'admin' && (
                                <>
                                 <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                                <NavDropdown title="Admin Panel" id="admin-nav-dropdown" className="fw-bold text-warning">
                                    <NavDropdown.Item as={Link} to="/admin/events">All Events</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/admin/users">Manage Users</NavDropdown.Item>
                                    
                                   
                                </NavDropdown></>
                                
                            )} */}
                             {user  && (
                                  <>
                                  <Nav.Link as={Link} to="/events">Home</Nav.Link>
                                     <Nav.Link as={Link} to="/addemp">Add New Employee</Nav.Link>
                                     <Nav.Link as={Link} to="/emplist">Employee list</Nav.Link>
                                     
                                    </>
                                )}
                                
                            <NavDropdown title={user ? user.name : "Account"} id="basic-nav-dropdown">
                                {!user ? (
                                    <>
                                        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                    </>
                                ) : (
                                    <>
                                        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleLogout} className="text-danger">Logout</NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;