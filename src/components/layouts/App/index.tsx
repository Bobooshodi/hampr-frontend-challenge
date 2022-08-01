import { Layout } from "antd"
import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader";
import './style.css';

const { Content, Footer } = Layout;

const App = () => {
    return  <Layout>
   <MainHeader />
    <Content className="content">
      <Outlet />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Hampr Frontend Challenge ©2022 by Feyi Duba Oshodi</Footer>
  </Layout>
}

export default App