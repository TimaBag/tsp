import React, { Component } from 'react';
import {  Row,
          Col,
          Input,
          Card,
          Button,
          Icon,Table,Select } from 'antd';

import "../styles/Account.css";

const Search = Input.Search;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const tableColumns1 = [{
  title: 'Категория товара',
  dataIndex: 'category',
  key: 'category',
  width: 100,
}, {
  title: 'Стоимость',
  dataIndex: 'cost',
  key: 'cost',
  width: 100,
  render: (text,record) => (
    <span className="blue-text">{record.cost}</span>
  )
}, {
  title: 'Ед.изм. стоимости',
  dataIndex: 'unit',
  key: 'unit',
  width: 100,
}];

const tableColumns2 = [{
  title: 'Категория товара',
  dataIndex: 'category',
  key: 'category',
  width: 100,
  render: (text, record) => (
    <Select className="el-block" defaultValue="Ai-92" onChange={handleChange}>
      <Option value="Ai-92">{record.category}</Option>
      <Option value="maz">{record.category}</Option>
    </Select>
  ),
}, {
  title: 'Стоимость',
  dataIndex: 'cost',
  key: 'cost',
  width: 100,
  render: (text, record) => (
    <Input className="blue-text" value={record.cost} />
  ),
}, {
  title: 'Ед.изм. стоимости',
  dataIndex: 'unit',
  key: 'unit',
  width: 100,
  render: (text, record) => (
    <Select className="el-block" defaultValue="tonna" onChange={handleChange}>
      <Option value="kg">{record.unit}</Option>
      <Option value="tonna">{record.unit}</Option>
    </Select>
  ),
}];
const tableData = [];
for (let i = 1; i <= 5; i++) {
  tableData.push({
    category: "АИ-92",
    cost: "136.00",
    unit: "Куб. метр",
  });
}

const account_safe_title = (
  <Row gutter={24}>

    <Col xl={8} lg={8} md={8} sm={24} xs={24} offset={8}>
      <Search
        placeholder="Поиск"
        className=""
        onSearch={value => console.log(value)}
      />
    </Col>
    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
      <Button
        icon="plus"
        className="btn btn-block btn-blue fm-RobotoMedium fs-15"
        onClick={this.showModal}>Добавить</Button>
    </Col>
  </Row>
)

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  type: 'radio',
};

class AccountSecurity extends Component {
  render(){
    return(
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h2 className="fm-RobotoBold fs-18 black-text mb2">ЛИЧНЫЙ КАБИНЕТ
            <span className="fm-RobotoMedium fs-14 black-text"> (Охрана)</span></h2>
            <Card
              bordered={false}
              className="account-card"
              bodyStyle={{ padding: 20}}
            >
              <Row gutter={24}>
                <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                  <div className="logo-large"></div>
                </Col>
                <Col xl={19} lg={19} md={19} sm={24} xs={24}>
                  <h2 className="fm-RobotoMedium fs-18 black-text mb1">Нефтепром Казахстан АО Алматы</h2>
                  <a className="fm-RobotoRegular fs-14 light-blue-text txt-underline ">www.kazneftprom.kz</a>
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
                  <Button className="
                    btn btn-block
                    btn-outside
                    blue-border
                    light-blue-text fm-RobotoMedium fs-15"><Icon type="setting" /> Редактировать данные</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button className="btn btn-block
                    btn-outside
                    blue-border
                    light-blue-text fm-RobotoMedium fs-15">История сделок</Button>
                </Col>
              </Row>
            </Card>
            <a className="is-active-link gray-text
              mt3 mb1 ">
              <span className="icon_edit"></span>Редактировать
            </a>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="account_insurance-card border_none-card-head"
              title={account_safe_title}
              bodyStyle={{ padding: 20, paddingTop: 0}}
            >
              <Table
                className="account_table mt3"
                pagination={false}
                dataSource={tableData}
                columns={tableColumns1} />
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="account_insurance-card border_none-card-head"
              title={account_safe_title}
              bodyStyle={{ padding: 20, paddingTop: 0}}
            >
              <Table
                className="account_table mt3"
                pagination={false}
                rowSelection={rowSelection}
                dataSource={tableData}
                columns={tableColumns2} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default AccountSecurity;
