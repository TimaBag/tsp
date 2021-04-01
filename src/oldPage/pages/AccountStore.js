import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row,Col,Input,Card,Button,Select,Icon,Modal,Table,AutoComplete,Rate } from 'antd';

import "../styles/Account.css";
import ProfileModal from '../components/ProfileModal';
import AddTariffModal from '../components/AddTariffModal';
import EditTariffModal from '../components/EditTariffModal';
import moment from 'moment';

import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";
import * as companyActions from "../actions/companyActions";
import * as storeActions from "../actions/storeActions";

const Search = Input.Search;
const Option = Select.Option;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

class AccountStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal states
      showProfileModal: false,
      showTariffModal: false,
      showEditTariffModal: false,
      currentEditTariffs : {},
    }
    this.tableColumns = [{
      title: 'Наименование товара',
      dataIndex: 'resource',
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
      title: 'Объем хранения',
      dataIndex: 'volume',
      key: 'volume',
    }, {
      title: 'Ед. измерения',
      dataIndex: 'metric_unit',
      render: (text,record) => {
        let res = this.props.measureList.filter((res) => res.id === record.metric_unit)[0];
        let resName = (res !== undefined)?res.name:'';
        return <span>{resName}</span>
      }
    }, {
      title: 'Свободно мест',
      dataIndex: 'free_place',
      key: 'free_place',
    }, {
      title: 'Занято мест',
      dataIndex: 'taken_place',
      key: 'taken_place',
    }, {
      title: 'Тариф хранения на тонну',
      dataIndex: 'price',
      key: 'price',
      render: (text) => <div>{text*100}</div>,
    },{
      title: '',
      dataIndex: 'percent',
      key: 'percent',
      render: (text,record) => <div>{record.is_percent ? "%" : "KZT"}</div>,
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
    this.handleShowEditTariffModal = this.handleShowEditTariffModal.bind(this);
    this.handleOpenBlackList = this.handleOpenBlackList.bind(this);
    this.handleCloseBlackList = this.handleCloseBlackList.bind(this);
    this.handleBlackList = this.handleBlackList.bind(this);
  }
  componentWillMount() {
    this.props.onGetResourceList();
    this.props.onGetMeasureList();
    this.props.onGetCompanies();
    this.props.onGetPayboxUrl();
  }
  componentDidMount() {
    if(this.props.user !== null){
      this.props.onGetProfile(this.props.user.user);
    }

  }
  handleShowProfileModal = () => {
    this.setState({ showProfileModal: true });
  }
  handleCancelProfileModal = () => {
    this.setState({ showProfileModal: false });
  }
  handleShowTariffModal = () => {
    this.setState({ showTariffModal: true });
  }
  handleCancelTariffModal = () => {
    this.setState({ showTariffModal: false });
  }
  handleShowEditTariffModal = () => {
    this.setState({ showEditTariffModal: true });
  }
  handleCancelEditTariffModal = () => {
    this.setState({ showEditTariffModal: false });
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
    dataArray.push(parseInt(comp_id, 10));
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

  handleEditTariffModal(item){
    this.setState({ 
      showEditTariffModal: true,
      currentEditTariffs : item,
    });
  }
  handleDeleteTariff(item){
    this.props.onDeleteTariff(item.id);
  }

  expandedRowRender = (record) => {
    // let res = this.props.regions.filter((reg) => reg.id === record.region)[0];
    // let resName = (res !== undefined)?res.name:'';
    return (
      <div>
        <Row type="flex" justify="end">
          <Button
            onClick={() => this.handleEditTariffModal(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Редактировать</Button>
          <Button
            onClick={() => this.handleDeleteTariff(record)}
            disabled={!this.props.isLoggedIn}
            className="btn btn-blue fm-RobotoRegular fs-14 ml1">Удалить</Button>
        </Row>
      </div>
    );
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
        <h2 className="fm-RobotoBold fs-18 black-text mb2">ЛИЧНЫЙ КАБИНЕТ
          {userProfile !== null && (<span className="fm-RobotoMedium fs-14 black-text"> ({userProfile.role_verbose})</span>)}
        </h2>
		    <Row gutter={24} className="mb2">
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="account-card"
              bodyStyle={{ padding: 20}}
            >
              <Row gutter={24}>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <div className="profile_logo">
                    { userProfile.image !== null && <img src={"http://www.tradehouse.kz"+userProfile.image} style={{ width: 85, height: 85 }} className="logo-circle" /> }
                  </div>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  {userProfile !== null && (<h2 className="fm-RobotoMedium fs-18 black-text mb1">{userProfile.company_name}</h2>) }
                </Col>
              </Row>
              <Row gutter={24} className="mt2 mb-block">
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button className=" btn btn-block btn-blue fm-RobotoMedium fs-15"
                    onClick={this.handleShowProfileModal}><Icon type="setting" /> Редактировать данные</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                    onClick={this.handleOpenBlackList}
                    >Черный список</Button>
                </Col>
              </Row>
            </Card>
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
        
        <Card
          bordered={false}
          className="account_insurance-card border_none-card-head"
          title="Складской учет"
          bodyStyle={{ padding: 20, paddingTop: 0}}
          >
          <Row gutter={24}>
            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
              <Button
                icon="plus"
                type="primary"
                className="btn btn-green btn-block fm-RobotoMedium fs-15"
                onClick={this.handleShowTariffModal}>Добавить тариф</Button>
            </Col>
            <Col xl={10} lg={10} md={10} sm={24} xs={24}>
              <Search
                placeholder="Поиск"
                className=""
                onSearch={value => console.log(value)}
              />
            </Col>
          </Row>
          <Table
            className="account_table mt3"
            pagination={false}
            dataSource={this.props.companyTariffs}
            expandedRowRender={this.expandedRowRender}
            columns={this.tableColumns} />
        </Card>

        <Modal
          visible={this.state.showProfileModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Профиль</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCancelProfileModal}
        >
          <ProfileModal 
            onCloseModal = { (showProfileModal) => this.handleCancelProfileModal(showProfileModal)}
          />
        </Modal>

        <Modal
          visible={this.state.showTariffModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Добавление тарифа</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCancelTariffModal}
        >
          <AddTariffModal submit={() => this.handleCancelTariffModal()} />
        </Modal>
        <Modal
          visible={this.state.showEditTariffModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Редактирование тарифа</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCancelEditTariffModal}
        >
          <EditTariffModal 
            submit={() => this.handleCancelEditTariffModal()} 
            tariffs={this.state.currentEditTariffs}/>
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
  userProfile: state.user.userProfile,
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  companyTariffs: state.company.tariffs,
  user: state.user.user,
  companyAllList : state.company.companyAllList,
  payboxUrl: state.profile.payboxUrl,
})

const mapDispatchToProps = {
  onGetProfile: profileActions.getCompanyProfile,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
  onAddBlackList : profileActions.addBlackList,
  onGetCompanies: companyActions.getAllCompanies,
  onDeleteTariff : storeActions.deleteTariff,
  onGetTariff : storeActions.getTariff,
  onGetPayboxUrl: profileActions.getPayboxUrl,
  onGetPaymentReceipt: profileActions.getPaymentReceipt
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountStore);
