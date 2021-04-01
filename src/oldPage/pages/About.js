import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row,
          Col,
          Input,
          Card,
          Button,
          Divider } from 'antd';
import * as aboutActions from "../actions/aboutActions";
import '../styles/About.css';

const { TextArea } = Input;

class About extends Component {

  constructor(props){
    super(props);
    this.state = {
      error: "",
      email: "",
      msg : "",
    }
  }

  handleClickMsg = () => {
    this.inputEmail.focus();
  }

  handleChangeEmail = (event) => {
    if(event.target.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.setState({
        email: event.target.value,
        error: ""
      });
    }else{
      this.setState({
        email: event.target.value,
        error: "Неправильный формат"
      });
    }
  }

  handleChangeMsg = (event) => {
    this.setState({msg: event.target.value});
  }

  handleSend = () => {
    if(this.state.email.length !== 0){
      this.setState({
        error : ""
      });
      if(this.state.msg.length !== 0){
        let data = {
          email : this.state.email,
          message : this.state.msg,
        }
        this.props.onFeedback(data);
        this.setState({
          error : "",
        })
      }else{
        this.setState({
          error : "Напишите ваше сообщения"
        })
      }
    }else{
      this.setState({
        error : "Напишите свою почту"
      })
    }
  }

	render(){
		return(
		  <div>
		    <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={<h2 className="fm-RobotoBold fs-14">О ПЛАТФОРМЕ</h2>}
              className="about-card"
              bodyStyle={{ padding: 20, paddingTop: 0 }}
            >
              <div className="about-head">
                <span className="about-logo blue-text">TRADEHOUSE.KZ</span>
                <p className="fm-RobotoRegular black-text fs-15 mt3 mb1">Найти нас в соц.сетях:</p>
                <div className="socials flex item-cnt">
                  <span className="vimeo_logo"></span>
                  <span className="twit_logo"></span>
                  <span className="link_logo"></span>
                  <span className="facebook_logo"></span>
                  <span className="print_logo"></span>
                  <span className="gmail_logo"></span>
                  <span className="insta_logo"></span>
                </div>
              </div>
              <Divider/>
              <div className="about-desc">
                <Row gutter={24}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 ">Часто задаваемые вопросы</Button>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 ml1" onClick={this.handleClickMsg}>Написать сообщения</Button>
                  </Col>
                </Row>
              	<p className="fm-RobotoRegular black-text fs-15 gray-text mb1 mt4">О проекте</p>
              	<p className="fm-RobotoRegular black-text fs-14 black-text gray-block mb2">
              		Платформа, использование которой упрощает оптовый сбыт узкопрофильных товаров на
рынке B2B РК.
              	</p>
              	<p className="fm-RobotoRegular black-text fs-15 gray-text mb1">Цель проекта</p>
              	<p className="fm-RobotoRegular black-text fs-14 black-text gray-block">Цель платформы - предоставить и объединить на одном ресурсе оптовых поставщиков и
потребителей, а также поставщиков и потребителей сопутствующих услуг. Упростить бизнес
процессы между участниками рынка и ускорить нахождение нужных контрагентов. Дать
возможность оптимизации и контроля документооборота, а также возможности подписания
документов при помощи ЭЦП.</p>
              </div>

            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title="НАПИСАТЬ СООБЩЕНИЕ"
              className="about-card"
              bodyStyle={{ padding: 20}}

            >
            	<div className="about_message">
            		<p className="fm-RobotoRegular black-text fs-14">Ваша почта</p>
            		<Input className="mt1 mb2" placeholder="Ваша почта" ref={(input) => { this.inputEmail = input; }} onChange={this.handleChangeEmail} value={this.state.email} />
            		<p className="fm-RobotoRegular black-text fs-14">Введите текст сообщения</p>
            		<TextArea className="mt1" value={this.state.msg} rows={4} onChange={this.handleChangeMsg} />
            	</div>
              <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  {this.state.error.length !== 0  && <p className="mt1 fs-14 fm-RobotoRegular red-text">{this.state.error}</p>}
                  <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15 mt3" onClick={this.handleSend}>Отправить сообщения</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
		  </div>
	  );
	}
}

const mapStateToProps=(state) => ({
})

const mapDispatchToProps = {
  onFeedback : aboutActions.feedback,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
