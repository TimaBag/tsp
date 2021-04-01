import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row,Col,Card,Button,Select,Form,DatePicker,InputNumber,Table,Tabs,notification } from 'antd';
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { InfoBox } from  "react-google-maps/lib/components/addons/InfoBox";

import * as dashboardActions from "../actions/dashboardActions";
import * as storeActions from "../actions/storeActions";
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";
import * as contractActions from "../actions/contractActions";

import "../styles/Stocks.css";
// import map from '../images/map.svg';

// const MapSvg = require('../images/map.svg')
// const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const RangePicker = DatePicker.RangePicker;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D.MM.YYYY');
  else return '';
};

// const title_with_search = (
//   <Row gutter={24} className="flex item-cnt">
//     <Col xl={16} lg={16} md={16} sm={24} xs={24}>
//       <h2 className="fm-RobotoBold fs-16 black-text">Выбор услуг</h2>
//     </Col>
//     <Col xl={8} lg={8} md={8} sm={24} xs={24}>
//       <Search
//         placeholder="Поиск"
//         className=""
//         onSearch={value => console.log(value)}
//       />
//     </Col>
//   </Row>
// )

function disabledDate(current) {
  return current < moment().endOf('day');
}

class StocksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: null,
      region: null,
      datetime_expire: null,
      datetime_from: null,
      show: false,
      client: null,
      resource: null,
      metric_unit: null,
      currentStorekeeper: null,
      selectedTariff: null,
      showRegion : false,
      tabKey : "1",
      days : null,

      regionSelected: false,
      resourceSelected: false,
      metricSelected: false
    }
    this.tableColumns = [
      {
        title: 'Номер заявки',
        dataIndex: 'id',
        width: 100,
        render: (text,record) => (
          <p className="fm-RobotoMedium fs-14 black-text">{record.id}</p>
        ),
      },
      {
        title: 'Номенклатура',
        dataIndex: 'resource_verbose',
        width: 100,
        render: (text,record) => (
          <p className="fm-RobotoRegular fs-13 black-text"><span className="fm-RobotoMedium fs-15 flex flex-column">{record.client_company_name_verbose}</span><span> {record.resource_verbose}, {record.volume} {record.metric_unit_verbose}</span></p>
        ),
      },
      {
        title: 'Период',
        dataIndex: 'datetime_expire',
        width: 100,
        render: (text,record) => (
          <p className="fm-RobotoRegular fs-13 black-text">{extractTime(record.datetime_expire)} - {extractTime(record.datetime_from)}</p>
        ),
      },  {
        title: 'Регион нахождения',
        dataIndex: 'region',
        width: 100,
        render: (text,record) => (
          <p className="fm-RobotoRegular fs-13 black-text">{record.region_verbose}</p>
        ),
      },{
        title: '',
        key: 'action',
        width: 100,
        render: (text, record) => (
          <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
            onClick={() => this.handleOpenContract(true, record)}
            disabled={this.props.userProfile.role !== 3}>Откликнуться</Button>
        ),
      }
    ];
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleOpenContract = this.handleOpenContract.bind(this);
    this.handleSelectRegion = this.handleSelectRegion.bind(this);
    this.handleSelectRegionMap = this.handleSelectRegionMap.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  componentDidMount(){
    this.props.onGetDemandStorehouseCard();
  }
  handleSelectRegion(e){
    var currentRegion = this.props.regions.filter(
      (region) => (region.id === e) 
    )[0];
    this.setState({
      region : currentRegion,
      selectedTariff: null,
      currentStorekeeper: null,
      resource: null,
      metric_unit: null,
      currentStorekeeper: null,
      showRegion : false,
      regionSelected: true
    })
    let data = {
      region_id: e,
      type: 'storekeeper'
    }
    this.props.onGetResourceList(data);
    this.props.form.setFieldsValue({
      resource: null,
      currentStorekeeper: null,
      metric_unit: null,
    });
  }
  handleSelectRegionMap(e){
    this.setState({
      region : e,
      selectedTariff: null,
      currentStorekeeper: null,
      showRegion : false,
    })
  }
  handleSelectResource(e){
    this.setState({
      resource : e,
      selectedTariff: null,
      currentStorekeeper: null,
      metric_unit: null,
      resourceSelected: true
    });
    let data = {
      region_id: this.state.region.id,
      resource_id: e,
      type: 'storekeeper'
    }
    this.props.onGetMeasureList(data);
    this.props.form.setFieldsValue({
      currentStorekeeper: null,
      metric_unit: null,
    });
  }
  handleSelectDate(e){
    console.log(e[0].format("YYYY-MM-DD 00:00"),e[1].format("YYYY-MM-DD 00:00"));
    this.setState({
      datetime_expire : e[0].format("YYYY-MM-DD 00:00"),
      datetime_from : e[1].format("YYYY-MM-DD 00:00"),
      days : moment(e[1].format("YYYY-MM-DD 00:00")).diff(moment(e[0].format("YYYY-MM-DD 00:00")), "days")+ 1,
    });
  }
  handleEnterVolume(e){
    this.setState({
      volume : e
    })
  }
  handleSelectMeasure(e){
    this.setState({
      metric_unit : e,
      selectedTariff: null,
      currentStorekeeper: null,
      metricSelected: true
    })
    let data = {
      region_id: this.state.region.id,
      resource_id: this.state.resource,
      metric_unit_id: e
    }
    this.props.onGetStorekeeper(data);
    this.props.form.setFieldsValue({
      currentStorekeeper: null,
    });
  }
  selectTariff() {
    this.props.storekeeper.map((store) => {
      if(this.state.region !== null && this.state.metric_unit !== null && this.state.resource !== null){
        if(store.profile_json !== null && store.tariffs.length > 0){
          store.tariffs.map(t => {
            if ( 
                this.state.metric_unit === t.metric_unit &&
                this.state.resource === t.resource && 
                this.state.region.name === t.region_name) {
                  this.setState({
                    selectedTariff: t
                  })
                }
          })
        }
      }
    });
  }
  handleSelectStorekeeper(value){
    if(value !== 'null') {
      let currStore = this.props.storekeeper.filter(st => st.id === value)[0];
      console.log(currStore)
      this.setState({
        currentStorekeeper: currStore,
      })
      this.props.storekeeper.map((store) => {
        if(this.state.region !== null && this.state.metric_unit !== null && this.state.resource !== null){
          if(store.profile_json !== null && store.tariffs.length > 0){
            store.tariffs.map(t => {
              if ( 
                  this.state.metric_unit === t.metric_unit &&
                  this.state.resource === t.resource && 
                  this.state.region.name === t.region_name) {
                    this.setState({
                      selectedTariff: t
                    })
                  }
            })
          }
        }
      });
    }else {
      this.setState({
        currentStorekeeper: null,
      })
    }
  }
  handleSubmit(){
    if(this.state.currentStorekeeper === null){
      if(this.state.volume === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не выбрали объем',
          });
        }
        else if(this.state.region === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не выбрали регион',
          });
        }
        else if(this.state.resource === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не выбрали товар',
          });
        }
        else if(this.state.metric_unit === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не выбрали единицу измерения',
          });
        }else if(this.state.datetime_expire === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не выбрали время',
          });
        }
        else{
          let data = {
            show: true,
            volume: this.state.volume,
            region: this.state.region.id,
            client: this.props.userProfile.user,
            resource: this.state.resource,
            metric_unit: this.state.metric_unit,
            datetime_expire: this.state.datetime_expire,
            datetime_from : this.state.datetime_from,
          }
          this.props.onAddDemandStorehouseCard(data);
        }
    }else {
      this.handleOpenContract(false, null);
    }
  }
  handleClickCheckRegion = () => {
    if(this.state.region === null) {
      notification.error({
        message: 'Ошибка',
        description: 'Вы не выбрали регион',
      });
    }
  }
  handleOpenContract(respond, demandCard){
    let data = {};
    if(!respond) {
      data = {
        tariff: this.state.selectedTariff.id,
        client: this.props.userProfile.user,
        supplier: this.state.currentStorekeeper.profile_json.user,
      };
    }else {
      data = {
        demand: demandCard.id,
        client: demandCard.client,
        supplier: this.props.userProfile.user,
      };
    }
    this.props.onCreateContract(data);
  }

  handleChangeTab(key){
    this.setState({
      tabKey : key,
    })
  }

  render() {
    console.log(this.state.datetime_expire)
    var center = {
      lat : 49.064677,
      lng : 67.437972
    }
    var zoom = 4;
    var userJson = {};
    if(this.state.currentStorekeeper !== null){
      userJson = this.state.currentStorekeeper.profile_json.user_json;
      zoom = 15;
      center = {
        lat : parseFloat((userJson.latitude !== null)?userJson.latitude.replace(",","."):0),
        lng : parseFloat((userJson.longitude !== null)?userJson.longitude.replace(",","."):0),
      }
    }
    const MapWithAMarkerWithLabel = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: center.lat,lng: center.lng },
      }),
      withStateHandlers(() => ({
        isOpen: false,
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={props.center}
      >
        {this.state.currentStorekeeper && userJson !== null &&
          <Marker
            position={{ 
              lat: parseFloat((userJson.latitude !== null)?userJson.latitude.replace(",","."):0), 
              lng: parseFloat((userJson.longitude !== null)?userJson.longitude.replace(",","."):0) 
            }}
          >
            <InfoBox
              options={{ closeBoxURL: ``, enableEventPropagation: true }}
            >
              <div style={{ backgroundColor: `transparent`, opacity: 0.75, padding: `12px` }}>
                <div style={{ fontSize: `12px`, fontColor: `#000` }}>
                  {this.state.currentStorekeeper.profile_json.user_json.legal_address}
                </div>
              </div>
            </InfoBox>
          </Marker>
        }
        
      </GoogleMap>
    );
    const { getFieldDecorator } = this.props.form;
    const { currentStorekeeper } = this.state;
    const dateConfig = {
      rules: [{ type: 'array', required: true, message: 'Пожалуйста введите дату' }],
      onChange: (e) => this.handleSelectDate(e)
    };
    const storekeeperItems = this.props.storekeeper.map((store) => {
      let tariff = null;
      if(store.profile_json.user_json !== null && store.profile_json.user_json.company_name !== null){
        if(this.state.region !== null && this.state.metric_unit !== null && this.state.resource !== null){
          if(store.profile_json !== null && store.tariffs.length > 0){
            store.tariffs.map(t => {
              if (
                  this.state.metric_unit === t.metric_unit &&
                  this.state.resource === t.resource &&
                  this.state.region.name === t.region_name
                  ) {
                    tariff = t;
                  }
            })
          }
        }
        let storeName = store.profile_json.user_json.company_name;
        return tariff !== null && (<Option value={store.id} key={store.id}>{storeName}</Option>)
      }
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
    const measureItems = this.props.measureList.map((measure) =>
      <Option value={measure.id} key={measure.id}>
        {measure.name}
      </Option>
    );
    console.log(this.state.selectedTariff);
    return (
      <div>
      	<Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="stock_status-card"
              bodyStyle={{ paddingLeft: 20,paddingRight: 20,paddingTop : 0,paddingBottom : 0}}
            >
              <Tabs
                onChange={this.handleChangeTab}
                animated={false}
                className="transport-tabs">
                <TabPane tab="Выбрать склад" key="1">
                  <Form onSubmit={this.handleSubmit} ref={(el) => this.addOfferForm = el}>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                        <MapWithAMarkerWithLabel className="mt1"/>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                        <FormItem
                          label="Регион"
                          hasFeedback
                        >
                          {getFieldDecorator('region', {
                            rules: [{ required: true, message: 'Выберите регион' },],
                            onChange: (e) => this.handleSelectRegion(e),
                            initialValue: this.state.region && this.state.region.id,
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
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <FormItem
                          label="Наименование товара:"
                          hasFeedback>
                          {getFieldDecorator('resource', {
                            rules: [{ required: true, message: 'Выберите товар' },],
                            onChange: (e) => this.handleSelectResource(e),
                            initialValue: this.state.resource,
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите товар" disabled={!this.state.regionSelected}>
                              {resourceItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Единица измерения">
                          {getFieldDecorator('metric_unit', {
                            rules: [{ required: true, message: 'Выберите единицу' },],
                            onChange: (e) => this.handleSelectMeasure(e),
                            initialValue: this.state.metric_unit,
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите единицу измерения" disabled={!this.state.resourceSelected}>
                              {measureItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                        <FormItem
                          label="Наименование склада:"
                          hasFeedback>
                          {getFieldDecorator('store', {
                            rules: [{ required: true, message: 'Выберите склад' },],
                            onChange: (e) => this.handleSelectStorekeeper(e),
                            initialValue: this.state.currentStorekeeper,
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите склад" disabled={!this.state.metricSelected}>
                              <Option style={{height: 35}} value="null">Выберите склад</Option>
                              {storekeeperItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Объем хранения"
                        >
                          {getFieldDecorator('volume', {
                            rules: [{required: true, message: 'Пожалуйста введите Кол-во в наличии'}],
                            onChange: (e) => this.handleEnterVolume(e)
                          })(
                            <InputNumber min={1} placeholder="Кол-во в наличии" style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          label="Период действия заявки:"
                          className="fm-RobotoRegular fs-14 black-text">
                          {getFieldDecorator('datetime', dateConfig)(
                            <RangePicker 
                              format={"DD.MM.YYYY"}
                              placeholder={["дд.мм.гггг","дд.мм.гггг"]}  
                              style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tab="Заявки на хранение" key="2">
                  <Form onSubmit={this.handleSubmit} ref={(el) => this.addOfferForm = el}>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24} >
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
                    </Row>
                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
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
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          label="Период действия заявки:"
                          className="fm-RobotoRegular fs-14 black-text">
                          {getFieldDecorator('datetime2', dateConfig)(
                            <RangePicker 
                              disabledDate={disabledDate}
                              format={"DD.MM.YYYY"}
                              placeholder={["дд.мм.гггг","дд.мм.гггг"]}  
                              style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                    </Row>

                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Объем хранения"
                        >
                          {getFieldDecorator('volume', {
                            rules: [{required: true, message: 'Пожалуйста введите Кол-во в наличии'}],
                            onChange: (e) => this.handleEnterVolume(e)
                          })(
                            <InputNumber min={1} placeholder="Кол-во в наличии" style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
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
                    </Row>

                    <div className="stock_card-footer">
                      <Row gutter={24}>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                          <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15" 
                            onClick={this.handleSubmit}>Подать заявку</Button>
                        </Col>
                      </Row>
                    </div>
                    <p className="gray-text fs-12 mt1">Если Вы не нашли подходящее для Вас предложение ,Вы можете подать заявку на хранение.</p>
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={this.state.tabKey === "1" ? "Результат предложение" : "Заявки на хранение"}
              className="stock_safe-card border_none-card-head"
            >
              { this.state.tabKey === "1" ?
                <div>
                  { this.state.selectedTariff !== null && currentStorekeeper !== null && currentStorekeeper.tariffs.length > 0 &&
                      <div className="gray-border py1 px2 my2">
                        <h2 className="fm-RobotoBold fs-18">Информация о складе</h2>
                        <div className="flex justify_between fm-RobotoRegular fs-15">
                          <span>Занято:</span>
                          <span>{this.state.selectedTariff.taken_place}</span>
                        </div>
                        <div className="flex justify_between fm-RobotoRegular fs-15">
                          <span>Свободно:</span>
                          <span>{this.state.selectedTariff.free_place}</span>
                        </div>
                      </div>
                  }

                  { currentStorekeeper !== null && this.state.days !== null && currentStorekeeper !== null && currentStorekeeper.tariffs.length > 0 &&
                    <div className="gray-border py1 px2 my2">
                      <h2 className="fm-RobotoBold fs-18">Результат</h2>
                      <div className="flex justify_between">
                        <span className="fm-RobotoRegular fs-15">Ставка хранения:</span>
                        <span className="fm-RobotoRegular fs-15">{this.state.selectedTariff.price} тнг</span>
                      </div>
                      <div className="flex justify_between">
                        <span className="fm-RobotoRegular fs-15">Объем:</span>
                        <span className="fm-RobotoRegular fs-15">{this.state.volume}</span>
                      </div>
                      <div className="flex justify_between">
                        <span className="fm-RobotoRegular fs-14">Результат: </span>
                        <span className="fm-RobotoBold fs-21">{parseFloat(this.state.volume *(this.state.days*parseFloat(this.state.selectedTariff.price)/30)).toFixed(2)}тнг</span>
                      </div>
                    </div>
                  }

                  <div className="stock_card-footer">
                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Button 
                          type="primary"
                          disabled={currentStorekeeper === null}
                          className="btn btn-block btn-green fm-RobotoMedium fs-15 mb1"
                          onClick={this.handleSubmit}>Открыть контрактное окно</Button>
                      </Col>
                    </Row>
                  </div>
                </div> 
                :
                <Table
                  className="dashboard-table"
                  rowKey={record => record.id}
                  dataSource={this.props.storehouseDemands}
                  columns={this.tableColumns}/>
              }              
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}

const WrappedOfferForm = Form.create()(StocksPage);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  storekeeper: state.company.storekeeper,
  storehouseDemands: state.demand.storehouse_demands,
  regions: state.profile.regions,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onAddOffer: dashboardActions.addOffer,
  onAddDemandStorehouseCard: storeActions.addDemandStorehouseCard,
  onGetDemandStorehouseCard: storeActions.getDemandStorehouseCard,
  onGetRegionList: profileActions.getRegions,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
  onGetStorekeeper: companyActions.getStorekeeper,
  onCreateContract: contractActions.createContract,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedOfferForm);
