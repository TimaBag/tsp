import React, { Component } from 'react';
import {  Row,
          Col,
          Input,
          Card,
          Tabs,
          Table,
          Button,Modal,Icon
          } from 'antd';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
// import _ from 'lodash';
import moment from 'moment';

import AddDemandModal from './AddDemandModal';
import AddOfferModal from './AddOfferModal';
import * as dashboardActions from "../actions/dashboardActions";
import * as contractActions from "../actions/contractActions";
import '../styles/Dashboard.css';

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D.MM.YYYY');
  else return '';
};

const TabPane = Tabs.TabPane;
const Search = Input.Search;

class OfferAndDemandCard extends Component {
  constructor(props){
    super(props);
    this.state={
      offerModalVisible: false,
      demandModalVisible: false,
      offerSelected: true,
      demandSelected: false,
      showDocumnt : false,
      conformity_certificate : '',
      quality_passport : '',
      searchText: ''
    };
    this.tableColumns = [
      {
        title: 'Наименование товара',
        dataIndex: 'resource',
        width: 60,
        render: (text,record) => {
          let res = this.props.resourceList.filter((res) => res.id === record.resource)[0];
          let resName = (res !== undefined)?res.name:'';
          return <span className="blue-text">{resName}</span>
        },
        sorter: (a, b) => {
          if(a.resource < b.resource) return -1;
          if(a.resource > b.resource) return 1;
          return 0;
        },
      },{
        title: 'Поставщик',
        dataIndex: 'company_name',
        width: 120,
        sorter: (a, b) => {
          if(a.company_name < b.company_name) return -1;
          if(a.company_name > b.company_name) return 1;
          return 0;
        },
      },{
        title: 'Дата',
        dataIndex: 'datetime',
        width: 100,
        render: (text,record) => (
          <span>{extractTime(record.datetime)}</span>
        ),
        sorter: (a, b) => {
          if(a.datetime < b.datetime) return -1;
          if(a.datetime > b.datetime) return 1;
          return 0;
        },
      },  {
        title: 'Цена',
        dataIndex: 'price',
        width: 60,
        render: (text,record) => (
          <span>{record.price}</span>
        ),
        sorter: (a, b) => {
          if(a.price < b.price) return -1;
          if(a.price > b.price) return 1;
          return 0;
        },
      }, {
        title: 'Кол-во в наличии',
        dataIndex: 'volume',
        width: 100,
        sorter: (a, b) => {
          if(a.volume < b.volume) return -1;
          if(a.volume > b.volume) return 1;
          return 0;
        },
      }, {
        title: 'Единица измерения',
        dataIndex: 'metric_unit',
        width: 100,
        render: (text,record) => {
          let res = this.props.measureList.filter((res) => res.id === record.metric_unit)[0];
          let resName = (res !== undefined)?res.name:'';
          return <span>{resName}</span>
        }
      }, {
        title: 'Производство',
        dataIndex: 'production_place_verbose',
        width: 100,
        render: (text,record) => (
          <span>{record.production_place_verbose}</span>
        ),
        sorter: (a, b) => {
          if(a.production_place_verbose < b.production_place_verbose) return -1;
          if(a.production_place_verbose > b.production_place_verbose) return 1;
          return 0;
        },
      }, {
        title: 'Стандарт качества',
        dataIndex: 'quality_standard_verbose.name',
        width: 100,
        sorter: (a, b) => {
          if(a.quality_standard_verbose.name < b.quality_standard_verbose.name) return -1;
          if(a.quality_standard_verbose.name > b.quality_standard_verbose.name) return 1;
          return 0;
        },
      }, {
        title: 'Регион нахождения',
        dataIndex: 'region',
        width: 100,
        render: (text,record) => (
          <span>{record.region_verbose}</span>
        ),
        sorter: (a, b) => {
          if(a.region_verbose < b.region_verbose) return -1;
          if(a.region_verbose > b.region_verbose) return 1;
          return 0;
        },
      }
    ];
    this.onCreateContract = this.onCreateContract.bind(this);
    this.hanldeClickShowDocumnt = this.hanldeClickShowDocumnt.bind(this);
  }
  componentWillMount() {
    this.props.onGetOffers();
    this.props.onGetDemands();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isOfferCreated !== undefined && nextProps.isOfferCreated){
      this.setState({
        offerModalVisible: false
      });
    }
    if(nextProps.isDemandCreated !== undefined && nextProps.isDemandCreated){
      this.setState({
        demandModalVisible: false
      });
    }
  }
  showAddOfferModal = () => {
    this.setState({
      offerModalVisible: true,
    });
  }
  showAddDemandModal = () => {
    this.setState({
      demandModalVisible: true,
    });
  }
  closeAddOfferModal = () => {
    this.setState({ offerModalVisible: false });
  }
  closeAddDemandModal = () => {
    this.setState({ demandModalVisible: false });
  }
  onTabChanged = (tab) => {
    if(parseInt(tab, 10) === 1) {
      this.setState({
        demandSelected: false,
        offerSelected: true,
      })
    } else {
      this.setState({
        demandSelected: true,
        offerSelected: false,
      })
    }
  }
  offerSubmit = (submitOffer) =>{
    if(submitOffer){
      this.setState({ offerModalVisible: false });
    }
  }
  offerCancel = (cancelOffer) =>{
    if(cancelOffer === true){
      this.setState({ offerModalVisible: false });
    }
  }
  demandSubmit = (submitDemand) =>{
    if(submitDemand){
      this.setState({ demandModalVisible: false });
    }
  }
  demandCancel = (cancelDemand) =>{
    if(cancelDemand === true){
      this.setState({ demandModalVisible: false });
    }
  }
  handleSearch = (event) => {
    this.setState({
      searchText: event.target.value.toLowerCase()
    })
  }
  filterData = (data) => {
    if(this.state.searchText === '') return data;
    else {
      return data.filter(d => {
        return d.company_name.toLowerCase().includes(this.state.searchText) ||
               d.station_name.toLowerCase().includes(this.state.searchText) ||
               d.region_verbose.toLowerCase().includes(this.state.searchText) ||
               d.production_place_verbose.toLowerCase().includes(this.state.searchText);
      })
    }
    // return data;
  }
  onCreateContract(item){
    let data = {};
    if(this.state.offerSelected) {
      data = {
        supplier: item.tradesman_user,
        client: this.props.userProfile.user,
        offer: item.id
      };
    }else {
      data = {
        supplier: this.props.userProfile.user,
        client: item.tradesman_user,
        demand: item.id
      };
    }
    this.props.onCreateContract(data);
  }
  hanldeClickShowDocumnt(e,document1,document2){
    e.preventDefault();
    this.setState({
      conformity_certificate : document1,
      quality_passport : document2,
      showDocumnt : true,
    })
  }
  handleCloseDocument = () => {
    this.setState({
      showDocumnt : false,
    })
  }
  expandedRowRender = (record) => {
    // let res = this.props.regions.filter((reg) => reg.id === record.region)[0];
    // let resName = (res !== undefined)?res.name:'';
    let btnText = this.state.offerSelected ? 'Приобрести':'Предложить';

    let store = this.props.storehouseList.filter((st) => st.id === record.storehouse)[0];
    let storeName = (store !== undefined)?store.name:'';
    return (
      <div>
        <Row>
          <Col span={12}>
            <p>№: <span className="blue-text">{record.id}</span></p>
            <p>Наименование станций: <span className="blue-text">{record.station_name}</span></p>
          </Col>
          <Col span={12}>
            <p>Наименование склада: <span className="blue-text">{storeName}</span></p>
            <p>Условия поставки: <span className="blue-text">{record.delivery_condition_verbose.code}</span></p>
            <p>Срок действия: <span className="blue-text">{extractTime(record.datetime_expire)}</span></p>
          </Col>
        </Row>
        <Row className="mb-block" type="flex" justify="end">
          <Button
            disabled={!this.props.isLoggedIn}
            onClick={() => this.onCreateContract(record)}
            className="btn btn-blue fm-RobotoRegular fs-14">{ btnText }</Button>
          <Button
            href={"/messages/"+record.tradesman_user}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Написать сообщение</Button>
          {this.props.isLoggedIn &&
            <div
              className="flex item-cnt ml1 fm-RobotoRegular fs-12 txt-link light-blue-text"
              onClick={(e) => this.hanldeClickShowDocumnt(e,record.conformity_certificate,record.quality_passport)}
            >
              Просмотреть документ <Icon type="picture" className="show-doc-icon" />
            </div>
          }   
        </Row>
      </div>
    );
  }

  render() {
    // if (this.props.contract !== null) {
    //   return <Redirect to={{ pathname: '/trade/'+this.props.contract.id, state: { contract: this.props.contract } }}/>;
    // }
    return (
      <Card
        bordered={false}
        bodyStyle={{ padding: '20px' }}
        className="dashboard-requst-card"
      >
        <div className="el-absolute mb-block">
          <Row gutter={24}>
            <Col xl={11} lg={11} md={11} sm={24} xs={24} offset={6}>
              <Search
                placeholder="Поиск"
                className="el-block"
                onChange={this.handleSearch}
                value={this.state.searchText}
              />
            </Col>
            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
              { this.state.demandSelected &&
                (<Button
                  type="primary"
                  icon="plus"
                  disabled={!(this.props.isLoggedIn &&
                    this.props.userProfile.role === 0)}
                  className="btn btn-green btn-block"
                  onClick={this.showAddDemandModal}
                >Добавить заявку</Button>)
              }
              { (this.state.offerSelected && this.props.userProfile) &&
                (<Button
                  type="primary"
                  icon="plus"
                  disabled={!(this.props.isLoggedIn &&
                    this.props.userProfile.role === 0)}
                  className="btn btn-green btn-block"
                  onClick={this.showAddOfferModal}
                >Добавить предложение</Button>)
              }
            </Col>
          </Row>
        </div>
        <Tabs
          animated={false}
          className="dashboard-tabs"
          onTabClick={this.onTabChanged}>
          <TabPane tab="Предложения" key="1">
            <Table
              className="dashboard-table"
              rowKey={record => record.id}
              dataSource={this.filterData(this.props.offers)}
              columns={this.tableColumns}
              expandedRowRender={this.expandedRowRender}
              pagination={{ pageSize: 8 }}
              scroll={{ x: 1000 }} size='small'/>
          </TabPane>
          <TabPane tab="Заявки" key="2">
            <Table
              className="dashboard-table"
              rowKey={record => record.id}
              dataSource={this.filterData(this.props.demands)}
              columns={this.tableColumns}
              expandedRowRender={this.expandedRowRender}
              pagination={{ pageSize: 8 }}
              scroll={{ x: 1000 }}
              size='small' />
          </TabPane>
        </Tabs>

        <Modal
          title={<h2 className="fm-RobotoBold fs-18 black-text">КАРТОЧКА ПРЕДЛОЖЕНИЯ</h2>}
          visible={this.state.offerModalVisible}
          width={1000}
          onOk={this.handleOk}
          onCancel={this.closeAddOfferModal}
          className="add-modal"
        >
          <AddOfferModal
            offerSubmit = { (submitOffer) => this.offerSubmit(submitOffer)}
            offerCancel = { (cancelOffer) => this.offerCancel(cancelOffer)}
            offerCreated = { this.props.isOfferCreated }
          />
        </Modal>

        <Modal
          title={<h2 className="fm-RobotoBold fs-18 black-text">КАРТОЧКА ЗАЯВКИ</h2>}
          visible={this.state.demandModalVisible}
          width={1000}
          onOk={this.handleOk}
          onCancel={this.closeAddDemandModal}
          className="add-modal"
        >
          <AddDemandModal
            demandSubmit = { (submitDemand) => this.demandSubmit(submitDemand)}
            demandCancel = { (cancelDemand) => this.demandCancel(cancelDemand)}
            demandCreated = { this.props.isDemandCreated }
          />
        </Modal>
        <Modal
          title="Документы"
          visible={this.state.showDocumnt}
          width={500}
          onOk={this.handleCloseDocument}
          onCancel={this.handleCloseDocument}
        >
          <div className="flex flex-column">
            <a href={"https://docs.google.com/viewerng/viewer?url="+this.state.conformity_certificate} target="_blank">Сертификат соответствия</a>
            <a href={"https://docs.google.com/viewerng/viewer?url="+this.state.quality_passport} target="_blank">Паспорт качества</a>
          </div>
        </Modal>

      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  offers: state.offer.offers,
  demands: state.demand.demands,
  resourceList: state.resource.resourceList,
  producerList: state.resource.producerList,
  measureList: state.resource.measureList,
  tradesmanList: state.company.tradesmanList,
  storehouseList: state.company.storehouseList,
  regions: state.profile.regions,
  contract: state.contract.contract,
  userProfile: state.user.userProfile,

  isLoggedIn: state.auth.isLoggedIn,
  isOfferCreated: state.offer.offerCreated,
  isDemandCreated: state.demand.demandCreated,
})

const mapDispatchToProps = {
  onGetOffers: dashboardActions.getOffers,
  onGetDemands: dashboardActions.getDemands,
  onCreateContract: contractActions.createContract,
  onFilterData: dashboardActions.filterData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferAndDemandCard);
