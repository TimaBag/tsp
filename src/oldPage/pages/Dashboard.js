import React, { Component } from 'react';
import {  Row, Col } from 'antd';
import { connect } from 'react-redux';
// import _ from 'lodash';

import OfferAndDemandCard from '../components/OfferAndDemandCard';
import NewsCard from '../components/NewsCard';
import CalendarCard from '../components/CalendarCard';
import ChartCard from '../components/ChartCard';
import '../styles/Dashboard.css';
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state={
      loading: false,
      visible: false,
      checkModal: false,
    }
  }
  componentWillMount() {
    this.props.onGetRoleList();
    this.props.onGetRegionList();
    this.props.onGetCategoryList();
    this.props.onGetResourceList();
    this.props.onGetProducerList();
    this.props.onGetMeasureList();
    this.props.onGetStationList();
    this.props.onGetCompanyTypes();
    this.props.onGetDocumentTypes();
    this.props.onGetCompanySegments();
    this.props.isLoggedIn && this.props.onGetExpeditorList();
    this.props.onGetStorehouseList();
    this.props.onGetStandardList();
    this.props.onGetDeliveryCons();
    this.props.isLoggedIn && this.props.onGetTradesmanList();
    this.props.onGetPayboxUrl();
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div>
        <Row gutter={24} className="mb2">
          <Col xl={24} lg={24} md={0} sm={24} xs={24} style={{paddingRight: '15px'}}>
            <div className="slogan txt-center">
              <p className="fs-16 fw-700 light-blue-text fm-RobotoMedium"><i>"Применяя лучший опыт на рынке, объединяя лучших на рынке"</i></p>
              <p className="fs-16 black-text fm-RobotoMedium">Торгово-информационная платформа оптового рынка сырьевых и узкопрофильных товаров</p>
            </div>
          </Col>
        </Row>
        {
          window.innerWidth < 576 &&
          <Row gutter={24} className="mb2">
            <Col xl={0} lg={0} md={0} sm={24} xs={24} style={{paddingRight: '15px'}}>
              <ChartCard />
            </Col>
          </Row>
        }
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{paddingRight: '15px'}}>
            <OfferAndDemandCard />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={10} lg={10} md={10} sm={0} xs={0} style={{paddingRight: '15px'}}>
            <ChartCard />
          </Col>

          <Col xl={7} lg={7} md={7} sm={0} xs={0}  style={{padding: '0 15px'}}>
            <CalendarCard />
          </Col>

          <Col xl={7} lg={7} md={7} sm={0} xs={0} style={{paddingLeft: '15px'}}>
            <NewsCard />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  payboxUrl: state.profile.payboxUrl,
})

const mapDispatchToProps = {
  onGetRoleList: profileActions.getRoles,
  onGetRegionList: profileActions.getRegions,
  onGetCategoryList: resourceActions.getCategories,
  onGetResourceList: resourceActions.getResources,
  onGetProducerList: resourceActions.getProducers,
  onGetMeasureList : resourceActions.getMeasureList,
  onGetTradesmanList: companyActions.getTradesmanList,
  onGetStorehouseList: companyActions.getStorehouseList,
  onGetStationList: companyActions.getStationList,
  onGetCompanyTypes: companyActions.getCompanyTypes,
  onGetDocumentTypes: companyActions.getDocumentTypes,
  onGetCompanySegments: companyActions.getCompanySegments,
  onGetStandardList: companyActions.getStandardList,
  onGetDeliveryCons: companyActions.getDeliveryCons,
  onGetExpeditorList : resourceActions.getExpeditorList,
  onGetPayboxUrl: profileActions.getPayboxUrl
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
