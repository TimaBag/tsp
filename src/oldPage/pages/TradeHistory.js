import React, { Component } from 'react';
import { Row, Col, Card, Icon, Table, Pagination, Select, Spin } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { SERVER_URL, getTradeStatus } from '../constants/constants';
import * as actions from "../actions/contractActions";
import "../styles/Deal.css";

const Option = Select.Option;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D.MM.YYYY');
  else return '';
};

class TradeHistory extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentTrade: null,
      currentDoc: '',
      page : 0,
      limit : 7,
      tableScreen: window.innerWidth < 1320,
      contractCount: 0,
      filterValue: "none",
    };
    this.handleChangePage = this.handleChangePage.bind(this);
  }
  componentWillMount() {
    let data = {
      user: this.props.user.user
    }
    this.props.onGetContractList(data,this.state.page);

  }
  showDoc(doc) {
    let docFile = doc[0].file;
    this.setState({
      currentDoc: "https://docs.google.com/gview?url="+SERVER_URL+docFile+"&embedded=true"
    })
  }
  handleChangePage(page){
    var data_page = page-1;
    let data = {
      user: this.props.user.user
    }
    this.setState({
      page : this.state.limit*data_page,
    })
    this.props.onGetContractList(data,this.state.limit*data_page);
  }
  handleChangeType = (value) => {
    if(value === "none"){
      this.setState({
        filterValue : value,
      })
      let data = {
        user: this.props.user.user
      }
      this.props.onGetContractList(data,this.state.page);
    }else{
      this.setState({
        filterValue : value,
      })
      let data = {
        user: this.props.user.user,
        filter_type: value,
      }
      this.props.onGetContractListFilter(data,this.state.page);
    }
  }
	render() {
    this.tableColumns = [{
      title: '№ сделки',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      render: (text,record) => {
        return <span className="blue-text txt-link" 
          onClick= {() => {
            this.props.history.push('/trade/'+record.id)}
          }>{record.id}</span>
      }

    }, {
      title: 'Наименование контрагента',
      dataIndex: 'client_obj',
      key: 'client_obj',
      width: 200,
      render: (text,record) => (
        <span>{this.props.user.user === record.client ? record.supplier_obj.company_name : record.client_obj.company_name}</span>
      )
    },{
      title: 'дата',
      dataIndex: 'datetime',
      key: 'datetime',
      width: 200,
      render: (text,record) => (
        <span>{extractTime(record.datetime)}</span>
      )
    }, {
      title: 'тип документа',
      dataIndex: 'type_doc',
      key: 'type_doc',
      width: 300,
      render: (text,record) => {
        return this.props.documentTypes.map(doc => {
          for (let r_doc in record.documents){
            if(r_doc === doc.name) {
              return (
                <p className="doc-status txt-link" key={doc.id}>
                  <b onClick={()=>{
                    this.showDoc(record.documents[r_doc]);
                    this.setState({
                      currentTrade: record
                    })
                  }}><Icon type="check-circle" className="blue-text" /> {doc.name}</b>
                </p>
              );
            }
          }
          return (
            <p className="doc-status txt-link" key={doc.id}>
              <Icon type="clock-circle-o" /> {doc.name}
            </p>
          )
        });
      }
    }];
    console.log(this.props.contractCount)
		return(
		  <div>
		    <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}              
              className="transaction-card"
              bodyStyle={{ padding: 20}}
            >                            
              <Row gutter={24} type="flex" align="middle">
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  <h2 className="fm-RobotoBold fs-14 txt-uppercase">История сделок</h2>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="flex item-cnt">
                    <span className="fm-RobotoRegular fs-13 gray-text">Категории: </span>
                    <Select 
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      defaultValue={this.state.filterValue} 
                      onChange={this.handleChangeType} 
                      className="contract_type fm-RobotoMedium fs-14 ml1"
                    >                      
                      <Option value="none">Без фильтра</Option>
                      <Option value="sell_buy">Договор купли-продажи</Option>
                      <Option value="expeditor">Договор на транспортировку</Option>
                      <Option value="storehouse">Договор на хранение</Option>
                      <Option value="security">Договор на охрану</Option>
                      <Option value="insurance">Договор страхования</Option>
                      <Option value="bank">Договор на оказание банковских услуг</Option>
                    </Select>
                  </div>
                </Col>
              </Row>
              <div className="btm-border my2"/>
              {
                this.props.laoding ?
                <Spin className="m-center mt4" />
                :
                this.props.contract_list.length === 0 ?
                  <p>Нету данных</p>
                  :
                  <Table 
                    className="account_table mt2" 
                    pagination={false} 
                    rowKey={record => record.id}
                    dataSource={this.props.contract_list} 
                    columns={this.tableColumns}
                    scroll={{ x: 500, y: 470 }}
                  />
              }
              <Pagination className="mt1" defaultCurrent={1} pageSize={7} total={this.props.contractCount} onChange={this.handleChangePage} />
            </Card>          
          </Col>  
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card
                bordered={false}
                className="transaction-card-gray"
                bodyStyle={{ padding: 20}}
              >
                <h2 className="fm-RobotoBold fs-14 txt-uppercase">Выберите документ в списке слева для отображения</h2>
                {this.state.currentTrade !== null &&
                  <div>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div className="flex justify_between mt-1">
                          <h3 className="fm-RobotoBold fs-14 txt-uppercase">Сделка {this.state.currentTrade.id}</h3>
                          <p className="fm-RobotoBold fs-12 txt-uppercase gray-text">{getTradeStatus(this.state.currentTrade.status)} <Icon type="clock-circle-o" /></p>
                        </div>
                      </Col>
                    </Row>
                    <div className="mt3"/>
                    <div className="white-block">
                      <iframe className="doc-frame" src={this.state.currentDoc} title="document"></iframe>
                    </div>
                  </div>
                }
            </Card>
          </Col>      
        </Row>
		  </div>
	  );
	}
}


const mapStateToProps = (state) => ({
  user: state.user.user,
  contract_list: state.contract.contract_list,
  documentTypes: state.company.documentTypes,
  isLoggedIn: state.auth.isLoggedIn,
  contractCount : state.contract.contractCount,
  contractNext : state.contract.contractNext,
  contractPrevious : state.contract.contractPrevious,
  laoding: state.contract.laoding,
})

const mapDispatchToProps = {
  onGetContractListFilter: actions.getContractListFilter,
  onGetContractList: actions.getContractList,
  onChangeType: actions.changeType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TradeHistory);
