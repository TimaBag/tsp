import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button,Modal } from 'antd';
import * as authActions from "../actions/authActions";
import "../styles/Login.css";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email  : '',
      openForget : false
    }
    this.handleForgetPassword = this.handleForgetPassword.bind(this);
    this.handleOpenForget = this.handleOpenForget.bind(this);
    this.handleCloseForget = this.handleCloseForget.bind(this);
  }
  componentWillMount() {
  }
  handleEnterUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  }
  handleEnterPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }
  handleClickLogin = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.onClickLogin(data);
  }
  handleOpenForget(){
    this.setState({
      openForget : true
    })
  }
  handleCloseForget(){
    this.setState({
      openForget : false
    })
  }
  handleEnterEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }
  handleForgetPassword(){
    let data = {
      email : this.state.email,
    }
    if(this.state.email.length.length !== 0){
      this.props.onForget(data);
    }
    this.setState({
      openForget : false
    })
  }
  loading() {
    if (this.props.isLoading) {
      return (<div>loading</div>)
    } else {
      return null;
    }
  }

	render() {
		return(
      <div>
		    <Row gutter={12}>
          <Col md={24}>
            <h2 className="fm-RobotoBold fs-18 black-text">ВХОД</h2>
            <p className="fm-RobotoRegular fs-14">ID Пользователя:</p>
            <Input placeholder="ID Пользователя"
              value={this.state.username}
              onChange={this.handleEnterUsername}
            />
            <p className="fm-RobotoRegular fs-14 mt3">Пароль:</p>
            <Input placeholder="Пароль" type="password"
              value={this.state.password}
              onChange={this.handleEnterPassword}
              onPressEnter={this.handleClickLogin}
            />
            <a className="blue-text fm-RobotoMedium fs-14 txt-center el-block my2" onClick={this.handleOpenForget}>Забыли пароль?</a>
            <Button
              loading={this.props.isLoading}
              className="btn btn-block btn-blue fm-RobotoMedium fs-15"
              onClick={this.handleClickLogin}>Вход в систему</Button>
            <p className="txt-center fm-RobotoRegular fs-13 mt2">При входе в систему я соглащаюсь с <a className="blue-text">Условиями использования</a></p>
          </Col>
        </Row>
        <Modal
          visible={this.state.openForget}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Забыли пароль</h2>}
          className="add-modal"
          width={500}
          onOk={this.handleForgetPassword}
          onCancel={this.handleCloseForget}
        >
          <Input placeholder="Почта"
            onChange={this.handleEnterEmail}
          />   
          <Button 
            className="btn btn-block btn-blue fm-RobotoMedium fs-15 mt1"
            onClick={this.handleForgetPassword}>Отправить</Button>
        </Modal>
		  </div>
	  );
	}
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoggingIn,
  errorMessage: state.auth.errorMessage
})

const mapDispatchToProps = {
  onClickLogin: authActions.login,
  onForget : authActions.forgetPassowrd,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
