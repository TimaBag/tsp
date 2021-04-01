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

const tableColumns = [{
  title: 'Стоимость',
  dataIndex: 'cost',
  key: 'cost',
  width: 100,
}, {
  title: 'Ед.изм. стоимости',
  dataIndex: 'unit',
  key: 'unit',
  width: 100,
}, {
  title: 'Период дней',
  dataIndex: 'day',
  key: 'day',
  width: 100,
}];

const tableData = [];
for (let i = 1; i <= 10; i++) {
  tableData.push({
    cost: "80 %",
    unit: "% процент",
    day: "30 дней",
  });
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

class AccountBank extends Component {


	render(){
		return(
		  <div>
		    <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <h2 className="fm-RobotoBold fs-18 black-text mb2">ЛИЧНЫЙ КАБИНЕТ
            <span className="fm-RobotoMedium fs-14 black-text"> (Банк)</span></h2>
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
                  <Button className=" btn btn-block btn-outside blue-border  light-blue-text fm-RobotoMedium fs-15"><Icon type="setting" />Редактировать данные</Button>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <Button className="btn btn-block btn-outside blue-border light-blue-text fm-RobotoMedium fs-15">История сделок</Button>
                </Col>
              </Row>
            </Card>
            <div className="flex ali mt3 mb1">
              <a className="is-active-link light-blue-text mr2">
                <span className="icon_safe"></span>Сохранить
              </a>
              <a className="is-active-link black-text mr7">
                Отмена
              </a>
              <a className="is-active-link red-text mr2">
                <span className="icon_delete"></span>Удалить
              </a>
              <a className="is-active-link black-text">
                <span className="icon_hide"></span>Скрыть
              </a>
            </div>
            <Card
              bordered={false}
              className="account_insurance-card border_none-card-head"
              title="Наименование банковских услуг"
              bodyStyle={{ padding: 20, paddingTop: 0}}
              >
                <Row gutter={24}>
                  <Col xl={10} lg={10} md={10} sm={24} xs={24}>
                    <Select
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      defaultValue="accredit"
                      onChange={handleChange}
                      className="el-block blue-text fm-RobotoMedium fs-16"
                    >
                      <Option value="accredit">Аккредитование</Option>
                    </Select>
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={24} xs={24}>
                    <Search
                      placeholder="Поиск"
                      className=""
                      onSearch={value => console.log(value)}
                    />
                  </Col>
                  <Col xl={7} lg={7} md={7} sm={24} xs={24}>
                    <Button
                      icon="plus"
                      type="primary"
                      className="btn btn-green btn-block fm-RobotoMedium fs-15"
                      onClick={this.showModal}>Добавить</Button>
                  </Col>
                </Row>


                <Table
                  className="account_table mt3"
                  pagination={false}
                  dataSource={tableData}
                  columns={tableColumns} />
              </Card>
          </Col>
        </Row>
		  </div>
	  );
	}
}

export default AccountBank;
