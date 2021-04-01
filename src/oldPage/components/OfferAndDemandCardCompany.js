import React, { Component } from 'react';
import {  Row,
          Col,
          Input,
          Card,
          Tabs,
          Table,
          Button,Modal
          } from 'antd';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router';
// import _ from 'lodash';
import moment from 'moment';

import AddDemandModal from './AddDemandModal';
import AddOfferModal from './AddOfferModal';
import EditDemandModal from './EditDemandModal';
import EditOfferModal from './EditOfferModal';
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
      editDemandModalVisible : false,
      editOfferModalVisible : false,
      currentEditDemand : {},
      currentEditOffer : {},
      searchText: '',
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
    this.handleEditDemandModal = this.handleEditDemandModal.bind(this);
    this.handleEditOfferModal = this.handleEditOfferModal.bind(this);
    this.closeEditDemandModal = this.closeEditDemandModal.bind(this);
    this.closeEditOfferModal = this.closeEditOfferModal.bind(this);
  }
  componentWillMount() {
    if(this.props.userProfile !== null){
      this.props.onGetOffers(this.props.userProfile.user);
      this.props.onGetDemands(this.props.userProfile.user);
    }
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
  handleEditDemandModal(item){
    this.setState({ 
      editDemandModalVisible: true,
      currentEditDemand : item,
    });
  }
  handleEditOfferModal(item){
    this.setState({ 
      editOfferModalVisible: true,
      currentEditOffer : item,
    });
  }
  handleDeleteOffer(item){
    this.props.onDeleteOffer(item.id);
  }
  handleDeleteDemand(item){
    this.props.onDeleteDemand(item.id);
  }
  closeEditDemandModal = () => {
    this.setState({ editDemandModalVisible: false });
  }
  closeEditOfferModal = () => {
    this.setState({ editOfferModalVisible: false });
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
  expandedRowRender = (record) => {
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
        <Row type="flex" justify="end">
          <Button
            disabled={!this.props.isLoggedIn}
            onClick={() => this.onCreateContract(record)}
            className="btn btn-blue fm-RobotoRegular fs-14">{ btnText }</Button>
          <Button
            onClick={() => this.handleEditOfferModal(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Редактировать</Button>
          <Button
            onClick={() => this.handleDeleteOffer(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Удалить</Button>
        </Row>
      </div>
    );
  }

  expandedRowRenderDemand = (record) => {
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
            onClick={() => this.handleEditDemandModal(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Редактировать</Button>
          <Button
            onClick={() => this.handleDeleteDemand(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Удалить</Button>
        </Row>
      </div>
    );
  }

  render() {
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
              { this.state.offerSelected &&
                (<Button
                  type="primary"
                  icon="plus"
                  disabled={!(this.props.isLoggedIn )}
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
              expandedRowRender={this.expandedRowRenderDemand}
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
          title={<h2 className="fm-RobotoBold fs-18 black-text">РЕДАКТИРОВАТЬ ЗАЯВКИ</h2>}
          visible={this.state.editDemandModalVisible}
          width={1000}
          onCancel={this.closeEditDemandModal}
          className="add-modal"
        >
          <EditDemandModal 
            editDemandModal = { () => this.closeEditDemandModal()}
            editDemandCancel = { () => this.closeEditDemandModal()}
            demands={this.state.currentEditDemand}/>
        </Modal>

        <Modal
          title={<h2 className="fm-RobotoBold fs-18 black-text">РЕДАКТИРОВАТЬ ПРЕДЛОЖЕНИЯ</h2>}
          visible={this.state.editOfferModalVisible}
          width={1000}
          onCancel={this.closeEditOfferModal}
          className="add-modal"
        >
          <EditOfferModal 
            editOfferModal = { () => this.closeEditOfferModal()}
            cancelEditOffer = { () => this.closeEditOfferModal()}
            offers={this.state.currentEditOffer}/>
        </Modal>

      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  offers: state.offer.offersCompany,
  demands: state.demand.demandsCompany,
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
  onGetOffers: dashboardActions.getOffersCompany,
  onGetDemands: dashboardActions.getDemandsCompany,
  onCreateContract: contractActions.createContract,
  onDeleteDemand : dashboardActions.deleteDemand,
  onDeleteOffer : dashboardActions.deleteOffer,
  onFilterData: dashboardActions.filterData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferAndDemandCard);
