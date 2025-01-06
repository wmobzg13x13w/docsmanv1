import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Documents",
    href: "/files",
    icon: "bi bi-file",
  },
  {
    title: "Employés",
    href: "/employees",
    icon: "bi bi-people-fill",
  },
  {
    title: "Dépenses",
    href: "/expenses",
    icon: "bi bi-cash-stack",
  },
];

const Sidebar = () => {
  const { admin, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  useEffect(() => {
    // Wait for the admin data to load before setting the loading state to false
    if (admin) {
      setLoading(false);
    }
  }, [admin]);

  const handleLogout = async () => {
    try {
      setLoading(false);
      navigate("/login");
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLinkClick = (href) => {
    if (location.pathname === href) {
      // Force refresh by navigating to the same route
      navigate(0); // This reloads the page
    } else {
      navigate(href);
    }
  };

  return (
    <div>
      <div className='d-flex align-items-center'></div>
      <div
        className='profilebg'
        style={{ background: `url(${probg}) no-repeat` }}>
        <div className='p-3 d-flex'>
          <img src={user1} alt='user' width='50' className='rounded-circle' />
          <Button
            color='white'
            className='ms-auto text-white d-lg-none'
            onClick={() => showMobilemenu()}>
            <i className='bi bi-x'></i>
          </Button>
        </div>
        <div className='bg-dark text-white p-2 opacity-75'>
          {!loading && admin ? admin.fullName : "No admin available"}
        </div>
      </div>
      <div className='p-3 mt-2'>
        <Nav vertical className='sidebarNav'>
          {navigation.map((navi, index) => (
            <NavItem key={index} className='sidenav-bg'>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
                onClick={() => handleLinkClick(navi.href)}>
                <i className={navi.icon}></i>
                <span className='ms-3 d-inline-block'>{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
        <div className='d-grid gap-2 mt-3'>
          <Button color='danger' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
