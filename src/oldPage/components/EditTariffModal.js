import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Select,Form,InputNumber } from 'antd';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
// import moment from 'moment';

import * as storeActions from "../actions/storeActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import '../styles/Dashboard.css';

const FormItem = Form.Item;
const Option = Select.Option;

class EditTariffModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tariff_id : this.props.tariffs.id,
      volume: this.props.tariffs.volume,
      price: this.props.tariffs.price,
      free_place: this.props.tariffs.free_place,
      taken_place: this.props.tariffs.taken_place,
      resource: this.props.tariffs.resource,
      metric_unit: this.props.tariffs.metric_unit,
      storekeeper: this.props.tariffs.storekeeper,
    }
  }
  componentWillMount() {
    this.props.onGetResourceList();
    this.props.onGetMeasureList();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.offerCreated !== undefined && nextProps.offerCreated){
    }
  }
  clearForm = () => {
    this.props.form.resetFields();
    this.setState ({
      volume: null,
      price: null,
      free_place: null,
      taken_place: null,
      resource: null,
      metric_unit: null,
      storekeeper: null,
    })
  }
  handleTariffEdit = () => {
    let data = {
      tariff_id : this.state.tariff_id,
      "price" : this.state.price,
      "volume" : this.state.volume,
      "resource" : this.state.resource,
      "free_place" : this.state.free_place,
      "taken_place" : this.state.taken_place,
      "metric_unit" : this.state.metric_unit,
      "storekeeper" : this.props.userProfile.user,
    }
    this.props.onEditTariff(data);
    this.props.submit();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      this.handleTariffEdit();
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
  handleFreePlace = (value) => {
    this.setState({ free_place: value });
  }
  handleTakenPlace = (value) => {
    this.setState({ taken_place: value });
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
                label="Объем"
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
                label="Свободное место"
              >
                {getFieldDecorator('free_place', {
                  rules: [],
                  initialValue: this.state.free_place,
                  onChange: (e) => this.handleFreePlace(e)
                })(
                  <InputNumber min={1} placeholder="Требуемое количество" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Занятое место"
              >
                {getFieldDecorator('taken_place', {
                  rules: [],
                  initialValue: this.state.taken_place,
                  onChange: (e) => this.handleTakenPlace(e)
                })(
                  <InputNumber min={1} placeholder="Требуемое количество" style={{ width: '100%' }} />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit">Редактировать</Button>
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

const WrappedTariffForm = Form.create()(EditTariffModal);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onEditTariff: storeActions.editTariff,
  onGetProfile: profileActions.getCompanyProfile,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTariffForm);
