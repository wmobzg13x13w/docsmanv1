import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  const location = useLocation();
  return (
    <main>
      {/********header**********/}
      <Header />
      <div className='pageWrapper d-lg-flex'>
        {/********Sidebar**********/}
        <aside className='sidebarArea shadow' id='sidebarArea'>
          <Sidebar />
        </aside>
        {/********Content Area**********/}
        <div className='contentArea'>
          {/********Middle Content**********/}
          <Container className='p-4' fluid>
            <Outlet key={location.key} />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
