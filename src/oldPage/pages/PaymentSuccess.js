import React, { Component } from 'react';
import {  Row,
          Col,
          Card,
          Button } from 'antd';

class AccountBank extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    setInterval(this.goToHome,5000);
  }

  goToHome(){
    window.location = "http://www.tradehouse.kz/";
  }

	render(){
		return(
		  <div>
		    <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              className="account-card"
              bodyStyle={{ padding: 20}}
            >
              <h2 className="fm-RobotoMedium fs-18 black-text mb1 txt-center">Спасибо, мы получили вашу оплату и скоро активируем ваш аккаунт!</h2>
              <Row gutter={24} className="mt2 mb-block">
                <Col xl={4} lg={4} md={4} sm={24} xs={24} offset={16}>
                  <Button className=" btn btn-block btn-blue fm-RobotoMedium fs-15" onClick={this.goToHome}>Назад</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
		  </div>
	  );
	}
}

export default AccountBank;
