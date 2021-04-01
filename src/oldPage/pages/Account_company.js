import React, { Component } from 'react';
import { connect } from 'react-redux';

import {  Row,
          Col,
          Card,
          Button,
          Icon,
          Modal,
          Rate,
          AutoComplete,
          Table
        } from 'antd';
import moment from 'moment';
import "../styles/Account.css";
import * as profileActions from "../actions/profileActions";
import * as companyActions from "../actions/companyActions";
import ProfileModal from '../components/ProfileModal';
import OfferAndDemandCard from '../components/OfferAndDemandCardCompany';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};


class AccountCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showBlackModal : false,
    }
    this.tableColumns = [{
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
    this.handleOpenBlackList = this.handleOpenBlackList.bind(this);
    this.handleCloseBlackList = this.handleCloseBlackList.bind(this);
    this.handleBlackList = this.handleBlackList.bind(this);
  }
  componentDidMount() {
    this.props.onGetCompanies();
    this.props.onGetPayboxUrl();
  }
  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  handleShowModal = () => {
    this.setState({ showModal: true });
  }
  handleCancelModal = () => {
    this.setState({ showModal: false });
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
	render(){
    const { userProfile } = this.props;
    console.log(userProfile);
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
        {userProfile &&
          <div>
            <h2 className="fm-RobotoBold fs-18 black-text mb2">ЛИЧНЫЙ КАБИНЕТ
              {userProfile !== null && (<span className="fm-RobotoMedium fs-14 black-text"> ({userProfile.role_verbose})</span>)}
            </h2>
    		    <Row gutter={24}>
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
                      <a className="fm-RobotoRegular fs-14 light-blue-text txt-underline" href={userProfile.copmany_site}>{userProfile.copmany_site}</a>
                      <div className="blue-text mt1"><span className="fm-RobotoRegular fs-14 gray-text mr1">Рейтинг:</span>
                        <Rate disabled value={userProfile ? userProfile.rating : 0} />
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={24} className="mt2 mb-block">
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                        onClick={this.handleShowModal}><Icon type="setting" /> Редактировать данные</Button>
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
                    <h2 className="fm-RobotoMedium fs-18 black-text mb1">АБОНЕНТСКАЯ ПЛАТА</h2>
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
                      <Button className=" btn btn-block btn-blue fm-RobotoMedium fs-15"  href="http://tradehouse.kz/api/rest-api/get_payment_receipt/">Выставить</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        }
        <Row gutter={24} className="mt1">
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <OfferAndDemandCard />
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
            dataSource={this.filterData(this.props.companyAllList)} columns={this.tableColumns}
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
  user: state.user.user,
  companyAllList : state.company.companyAllList,
  payboxUrl: state.profile.payboxUrl,
})

const mapDispatchToProps = {
  onAddBlackList : profileActions.addBlackList,
  onGetCompanies: companyActions.getAllCompanies,
  onGetPayboxUrl: profileActions.getPayboxUrl,
  onGetPaymentReceipt: profileActions.getPaymentReceipt
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCompany);
