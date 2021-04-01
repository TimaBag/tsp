import React, { Component } from 'react';
import { Row, Col, Card, Button, List, Divider,Rate, Modal,Table} from 'antd';
import { connect } from 'react-redux';
// import _ from 'lodash';
import moment from 'moment';

import { SERVER_URL } from '../constants/constants';
import * as profileActions from "../actions/profileActions";
import * as dashboardActions from "../actions/dashboardActions";
import "../styles/Profile.css";

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

class ProfilePage extends Component {
  constructor(props){
    super(props)
    const companyID = this.props.match.params.company_id;
    this.state = {
      ownProfile: this.props.user.user === parseInt(companyID, 10),
      show_doc : false,
      offerModalVisible : false,
      demandModalVisible : false,
      searchText: '',
      show_gallery : false,
      show_video : false,
      show_present : false,
      show_avatar : false,
      "file": null,
      "type": null,
      "pending_registration_profile": null,
      avatar : null,
    }
    
    this.tableColumns = [
      {
        title: 'Наименование товара',
        dataIndex: 'resource',
        width: 60,
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
      },{
        title: 'Поставщик',
        dataIndex: 'company_name',
        width: 120,
        sorter: (a, b) => {
          if(a.company_name < b.company_name) return -1;
          if(a.company_name > b.company_name) return 1;
          return 0;
        },
      },{
        title: 'Дата',
        dataIndex: 'datetime',
        width: 100,
        render: (text,record) => (
          <span>{extractTime(record.datetime)}</span>
        ),
        sorter: (a, b) => {
          if(a.datetime < b.datetime) return -1;
          if(a.datetime > b.datetime) return 1;
          return 0;
        },
      },  {
        title: 'Цена',
        dataIndex: 'price',
        width: 60,
        render: (text,record) => (
          <span>{record.price}</span>
        ),
        sorter: (a, b) => {
          if(a.price < b.price) return -1;
          if(a.price > b.price) return 1;
          return 0;
        },
      }, {
        title: 'Кол-во в наличии',
        dataIndex: 'volume',
        width: 100,
        sorter: (a, b) => {
          if(a.volume < b.volume) return -1;
          if(a.volume > b.volume) return 1;
          return 0;
        },
      }, {
        title: 'Единица измерения',
        dataIndex: 'metric_unit',
        width: 100,
        render: (text,record) => {
          let res = this.props.measureList.filter((res) => res.id === record.metric_unit)[0];
          let resName = (res !== undefined)?res.name:'';
          return <span>{resName}</span>
        }
      }, {
        title: 'Производство',
        dataIndex: 'production_place_verbose',
        width: 100,
        render: (text,record) => (
          <span>{record.production_place_verbose}</span>
        ),
        sorter: (a, b) => {
          if(a.production_place_verbose < b.production_place_verbose) return -1;
          if(a.production_place_verbose > b.production_place_verbose) return 1;
          return 0;
        },
      }, {
        title: 'Стандарт качества',
        dataIndex: 'quality_standard_verbose.name',
        width: 100,
        sorter: (a, b) => {
          if(a.quality_standard_verbose.name < b.quality_standard_verbose.name) return -1;
          if(a.quality_standard_verbose.name > b.quality_standard_verbose.name) return 1;
          return 0;
        },
      }, {
        title: 'Регион нахождения',
        dataIndex: 'region',
        width: 100,
        render: (text,record) => (
          <span>{record.region_verbose}</span>
        ),
        sorter: (a, b) => {
          if(a.region_verbose < b.region_verbose) return -1;
          if(a.region_verbose > b.region_verbose) return 1;
          return 0;
        },
      }
    ];
    this.handleShowDoc = this.handleShowDoc.bind(this);
    this.handleCancelShowDoc = this.handleCancelShowDoc.bind(this);
    this.handleShowDemand = this.handleShowDemand.bind(this);
    this.handleShowOffer = this.handleShowOffer.bind(this);
    this.closeOfferModal = this.closeOfferModal.bind(this);
    this.closeDemandModal = this.closeDemandModal.bind(this);
    this.handleCancelGallery = this.handleCancelGallery.bind(this);
    this.handleGallery = this.handleGallery.bind(this);
    this.handleCancelVideo = this.handleCancelVideo.bind(this);
    this.handleVideo = this.handleVideo.bind(this);
    this.handleCancelPresent = this.handleCancelPresent.bind(this);
    this.handlePresent = this.handlePresent.bind(this);
    this.handleShowAvatar = this.handleShowAvatar.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
    this.handleCancelAvatar = this.handleCancelAvatar.bind(this);
    this.handleDeleteAvatar = this.handleDeleteAvatar.bind(this);
  }
  componentWillMount(){
    if(this.props.match.params.company_id !== undefined){
      this.props.onGetProfile(this.props.match.params.company_id);
      this.props.onGetDemands(this.props.match.params.company_id);
      this.props.onGetOffers(this.props.match.params.company_id);
      this.props.onGetReview(this.props.match.params.company_id);
      this.props.onGetGallery(this.props.match.params.company_id);
    }
  }
  handleShowDoc(){
    this.setState({
      show_doc : true,
    })
  }
  handleCancelShowDoc(){
    this.setState({
      show_doc : false,
    })
  }
  handleShowDemand(){
    this.setState({
      demandModalVisible : true,
    })
  }
  handleShowOffer(){
    this.setState({
      offerModalVisible : true,
    })
  }
  closeDemandModal(){
    this.setState({
      demandModalVisible : false,
    })
  }
  closeOfferModal(){
    this.setState({
      offerModalVisible : false,
    })
  }
  handleCancelGallery(){
    this.setState({
      show_gallery : false,
    })
  }
  handleGallery(){
    this.setState({
      show_gallery : true,
    })
  }
  handleCancelVideo(){
    this.setState({
      show_video : false,
    })
  }
  handleVideo(){
    this.setState({
      show_video : true,
    })
  }
  handleCancelPresent(){
    this.setState({
      show_present : false,
    })
  }
  handlePresent(){
    this.setState({
      show_present : true,
    })
  }
  handleShowAvatar(){
    this.setState({
      show_avatar : true,
    })
  }
  handleCancelAvatar(){
    this.setState({
      show_avatar : false,
      avatar : null,
    })
  }
  handleChangeAvatar(selectorFiles){
    this.setState({
      avatar : selectorFiles[0]
    })
  }
  handleAvatar(){
    let dataAvatar = new FormData();
    dataAvatar.append("image", this.state.avatar);
    let data = {
      "company_id" : this.props.companyProfile.user_json.id,
      profile_id : this.props.companyProfile.user,
      avatar : dataAvatar,
    }
    this.props.onUpdateAvatar(data);
    this.setState({
      show_avatar : false,
      avatar : null,
    })
  }
  handleDeleteAvatar(){
    let data = {
      "company_id" : this.props.companyProfile.user_json.id,
      profile_id : this.props.companyProfile.user,
      avatar : {
        image : null,
      },
    }
    this.props.onDeleteAvatar(data);
  }
  filterData = (data) => {
    if(this.state.searchText === '') return data;
    else {
      return data.filter(d => {
        return d.company_name.toLowerCase().includes(this.state.searchText) ||
               d.station_name.toLowerCase().includes(this.state.searchText) ||
               d.region_verbose.toLowerCase().includes(this.state.searchText) ||
               d.production_place_verbose.toLowerCase().includes(this.state.searchText);
      })
    }
    // return data;
  }
	render(){
    const { companyProfile } = this.props;
		return(
		  <div>
        {companyProfile !== undefined && companyProfile !== null &&
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card
                bordered={false}
                title="ПРОФИЛЬ"
                className="profile-card"
              >
                {/* <span className="profile_last-update">Последнее действие: 22.11.2017 16:20</span> */}
                <div className="profile-head">
                  <Row gutter={24}>
                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                      <div>
                        <div className="profile_logo">
                          { companyProfile.user_json.image !== null && <img src={"http://www.tradehouse.kz"+companyProfile.user_json.image} style={{ width: 85, height: 85 }} className="logo-circle" alt="circle logo" /> }
                        </div>
                        {
                          this.state.ownProfile &&
                          (<div>
                            <Button onClick={this.handleDeleteAvatar} className="profile_head-btn">удалить</Button>
                            <Button onClick={this.handleShowAvatar} className="profile_head-btn mt1">заменить</Button>
                          </div>)
                        }
                      </div>
                    </Col>
                    <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                      <div className="profile_data">
                        <h2 className="white-text">{companyProfile.user_json && companyProfile.user_json.company_name}</h2>
                        <a className="white-text profile_data-link">{companyProfile.user_json && companyProfile.user_json.company_site } </a>
                        <div className="white-text"><span>Рейтинг:</span><Rate disabled value={companyProfile ? companyProfile.rating : 0} /></div>
                        <p><span>Дата регистрации:</span>{companyProfile && extractTime(companyProfile.registration_date)}</p>
                        <p><span>завершено сделок</span>{companyProfile.user_json && companyProfile.number_of_contracts}</p>
                      </div>
                      <div style={{marginTop:25}} >
                        {!this.state.ownProfile && <Button className="profile_active-btn" onClick={this.handleShowDemand}>Активные заявки</Button>}
                        {!this.state.ownProfile && <Button className="profile_active-btn mt1" onClick={this.handleShowOffer}>Активные предложения</Button>}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="profile-desc">
                  <div className="flex justify_between item-cnt">
                    <h2>ОПИСАНИЕ КОМПАНИИ</h2>
                    {/*this.state.ownProfile && <a className="profile_edit-link my1"><span className="icon_edit_blue"></span>Редактировать</a>*/}
                  </div>
                  <span>О компании и описание деятельности:</span>
                  <p>{companyProfile.user_json.company_description}</p>
                </div>
                <div className="profile-list">
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <List
                        itemLayout="horizontal"
                      >
                        <List.Item>
                          <List.Item.Meta
                            title="Наименование участника"
                            description={companyProfile.user_json.company_name}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title="Роль участника"
                            description={companyProfile.user_json.role_verbose}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title="Банковские реквизиты"
                            description={companyProfile.user_json.bank_name}
                          />
                        </List.Item>
                        <List.Item>
                          <List.Item.Meta
                            title="Фактический адрес"
                            description={companyProfile.user_json.actual_address}
                          />
                        </List.Item>
                      </List>
                    </Col>
                  </Row>
                  <Divider/>
                  <div className="flex flex-column">
                    <Button className="blue-text profile_view-doc" onClick={this.handleShowDoc}>Посмотреть пакет документов</Button>
                    <Button className="blue-text profile_view-doc mt1" onClick={this.handleGallery}>Посмотреть галерею</Button>
                    <Button className="blue-text profile_view-doc mt1" onClick={this.handleVideo}>Посмотреть видео</Button>
                    <Button className="blue-text profile_view-doc mt1" onClick={this.handlePresent}>Посмотреть презентацию</Button>
                  </div>
                </div>

              </Card>
            </Col>

            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <Card
                bordered={false}
                title="ОТЗЫВЫ О КОМПАНИИ"
                className="profile-card-comment"
                bodyStyle={{ padding: 20, paddingTop: 0 }}
              >
                <div>
                  <List
                    itemLayout="horizontal"
                    dataSource={this.props.review}
                    className="profile_comment-list"
                    renderItem={item => (
                      <List.Item>
                        <Card
                          className="profile_comment-list_card"
                          bodyStyle={{ padding: 10}}
                        >
                          <div className="profile_comment-header">
                            <Row gutter={24}>
                              <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                                <div className="profile_comment-logo"></div>
                              </Col>
                              <Col xl={20} lg={20} md={20} sm={24} xs={24}>
                                <h2>{item.user_verbose}</h2>
                                <p><span className="gray-text">Услуга : </span> {item.service_name}</p>
                                <p><span className="gray-text">Дата : </span>{moment(item.datetime).format("YYYY-MM-DD")}</p>
                                <p><span className="gray-text">Рейтинг : </span><span className="blue-text ml2"><Rate disabled value={item.mark} /></span></p>
                              </Col>
                            </Row>
                          </div>
                          <p className="profile_comment-desc mt2">{item.comment}</p>
                        </Card>
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        }
        <Modal
          title="Сменить фотографию"
          visible={this.state.show_avatar}
          className="add-modal"
        > 
          <input
            className=""
            accept="*"
            type="file"
            name="avatar"
            onChange={ (e) => this.handleChangeAvatar(e.target.files) }
          />
          <div className="flex mt1">
            <Button 
              disabled={this.state.avatar === null}
              className="blue-text profile_view-doc" 
              onClick={this.handleAvatar}>Сохранить</Button>
            <Button className="blue-text profile_view-doc ml1" onClick={this.handleCancelAvatar}>Отмена</Button>
          </div>
        </Modal>
        <Modal
          title="Галерия"
          visible={this.state.show_gallery}
          onCancel={this.handleCancelGallery}
          className="add-modal"
          width={960}
        > 
          <div className="gallery_block">
            {
              this.props.profile_file.length !== 0 && 
              this.props.profile_file.map((file,index) => 
                {
                  if(file.type === 0){
                    return <img key={index} src={file.file} className="gallery_img"/>
                  }
                })
            }
          </div>
        </Modal>
        <Modal
          title="Видео"
          visible={this.state.show_video}
          onCancel={this.handleCancelVideo}
          className="add-modal"
          width={900}
        > 
          <div className="gallery_vide_block">
            {
              this.props.profile_file.length !== 0 && 
              this.props.profile_file.map((file,index) => 
                {
                  if(file.type === 1){
                    return <video className="gallery_video" controls="controls">
                              <source src={ file.file } />
                            </video>
                  }
                })
            }
          </div>
        </Modal>
        <Modal
          title="Презентация"
          visible={this.state.show_present}
          onCancel={this.handleCancelPresent}
          className="add-modal"
          width={700}
        > 
          <div className="gallery_block">
            {
              this.props.profile_file.length !== 0 && 
              this.props.profile_file.map((file,index) => 
                {
                  if(file.type === 2){
                    return <a href={file.file} download="Презентация">Презентация</a>
                  }
                })
            }
          </div>
        </Modal>
        <Modal
          title="Документы"
          visible={this.state.show_doc}
          onCancel={this.handleCancelShowDoc}
          className="add-modal"
        > 
          <div className="flex flex-column">
            {this.props.user.user_json.power_of_attorney !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.power_of_attorney+"&embedded=true"} target="_blank">Доверенность</a>}
            {this.props.user.user_json.decree !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.decree+"&embedded=true"} target="_blank">Приказ</a>}
            {this.props.user.user_json.registration_certificate !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.registration_certificate+"&embedded=true"} target="_blank">Свидетельство о регистрации</a>}
            {this.props.user.user_json.document !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.document+"&embedded=true"} target="_blank">Документ</a>}
            {this.props.user.user_json.regulations !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.regulations+"&embedded=true"} target="_blank">Устав</a>}
            {this.props.user.user_json.taxpayer_certificate !== undefined && <a href={"https://docs.google.com/gview?url="+SERVER_URL+this.props.user.user_json.taxpayer_certificate+"&embedded=true"} target="_blank">Свидетельство налогоплательщика</a>}
          </div>
        </Modal>
        <Modal
          title={<h2 className="fm-RobotoBold fs-14 black-text">КАРТОЧКА ПРЕДЛОЖЕНИЯ</h2>}
          visible={this.state.offerModalVisible}
          width={1000}
          onCancel={this.closeOfferModal}
          className="add-modal"
        >
          <Table
            className="dashboard-table"
            rowKey={record => record.id}
            dataSource={this.filterData(this.props.offers)}
            columns={this.tableColumns}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 1000 }} size='small'/>
        </Modal>
        <Modal
          title={<h2 className="fm-RobotoBold fs-14 black-text">КАРТОЧКА ЗАЯВКИ</h2>}
          visible={this.state.demandModalVisible}
          width={1000}
          onCancel={this.closeDemandModal}
          className="add-modal"
        >
          <Table
            className="dashboard-table"
            rowKey={record => record.id}
            dataSource={this.filterData(this.props.demands)}
            columns={this.tableColumns}
            pagination={{ pageSize: 8 }}
            scroll={{ x: 1000 }}
            size='small' />
        </Modal>
		  </div>
	  );
	}
}

const mapStateToProps = (state) => ({
  offers: state.offer.offersCompany,
  demands: state.demand.demandsCompany,
  isLoggedIn: state.auth.isLoggedIn,
  companyProfile: state.profile.companyProfile,
  user: state.user.user,
  resourceList: state.resource.resourceList,
  producerList: state.resource.producerList,
  measureList: state.resource.measureList,
  review : state.profile.review,
  profile_file : state.profile.profile_file
})

const mapDispatchToProps = {
  onGetProfile: profileActions.getCompanyProfile,
  onGetOffers: dashboardActions.getOffersCompany,
  onGetDemands: dashboardActions.getDemandsCompany,
  onGetReview : profileActions.getReview,
  onSendGallery : profileActions.sendGallery,
  onGetGallery : profileActions.getGallery,
  onUpdateAvatar : profileActions.updateAvatar,
  onDeleteAvatar : profileActions.deleteAvatar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
