import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Row,
          Col,          
          Card,          
          Button,
          Input,
          Select,
          Checkbox,
          Icon, Modal ,AutoComplete, Table, Rate} from 'antd';         

import moment from 'moment';
import "../styles/Settings.css";

import * as profileActions from "../actions/profileActions";
import * as authActions from "../actions/authActions";
import * as companyActions from "../actions/companyActions";


const Option = Select.Option;
const OptionBlack = AutoComplete.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

class Settings extends Component{

  constructor(props) {
    super(props);
    this.state = {
      new_password : "",
      confirm_password : "",
      error_password : ""
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
        if(!this.checkBlackList(record.id)){
          return <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                  onClick={(e) => this.handleBlackList(e,record.id)}
                  >Добавить в черный список</Button>
        }else{
          return <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                  onClick={(e) => this.deleteBlackList(e,record.id)}
                  >Удалить из списка</Button>
        }
      },
    }];
    this.handleCreateNewPassword = this.handleCreateNewPassword.bind(this);
    this.handleClearPassword = this.handleClearPassword.bind(this);
    this.handleOpenBlackList = this.handleOpenBlackList.bind(this);
    this.handleCloseBlackList = this.handleCloseBlackList.bind(this);
    this.handleBlackList = this.handleBlackList.bind(this);
  }
  componentDidMount(){
    this.props.onGetCompanies();
  }
  handleCreateNewPassword(){
    if(this.state.new_password === this.state.confirm_password && this.state.new_password.length !== 0 && this.state.confirm_password.length !== 0){
      let data = {
        password : this.state.new_password,
      } 
      this.props.onCreateNewPassowrd(data);
      this.setState({
        error_password : "",
        new_password : "",
        confirm_password : "",
      })
    }else{
      this.setState({
        error_password : "Пароли не совпадают"
      })
    }
  }

  handleClearPassword(){
    this.setState({
      new_password : "",
      confirm_password : "",
      error_password : ""
    })
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
    console.log(dataArray,comp_id)
    let sendData = {
      company_id: this.props.userProfile.id,
      list: {
        black_list : dataArray
      }
    }
    this.props.onAddBlackList(sendData);
  }

  deleteBlackList(e,comp_id){
    e.preventDefault();
    var dataArray = this.props.userProfile.black_list;
    var black_id = dataArray.indexOf(comp_id);
    console.log(dataArray,comp_id)
    dataArray.splice(black_id, 1);
    console.log(dataArray,black_id)
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
      <OptionBlack key={group.id} text={group.company_name}>
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
      </OptionBlack>
      ));
    return(

      <Row gutter={24}>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <h2 className="fm-RobotoBold fs-18 black-text txt-uppercase mb2">Настройка</h2>
          <Card
            bordered={false}
            bodyStyle={{ padding: '20px' }}
            className="setting-card"
          >          
            <Row gutter={24} type="flex" align="middle" className="mb2">
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14 black-text">Часовой пояс: <span className="fm-RobotoMedium fs-14" >Казахстан, Астана</span></p>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14 black-text mt2">Добавить в черный список</p>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                  onClick={this.handleOpenBlackList}
                  >Черный список</Button>
              </Col>
            </Row>
            <a className="fm-RobotoMedium fs-15 blue-text">Правила и условия</a>
            <div className="btm-border my2"/>
            <h2 className="fm-RobotoBold fs-18 txt-uppercase black-text mb2">Пароль</h2>
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14 black-text">Введите новый пароль:</p>
                <Input 
                  type="password"
                  className="el-block" 
                  value={this.state.new_password}
                  onChange={(e) => this.setState({new_password : e.target.value})} 
                  placeholder="Введите название компании" />
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14 black-text">Повторить пароль:</p>
                <Input 
                  type="password"
                  className="el-block" 
                  value={this.state.confirm_password}
                  onChange={(e) => this.setState({confirm_password : e.target.value})} 
                  placeholder="Введите ограничение" />
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14 red-text mt1">{this.state.error_password}</p>
              </Col>
            </Row>
            <div className="btm-border my2"/>
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button 
                  className="btn btn-block btn-blue fm-RobotoMedium fs-15" 
                  onClick={this.handleCreateNewPassword}>Сохранить</Button>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button 
                  className="btn btn-block btn-blue fm-RobotoMedium fs-15" 
                  onClick={this.handleClearPassword}>Отмена</Button>
              </Col>
            </Row>
          </Card>
          <Row>
            <Col xl={5} lg={5} md={5} sm={24} xs={24}>
              <Button className="btn btn-blue btn-block mt1 fm-RobotoMedium fs-14"><Icon type="left" />Назад</Button>
            </Col>
          </Row>          
        </Col> 
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
      </Row>

    )
  }

}


const mapStateToProps = (state) => ({
  companyAllList : state.company.companyAllList,
  userProfile: state.user.userProfile,
})

const mapDispatchToProps = {
  onCreateNewPassowrd: authActions.createNewPassowrd,
  onAddBlackList : profileActions.addBlackList,
  onGetCompanies: companyActions.getAllCompanies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);