import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Select, Form, DatePicker, TimePicker } from 'antd';

import * as dashboardActions from "../actions/dashboardActions";

const FormItem = Form.Item;
const Option = Select.Option;

class DemandModal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
		return(
      <div>
        <Row gutter={24}>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem label="Наименование товара:">
              <span></span>  
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Единица измерения">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Цена:">

            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Кол-во в наличии">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Производство">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Стандарт качества:">
              
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              label="Наименование поставщика:">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Условия поставки">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              label="Регион">
              
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24}>
        
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              className="fm-RobotoRegular fs-14 black-text"
              label="Название станции:">
              
            </FormItem>
          </Col>
        </Row>
        <Row gutter={24} className="mt2">
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <FormItem
              label="Наименование склада:">
              
            </FormItem>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <p className="fm-RobotoRegular fs-14 black-text mb2">
              Дата и время публикации»
            </p>
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                <FormItem className="fm-RobotoRegular fs-14 black-text">
                  
                </FormItem>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                <FormItem className="fm-RobotoRegular fs-14 black-text">
                  
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <p className="fm-RobotoRegular fs-14 black-text mb2">
              Срок действия предложения до
            </p>
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                <FormItem className="fm-RobotoRegular fs-14 black-text">
                  
                </FormItem>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                <FormItem className="fm-RobotoRegular fs-14 black-text">
                  
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={24} className="mt2">
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <Button 
              className="btn btn-block btn-blue fm-RobotoMedium fs-15"
              >
                Приобрести
              </Button>
          </Col>
          <Col xl={8} lg={8} md={8} sm={24} xs={24} >
            <Button
              className="btn btn-block btn-blue fm-RobotoMedium fs-15"
              key="back">
                Отмена
            </Button>
          </Col>
        </Row>
		  </div>
	  );
	}
}

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  producerList: state.resource.producerList,
  tradesmanList: state.company.tradesmanList,
  storehouseList: state.company.storehouseList,
  stationList: state.company.stationList,
  regions: state.profile.regions,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onAddDemand: dashboardActions.addDemand,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DemandModal);
