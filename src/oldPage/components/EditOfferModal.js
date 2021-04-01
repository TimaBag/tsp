import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button,Select,Form,Modal,DatePicker,Icon,notification,InputNumber } from 'antd';
// import PropTypes from 'prop-types';
// import _ from 'lodash';
import moment from 'moment';

import * as dashboardActions from "../actions/dashboardActions";
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import '../styles/Dashboard.css';

const FormItem = Form.Item;
const Option = Select.Option;

class AddOfferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer_id : this.props.offers.id,
      price: this.props.offers.price,
      region: this.props.offers.region,
      volume: this.props.offers.volume,
      station: this.props.offers.station,
      resource: this.props.offers.resource,
      storehouse: this.props.offers.storehouse,
      metric_unit: this.props.offers.metric_unit,
      tradesman_user: this.props.userProfile.user,
      datetime_expire: moment(this.props.offers.datetime_expire),
      // delivery_date_to: this.props.offers.price,
      quality_standard_obj: this.props.offers.quality_standard_obj,
      delivery_conditions_obj: this.props.offers.delivery_conditions_obj,
      production_place_obj: this.props.offers.production_place_obj,

      quality_passport: this.props.offers.quality_passport,
      conformity_certificate: this.props.offers.conformity_certificate,
      document1: this.props.offers.document1,
      document2: this.props.offers.document2,
      document3: this.props.offers.document3,

      deliveryInfo: this.props.offers.deliveryInfo,
      showDoc : false,
      fileUrl  : null,
    }
  }
  componentWillMount() {
    this.props.onGetRoleList();
    this.props.onGetRegionList();
    this.props.onGetCategoryList();
    this.props.onGetResourceList();
    this.props.onGetProducerList();
    this.props.onGetMeasureList();
    this.props.onGetStationList();
    this.props.onGetCompanyTypes();
    this.props.onGetDocumentTypes();
    this.props.onGetCompanySegments();
    this.props.onGetStorehouseList();
    this.props.onGetStandardList();
    this.props.onGetDeliveryCons();
    this.props.isLoggedIn && this.props.onGetTradesmanList();
  }
  handleOfferClick = () => {
    let data = new FormData();
    data.append("price", this.state.price);
    data.append("show", true);
    data.append("region", this.state.region);
    data.append("volume", this.state.volume);
    data.append("station", this.state.station);
    data.append("resource", this.state.resource);
    data.append("storehouse", this.state.storehouse);
    data.append("metric_unit", this.state.metric_unit);
    data.append("tradesman_user", this.state.tradesman_user);
    (this.state.datetime_expire !== null) && data.append("datetime_expire", moment(this.state.datetime_expire).format("YYYY-MM-DDThh:mm"));
    // (this.state.delivery_date_to !== null) && data.append("delivery_date_to", this.state.delivery_date_to);
    data.append("quality_standard_obj", this.state.quality_standard_obj);
    data.append("delivery_conditions_obj", this.state.delivery_conditions_obj);
    data.append("production_place_obj", this.state.production_place_obj);

    (this.state.quality_passport !== null && this.state.quality_passport !== this.props.offers.quality_passport) && data.append("quality_passport", this.state.quality_passport);
    (this.state.conformity_certificate !== null && this.state.conformity_certificate !== this.props.offers.conformity_certificate) && data.append("conformity_certificate", this.state.conformity_certificate);
    (this.state.document1 !== null && this.state.document1 !== this.props.offers.document1) && data.append("document1", this.state.document1);
    (this.state.document2 !== null && this.state.document2 !== this.props.offers.document2) && data.append("document2", this.state.document2);
    (this.state.document3 !== null && this.state.document3 !== this.props.offers.document3) && data.append("document3", this.state.document3);
    this.props.onEditOffer(data,this.props.offers.id);
    this.props.editOfferModal();
    this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      if(this.state.quality_passport === null) {
        notification.error({
          message: 'Ошибка',
          description: 'Вы не загрузили документ "Паспорт качества"',
        });
        return;
      }
      this.handleOfferClick();
    });
  }
  cancelOfferModal(){
    this.props.cancelEditOffer();
  }
  handleChange(selectorFiles, name) {
    switch(name){
      case "conformity_certificate":
        this.setState({
          conformity_certificate : selectorFiles[0]
        })
      break;
      case "quality_passport":
        this.setState({
          quality_passport : selectorFiles[0]
        })
      break;
      case "document1":
        this.setState({
          document1 : selectorFiles[0]
        })
      break;
      case "document2":
        this.setState({
          document2 : selectorFiles[0]
        })
      break;
      case "document3":
        this.setState({
          document3 : selectorFiles[0]
        })
      break;
      default:
        break;
    }
  }
  handleClickShowDoc = (url) => {
    this.setState({
      fileUrl : url,
      showDoc : true,
    })
  }
  handleCloseDoc = () => {
    this.setState({
      showDoc : false
    })
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
  handleSelectDate = (e) => {
    let date = moment(e).utc().format();
    this.setState({ datetime_expire: date })
  }
  // handleSelectPeriod = (e) => {
  //   let date = moment(e).utc().format();
  //   this.setState({
  //     delivery_date_to: date,
  //   })
  // }
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
    // const periodConfig = {
    //   rules: [{ type: 'object', required: true, message: 'Пожалуйста введите период' }],
    //   onChange: (e) => this.handleSelectPeriod(e)
    // };
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
                  onChange: (e) => this.handleSelectResource(e),
                  initialValue: this.props.offers.resource,
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
                  initialValue: this.props.offers.metric_unit,
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
                    initialValue: this.props.offers.price,
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
                label="Кол-во в наличии"
              >
                {getFieldDecorator('volume', {
                  rules: [{required: true, message: 'Пожалуйста введите Кол-во в наличии'}],
                  initialValue: this.props.offers.volume,
                  onChange: (e) => this.handleEnterVolume(e)
                })(
                  <InputNumber min={1} placeholder="Кол-во в наличии" style={{ width: '100%' }} />
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
                  initialValue: this.props.offers.production_place_obj,
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
                {getFieldDecorator('quality_standard', {
                  rules: [],
                  initialValue: this.props.offers.quality_standard_obj,
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
              <FormItem
                label="Наименование поставщика:">
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
                    initialValue: this.props.offers.delivery_conditions_obj,
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
                    disabled={this.props.offers.delivery_conditions_obj === null}
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
                  initialValue: this.props.offers.region,
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
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Название станции:">
                {getFieldDecorator('station_name', {
                  rules: [{required: true, message: 'Пожалуйста введите название станции.'}],
                  initialValue: this.props.offers.station,
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
                  initialValue: this.props.offers.storehouse,
                  onChange: (e) => this.handleSelectStorehouse(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите склад"
                    disabled={this.props.offers.region === null}>
                    {storehouseItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Срок действия предложения до:"
                className="fm-RobotoRegular fs-14 black-text">
                {getFieldDecorator('datetime', dateConfig)(
                  <DatePicker placeholder="гггг-мм-дд" />
                )}
              </FormItem>
            </Col>
          </Row>
          {/* <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Период поставки:"
                className="fm-RobotoRegular fs-14 black-text">
                {getFieldDecorator('period', periodConfig)(
                  <DatePicker placeholder="гггг-мм-дд" />
                )}
              </FormItem>
            </Col>
          </Row> */}

          <h2 className="fm-RobotoBold fs-18 black-text mt3 mb2">ДОКУМЕНТЫ</h2>
          <div className="flex mb3">
            <div className="add-doc">
              <div className={(this.state.quality_passport === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="quality_passport"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Паспорт качества
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.conformity_certificate === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="conformity_certificate"
                  onChange={ (e) => this.handleChange(e.target.files, e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Сертификат соответствия
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document1 === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="document1"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ 1
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document2 === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="document2"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ 2
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document3 === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="document3"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ 3
              </p>
            </div>
          </div>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit"
                >Сохранить</Button>
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
        <Modal
          title="Basic Modal"
          visible={this.state.showDoc}
          onOk={this.handleCloseDoc}
          onCancel={this.handleCloseDoc}
        >
          <iframe title="doc-iframe" className="doc" src={"https://docs.google.com/gview?url="+this.state.fileUrl+"&embedded=true"}></iframe>
        </Modal>
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
  standardList: state.company.standardList,
  deliveryCons: state.company.deliveryCons,
  regions: state.profile.regions,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onEditOffer: dashboardActions.editOffer,
  onGetProfile: profileActions.getCompanyProfile,
  onGetRoleList: profileActions.getRoles,
  onGetRegionList: profileActions.getRegions,
  onGetCategoryList: resourceActions.getCategories,
  onGetResourceList: resourceActions.getResources,
  onGetProducerList: resourceActions.getProducers,
  onGetMeasureList : resourceActions.getMeasureList,
  onGetTradesmanList: companyActions.getTradesmanList,
  onGetStorehouseList: companyActions.getStorehouseList,
  onGetStationList: companyActions.getStationList,
  onGetCompanyTypes: companyActions.getCompanyTypes,
  onGetDocumentTypes: companyActions.getDocumentTypes,
  onGetCompanySegments: companyActions.getCompanySegments,
  onGetStandardList: companyActions.getStandardList,
  onGetDeliveryCons: companyActions.getDeliveryCons,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedOfferForm);
