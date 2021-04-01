import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card,Table,Button,Input,Row,Col,Rate,Icon  } from 'antd';
import { connect } from 'react-redux';

import * as companyActions from "../actions/companyActions";
import moment from 'moment';
import "../styles/Companies.css";

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

const Search = Input.Search;

const tableColumns = [{
  title: 'Компания',
  width: 100,
  dataIndex: 'company_name',
  key: 'company_name',
  render: (text,record) => 
    <div className="flex item-cnt">
      <div className="in_comp-table-logo">
        { record.image !== null && <img src={record.image} style={{ width: 45, height: 45 }} className="logo-circle" alt="company image" /> }
      </div>
      {text}
    </div>,
  sorter: (a, b) => {
    if(a.company_name < b.company_name) { return -1; }
    if(a.company_name > b.company_name) { return 1; }
    return 0;
  }
}, {
  title: 'Рейтинг',
  width: 100,
  dataIndex: 'rating',
  key: 'rating',
  render: (text,record) => <span className="blue-text"><Rate disabled character={<span>&#9733;</span>} value={text} /></span>,
  sorter: (a, b) => a.rating - b.rating,
}, {
  title: 'Дата регистрации',
  width: 100,
  dataIndex: 'registration_date', 
  key: 'registration_date',
  render: (text) => <div>{extractTime(text)}</div>,
  sorter: (a, b) => {
          if(a.registration_date < b.registration_date) return -1;
          if(a.registration_date > b.registration_date) return 1;
          return 0;
        },
}, {
  title: 'Завершено сделок',
  width: 100,
  dataIndex: 'number_of_contracts',
  key: 'number_of_contracts',
  sorter: (a, b) => moment(a.number_of_contracts) - moment(b.number_of_contracts),
}, {
  title: 'Подробнее',
  width: 100,
  key: 'action',
  render: (text, record) => {
    return <Link to={"/profile/" + record.user}><Button className="companies_profile-link btn-blue">Профиль</Button></Link>
  },
}];

class CompaniesPage extends Component {
  constructor(props){
    super(props)
    this.state={
      searchText: "",
    }
  }
  componentWillMount() {
    this.props.onGetCompanies();
  }

  handleSearch = (event) => {
    this.setState({
      searchText: event.target.value.toLowerCase(),
    })
    let data = {
      name : event.target.value.toLowerCase(),
    }
    this.props.onGetCompaniesByName(data);
  }

  filterData = (data) => {
    return data.filter(d => {
        return d.accepted;
      })
  }

  render() {
    return (
      <div>
      	<Card
          bordered={false}
          bodyStyle={{ padding: '20px' }}
          className="companies-card"
          title={
            <Row gutter={24} className="flex item-cnt">
              <Col xl={4} lg={4} md={4} sm={24} xs={24} >
                <h2 className="fm-RobotoBold fs-14 black-text">Список Компаний</h2>
              </Col>
              <Col xl={5} lg={5} md={5} sm={24} xs={24} offset={15}>
                <Search
                  placeholder="Поиск"
                  onChange={this.handleSearch}
                  value={this.state.searchText}
                />
              </Col>
            </Row>
          }
        >
          <Table pagination={false}
            className="companies-table"
            dataSource={this.filterData(this.props.companyAllList)} columns={tableColumns}
            scroll={{ x: 1000 }}
            size='small'
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companyAllList : state.company.companyAllList
})

const mapDispatchToProps = {
  onGetCompanies: companyActions.getAllCompanies,
  onGetCompaniesByName: companyActions.getAllCompaniesByName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompaniesPage);
