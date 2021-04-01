import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Input,Button,Form,Card,notification } from 'antd';

import * as authActions from "../actions/authActions";

const FormItem = Form.Item;

class Forget extends Component {
  constructor(props){
    super(props);
    this.state = {
      password : "",
      token : ""
    }

  }
  componentDidMount(){
    this.setState({
      token : this.props.match.params.token
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let data = {
          password : this.state.password,
          token : this.state.token,
        } 
        this.props.onSendForgetPassowrd(data);
        notification.success({
          message: 'Успешно',
          description: 'Ваш пароль изменен перезайдите',
        });
        window.location = "http://www.tradehouse.kz/";
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Не соответствует!');
    } else {
      this.setState({ password : value});
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Card
        bordered={false}
        className="chart-card"
        style={{ marginTop: 35, paddingTop: 0,height: 350 }}>
        <Form onSubmit={this.handleSubmit}>
          <h2 className="fm-RobotoMedium fs-17 light-blue-text mt3">Данные для изменения пароля</h2>
          <div className="btm-border my1"/>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Пароль:"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Пожалуйста введите ваш пароль'
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Подверждение пароля"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Пожалуйста повторите ваш пароль',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit" onClick={this.handleSubmit}>Отправить</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}


const WrappedForgetForm = Form.create()(Forget);

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
  onSendForgetPassowrd: authActions.sendForgetPassowrd,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForgetForm);
