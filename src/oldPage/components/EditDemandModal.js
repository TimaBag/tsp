import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Select,Form,Modal,DatePicker,InputNumber } from 'antd';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import moment from 'moment';

import * as dashboardActions from "../actions/dashboardActions";

const FormItem = Form.Item;
const Option = Select.Option;

class AddDemandModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demand_id : this.props.demands.id,
      price: this.props.demands.price,
      region: this.props.demands.region,
      volume: this.props.demands.volume,
      station: this.props.demands.station,
      resource: this.props.demands.resource,
      storehouse: this.props.demands.storehouse,
      show: true,
      metric_unit: this.props.demands.metric_unit,
      tradesman_user: this.props.userProfile.user,
      datetime_expire: moment(this.props.demands.datetime_expire),
      production_place_obj: this.props.demands.production_place_obj,
      quality_standard_obj: this.props.demands.quality_standard_obj,
      delivery_conditions_obj: this.props.demands.delivery_conditions_obj,
      deliveryInfo: this.props.demands.deliveryInfo,

    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.demandCreated !== undefined && nextProps.demandCreated){
      // this.clearForm();
    }
  }
  clearForm = () => {
    this.props.form.resetFields();
  }
  handleDemandClick = () => {
    let data = {
      demand_id : this.state.demand_id,
      price: this.state.price,
      region: this.state.region,
      volume: this.state.volume,
      station: this.state.station,
      resource: this.state.resource,
      storehouse: this.state.storehouse,
      show: this.state.show,
      metric_unit: this.state.metric_unit,
      tradesman_user: this.state.tradesman_user,
      datetime_expire: this.state.datetime_expire,
      production_place_obj: this.state.production_place_obj,
      quality_standard_obj: this.state.quality_standard_obj,
      delivery_conditions_obj: this.state.delivery_conditions_obj,
      deliveryInfo: this.state.deliveryInfo,
    }
    this.props.onEditDemand(data);
    this.clearForm();
    this.props.editDemandModal()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.handleDemandClick();
    });
  }
  cancelDemandModal(){
    this.clearForm();
    this.props.editDemandCancel();
  }

  handleSelectDelivery = (value) => {
    let selectedItem = this.props.deliveryCons.filter((del) =>
      del.id === value
    )[0];
    this.setState({
      delivery_conditions_obj: value,
      deliveryInfo: selectedItem
    });
  }
  handleEnterVolume = (value) => {
    this.setState({ volume: value });
  }
  handleEnterPrice = (value) => {
    this.setState({ price: value });
  }
  handleSelectStandard = (value) => {
    this.setState({ quality_standard_obj: value });
  }
  handleSelectProdPlace = (value) => {
    this.setState({ production_place_obj: value });
  }
  handleSelectStation = (value) => {
    this.setState({ station: value });
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
  handleSelectDate = (e) => {
    let date = moment(e).utc().format();
    this.setState({ datetime_expire: date })
  }
  handleShowDelivery() {
    Modal.info({
      title: this.state.deliveryInfo.code,
      content: (
        <div>
          <p>{this.state.deliveryInfo.name}</p>
        </div>
      ),
      onOk() {},
    });
  }

	render() {
    const { getFieldDecorator } = this.props.form;
    const dateConfig = {
      rules: [{ type: 'object', required: true, message: 'Пожалуйста введите дату' }],
      onChange: (e) => this.handleSelectDate(e),
      initialValue: moment(this.state.datetime_expire),
    };
    const storehouseItems = this.props.storehouseList.map((store) =>{
      if(this.state.region !== null && store.region === this.state.region)
        return (<Option value={store.id} key={store.id}>
          {store.name}
        </Option>)
      return null;
    });
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
    const standardItems = this.props.standardList.map((st) =>
      <Option value={st.id} key={st.id}>
        {st.name}
      </Option>
    );
    const deliveryItems = this.props.deliveryCons.map((del) =>
      <Option value={del.id} key={del.id}>
        {del.code}
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
                  initialValue: this.state.resource,
                  onChange: (e) => this.handleSelectResource(e)
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
                  initialValue: this.state.metric_unit,
                  onChange: (e) => this.handleSelectMeasure(e)
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
                    initialValue: this.state.price,
                    onChange: (e) => this.handleEnterPrice(e)
                  })(
                    <InputNumber min={0} placeholder="Цена" style={{ width: '100%' }} />
                  )
                }
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Требуемое количество"
              >
                {getFieldDecorator('volume', {
                  rules: [{required: true, message: 'Пожалуйста введите требуемое количество'}],
                  initialValue: this.state.volume,
                  onChange: (e) => this.handleEnterVolume(e),
                })(
                  <InputNumber min={1} placeholder="Требуемое количество" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Производство"
              >
                {getFieldDecorator('production_place_obj', {
                  rules: [],
                  initialValue: this.state.production_place_obj,
                  onChange: (e) => this.handleSelectProdPlace(e)
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
                {getFieldDecorator('quality_standard_obj', {
                  rules: [],
                  initialValue: this.state.quality_standard_obj,
                  onChange: (e) => this.handleSelectStandard(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите стандарт">
                    {standardItems}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem label="Наименование потребителя:">
                <b>{this.props.userProfile && this.props.userProfile.company_name} </b>
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Условия поставки"
              >
                <Col span={20}>
                  {getFieldDecorator('delivery_conditions', {
                    rules: [{required: true, message: 'Выберите условия'}],
                    initialValue: this.state.delivery_conditions_obj,
                    onChange: (e) => this.handleSelectDelivery(e)
                  })(
                    <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите условия" style={{ width: '100%' }}>
                      {deliveryItems}
                    </Select>
                  )}
                </Col>
                <Col span={4}>
                  <Button type="primary" shape="circle"
                    className="ml1"
                    icon="file-text"
                    disabled={this.state.delivery_conditions_obj === null}
                    onClick={this.handleShowDelivery.bind(this)}/>
                </Col>
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Регион"
                hasFeedback
              >
                {getFieldDecorator('region', {
                  rules: [{ required: true, message: 'Выберите регион' },],
                  initialValue: this.state.region,
                  onChange: (e) => this.handleSelectRegion(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите регион">
                    {regionItems}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24} className="mt2">

            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Название станции:"
              >
                {getFieldDecorator('station_name', {
                  rules: [{required: true, message: 'Пожалуйста введите название станции.'}],
                  initialValue: this.state.station,
                  onChange: (e) => this.handleSelectStation(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите станцию">
                    {stationItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Наименование склада:"
                hasFeedback>
                {getFieldDecorator('store', {
                  rules: [{ required: true, message: 'Выберите склад' },],
                  initialValue: this.state.storehouse,
                  onChange: (e) => this.handleSelectStorehouse(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите склад"
                    disabled={this.state.region === null}>
                    {storehouseItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Период поставки:"
                className="fm-RobotoRegular fs-14 black-text">
                {getFieldDecorator('datetime', dateConfig)(
                  <DatePicker placeholder="гггг-мм-дд" format="YYYY-MM-DD" />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit">Сохранить</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                key="back"
                onClick={this.cancelDemandModal.bind(this)}
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

const WrappedDemandForm = Form.create()(AddDemandModal);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  producerList: state.resource.producerList,
  tradesmanList: state.company.tradesmanList,
  storehouseList: state.company.storehouseList,
  stationList: state.company.stationList,
  standardList: state.company.standardList,
  deliveryCons: state.company.deliveryCons,
  regions: state.profile.regions,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onEditDemand: dashboardActions.editDemand,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDemandForm);
