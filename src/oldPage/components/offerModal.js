import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button, Select, Form,
DatePicker, TimePicker,Icon } from 'antd';
import PropTypes from 'prop-types';
// import _ from 'lodash';
// import moment from 'moment';

import * as dashboardActions from "../actions/dashboardActions";

import '../styles/Dashboard.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddOfferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      production_place: "",
      region: null,
      delivery_conditions: "",
      quality_standard: "",
      datetime : "",
      station: null,
      metric_unit: null,
      volume: null,
      price: null,
      resource: null,
      tradesman: null,
      storehouse: null,
      document: null,
      sertification: null,
      pasport: null,
    }
  }
  static propTypes = {
    offerSubmit: PropTypes.func.isRequired,
    offerCancel: PropTypes.func.isRequired
  }
  handleDemandClick = () => {
    let data = new FormData();
    data.append("delivery_conditions", this.state.delivery_conditions);
    this.props.onAddOffer(data);
    // this.props.offerSubmit(true);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      // const values = {
      //   'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      //   'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
      // };
      this.handleDemandClick();
    });
  }
  cancelOfferModal(){
    this.props.offerCancel(true);
  }
  handleChange(selectorFiles, name) {
    switch(name){
      case "sertification":
        this.setState({
          sertification : selectorFiles[0]
        })
      break;
      case "pasport":
        this.setState({
          pasport : selectorFiles[0]
        })
      break;
      case "document":
        this.setState({
          document : selectorFiles[0]
        })
      break;
      default:
        break;
    }
  }
  handleEnterDelivery = (event) => {
    this.setState({ delivery_conditions: event.target.value });
  }
  handleEnterVolume = (event) => {
    this.setState({ volume: event.target.value });
  }
  handleEnterPrice = (event) => {
    this.setState({ price: event.target.value });
  }
  handleEnterStandard = (event) => {
    this.setState({ quality_standard: event.target.value });
  }
  handleEnterProdPlace = (event) => {
    this.setState({ production_place: event.target.value });
  }
  handleSelectStation = (event) => {
    this.setState({ station: event });
  }
  handleSelectResource = (value) => {
    this.setState({ resource: value });
  }
  handleSelectMeasure = (value) => {
    this.setState({ metric_unit: value });
  }
  handleSelectRegion = (value) => {
    this.setState({ region: value });
  }
  handleSelectStorehouse = (value) => {
    this.setState({ storehouse: value });
  }

	render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', required: true, message: 'Пожалуйста введите время' }],
    };
    const storehouseItems = this.props.storehouseList.map((store) =>
      <Option value={store.id} key={store.id}>
        {store.name}
      </Option>
    );
    const regionItems = this.props.regions.map((region) =>
      <Option value={region.id} key={region.id}>
        {region.name}
      </Option>
    );
    const resourceItems = this.props.resourceList.map((resource) =>
      <Option value={resource.id} key={resource.id}>
        {resource.name}
      </Option>
    );
    const stationItems = this.props.stationList.map((station) =>
      <Option value={station.id} key={station.id}>
        {station.code} - {station.name}
      </Option>
    );
    const producerItems = this.props.producerList.map((producer) =>
      <Option value={producer.id} key={producer.id}>
        {producer.name}
      </Option>
    );
    const measureItems = this.props.measureList.map((measure) =>
      <Option value={measure.id} key={measure.id}>
        {measure.name}
      </Option>
    );
    

		return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Наименование товара:"
                hasFeedback>
                {getFieldDecorator('resource', {
                  rules: [{ required: true, message: 'Выберите товар' },],
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите товар">
                    {resourceItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Единица измерения">
                {getFieldDecorator('metric_unit', {
                  rules: [{ required: true, message: 'Выберите единицу' },],
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите единицу измерения">
                    {measureItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Цена:">
                {
                  getFieldDecorator('price', {
                    rules: [{required: true, message: 'Пожалуйста введите цену'}],
                    onChange: (e) => this.handleEnterPrice(e)
                  })(
                    <Input type="text" placeholder="Цена" />
                  )
                }
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Кол-во в наличии"
              >
                {getFieldDecorator('volume', {
                  rules: [{required: true, message: 'Пожалуйста введите Кол-во в наличии'}],
                  onChange: (e) => this.handleEnterVolume(e)
                })(
                  <Input type="text" placeholder="Кол-во в наличии" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Производство"
              >
                {getFieldDecorator('production_place_obj', {
                  rules: [{ required: true, message: 'Выберите производство' },],
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите производство">
                    {producerItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Стандарт качества:"
              >
                {getFieldDecorator('quality_standard', { 
                  rules: [{required: true, message: 'Пожалуйста введите стандарт'}],
                  onChange: (e) => this.handleEnterStandard(e)
                })(
                  <Input type="text" placeholder="Введите стандарт" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Наименование поставщика:">
                <Input type="text" value={this.props.profile} />
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Условия поставки"
              >
                {getFieldDecorator('delivery_conditions', {
                  rules: [{required: true, message: 'Пожалуйста напишите условия поставки!'}],
                  onChange: (e) => this.handleEnterDelivery(e)
                })(
                  <Input type="text" placeholder="Введите условия поставки" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Регион"
                hasFeedback
              >
                {getFieldDecorator('region', {
                  rules: [
                    { required: true, message: 'Выберите регион' },
                  ],
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите регион">
                    {regionItems}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Название станции:"
              >
                {getFieldDecorator('station_name', {
                  rules: [{required: true, message: 'Пожалуйста введите название станции.'}],
                  onChange: (e) => this.handleSelectStation(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите станцию">
                    {stationItems}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Наименование склада:"
                hasFeedback
              >
                {getFieldDecorator('store', {
                  rules: [
                    { required: true, message: 'Выберите склад' },
                  ],
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите склад">
                    {storehouseItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <p className="fm-RobotoRegular fs-14 black-text mb2">
                Дата и время публикации»
              </p>
              <Row gutter={24}>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                  >
                    {getFieldDecorator('datetime', config)(
                      <DatePicker placeholder="дд/мм/гг" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                  >
                    {getFieldDecorator('datetime', config)(
                      <TimePicker placeholder="часы/мин" />
                    )}
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
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                  >
                    {getFieldDecorator('datetime', config)(
                      <DatePicker placeholder="дд/мм/гг" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                  >
                    {getFieldDecorator('datetime', config)(
                      <TimePicker placeholder="часы/мин" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </Col>
          </Row>
          <h2 className="fm-RobotoBold fs-18 black-text mt3 mb2">ДОКУМЕНТЫ</h2>
          <div className="flex mb3">
            <div className="add-doc">
              <div className={(this.state.pasport === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="pasport"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Паспорт качества
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.sertification === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="sertification"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Сертификат соответствия
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="document"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="document"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="document"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept=".png, .jpg, .jpeg"
                  type="file" 
                  name="document"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ
              </p>
            </div>
          </div>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button 
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit"
                >Подать Заявку</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                key="back"
                onClick={this.cancelOfferModal.bind(this)}
                >
                Отмена
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
	  );
	}
}

const WrappedOfferForm = Form.create()(AddOfferModal);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  producerList: state.resource.producerList,
  storehouseList: state.company.storehouseList,
  stationList: state.company.stationList,
  regions: state.profile.regions,
  profile: state.profile.companyProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onAddOffer: dashboardActions.addOffer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedOfferForm);
