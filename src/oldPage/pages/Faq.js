import React, { Component } from 'react';
import {  Row,
          Col,
          Input,
          Card,
          Menu,
          Icon,Collapse } from 'antd';
import "../styles/Faq.css";
const Search = Input.Search;
const Panel = Collapse.Panel;

const text = (
  <p>
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  </p>
);

const faq_title = (
  <Row gutter={24} className="flex item-cnt">
    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
      <h2 className="fm-RobotoBold fs-16 black-text">Разделы вопросов</h2>
    </Col>    
    <Col xl={10} lg={10} md={10} sm={24} xs={24} offset={8}>
      <Search
        placeholder="Поиск"        
        onSearch={value => console.log(value)}      
      />
    </Col>
  </Row>  
)

const faq_title_1 = (
  <Row gutter={24}>
    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      <div className="flex justify_between item-cnt">
        <button className="back-link"><Icon type="left" /> Назад</button>
        <a className="btn btn-close blue-text fs-21"><Icon type="close" /></a>
      </div>
    </Col>    
  </Row>
)

class FaqPage extends Component {

  render() {
    return (
      <div>
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={faq_title}
              className="faq-card faq_border-none"
              bodyStyle={{ padding: 20, paddingTop: 0 }}              
            >            
              <Menu theme="light" mode="inline"
                className="faq-menu">
                  <Menu.Item key="0"><div className="flex item-cnt"><span className="icon_profile"></span><p>Мой профиль</p></div></Menu.Item>
                  <Menu.Item key="1"><div className="flex item-cnt"><span className="icon_order"></span><p>Заказы/предложения</p></div></Menu.Item>
                  <Menu.Item key="2"><div className="flex item-cnt"><span className="icon_contract"></span><p>Контрактное окно</p></div></Menu.Item>          
              </Menu>
              
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={faq_title_1}
              className="faq-card"
              bodyStyle={{ padding: 20, paddingTop: 0 }}              
            >              
              <div className="quest-content">
                <h2 className="blue-text title-section_guest">Заказы/предложения</h2>
                <Collapse bordered={false} className="faq-collapse">
                  <Panel header="This is panel header 1" key="1" className="in_guest-content">
                    {text}
                  </Panel>
                  <Panel header="This is panel header 2" key="2" className="in_guest-content">
                    {text}
                  </Panel>
                  <Panel header="This is panel header 3" key="3" className="in_guest-content">
                    {text}
                  </Panel>
                </Collapse>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


export default FaqPage;

