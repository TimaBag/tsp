import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Select,Form,InputNumber,Radio, } from 'antd';
// import moment from 'moment';

import * as storeActions from "../actions/storeActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import '../styles/Dashboard.css';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddTariffModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: null,
      price: null,
      free_place: null,
      taken_place: null,
      resource: null,
      metric_unit: null,
      storekeeper: null,
      is_percent : false,
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
      volume: null,
      price: null,
      free_place: null,
      taken_place: null,
      resource: null,
      metric_unit: null,
      storekeeper: null,
      is_percent : false,
    })
  }
  handleTariffCreate = () => {
    let data = new FormData();
    var percentPrice;
    if(this.state.is_percent){
      percentPrice = this.state.price/100;
    }else{
      percentPrice = this.state.price;
    }
    data.append("price", percentPrice);
    data.append("volume", this.state.volume);
    data.append("resource", this.state.resource);
    data.append("free_place", this.state.free_place);
    data.append("taken_place", this.state.taken_place);
    data.append("metric_unit", this.state.metric_unit);
    data.append("storekeeper", this.props.userProfile.user);
    data.append("is_percent", this.state.is_percent);

    this.props.onAddTariff(data);
    this.props.submit();
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
    if(this.state.volume !== null && value !== ""){
      this.props.form.setFieldsValue({
        taken_place: this.state.volume - value,
      });
      this.setState({ taken_place: this.state.volume - value });
    }else{
      this.setState({ taken_place : 1})
    }

  }
  handleTakenPlace = (value) => {
    let { volume } = this.state;
    this.setState({ taken_place: value });
    if(volume !== null && value !== ""){
      this.props.form.setFieldsValue({
        free_place: this.state.volume - value,
      });
      this.setState({ free_place : this.state.volume - value });
    }else{
      this.setState({ free_place : 1})
    }
  }

  handleSelectPercentage = (value) => {
    this.setState({
      is_percent : value,
    })
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
                label="Ставка хранения"
              >
                {getFieldDecorator('percent',{
                  rules: [{required: true, message: 'Пожалуйста выберите способ оплаты'}],
                  onChange: (e) => this.handleSelectPercentage(e.target.value)
                })(
                  <RadioGroup>
                    <Radio value={true}>С процентом</Radio>
                    <Radio value={false}>Без процента</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label={this.state.is_percent ? "Размер процента" : "Цена:"}>
                {
                  getFieldDecorator('price', {
                    rules: [{required: true, message: 'Пожалуйста введите цену'}],
                    onChange: (e) => this.handleEnterPrice(e)
                  })(
                    <InputNumber min={0} max={this.state.is_percent ? 100 : Infinity} placeholder="Цена" style={{ width: '100%' }} />
                  )
                }
              </FormItem>
            </Col>

            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Вместительность"
              >
                {getFieldDecorator('volume', {
                  rules: [{required: true, message: 'Пожалуйста введите объем.'}],
                  onChange: (e) => this.handleEnterVolume(e),
                })(
                  <InputNumber min={1} placeholder="Объем" style={{ width: '100%' }} />
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
                  onChange: (e) => this.handleFreePlace(e),
                })(
                  <InputNumber min={1} placeholder="Объем" style={{ width: '100%' }} />
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
                  onChange: (e) => this.handleTakenPlace(e),
                })(
                  <InputNumber min={1} placeholder="Объем" style={{ width: '100%' }} />
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
          </Row>
        </Form>
      </div>
	  );
	}
}

const WrappedTariffForm = Form.create()(AddTariffModal);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onAddTariff: storeActions.addTariff,
  onGetProfile: profileActions.getCompanyProfile,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedTariffForm);
