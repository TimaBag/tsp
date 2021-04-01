import React, { Component } from 'react';
import { Row, Col, Card, Button,List,Icon,DatePicker,Input, InputNumber,Modal,Rate } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

import "../styles/Deal.css";
import { SERVER_URL } from '../constants/constants';
import * as actions from "../actions/contractActions";
import * as chatActions from "../actions/chatActions";
import * as tradeActions from "../actions/tradeActions";
import * as ncaLayer from "./ncalayer.js";
import $ from "jquery";

const RangePicker = DatePicker.RangePicker;
const TextArea = Input.TextArea;

class Trade extends Component {
  constructor(props){
    super(props);
    var doc_person = null;
    var doc_person_nominative = null;
    var doc_based = null;
    if(this.props.contract !== null){
      doc_person = (this.props.contract.client === this.props.userProfile.user) ? this.props.contract.client_person_in_charge : this.props.contract.supplier_person_in_charge;
      doc_person_nominative = (this.props.contract.client === this.props.userProfile.user) ? this.props.contract.client_person_in_charge_nominative : this.props.contract.supplier_person_in_charge_nominative;
      doc_based = (this.props.contract.client === this.props.userProfile.user) ? this.props.contract.client_on_the_grounds_of : this.props.contract.supplier_on_the_grounds_of;
    }
    this.state = {
      contract: null,
      dogovor: null,
      doc_state: false,
      currentDoc: '',
      doc_period_start: (this.props.contract !== null)?this.props.contract.active_from: new Date(),
      doc_period_end: (this.props.contract !== null)?this.props.contract.active_to :new Date(),
      doc_person: doc_person,
      doc_person_nominative: doc_person_nominative,
      doc_delivery: (this.props.contract !== null)?this.props.contract.delivery_date_to :null,
      doc_based: doc_based,
      what_for: (this.props.contract !== null)?this.props.contract.what_for :'',
      prepay_percent: (this.props.contract !== null)?this.props.contract.prepay_percent :'',
      weight: '',
      tank_numbers: '',
      tank_volumes: '',
      messageText: '',
      showModalAuth : false,
      showModalSign : false,
      showModalComment : false,
      rate_value : 0,
      comment_text : "",
    }
    this.handleSendAuth = this.handleSendAuth.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleSignAfter = this.handleSignAfter.bind(this);
    this.showModalComment = this.showModalComment.bind(this);
    this.closeModalComment = this.closeModalComment.bind(this);
    this.handleSendComment = this.handleSendComment.bind(this);
    this.handleChangeComment = this.handleChangeComment.bind(this);
  }
  componentWillMount() {
    this.getContract();
  }
  getContract = () =>{
    let contractID = this.props.match.params.contract_id;
    let data = {
      contract: contractID
    };
    this.props.onGetContract(data);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.contract !== undefined && nextProps.contract !== null){
      this.setState({
        contract: nextProps.contract,
        doc_person: (nextProps.contract.client === this.props.userProfile.user) ? nextProps.contract.client_person_in_charge : nextProps.contract.supplier_person_in_charge,
        doc_person_nominative: (nextProps.contract.client === this.props.userProfile.user) ? nextProps.contract.client_person_in_charge_nominative : nextProps.contract.supplier_person_in_charge_nominative,
        doc_based: (nextProps.contract.client === this.props.userProfile.user) ? nextProps.contract.client_on_the_grounds_of : nextProps.contract.supplier_on_the_grounds_of,
        what_for: nextProps.contract.what_for,
        prepay_percent: nextProps.contract.prepay_percent,
        weight: nextProps.contract.weight,
        tank_numbers: nextProps.contract.tank_numbers,
        tank_volumes: nextProps.contract.tank_volumes,
        doc_delivery: (nextProps.contract.delivery_date_to !== null)?nextProps.contract.delivery_date_to:new Date(),
        doc_period_start: (nextProps.contract.active_from !== null)?nextProps.contract.active_from: new Date(),
        doc_period_end: (nextProps.contract.active_to !== null)?nextProps.contract.active_to :new Date(),

      });

      // 
    } 
    // else if(nextProps.uploadedDocument !== undefined && nextProps.uploadedDocument !== null) {
    //   this.getContract();
    // }
  }
  handleSelectDoc(selectorFiles, docID) {
    let data = new FormData();
    data.append("file", selectorFiles[0]);
    data.append("name", selectorFiles[0].name);
    data.append("contract", this.props.contract.id);
    data.append("previous_version_id", "");
    data.append("original_verion_id", "");
    data.append("file_text", "");
    data.append("type", docID);
    this.props.onSendContractDoc(data);
    // this.getContract();
  }
  handleApproveContract = () => {
    let data = null;
    if(this.props.contract.client === this.props.userProfile.user){
      data = {
        status: 1,
        contract: this.props.contract.id,
      };
    }else{
      data = {
        status: 2,
        contract: this.props.contract.id,
      };
    }
    this.props.onApproveContract(data);
  }
  handleApproveContractAfter = () => {
    let data = {
        status: 3,
        contract: this.props.contract.id,
      };
    this.props.onApproveContract(data);
  }
  handleSelectDocPeriod = (date) => {
    let start = moment(date[0]).utc().format();
    let end = moment(date[1]).utc().format();

    this.setState({ doc_period_start: start });
    this.setState({ doc_period_end: end });
  }
  handleChangeBased = (e) => {
    this.setState({ doc_based: e.target.value });
  }
  handleChangePerson = (e) => {
    this.setState({ doc_person: e.target.value });
  }
  handleChangePersonNominative = (e) => {
    this.setState({doc_person_nominative : e.target.value})
  }
  handleChangeDelivery = (e) => {
    let date = moment(e).utc().format();
    this.setState({ doc_delivery: date });
  }
  handleWhatFor = (e) => {
    this.setState({ what_for: e.target.value });
  }
  handlePrepayPercent = (value) => {
    this.setState({ prepay_percent: value });
  }
  handleTankNumbers = (value) => {
    this.setState({ tank_numbers: value });
  }
  handleTankVolumes = (value) => {
    this.setState({ tank_volumes: value });
  }
  handleWeight = (value) => {
    this.setState({ weight: value });
  }
  // for messaging
  handleEnterMessage = (e) => {
    this.setState({ messageText: e.target.value })
  }
  handleSendMessage = () => {
    var toUser = (this.props.contract.supplier === this.props.userProfile.user) ? this.props.contract.client : this.props.contract.supplier;
    let data = {
      text: this.state.messageText,
      is_read: false,
      from_user: this.props.userProfile.user,
      to_user: toUser
    }
    this.setState({ messageText: ''});
    this.props.onSendMessage(data);
  }

  handleOnSaveDocInfo = () => {
    let data = {};
    if(this.props.contract.client === this.props.userProfile.user){
      data = {
        contract: this.props.contract.id,
        docInfo: {
          active_from: this.state.doc_period_start,
          active_to: this.state.doc_period_end,
          delivery_date_to: this.state.doc_delivery,
          what_for: this.state.what_for,
          prepay_percent: this.state.prepay_percent,
          tank_numbers: this.state.tank_numbers,
          tank_volumes: this.state.tank_volumes,
          weight: this.state.weight,
          client_person_in_charge: this.state.doc_person,
          client_person_in_charge_nominative: this.state.doc_person_nominative,
          client_on_the_grounds_of: this.state.doc_based,
        }
      }
    }else{
      data = {
        contract: this.props.contract.id,
        docInfo: {
          active_from: this.state.doc_period_start,
          active_to: this.state.doc_period_end,
          delivery_date_to: this.state.doc_delivery,
          what_for: this.state.what_for,
          prepay_percent: this.state.prepay_percent,
          tank_numbers: this.state.tank_numbers,
          tank_volumes: this.state.tank_volumes,
          weight: this.state.weight,
          supplier_person_in_charge: this.state.doc_person,
          supplier_person_in_charge_nominative: this.state.doc_person_nominative,
          supplier_on_the_grounds_of: this.state.doc_based,
        }
      }
    }
    this.props.onSaveDocInfo(data);
  }
  handleGetInfo(){
    ncaLayer.getKeyInfoCall();
  }
  handleSendAuthKey(){
    ncaLayer.showFileChooserCall();
  }
  handleSignKey(){
    ncaLayer.createCMSSignatureFromFileCall();
  }
  showDoc(doc) {
    this.setState({
      currentDoc: "https://docs.google.com/gview?url="+SERVER_URL+doc+"&embedded=true"
    })
  }
  showModalAuth = () => {
    this.setState({
      visibleAuth: true,
    });
  }
  handleSendAuth(){
    let data = {
      key_id : $("#keyId").val(),
      cert_serial : $("#serialNumber").val(),
      cert_date_from : moment($("#date_from").val()).format("YYYY-MM-DDThh:mm"),
      cert_date_to : moment($("#date_to").val()).format("YYYY-MM-DDThh:mm"),
      uz_cert_id : $("#authorityKeyIdentifier").val(),
      issuer_info : $("#subjectDn").val(),
      signer_citizenship : $("#signer_obj_c").val(),
      signer_email : $("#signer_obj_e").val(),
      signer_surname_name : $("#signer_obj_cn").val(),
      signer_patrynomic : $("#signer_obj_g").val(),
      signer_location : $("#signer_obj_l").val(),
      signer_organisation : $("#signer_obj_o").val(),
      signer_organisation_bin : $("#signer_obj_ou").val(),
      signer_city : $("#signer_obj_s").val(),
      signer_iin : $("#signer_obj_serialnumber").val(),
      signer_surname : $("#signer_obj_surname").val(),
      contract : this.props.contract.id,
      user : this.props.userProfile.user,
    }
    this.props.onSendTradeAuth(data);
    this.setState({
      visibleAuth : false
    })
  }
  handleSign(){
    let data = {
      key_id : $("#keyId").val(),
      cert_serial : $("#serialNumber").val(),
      cert_date_from : moment($("#date_from").val()).format("YYYY-MM-DDThh:mm"),
      cert_date_to : moment($("#date_to").val()).format("YYYY-MM-DDThh:mm"),
      uz_cert_id : $("#authorityKeyIdentifier").val(),
      issuer_info : $("#subjectDn").val(),
      signer_citizenship : $("#signer_obj_c").val(),
      signer_email : $("#signer_obj_e").val(),
      signer_surname_name : $("#signer_obj_cn").val(),
      signer_patrynomic : $("#signer_obj_g").val(),
      signer_location : $("#signer_obj_l").val(),
      signer_organisation : $("#signer_obj_o").val(),
      signer_organisation_bin : $("#signer_obj_ou").val(),
      signer_city : $("#signer_obj_s").val(),
      signer_iin : $("#signer_obj_serialnumber").val(),
      signer_surname : $("#signer_obj_surname").val(),
      contract : this.props.contract.id,
      document_id : this.props.contract.documents["Договор"][0].id,
      user : this.props.userProfile.user,
      cms_sign : $("#cms_sign").val(),
      isAuth : this.props.isAuth,
    }
    let data_status = {};
    if(this.props.contract.client === this.props.userProfile.user){
      data_status = {
        contract : this.props.contract.id,
        status: 4,
      };
    }else{
      data_status = {
        contract : this.props.contract.id,
        status: 5,
      };
    }
    this.props.onApproveContract(data_status);
    this.props.onSendTradeSign(data);
    this.setState({
      visibleSign : false
    })
  }
  handleSignAfter(){
    let status = 0;
    let data = {
      key_id : $("#keyId").val(),
      cert_serial : $("#serialNumber").val(),
      cert_date_from : moment($("#date_from").val()).format("YYYY-MM-DDThh:mm"),
      cert_date_to : moment($("#date_to").val()).format("YYYY-MM-DDThh:mm"),
      uz_cert_id : $("#authorityKeyIdentifier").val(),
      issuer_info : $("#subjectDn").val(),
      signer_citizenship : $("#signer_obj_c").val(),
      signer_email : $("#signer_obj_e").val(),
      signer_surname_name : $("#signer_obj_cn").val(),
      signer_patrynomic : $("#signer_obj_g").val(),
      signer_location : $("#signer_obj_l").val(),
      signer_organisation : $("#signer_obj_o").val(),
      signer_organisation_bin : $("#signer_obj_ou").val(),
      signer_city : $("#signer_obj_s").val(),
      signer_iin : $("#signer_obj_serialnumber").val(),
      signer_surname : $("#signer_obj_surname").val(),
      contract : this.props.contract.id,
      document_id : this.props.contract.documents["Договор"][0].id,
      user : this.props.userProfile.user,
      cms_sign : $("#cms_sign").val(),
      isAuth : this.props.isAuth,
    }
    let data_status = {
      status : 6,
      contract : this.props.contract.id,
    }
    this.props.onApproveContract(data_status);
    this.props.onSendTradeSign(data);
    this.setState({
      visibleSign : false
    })
  }
  closeModalAuth = () => {
    this.setState({
      visibleAuth: false,
    });
  }

  showModalSign = () => {
    this.setState({
      visibleSign: true,
    });
  }

  closeModalSign = () => {
    this.setState({
      visibleSign: false,
    });
  }
  showModalComment(){
    this.setState({
      visibleComment : true,
    })
  }
  closeModalComment(){
    this.setState({
      visibleComment : false,
    })
  }

  handleChangeRate = (value) => {
    this.setState({ 
      rate_value : value
    });
  }
  handleChangeComment(value){
    this.setState({
      comment_text : value
    })
  }
  handleSendComment(){
    let data = {
      mark : this.state.rate_value,
      comment : this.state.comment_text,
      contract : this.props.contract.id,
      service_name : this.props.contract.contract_type,
      user_verbose : this.props.userProfile.company_name,
      user : (this.props.userProfile.user === this.props.contract.client) ? this.props.contract.supplier : this.props.contract.client 
    }
    this.props.onSendPreview(data);
    this.setState({
      visibleComment : false,
    })
  }

  renderDocumentRow = (docType) => {
    let contDocs = {};
    if(this.state.contract !== null){
      contDocs = this.state.contract.documents;
    }
    let docState = false;
    for (let c_doc in contDocs) {
      let cDoc = contDocs[c_doc][0];
      if(docType.id === cDoc.type) {
        docState = true;
      }
    }
    if (this.props.uploadedDocument !== null) {
      if(docType.id === this.props.uploadedDocument.type) {
        docState = true;
      }
    }
    return (
      <List.Item key={docType.id}>
        <div className="flex justify_between item-cnt px1" style={{width: "100%"}}>
          <label className={"fileContainer fm-RobotoMedium " + (docState ? 'active_state_text' : 'waiting_state_text')}>
              {docType.name}
              <input
                className=""
                accept=".pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                type="file"
                onChange={ (e) => this.handleSelectDoc(e.target.files, docType.id) }
              />
          </label>
          {docType.id === 5 && (<a href="https://cabinet.salyk.kz/" target="_blank" rel="noopener noreferrer">ссылка</a>) }
          <div>
            { docState ?
              <div className="flex item-cnt">
                <p className="fm-RobotoRegular fs-12 light-blue-text">Готово</p>
                <Icon className="light-blue-text ml1" type="check-circle" />
                <div
                  className="fm-RobotoRegular fs-12 txt-link light-blue-text"
                  onClick={() => {
                    let doc = '';
                    for (let c_doc in contDocs) {
                      let cDoc = contDocs[c_doc][0];
                      if(docType.id === cDoc.type) {
                        doc = cDoc.file;
                      }
                    }
                    this.showDoc(doc);
                  }}
                >
                 <Icon type="picture" className="show-doc-icon" /> Просмотреть документ
                </div>
              </div> :
              <div className="flex item-cnt">
                <p className="fm-RobotoRegular fs-12 light-gray-text">В ожидании</p>
                <Icon className="light-gray-text ml1" type="clock-circle-o" />
              </div>
            }
          </div>
        </div>
      </List.Item>
    )
  }
  render(){
    let price = 0;
    let cost = 0;
    if(this.props.contract !== null && this.props.contract.sub_contract_obj !== undefined){
      let contractDetail = this.props.contract.sub_contract_obj;
      if(this.props.contract.contract_type === "Договор купли-продажи"){
        price = contractDetail.demand_json.price;
        cost = Number(contractDetail.demand_json.price) * Number(contractDetail.demand_json.volume);
      }else{
        if(contractDetail.tariff_obj !== undefined){
          price = contractDetail.tariff_obj.price;
          cost = Number(contractDetail.tariff_obj.price) * Number(contractDetail.tariff_obj.volume);
        }
      }
    }
    return(
      <div>
        <Row gutter={24}>
          <Col xl={2} lg={2} md={2} sm={24} xs={24}>
            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 my2"
              href="/trades"><Icon type="arrow-left" theme="outlined" /></Button>
          </Col>
        </Row>
        { this.props.contract !== null &&
        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title={<h2 className="fm-RobotoBold fs-16">СДЕЛКА {this.props.contract.id}</h2>}
              className="deal-card btm-border_none"
              bodyStyle={{ padding: 20, paddingTop: 0 }}
            >
              <List
                size="small"
                bordered
                className="border-raduis_none mb2"
              >
              { this.props.documentTypes.map(doc => this.renderDocumentRow(doc))}
              </List>
              <Card>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    Период действия
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <RangePicker onChange={this.handleSelectDocPeriod}
                      defaultValue={[
                        moment(this.props.contract.active_from || new Date()),
                        moment(this.props.contract.active_to || new Date())]
                      }/>
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    На основании
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Input type="text" onChange={(e) => this.handleChangeBased(e)} defaultValue={this.state.doc_based}/>
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                   ФИО подписанта
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Input type="text" onChange={this.handleChangePersonNominative} defaultValue={this.state.doc_person_nominative} />
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    ФИО подписанта в род.падеже
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Input type="text" onChange={this.handleChangePerson} defaultValue={this.state.doc_person} />
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    Период поставки
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <DatePicker placeholder="гггг-мм-дд"
                      onChange={this.handleChangeDelivery}
                      defaultValue={moment(this.state.doc_delivery)}/>
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    Цель приобретения товара
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Input type="text" onChange={(e) => this.handleWhatFor(e)} defaultValue={this.state.what_for}/>
                  </Col>
                </Row>
                <Row gutter={24} className="mb1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    Процент предоплаты
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <InputNumber min={0} max={100} onChange={(e) => this.handlePrepayPercent(e)} defaultValue={this.state.prepay_percent} />
                  </Col>
                </Row>
                {this.props.contract.contract_type === 'storehouse' && (
                  <div>
                    <Row gutter={24} className="mb1">
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        № резервуара/-ов
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <InputNumber min={0} onChange={(e) => this.handleTankNumbers(e)} defaultValue={this.state.tank_numbers} />
                      </Col>
                    </Row>
                    <Row gutter={24} className="mb1">
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        Объем резервуара/-ов
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <InputNumber min={0} onChange={(e) => this.handleTankVolumes(e)} defaultValue={this.state.tank_volumes} />
                      </Col>
                    </Row>
                    <Row gutter={24} className="mb1">
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        Вес
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <InputNumber min={0} onChange={(e) => this.handleWeight(e)} defaultValue={this.state.weight} />
                      </Col>
                    </Row>
                  </div>
                )}
                <Button className="btn btn-blue fs-14 mt2"
                  onClick={() => this.handleOnSaveDocInfo()}>Сохранить</Button>
              </Card>
              <List
                size="small"
                bordered
                className="mt2"
              >
                <List.Item>
                  <div className="flex justify_between item-cnt px1" style={{width: "100%"}}>
                    <p className="fm-RobotoRegular fs-15 black-text">
                      Стоимость
                    </p>
                    <p className="fm-RobotoMedium fs-13 black-text">{price} тнг</p>
                  </div>
                </List.Item>
                <List.Item>
                  <div className="flex justify_between item-cnt px1" style={{width: "100%"}}>
                    <p className="fm-RobotoRegular fs-15 black-text">
                      Сумма
                    </p>
                    <p className="fm-RobotoMedium fs-15 black-text">{cost} тнг</p>
                  </div>
                </List.Item>
              </List>
              <Row gutter={24}>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  {/* <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2">Открыть сделку</Button> */}
                </Col>
              </Row>
              <div className="mt3">
                <span>Написать сообщение</span>
                <TextArea rows={3} className="message-gray-txt_area" value={this.state.messageText}
                  onChange={(e) => this.handleEnterMessage(e)}/>
                <Row gutter={24} className="mt1">
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <Button className="btn btn-blue btn-block"
                      onClick={this.handleSendMessage.bind(this)}>Отправить</Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="deal-card-edit_text btm-border_none"
              title={<h3 className="fm-RobotoBold fs-14">РЕДАКТОР ТЕКСТА</h3>}
              bodyStyle={{ padding: 20, paddingTop: 0 }}
            >
              <Card
                bordered={false}
                bodyStyle={{ padding: 20}}
              >
                <iframe className="doc-frame" src={this.state.currentDoc} title="document"></iframe>
              </Card>
              <Row gutter={24}>
                <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                  <p className="mt2">Статус</p>
                  <p><b>{this.props.contract.status_verbose}</b></p>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                  { this.props.contract.status === 0 &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.handleApproveContract}>Согласовать</Button> }
                  { (this.props.contract.status === 1 || this.props.contract.status === 2) && (this.props.contract.status === 1 && this.props.contract.supplier === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.handleApproveContractAfter}>Согласовать</Button> }
                  { (this.props.contract.status === 1 || this.props.contract.status === 2) && (this.props.contract.status === 2 && this.props.contract.client === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.handleApproveContractAfter}>Согласовать</Button> }
                  { this.props.isAuth.length === 0 && this.props.contract.status === 3 &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalAuth}>3 Получить ключ</Button>  }
                  { this.props.isAuth.length !== 0 && this.props.contract.status === 3 &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalSign}>3 Подписать</Button>
                  }
                  { this.props.isAuth.length === 0 && (this.props.contract.status === 4 || this.props.contract.status === 5) && (this.props.contract.status === 4 && this.props.contract.client === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalAuth}>Получить ключ 4</Button>  }
                  { this.props.isAuth.length !== 0 && (this.props.contract.status === 4 || this.props.contract.status === 5) && (this.props.contract.status === 4 && this.props.contract.client === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalSign}>Подписать 4</Button>
                  }
                  { this.props.isAuth.length === 0 && (this.props.contract.status === 4 || this.props.contract.status === 5) && (this.props.contract.status === 5 && this.props.contract.supplier === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalAuth}>Получить ключ 4</Button>  }
                  { this.props.isAuth.length !== 0 && (this.props.contract.status === 4 || this.props.contract.status === 5) && (this.props.contract.status === 5 && this.props.contract.supplier === this.props.userProfile.user) &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalSign}>Подписать 4</Button>
                  }
                  { this.props.contract.status === 6 &&
                    <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
                      onClick={this.showModalComment}>Написать отзыв</Button>
                  }
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>}
        <Modal
          title="Получить данные ключа"
          visible={this.state.visibleAuth}
          onCancel={this.closeModalAuth}
          className="add-modal"
        >
        <input value="Получить данные ключа" onClick={this.handleGetInfo} type="button" className="mb-3" />
        <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
          onClick={this.handleSendAuth}>Отправить ключ</Button> 
        <div className="hiddenForm">
          <input type="text" id="keyId" readOnly />
          <input type="text" id="serialNumber" readOnly />
          <input type="text" id="date_from" readOnly />
          <input type="text" id="date_to" readOnly />
          <input type="text" id="authorityKeyIdentifier" readOnly />
          <input type="text" id="subjectDn" readOnly />
          <input type="text" id="signer_obj_c" readOnly />
          <input type="text" id="signer_obj_e" readOnly />
          <input type="text" id="signer_obj_cn" readOnly />
          <input type="text" id="signer_obj_g" readOnly />
          <input type="text" id="signer_obj_l" readOnly />
          <input type="text" id="signer_obj_o" readOnly />
          <input type="text" id="signer_obj_ou" readOnly />
          <input type="text" id="signer_obj_s" readOnly />
          <input type="text" id="signer_obj_serialnumber" readOnly />
          <input type="text" id="signer_obj_surname" readOnly />
        </div>
        </Modal>
        <Modal
          title="Подписать"
          visible={this.state.visibleSign}
          onCancel={this.closeModalSign}
          className="add-modal"
        >
          <div>
            <input value="Выбрать файл для подписи" onClick={this.handleSendAuthKey} type="button" />
            <input className="ml1" value="Ключ для подписи" onClick={this.handleSignKey} type="button" />
            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
              onClick={(this.props.contract !== null && (this.props.contract.status === 5 || this.props.contract.status === 4)) ? this.handleSignAfter : this.handleSign}>Подписать</Button>
          </div>
          <div className="hiddenForm">
            <input type="text" id="cms_sign" readOnly />
          </div>
        </Modal>
        <Modal
          title="Отзыв"
          visible={this.state.visibleComment}
          onCancel={this.closeModalComment}
          className="add-modal"
        >
          <Rate onChange={this.handleChangeRate} value={this.state.rate_value} />
          <TextArea className="mt1" placeholder="Напишите отзыв" autosize value={this.state.comment_text} onChange={(e) => this.handleChangeComment(e.target.value)}/>
          <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14 mt2"
              onClick={this.handleSendComment}>Отправить</Button> 
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  contract: state.contract.contract,
  documentTypes: state.company.documentTypes,
  uploadedDocument: state.contract.uploadedDocument,
  userProfile: state.user.userProfile,
  isLoggedIn: state.auth.isLoggedIn,
  isAuth : state.trade.isAuth
})

const mapDispatchToProps = {
  onApproveContract: actions.approveContract,
  onSignContract: actions.signContract,
  onSendContractDoc: actions.sendContractDoc,
  onGetContract: actions.getContract,
  onSaveDocInfo: actions.saveDocInfo,
  onSendMessage: chatActions.sendMessage,
  onSendTradeAuth : tradeActions.sendTradeAuth,
  onSendTradeSign : actions.sendTradeSign,
  onSendPreview : actions.sendPreview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trade);
