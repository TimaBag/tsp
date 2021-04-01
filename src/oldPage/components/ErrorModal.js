import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import * as authActions from "../actions/authActions";
import * as profileActions from "../actions/profileActions";
import "../styles/Login.css";

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  handleClickError = () => {
    this.props.clickError();
  }

	render() {
		return(
      <div>
		    <Row gutter={24} type="flex" align="middle">
          <p>Уважаемый Пользователь,  истек срок действия Вашей подписки. Чтобы продолжить использование приложения, просьба продлить подписку.</p>
          <Col lg={6} md={6}>
            <Button
              className="btn btn-block btn-blue fm-RobotoMedium fs-15 mt2"
              onClick={this.handleClickError}>Ок</Button>
          </Col>
          <Col lg={18} md={18}>
            <Button
              href={this.props.payboxUrl.url}
              className="btn btn-block btn-blue fm-RobotoMedium fs-15 mt2"
              >Продлить подписку</Button>
          </Col>
        </Row>
		  </div>
	  );
	}
}

const mapStateToProps = (state) => ({
  payboxUrl: state.profile.payboxUrl,
})

const mapDispatchToProps = {
  onClickLogin: authActions.login,
  onForget : authActions.forgetPassowrd,
  onGetPayboxUrl: profileActions.getPayboxUrl,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
