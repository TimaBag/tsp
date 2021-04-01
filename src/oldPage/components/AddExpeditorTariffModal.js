import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Select,Form,InputNumber } from 'antd';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
// import moment from 'moment';

import * as expeditorActions from "../actions/expeditorActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import '../styles/Dashboard.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddExpeditorTariffModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "volume": null,
      "price": null,
      "distance_from": null,
      "distance_to": null,
      "region": null,
      "resource": null,
      "metric_unit": null,
      "expeditor": null
    }
  }
  componentWillMount() {
    this.props.onGetResourceList();
    this.props.onGetMeasureList();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.offerCreated !== undefined && nextProps.offerCreated){
      this.clearForm();
    }
  }
  clearForm = () => {
    this.props.form.resetFields();
    this.setState ({
      "volume": null,
      "price": null,
      "distance_from": null,
      "distance_to": null,
      "region": null,
      "resource": null,
      "metric_unit": null,
      "expeditor": null
    })
  }
  handleTariffCreate = () => {
    let data = new FormData();

    data.append("price", this.state.price);
    data.append("volume", this.state.volume);
    data.append("resource", this.state.resource);
    data.append("region", this.state.region);
    data.append("distance_to", this.state.distance_to);
    data.append("distance_from", this.state.distance_from);
    data.append("metric_unit", this.state.metric_unit);
    data.append("expeditor", this.props.userProfile.user);

    this.props.onAddTariff(data);
    this.props.offerCancel(true);
    this.clearForm();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.handleTariffCreate();
    });
  }
  // cancelOfferModal(){
  //   this.clearForm();
  //   this.props.offerCancel(true);
  // }
  handleEnterPrice = (value) => {
    this.setState({ price: value });
  }
  handleSelectResource = (value) => {
    this.setState({ resource: value });
  }
  handleSelectMeasure = (value) => {
    this.setState({ metric_unit: value });
  }
  handleEnterVolume = (value) => {
    this.setState({ volume: value });
  }
  handleDistanceFrom = (value) => {
    this.setState({ distance_from: parseInt(value, 10) });
  }
  handleDistanceTo = (value) => {
    this.setState({ distance_to: parseInt(value, 10) });
  }
  handleSelectRegion = (value) => {
    this.setState({ region: parseInt(value, 10) });
  }

	render() {
    const { getFieldDecorator } = this.props.form;
    const resourceItems = this.props.resourceList.map((resource) =>
      <Option value={resource.id} key={resource.id}>
        {resource.name}
      </Option>
    );
    const measureItems = this.props.measureList.map((measure) =>
      <Option value={measure.id} key={measure.id}>
        {measure.name}
      </Option>
    );

    const regionItems = this.props.regions.map((region) =>
      <Option value={region.id} key={region.id}>
        {region.name}
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
                label="Объем"
              >
                {getFieldDecorator('volume', {
                  rules: [{required: true, message: 'Пожалуйста введите требуемое количество'}],
                  onChange: (e) => this.handleEnterVolume(e),
                })(
                  <InputNumber min={1} placeholder="Требуемое количество" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>

            <Col xl={12} lg={12} md={12} sm={24} xs={24} >
              <FormItem
                label="Регион"
                hasFeedback
              >
                {getFieldDecorator('region', {
                  rules: [{ required: true, message: 'Выберите регион' },],
                  onChange: (e) => this.handleSelectRegion(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите регион">
                    {regionItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Расстояние от(км)"
              >
                {getFieldDecorator('distance_from', {
                  rules: [],
                  onChange: (e) => this.handleDistanceFrom(e)
                })(
                  <InputNumber min={1} placeholder="Расстояние от(км)" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Расстояние до(км)"
              >
                {getFieldDecorator('distance_to', {
                  rules: [{required: true, message: 'Пожалуйста введите Расстояние до(км)'}],
                  onChange: (e) => this.handleDistanceTo(e),
                })(
                  <InputNumber min={1} placeholder="Расстояние до(км)" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit">Добавить</Button>
            </Col>
            {/* <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-outside fm-RobotoMedium fs-15 black-text"
                key="back"
                onClick={this.handleCancelTariffModal}>
                Отмена
              </Button>
            </Col> */}
          </Row>
        </Form>
      </div>
	  );
	}
}

const WrappedTariffForm = Form.create()(AddExpeditorTariffModal);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
  regions: state.profile.regions,
})

const mapDispatchToProps = {
  onAddTariff: expeditorActions.addExpeditorTariff,
  onGetProfile: profileActions.getCompanyProfile,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTariffForm);
