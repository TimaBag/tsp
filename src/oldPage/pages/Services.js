import React, { Component } from 'react';
import {  Row,
          Col,
          Input,
          Card,
          Button,
          Checkbox,
          Icon, Collapse,Select,List } from 'antd';

import '../styles/Services.css';

const Panel = Collapse.Panel;
const Search = Input.Search;
const Option = Select.Option;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
const menuItem = [
  {
    title: "Охрана",
    id : 1,
    desc : "Lorem",
    iconClass : "icon_serv_1"
  },
  {
    title : "Страхование",
    id : 2,
    desc : "Lorem",
    iconClass : "icon_serv_2"
  },
  {
    title : "Банковские инструменты",
    id : 3,
    desc : "Lorem",
    iconClass : "icon_serv_3"
  }
]


class ServicesPage extends Component {
  constructor(props){
    super(props);
    this.state = ({
      selectedServItem : null,
      selectedServShow : false,
      isActiveMenu: ''
    })
    
  }
  openServReader = (servMenuItem) => {
    this.setState({
      selectedServShow: true,
      selectedServItem: servMenuItem,
      isActiveMenu : servMenuItem.id
    })
  }
  closeServReader = () => {
    this.setState({
      selectedServShow: false,
      selectedServItem: null,
      isActiveMenu : false
    })
  }
  calcSev(){
    switch(this.state.selectedServItem.id){
      case 1:
        return(
          <div>
            <h2 className="fm-RobotoBold fs-16">КАЛЬКУЛЯТОР СТОИМОСТЬ УСЛУГ</h2>
            <div className="btm-border"/>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14">Наименование груза:</p>
                <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} defaultValue="1" className="fm-RobotoMedium fs-14 el-block">
                  <Option value="1">Ай 92</Option>
                  <Option value="2">Ай 96</Option>              
                </Select>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14">Кол-во груза:</p>
                <Input placeholder="Введите объем товара" type="text"/>
              </Col>
            </Row>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14">Кол-во груза:</p>
                <Input placeholder="Введите объем товара" type="text"/>
              </Col>
            </Row>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button type="primary" className="btn btn-block btn-green fm-RobotoMedium fs-15">Открыть сделку</Button>
              </Col>
            </Row>
          </div>
        )
      case 2:
        return(
          <div>
            <h2 className="fm-RobotoBold fs-16">КАЛЬКУЛЯТОР СТОИМОСТЬ УСЛУГ</h2>
            <div className="btm-border"/>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14">Стоимость груза:</p>
                <Input placeholder="Введите стоимость" type="text"/>
              </Col>
            </Row>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15">Рассчитать</Button>
              </Col>
            </Row>
          </div>
        )
      case 3:
        return(
          <div>
            <h2 className="fm-RobotoBold fs-16">КАЛЬКУЛЯТОР СТОИМОСТЬ УСЛУГ</h2>
            <div className="btm-border"/>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <p className="fm-RobotoRegular fs-14">Стоимость по договору:</p>
                <Input placeholder="Введите стоимость" type="text"/>
              </Col>
            </Row>
            <Row gutter={24} className="mt2">
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15">Рассчитать</Button>
              </Col>
            </Row>
          </div>
        )
      default:
        return null;
    }
   
  }
  menuCollapse(){
    return(
      <Collapse activeKey={['1']} className="in_menu_collapse">
        <Panel 
          showArrow={false} 
          key="1">
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Checkbox onChange={onChange}>Аккредитование</Checkbox>
                <Checkbox onChange={onChange}>Факторинг</Checkbox>
              </Col>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Checkbox onChange={onChange}>Банковская гарантия</Checkbox>
                <Checkbox onChange={onChange}>Инструмент 4</Checkbox>
              </Col>
            </Row>
        </Panel>
      </Collapse>
    )
  }
  render() {
    const selectedServItem = this.state.selectedServItem;
    return (
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={
                <Row gutter={24} className="flex item-cnt">
                  <Col xl={9} lg={9} md={9} sm={24} xs={24}>
                    <h2 className="fm-RobotoBold fs-16">Выбор услуги</h2>
                  </Col>
                  <Col xl={9} lg={9} md={9} sm={24} xs={24} offset={6}>
                    <Search
                      placeholder="Поиск"
                      className=""
                      onSearch={value => console.log(value)}
                    /> 
                  </Col>
                </Row>
              }
              className="service-card"
              bodyStyle={{ padding: 20, paddingTop: 0 }}        
            >              
              <List
                className="service-menu"
                itemLayout="horizontal"
                dataSource={menuItem}
                bordered
                renderItem={item => (
                  <List.Item
                    className={
                      (this.state.isActiveMenu === item.id) ? 'active_serv_menu' : ''
                    }
                    
                  >
                    <List.Item.Meta
                      onClick={() => this.openServReader(item)}
                      title={
                        <div className="srv_menu_div flex item-cnt" onClick={() => this.openServReader(item)}>
                          <span className={item.iconClass}></span>
                          <p>{item.title}</p>
                        </div>
                      }
                      className=""
                    />
                  </List.Item>
                )}
              />     
              <div className="mt4">
                {this.state.selectedServShow && this.calcSev()}
              </div>
              <div className="service_card-footer">
                <Row gutter={24}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <p className="fm-RobotoRegular fs-14">Результат: <span className="fm-RobotoBold fs-21">300 000 тнг</span></p>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15">Заключить контракт</Button>
                  </Col>                
                </Row>   
              </div>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            {(this.state.selectedServShow && selectedServItem !== null) && (
              <Card
                bordered={false}
                title={              
                  <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <div className="flex justify_between item-cnt">
                        <a onClick={() => this.closeServReader()} className="back-link"><Icon type="left" /> Назад</a>
                        <a onClick={() => this.closeServReader()} className="btn btn-close blue-text fs-21"><Icon type="close" /></a>
                      </div>
                    </Col>
                  </Row>
                }
                className="service-card"
                bodyStyle={{ padding: 20, paddingTop: 0 }}                            
              >              
                <div className="flex justify_between mt1">
                  <p className="blue-text fm-RobotoMedium fs-16">Описание услуги</p>
                  <p className="green-text fm-RobotoMedium fs-14">Подписан <Icon type="check-circle" /></p>
                </div>
                <div className="service-content">                                   
                  <p className="fm-RobotoMedium fs-18 mb2">{selectedServItem.title}</p>
                  <p className="news-content_desc mb3">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam odio neque perferendis minus commodi veritatis consectetur illo, ex quam sit dolor error assumenda optio mollitia vitae debitis rerum. Eos, minima. ipsum dolor sit amet, consectetur adipisicing elit. Modi esse maxime expedita consequuntur ipsum excepturi laudantium voluptatibus soluta ea quam porro, vero sapiente blanditiis, similique hic sint quis dolor sed. ipsum dolor sit amet, consectetur adipisicing elit. Incidunt sequi, voluptas id. Debitis dignissimos mollitia, maiores consequuntur reiciendis, vitae ullam neque amet quod omnis voluptate aperiam. Distinctio, autem, laboriosam. Velit? ipsum dolor sit amet, consectetur adipisicing elit. Iure ut nostrum velit facere, fuga, voluptatem recusandae ad ipsam quod asperiores a vero illum, voluptatum amet error nemo alias reiciendis sequi!
                  </p>
                  
                  <p className="fm-RobotoMedium fs-18 mb2">Информация о компании</p>

                  <p className="news-content_desc">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam odio neque perferendis minus commodi veritatis consectetur illo, ex quam sit dolor error assumenda optio mollitia vitae debitis rerum. Eos, minima. ipsum dolor sit amet, consectetur adipisicing elit. Modi esse maxime expedita consequuntur ipsum excepturi laudantium voluptatibus soluta ea quam porro, vero sapiente blanditiis, similique hic sint quis dolor sed. ipsum dolor sit amet, consectetur adipisicing elit. Incidunt sequi, voluptas id. Debitis dignissimos mollitia, maiores consequuntur reiciendis, vitae ullam neque amet quod omnis voluptate aperiam. Distinctio, autem, laboriosam. Velit? ipsum dolor sit amet, consectetur adipisicing elit. Iure ut nostrum velit facere, fuga, voluptatem recusandae ad ipsam quod asperiores a vero illum, voluptatum amet error nemo alias reiciendis sequi!
                  </p>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ServicesPage;
