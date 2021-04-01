import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon, Dropdown, Modal, Button } from 'antd';
import * as authActions from "../actions/authActions";
import * as chatActions from "../actions/chatActions";
import '../styles/Header.css';

import LoginModal from './LoginModal';
import ErrorModal from './ErrorModal';
import WrappedRegistrationForm from './RegisterModal';

const Header = Layout.Header;

class HeaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'dashboard',
      showLogin: false,
      showRegister: false,
      collapsed: true,
      smallScreen: window.innerWidth < 992,
      menuBtnScreen: window.innerWidth < 1441,
      urlLocation : window.location.pathname,
      showError: this.props.temp_id.length !== 0 ? true : false,
    }
  }

  componentWillMount(){
    this.props.isLoggedIn && this.props.onGetCountChat();
  }

  componentDidMount(){
    this.props.isLoggedIn && this.props.onGetCountChat();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isRegisterCompleted !== undefined && nextProps.isRegisterCompleted){
      this.setState({
        showRegister: false
      });
    }
    if(!nextProps.isLoggedIn){
      this.setState({
        showLogin: false,
      })
    }
    if(nextProps.temp_id.length > 0){
      this.setState({
        showError: true,
      })
    }
    if(nextProps.temp_id.length === 0){
      this.setState({
        showError: false,
      })
    }
  }
  handleClick = (e) => {
    if(!this.props.isLoggedIn && e.key !== 'dashboard' && e.key !== 'news'){
      this.handleShowLogin();
      return;
    }else{
      this.setState({
        current: e.key,
      });
    }
  }
  handleShowLogin = () => {
    this.setState({
      showLogin: true,
    });
  }
  handleCancelLogin = () => {
    this.setState({ showLogin: false });
  }
  handleCancelError = () => {
    this.setState({ showError: false });
  }
  handleShowRegister = () => {
    this.setState({
      showRegister: true,
    });
  }
  handleCancelRegister = () => {
    this.setState({ showRegister: false });
  }
  registrationSubmit(submitRegistration){
    if(submitRegistration){
      this.setState({ showRegister: false });
    }
  }
  registrationCancel(cancelRegistration){
    if(cancelRegistration){
      this.setState({ showRegister: false });
    }
  }
  handleUserMenuClick = (e) => {
    switch (e.key) {
      case 'logout':
        this.props.logout();
        this.props.history.push('/');
        break;
      default:
        break;
    }
  }
  renderAccountLink() {
    let role = this.props.user && (this.props.user.user_json && this.props.user.user_json.role);
    switch (role) {
      case 0:
        return <Link to="/account/company"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      case 1:
        return <Link to="/account/security"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      case 2:
        return <Link to="/account/insurance"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      case 3:
        return <Link to="/account/store"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      case 4:
        return <Link to="/account/forwarder"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      case 5:
        return <Link to="/account/bank"><Icon className="mr1" type="user" />Личный кабинет</Link>;
      default:
        return <Link to="/account/company"><Icon className="mr1" type="user" />Личный кабинет</Link>;
    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const menu = (
      <Menu onClick={this.handleUserMenuClick}>
        <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="profile">{this.renderAccountLink()}</Menu.Item>
        {!this.state.smallScreen && <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="settings"><Link to="/settings"><Icon type="setting" className="mr1" /> Настройки</Link></Menu.Item>}
        {!this.state.smallScreen && <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="messages"><Link to="/messages"><Icon type="message" className="mr1" /> Сообщения</Link></Menu.Item>}
        <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="about"><Link to="/about"><Icon type="info-circle-o" className="mr1" /> О платформе</Link></Menu.Item>
        {!this.state.smallScreen && <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="trades"><Link to="/trades"><Icon type="profile" className="mr1" /> История сделок</Link></Menu.Item>}
        <Menu.Divider />
        <Menu.Item onClick={() => {this.setState({collapsed : true })}} key="logout"><Icon type="logout" className="mr1" /> Выход</Menu.Item>
      </Menu>
    );
    // const langMenu = (
    //   <Menu onClick={this.handleLangMenuClick}>
    //     <Menu.Item key="en">Eng</Menu.Item>
    //     <Menu.Item key="ru">Rus</Menu.Item>
    //   </Menu>
    // )
    return (
      <Header className={this.state.menuBtnScreen ? "header-wrapper justify_between" : "header-wrapper"}>
        <div className="table_menu item-cnt" style={{"height": 63}}>
          <Button
            type="primary"
            onClick={this.toggleCollapsed}
            className="hide_menu-btn">
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            className="drop-menu"
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="dashboard">
              <Link onClick={this.toggleCollapsed} to="/">Торговля</Link>
            </Menu.Item>
            <Menu.Item disabled={!this.props.isLoggedIn} className={window.location.pathname.indexOf("news") !== -1 ? "ant-menu-item-active" : ""}  key="news">
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.toggleCollapsed} to="/news">Новости</Link>
            </Menu.Item>
            {!this.state.smallScreen && <Menu.Item disabled={!this.props.isLoggedIn} className={window.location.pathname === "/stocks" ? "ant-menu-item-active" : ""}  key="stocks">
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.toggleCollapsed} to="/stocks">Хранение</Link>
            </Menu.Item>}
            {!this.state.smallScreen && <Menu.Item disabled={!this.props.isLoggedIn} className={window.location.pathname === "/transport" ? "ant-menu-item-active" : ""}  key="trans">
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.toggleCollapsed} to="/transport">Транспортировка</Link>
            </Menu.Item>}
            {/*<Menu.Item disabled={!this.props.isLoggedIn}  key="services">
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.toggleCollapsed} to="/services">Сопутствующие услуги</Link>
            </Menu.Item>*/}
            <Menu.Item key="companies" className={window.location.pathname === "/companies" ? "ant-menu-item-active" : ""}>
              <Link onClick={this.toggleCollapsed} to="/companies">Компании участники</Link>
            </Menu.Item>
          </Menu>
          <a href="/" className="ml1 hide_menu-btn header-logo"></a>
        </div>
        <a href="/" className="hide_menu-mb header-logo"></a>
        <div className="flex justify_between" style={this.state.menuBtnScreen ? {} : {width : "100%"}}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="header-menu hide_menu-mb show_menu">
            <Menu.Item key="dashboard" className={window.location.pathname === "/" ? "ant-menu-item-active ant-menu-item-selected" : "ant-menu-item-disActive ant-menu-item-disSelected"}>
              <Link to="/">Торговля</Link>
            </Menu.Item>
            <Menu.Item key="news" disabled={!this.props.isLoggedIn} className={window.location.pathname.indexOf("news") !== -1 ? "ant-menu-item-active ant-menu-item-selected" : "ant-menu-item-disActive ant-menu-item-disSelected"}>
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.handleShowLogin} to="/news">Новости</Link>
            </Menu.Item>
            {!this.state.smallScreen && <Menu.Item key="stocks" disabled={!this.props.isLoggedIn} className={window.location.pathname === "/stocks" ? "ant-menu-item-active ant-menu-item-selected" : "ant-menu-item-disActive ant-menu-item-disSelected"}>
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.handleShowLogin} to="/stocks">Хранение</Link>
            </Menu.Item>}
            {!this.state.smallScreen && <Menu.Item key="trans" disabled={!this.props.isLoggedIn} className={window.location.pathname === "/transport" ? "ant-menu-item-active ant-menu-item-selected" : "ant-menu-item-disActive ant-menu-item-disSelected"}>
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.handleShowLogin} to="/transport">Транспортировка</Link>
            </Menu.Item>}
            {/*<Menu.Item key="services" disabled={!this.props.isLoggedIn} >
              {!this.props.isLoggedIn && <div className="under_dis_link" onClick={this.handleShowLogin} /> }
              <Link onClick={this.handleShowLogin} to="/services">Сопутствующие услуги</Link>
            </Menu.Item>*/}
            <Menu.Item key="companies" className={window.location.pathname === "/companies" ? "ant-menu-item-active ant-menu-item-selected" : "ant-menu-item-disActive ant-menu-item-disSelected"}>
              <Link to="/companies">Компании участники</Link>
            </Menu.Item>
          </Menu>
          <div className="header-controls">
            {/* <Dropdown overlay={langMenu}>
              <span className="header-dropdown-item">рус</span>
            </Dropdown> */}
            {
              this.props.isLoggedIn ? (
                <Dropdown overlay={menu}>
                  <span className="header-dropdown-item">
                    Личный кабинет
                  </span>
                </Dropdown>
            ) : (
              <div>
                {!this.state.smallScreen && <Link className="header-link" to="/about" >О платформе</Link>}
                <a onClick={this.handleShowLogin} className="header-link">Логин</a>
                {!this.state.smallScreen && <a onClick={this.handleShowRegister} className="header-link">Регистрация</a>}
                <Modal
                  visible={this.state.showLogin}
                  title={<h2 className="fm-RobotoBold fs-18 black-text">Авторизация</h2>}
                  className="add-modal"
                  width={500}
                  onCancel={this.handleCancelLogin}
                >
                  <LoginModal />
                </Modal>
                <Modal
                  visible={this.state.showRegister}
                  title={<h2 className="fm-RobotoBold fs-18 black-text">Регистрация</h2>}
                  className="add-modal"
                  width={1000}
                  onCancel={this.handleCancelRegister}
                >
                  <WrappedRegistrationForm
                    registrationSubmit = { (submitRegistration) => this.registrationSubmit(submitRegistration)}
                    registrationCancel = { (cancelRegistration) => this.registrationCancel(cancelRegistration)}
                  />
                </Modal>
                <Modal
                  visible={this.state.showError}
                  title={<h2 className="fm-RobotoBold fs-18 black-text">Ошибка</h2>}
                  className="add-modal"
                  width={500}
                  onCancel={this.handleCancelError}
                >
                  <ErrorModal clickError={this.handleCancelError} />
                </Modal>
              </div>
            )}
          </div>
        </div>
      </Header>
    )
  }

}
 
const mapStateToProps=(state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isRegisterCompleted: state.auth.isRegisterCompleted,
  user: state.user.user,
  countChat : state.chat.countChat,
  temp_id: state.auth.temp_id
})

const mapDispatchToProps={
  logout: authActions.logout,
  onGetCountChat : chatActions.getCountChats,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HeaderWrapper));
