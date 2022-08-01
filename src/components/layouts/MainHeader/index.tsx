import {Layout } from "antd"
import logo from '../../../assets/img/Mortal-Kombat-Logo.png'
import './style.css';

const { Header } = Layout;

const MainHeader = () => {
    return <Header className="main-header">
      <div className="logo">
        <img src={logo} alt="logo"></img>
      </div>
    </Header>
}

export default MainHeader;
