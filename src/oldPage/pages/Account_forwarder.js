import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row,
          Col,
          Card,
          Button,
          Icon,Table,Modal,AutoComplete,Rate } from 'antd';
import moment from 'moment';
import "../styles/Account.css";
import * as profileActions from "../actions/profileActions";
import * as expeditorActions from "../actions/expeditorActions";
import * as resourceActions from "../actions/resourceActions";
import * as companyActions from "../actions/companyActions";
import ProfileModal from '../components/ProfileModal';  
import AddTariffModal from '../components/AddExpeditorTariffModal';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

class AccountForwarder extends Component{

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showTariffModal : false,
    }
    this.tableColumns = [{
      title: 'Категория товара',
      dataIndex: 'category',
      render: (text,record) => {
        return "Нефтепродукты";
      }
    }, {
      title: 'Наименовия товара',
      dataIndex: 'resourse',
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
    }, {
      title: 'Вид перевозки',
      dataIndex: 'type_auto',
      render: (text,record) => {
        return "АВТО";
      }
    }, {
      title: 'Регион',
      dataIndex: 'region_name',
      key: 'region_name',
      width: 100,
    },{
      title: 'Расстояние от(км)',
      dataIndex: 'distance_from',
      key: 'distance_from',
      width: 100,
    }, {
      title: 'Расстояние до(км)',
      dataIndex: 'distance_to',
      key: 'distance_to',
      width: 100,
    }, {
      title: 'Стоимость перевозки',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    }, {
      title: 'Ед. измерения стоимости',
      dataIndex: 'metric_unit',
      render: (text,record) => {
        let res = this.props.measureList.filter((res) => res.id === record.metric_unit)[0];
        let resName = (res !== undefined)?res.name:'';
        return <span>{resName}</span>
      }
    }, {
      title: 'Ед. измерения груза',
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
    }];
    this.tableColumnsBlack = [{
      title: 'Компания',
      dataIndex: 'company_name',
      key: 'company_name',
      render: text => <div className="flex item-cnt"><div className="in_comp-table-logo" />{text}</div>,
    }, {
      title: 'Рейтинг',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <span className="blue-text"><Rate disabled value={text} /></span>
    }, {
      title: 'Дата регистрации',
      dataIndex: 'registration_date', 
      key: 'registration_date',
      render: (text) => <div>{extractTime(text)}</div>,
    }, {
      title: 'Завершено сделок',
      dataIndex: 'number_of_contracts',
      key: 'number_of_contracts',
    }, {
      title: 'Подробнее',
      key: 'action',
      render: (text, record) => {
        return <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                  onClick={(e) => this.handleBlackList(e,record.id)}
                  disabled={this.checkBlackList(record.id)}
                  >Добавить в черный список</Button>
      },
    }];
    this.handleShowTariffModal = this.handleShowTariffModal.bind(this);
    this.handleCancelTariffModal = this.handleCancelTariffModal.bind(this);
    this.handleOpenBlackList = this.handleOpenBlackList.bind(this);
    this.handleCloseBlackList = this.handleCloseBlackList.bind(this);
    this.handleBlackList = this.handleBlackList.bind(this);
  }

  componentDidMount(){
    this.props.onGetExpeditor();
    this.props.onGetResourceList();
    this.props.onGetMeasureList();
    this.props.onGetCompanies();
    this.props.onGetPayboxUrl();
  }

  handleShowModal = () => {
    this.setState({ showModal: true });
  }
  handleCancelModal = () => {
    this.setState({ showModal: false });
  }
  handleShowTariffModal = () => {
    this.setState({ showTariffModal: true });
  }
  handleCancelTariffModal = () => {
    this.setState({ showTariffModal: false });
  }
  handleOpenBlackList(){
    this.setState({
      showBlackModal : true,
    })
  }
  handleCloseBlackList(){
    this.setState({
      showBlackModal : false,
    })
  }
  handleBlackList(e,comp_id){
    e.preventDefault();
    var dataArray = [];
    dataArray.push(parseInt(comp_id));
    dataArray = dataArray.concat(this.props.userProfile.black_list);
    let sendData = {
      company_id: this.props.userProfile.id,
      list: {
        black_list : dataArray
      }
    }
    this.props.onAddBlackList(sendData);
  }
  filterData = (data) => {
    return data.filter(d => {
        if(d.company_name !== null && d.id !== this.props.userProfile.id){
          return d.accepted;
        }
      })
  }
  checkBlackList(id){
    if(this.props.userProfile.black_list.filter((item) => {if(item === id) return true}).length !== 0){
      return true;
    }
    return false;
  }
  render(){
    const { userProfile } = this.props;
    var allCompnay = this.filterData(this.props.companyAllList);
    const options = allCompnay.map(group => (
      <Option key={group.id} text={group.company_name}>
        <Row gutter={24}>
          <Col xl={10} lg={10} md={10} sm={24} xs={24}>
            {group.company_name}
          </Col>
          <Col xl={14} lg={14} md={14} sm={24} xs={24}>
            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
              onClick={(e) => this.handleBlackList(e,group.id)}
              disabled={this.checkBlackList(group.id)}
              >Добавить в черный список</Button>
          </Col> 
        </Row>
      </Option>
      ));
    return(
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h2 className="fm-RobotoBold fs-18 black-text mb2">ЛИЧНЫЙ КАБИНЕТ
            <span className="fm-RobotoMedium fs-14 black-text">({userProfile.role_verbose})</span></h2>
            <Card
              bordered={false}
              className="account-card mb2"
              bodyStyle={{ padding: 20}}
            >
              <Row gutter={24}>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <div className="logo-large"></div>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  <h2 className="fm-RobotoMedium fs-18 black-text mb1">{userProfile.company_name}</h2>
                  <a className="fm-RobotoRegular fs-14 light-blue-text txt-underline ">{userProfile.company_sites ? userProfile.company_sites : ""}</a>
                  <p className="blue-text mt1"><span className="fm-RobotoRegular fs-14 gray-text mr1">Рейтинг:</span>
                    <Icon type="star" />
                    <Icon type="star" />
                    <Icon type="star" />
                    <Icon type="star" />
                    <Icon type="star" />
                  </p>
                </Col>
              </Row>
              <Row gutter={24} className="mt2 mb-block">
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button 
                    className=" btn btn-block btn-blue fm-RobotoMedium fs-15"
                    onClick={this.handleShowModal}
                  >
                    <Icon type="setting" /> Редактировать данные</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                    onClick={this.handleOpenBlackList}
                    >Черный список</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Card
                    bordered={false}
                    className="account-card"
                    bodyStyle={{ padding: 20}}
                  >
                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <p className="fm-RobotoRegular fs-14 light-blue-text txt-underline mb1">Форма оплаты</p>
                        <p className="fm-RobotoRegular fs-14 black-text">Банковская карта</p>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        {userProfile.active_till && <p className="fm-RobotoRegular fs-14 black-text mb1">Активный период: {moment(userProfile.active_till.active_till,"YYYY-MM-DD").format("DD.MM.YYYY")}</p>}
                        {/*userProfile.active_till && <p className="fm-RobotoRegular fs-14 black-text mb1">Количество еще не активированных месячных оплат: {userProfile.active_till.payments_left}</p>*/}
                        {userProfile.demo_till && <p className="fm-RobotoRegular fs-14 black-text mb1">Пробный период: {moment(userProfile.demo_till,"YYYY-MM-DD").format("DD.MM.YYYY")}</p>}
                      </Col>
                    </Row>
                    <Row gutter={24} style={{ marginTop: '26px'}}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Button className=" btn btn-block btn-blue fm-RobotoMedium fs-15" href={this.props.payboxUrl.url}>Оплатить картой</Button>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Button className=" btn btn-block btn-blue fm-RobotoMedium fs-15" onClick = {() => this.props.onGetPaymentReceipt}>Выставить</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Card>
            {/*<a className="is-active-link gray-text mt3 mb1 ">
              <span className="icon_edit"></span>Редактировать
            </a>*/}
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              className="account-eks_card"
              title={
                <Row gutter={24}>
                  <Col xl={17} lg={17} md={17} sm={24} xs={24}>
                    <h2 className="fs-16 black-text">Стоимость на перевозку</h2>
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={24} xs={24}>
                    <Button
                      icon="plus"
                      className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                      onClick={this.handleShowTariffModal}>Добавить</Button>
                  </Col>
                </Row>
              }
              bodyStyle={{ padding: 20, paddingTop: 0}}
            >
              <Table className="account_table mt3" pagination={false} dataSource={this.props.expeditor_tarif} columns={this.tableColumns} />
            </Card>
          </Col>
        </Row>
        <Modal
          visible={this.state.showModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Профиль партнера</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCancelModal}
        >
          <ProfileModal 
            onCloseModal = { (showModal) => this.handleCancelModal(showModal)}
          />
        </Modal>
        <Modal
          visible={this.state.showTariffModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Добавление тарифа</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCancelTariffModal}
        >
          <AddTariffModal offerCancel={ (data) => this.handleCancelTariffModal(data) }/>
        </Modal>
        <Modal
          visible={this.state.showBlackModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Добавить в черный список</h2>}
          className="add-modal"
          width={700}
          onCancel={this.handleCloseBlackList}
        >
          <AutoComplete
            style={{ width: 500 }}
            dataSource={options}
            placeholder="Напишите имя компании"
            optionLabelProp="text"
            filterOption={(inputValue, option) => option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
          />
          <Table pagination={false}
            className="companies-table"
            dataSource={this.filterData(this.props.companyAllList)} columns={this.tableColumnsBlack}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps=(state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  resourceList: state.resource.resourceList,
  categoryList: state.resource.categoryList,
  userProfile: state.user.userProfile,
  measureList: state.resource.measureList,
  user: state.user.user,
  expeditor_tarif : state.expeditor.expeditorTarif,
  companyAllList : state.company.companyAllList,
  payboxUrl: state.profile.payboxUrl,
})

const mapDispatchToProps = {
  onGetProfile: profileActions.getCompanyProfile,
  onGetExpeditor : expeditorActions.getExpeditor,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
  onAddBlackList : profileActions.addBlackList,
  onGetCompanies: companyActions.getAllCompanies,
  onGetPayboxUrl: profileActions.getPayboxUrl,
  onGetPaymentReceipt: profileActions.getPaymentReceipt
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountForwarder);
