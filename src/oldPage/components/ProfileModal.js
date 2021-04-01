import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Input,Button,Icon,Form,Select,notification,DatePicker } from 'antd';
import moment from 'moment';
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import "../styles/Login.css";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.userProfile.user_json.email || "",
      role: (this.props.userProfile.role).toString() || "",
      company_name: this.props.userProfile.company_name || "",
      company_type: this.props.userProfile.company_type || "",
      industry_segment_obj: this.props.userProfile.industry_segment_obj || "",
      director_full_name: this.props.userProfile.director_full_name || "",
      person_in_charge: this.props.userProfile.person_in_charge || "",
      person_position: this.props.userProfile.person_in_charge_position || "",
      person_genetive: this.props.userProfile.person_in_charge_genetive || "",
      IIK: this.props.userProfile.IIK || "",
      BIK: this.props.userProfile.BIK || "",
      BIN: this.props.userProfile.BIN || "",
      bank_name: this.props.userProfile.bank_name || "",
      actual_address: this.props.userProfile.actual_address || "",
      legal_address: this.props.userProfile.legal_address || "",
      postcode: this.props.userProfile.postcode || "",
      phone_number: this.props.userProfile.phone_number || "",
      company_site: this.props.userProfile.company_site || "",
      regulations: this.props.userProfile.regulations || null,
      registration_certificate: this.props.userProfile.registration_certificate || null,
      taxpayer_certificate: this.props.userProfile.taxpayer_certificate || null,
      decree: this.props.userProfile.decree || null,
      power_of_attorney: this.props.userProfile.power_of_attorney || null,
      document: this.props.userProfile.document || null,
      contract_template: this.props.userProfile.contract_template || null,
      contract_add_tempalte: this.props.userProfile.contract_add_tempalte || null,
      showNewRow : (this.props.userProfile.company_type && this.props.userProfile.company_type === 5) ? true : false,
      birth_date: moment(this.props.userProfile.birth_date) || null,
      birth_place : this.props.userProfile.birth_place || "",
      id_number : this.props.userProfile.id_number || "",
      registration_series : this.props.userProfile.registration_series || "",
      registration_number : this.props.userProfile.registration_number || "",
      registration_given_date : moment(this.props.userProfile.registration_given_date) || null,
      registration_given_by : this.props.userProfile.registration_given_by || "",
      company_description : this.props.userProfile.company_description || null,
      galleryFile : null,
      presentFile : null,
      videoFile : null,
    }

    this.handleAddGallery = this.handleAddGallery.bind(this);
    this.handleChangeGallery = this.handleChangeGallery.bind(this);
    this.handleAddVideo = this.handleAddVideo.bind(this);
    this.handleChangeVideo = this.handleChangeVideo.bind(this);
    this.handleAddPresentation = this.handleAddPresentation.bind(this);
    this.handleChangePresentation = this.handleChangePresentation.bind(this);

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
    this.props.onGetStorehouseList();
    this.props.onGetStandardList();
    this.props.onGetDeliveryCons();
    this.props.isLoggedIn && this.props.onGetTradesmanList();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.bankInfo && nextProps.bankInfo !== undefined){
      // this.setState({
      //   BIK: nextProps.bankInfo.BIK,
      //   bank_name: nextProps.bankInfo.bank_name
      // })
    }
    if(nextProps.userProfile && nextProps.userProfile !== undefined){
      // this.setState({
      //   role: nextProps.userProfile.role,
      //   company_type: nextProps.userProfile.company_type,
      //   industry_segment_obj: nextProps.userProfile.industry_segment_obj,
      // })
    }
  }
  handleRegisterClick = () => {
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("role", this.state.role);
    if(this.props.userProfile.birth_date !== null){
      data.append("birth_date", this.state.birth_date);
    }
    if(this.props.userProfile.birth_place !== null){
      data.append("birth_place", this.state.birth_place);
    }
    if(this.props.userProfile.id_number !== null){
      data.append("id_number", this.state.id_number);
    }
    data.append("company_name", this.state.company_name);
    data.append("company_type", this.state.company_type);
    data.append("industry_segment_obj", this.state.industry_segment_obj);
    data.append("director_full_name", this.state.director_full_name);
    data.append("person_in_charge", this.state.person_in_charge);
    data.append("person_in_charge_position", this.state.person_position);
    data.append("person_in_charge_genetive", this.state.person_genetive);
    if(this.props.userProfile.registration_series !== null){
      data.append("registration_series", this.state.registration_series);
    }  
    if(this.props.userProfile.registration_number !== null){
      data.append("registration_number", this.state.registration_number);
    } 
    if(this.props.userProfile.registration_given_date !== null){
      data.append("registration_given_date", this.state.registration_given_date);
    }
    if(this.props.userProfile.registration_given_by !== null){
      data.append("registration_given_by", this.state.registration_given_by);
    }
    data.append("IIK", this.state.IIK);
    data.append("BIK", this.state.BIK);
    data.append("bank_name", this.state.bank_name);
    data.append("actual_address", this.state.actual_address);
    data.append("legal_address", this.state.legal_address);
    data.append("postcode", this.state.postcode);
    data.append("phone_number", this.state.phone_number);
    data.append("company_site", this.state.company_site);
    data.append("company_description", this.state.company_description);

    if(typeof this.state.regulations !== 'string' && this.state.regulations !== this.props.userProfile.regulations){
      data.append("regulations", this.state.regulations);
    }
    if(typeof this.state.registration_certificate !== 'string' && this.state.registration_certificate !== this.props.userProfile.registration_certificate){
      data.append("registration_certificate", this.state.registration_certificate);
    }
    if(typeof this.state.taxpayer_certificate !== 'string' && this.state.taxpayer_certificate !== this.props.userProfile.taxpayer_certificate){
      data.append("taxpayer_certificate", this.state.taxpayer_certificate);
    }
    if(typeof this.state.decree !== 'string' && this.state.decree !== this.props.userProfile.decree){
      data.append("decree", this.state.decree);
    }
    if(this.state.power_of_attorney !== null && this.state.power_of_attorney !== this.props.userProfile.power_of_attorney){
      data.append("power_of_attorney", this.state.power_of_attorney);
    }
    if(this.state.document !== null && this.state.document !== this.props.userProfile.document){
      data.append("document", this.state.document);
    }
    if(this.state.contract_template !== null && this.state.contract_template !== this.props.userProfile.contract_template){
      data.append("contract_template", this.state.contract_template);
    }
    if(this.state.contract_add_tempalte !== null  && this.state.contract_add_tempalte !== this.props.userProfile.contract_add_tempalte){
      data.append("contract_add_tempalte", this.state.contract_add_tempalte);
    }

    let sendData = {
      profile: data,
      company_id: this.props.userProfile.id
    }
    this.props.onUpdateProfile(sendData);
    // this.props.form.resetFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.regulations === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Устав"',
          });
        }
        else if(this.state.registration_certificate === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Свидетельство о регистрации"',
          });
        }
        else if(this.state.taxpayer_certificate === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Свидетельство налогоплательщика"',
          });
        }
        else if(this.state.decree === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Приказ"',
          });
        } else {
          this.handleRegisterClick();
          this.props.onCloseModal(true);
        }
      }
    });

  }
  cancelProfileModal(){
    this.props.onCloseModal(true);
  }
  handleChange(selectorFiles, name) {
    switch(name){
      case "regulations":
        this.setState({
          regulations : selectorFiles[0]
        })
      break;
      case "registration_certificate":
        this.setState({
          registration_certificate : selectorFiles[0]
        })
      break;
      case "taxpayer_certificate":
        this.setState({
          taxpayer_certificate : selectorFiles[0]
        })
      break;
      case "decree":
        this.setState({
          decree : selectorFiles[0]
        })
      break;
      case "power_of_attorney":
        this.setState({
          power_of_attorney : selectorFiles[0]
        })
      break;
      case "document":
        this.setState({
          document : selectorFiles[0]
        })
      break;
      case "contract_template": 
        this.setState({
          contract_template : selectorFiles[0]
        })
      break;
      case "contract_add_tempalte": 
        this.setState({
          contract_add_tempalte : selectorFiles[0]
        })
      break; 
      default:
        break;
    }
  }
  handleChangeRole = (e) =>{
    this.setState({ role : e});
  }
  handleChangeCompany = (e) =>{
    this.setState({ company_name : e.target.value});
  }
  handleChangeType = (e) =>{
    this.setState({ company_type : e});
  }
  handleChangeSegment = (e) =>{
    this.setState({ industry_segment_obj : e});
  }
  handleChangeFullName = (e) =>{
    this.setState({ director_full_name : e.target.value});
  }
  handleChangePersonCharge = (e) =>{
    this.setState({ person_in_charge : e.target.value});
  }
  handleChangePersonPosition = (e) =>{
    this.setState({ person_position : e.target.value});
  }
  handleChangePersonGenetive = (e) =>{
    this.setState({ person_genetive : e.target.value});
  }
  handleChangeBirthDate = (e) => {
    let birthDate = moment(e).utc().format("YYYY-MM-DD");
    this.setState({ birth_date : birthDate})
  }
  handleChangeBirthPlace = (e) => {
    this.setState({ birth_place : e.target.value})
  }
  handleChangeIdNumber = (e) => {
    this.setState({ id_number : e.target.value})
  }
  handleChangeRegSeries = (e) => {
    this.setState({ registration_series : e.target.value})
  }
  handleChangeRegNumber = (e) => {
    this.setState({ registration_number : e.target.value})
  }
  handleChangeRegGivenDate = (e) => {
    let regDate = moment(e).utc().format("YYYY-MM-DD");
    this.setState({ registration_given_date : regDate})
  }
  handleChangeRegGivenBy = (e) => {
    this.setState({ registration_given_by : e.target.value})
  }
  handleChangeIIK = (e) =>{
    this.setState({ IIK : e.target.value});
    let data = {
      iik: e.target.value
    };
    this.props.onGetBankInfoByIIK(data);
    e.preventDefault();
  }
  handleChangeBIK = (e) =>{
    this.setState({ BIK : e.target.value});
    e.preventDefault();
  }
  handleChangeNameBank = (e) =>{
    this.setState({ bank_name : e.target.value});
    e.preventDefault();
  }
  handleChangeActualAddress = (e) =>{
    this.setState({ actual_address : e.target.value});
  }
  handleChangeLegalAddress = (e) =>{
    this.setState({ legal_address : e.target.value});
  }
  handleChangPostcode = (e) =>{
    this.setState({ postcode : e.target.value});
  }
  handleChangeEmail = (e) =>{
    this.setState({ email : e.target.value });
  }
  handleChangePhone = (e) =>{
    this.setState({ phone_number : e.target.value});
  }
  handleChangeSite = (e) => {
    this.setState({company_site : e.target.value});
  }
  handleChangeDescription = (e) => {
    this.setState({company_description : e.target.value})
  }
  handleChangeGallery(selectorFiles, name) {
    this.setState({
      galleryFile : selectorFiles
    })
  }
  handleAddGallery(){
    let data = new FormData();
    for (var i = 0; i < this.state.galleryFile.length; i++) {
      data.append("file",this.state.galleryFile[i]);
      data.append("type",0);
      data.append("pending_registration_profile",this.props.userProfile.user);
      this.props.onSendGallery(data);
    }
  }
  handleChangeVideo(selectorFiles, name) {
    this.setState({
      videoFile : selectorFiles
    })
  }
  handleAddVideo(){
    let data = new FormData();
    for (var i = 0; i < this.state.videoFile.length; i++) {
      data.append("file",this.state.videoFile[i]);
      data.append("type",1);
      data.append("pending_registration_profile",this.props.userProfile.user);
      this.props.onSendGallery(data);
    }
  }
  handleChangePresentation(selectorFiles, name) {
    this.setState({
      presentFile : selectorFiles
    })
  }
  handleAddPresentation(){
    let data = new FormData();
    for (var i = 0; i < this.state.presentFile.length; i++) {
      data.append("file",this.state.presentFile[i]);
      data.append("type",2);
      data.append("pending_registration_profile",this.props.userProfile.user);
      this.props.onSendGallery(data);
    }
  }
  /*loading() {
    if (this.props.isLoading) {
      return (<div>loading</div>)
    } else {
      return null;
    }
  }*/

  render() {
    const { getFieldDecorator } = this.props.form;
    const roleItems = this.props.roles.map((role) =>
      <Option key={role.id}>
        {role.name}
      </Option>
    );
    const companyTypes = this.props.companyTypes.map((type) =>
      <Option  key={type.id}>
        {type.name}
      </Option>
    )
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h2 className="fm-RobotoMedium fs-17 light-blue-text">Основное</h2>
          <div className="btm-border my1"/>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Организационно-правовая форма:"
                hasFeedback
              >
                {getFieldDecorator('company_type', {
                  rules: [{ required: true, message: 'Выберите вашу организацию' },],
                  initialValue: (this.state.company_type).toString(),
                  onChange: (e) => this.handleChangeType(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите тип организации">
                    {companyTypes}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Наименование участника:"
              >
                {getFieldDecorator('company_name', {
                  rules: [{required: true, message: 'Пожалуйста введите ваш имя'}],
                  initialValue: this.state.company_name,
                  onChange: (e) => this.handleChangeCompany(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Роль участника:"
                hasFeedback
              >
                {getFieldDecorator('role', {
                  rules: [{ required: true, message: 'Выберите вашу роль' },],
                  initialValue: (this.state.role).toString(),
                  onChange: (e) => this.handleChangeRole(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите вашу роль">
                    {roleItems}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Описание деятельности компании:"
              >
                {getFieldDecorator('company_description', {
                  rules: [{ required: false, message: 'Описание деятельности компании' },],
                  initialValue: (this.state.company_description),
                  onChange: (e) => this.handleChangeDescription(e)
                })(
                  <TextArea autosize />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Отраслевой сегмент:"
                hasFeedback
              >
                {getFieldDecorator('industry_segment_obj', {
                  rules: [{ required: true, message: 'Выберите вашу сегмент' },],
                  initialValue: this.state.industry_segment_obj !== null?(this.state.industry_segment_obj).toString():'',
                  onChange: (e) => this.handleChangeSegment(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите вашу сегмент!">
                    {this.props.industrySegments.map((industry) =>
                      <Option key={industry.id}>
                        {industry.name}
                      </Option>
                    )}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="БИН:"
              >
                {getFieldDecorator('BIN', {
                  rules: [
                    {required: true, message: 'Пожалуйста введите ваш БИН'},
                    {max: 12, message: 'Максимально 12 цифр'}
                  ],
                  initialValue: this.state.BIN,
                })(
                  <Input type="number" disabled/>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="ФИО руководителя:"
              >
                {getFieldDecorator('director_full_name', {
                  rules: [{required: true, message: 'Пожалуйста введите ФИО'}],
                  initialValue: this.state.director_full_name,
                  onChange: (e) => this.handleChangeFullName(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
          {
            this.state.showNewRow &&
            <Row gutter={24}>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  label="Год рождения:"
                  className="fm-RobotoRegular fs-14 black-text">
                  {getFieldDecorator('birth_date', {
                    rules: [{required: true, message: 'Пожалуйста введите вашу дату рождения'}],
                    initialValue: this.state.birth_date,
                    onChange: (e) => this.handleChangeBirthDate(e)
                  })(
                    <DatePicker placeholder="гггг-мм-дд" />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Месторождения:"
                >
                  {getFieldDecorator('birth_place', {
                    rules: [{required: true, message: 'Пожалуйста введите где вы родились'}],
                    initialValue: this.state.birth_place,
                    onChange: (e) => this.handleChangeBirthPlace(e)
                  })(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Номер удостоверения личности:"
                >
                  {getFieldDecorator('id_number', {
                    rules: [{required: true, message: 'Пожалуйста введите ваш номер удостоверения личности'},
                    {max: 12, message: 'Максимально 12 цифр'}],
                    initialValue: this.state.id_number,
                    onChange: (e) => this.handleChangeIdNumber(e)
                  })(
                    <Input type="number" />
                  )}
                </FormItem>
              </Col>
            </Row>
          }
          {
            !this.state.showNewRow &&
            <Row gutter={24}>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Должность руководителя:"
                >
                  {getFieldDecorator('person_in_charge_position', {
                    rules: [{required: true, message: 'Пожалуйста введите должность'}],
                    initialValue: this.state.person_position,
                    onChange: (e) => this.handleChangePersonPosition(e)
                  })(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="ФИО руководителя в родительном падеже:"
                >
                  {getFieldDecorator('person_in_charge_genetive', {
                    rules: [{required: true, message: 'Пожалуйста введите ФИО'}],
                    initialValue: this.state.person_genetive,
                    onChange: (e) => this.handleChangePersonGenetive(e)
                  })(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Ответственное лицо:"
                >
                  {getFieldDecorator('person_in_charge', {
                    rules: [{required: true, message: 'Пожалуйста введите ФИО'}],
                    initialValue: this.state.person_in_charge,
                    onChange: (e) => this.handleChangePersonCharge(e)
                  })(
                    <Input type="text" />
                  )}
                </FormItem>
              </Col>
            </Row>
          }
          {
            this.state.showNewRow &&
            <div>
              <h2 className="fm-RobotoMedium fs-17 light-blue-text">Свидетельство о государственной регистрации</h2>
              <div className="btm-border my1"/>
              <Row gutter={24}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    label="Серия:"
                  >
                    {getFieldDecorator('registration_series', {
                      rules: [{required: true, message: 'Пожалуйста введите вашу серию'}],
                      initialValue: this.state.registration_series,
                      onChange: (e) => this.handleChangeRegSeries(e)
                    })(
                      <Input type="text" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                    label="Номер:"
                  >
                    {getFieldDecorator('registration_number', {
                      rules: [{required: true, message: 'Пожалуйста введите ваш номер'}],
                      initialValue: this.state.registration_number,
                      onChange: (e) => this.handleChangeRegNumber(e)
                    })(
                      <Input type="text" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    label="Дата выдачи:"
                    className="fm-RobotoRegular fs-14 black-text">
                    {getFieldDecorator('registration_given_date', {
                      rules: [{required: true, message: 'Пожалуйста введите дата выдачи'}],
                      initialValue: this.state.registration_given_date,
                      onChange: (e) => this.handleChangeRegGivenDate(e)
                    })(
                      <DatePicker placeholder="гггг-мм-дд" />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    label="Кем выдано:"
                  >
                    {getFieldDecorator('registration_given_by', {
                      rules: [{required: true, message: 'Пожалуйста введите кем выдано'}],
                      initialValue: this.state.registration_given_by,
                      onChange: (e) => this.handleChangeRegGivenBy(e)
                    })(
                      <Input type="text" />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </div>
          }
          <h2 className="fm-RobotoMedium fs-17 light-blue-text mt3">Банковские данные</h2>
          <div className="btm-border my1"/>

          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="ИИК:"
              >
                {getFieldDecorator('IIK', {
                  rules: [
                    {required: true, message: 'Пожалуйста введите ваш ИИК'},
                    {max: 20, message: 'Максимально 20 цифр'}
                  ],
                  initialValue: this.state.IIK,
                  onChange: (e) => this.handleChangeIIK(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="БИК:"
              >
                <Input type="text" onChange={(e) => this.handleChangeBIK(e)} defaultValue={this.state.BIK} value={this.state.BIK} />
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Наименование банка:"
              >
                <Input type="text" onChange={(e) => this.handleChangeNameBank(e)} defaultValue={this.state.bank_name} value={this.state.bank_name} />
              </FormItem>
            </Col>
          </Row>
          <h2 className="fm-RobotoMedium fs-17 light-blue-text mt3">Контакты</h2>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Фактический адрес:"
              >
                {getFieldDecorator('actual_address', {
                  rules: [{required: true, message: 'Пожалуйста введите ваш фактический адрес'}],
                  initialValue: this.state.actual_address,
                  onChange: (e) => this.handleChangeActualAddress(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Юридический адрес:"
              >
                {getFieldDecorator('legal_address', {
                  rules: [{required: true, message: 'Пожалуйста введите ваш юридический адрес'}],
                  initialValue: this.state.legal_address,
                  onChange: (e) => this.handleChangeLegalAddress(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Почтовый индекс:"
              >
                {getFieldDecorator('postcode', {
                  rules: [{required: true, message: 'Пожалуйста введите почтовый индекс'}],
                  initialValue: this.state.postcode,
                  onChange: (e) => this.handleChangPostcode(e)
                })(
                  <Input type="text" />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Телефон:"
              >
                {getFieldDecorator('phone_number', {
                  rules: [{ required: true, message: 'Пожалуйста введите ваш телефон'
                  },{
                    pattern: /^[+][0-9][0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}$/, message: 'Напишите в правильном формате +77077777777'
                  }],
                  initialValue: this.state.phone_number,
                  onChange: (e) => this.handleChangePhone(e)
                })(
                  <Input type="tel" placeholder="Введите ваш телефон"/>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Сайт компании:"
              >
                {getFieldDecorator('company_site', {
                  rules: [{ required: false, message: 'Пожалуйста введите ваш сайт'
                  }],
                  initialValue: this.state.company_site,
                  onChange: (e) => this.handleChangeSite(e)
                })(
                  <Input placeholder="Введите ваш сайт"/>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [
                    {type: 'email', message: 'Неправильный формат'},
                    {required: true, message: 'Пожалуйста введите вашу почту!'}],
                  initialValue: this.state.email,
                  onChange: (e) => this.handleChangeEmail(e)
                })(
                  <Input type="email"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <h2 className="fm-RobotoBold fs-18 black-text mt3 mb2">УЧРЕДИТЕЛЬНЫЕ ДОКУМЕНТЫ</h2>
          <div className="flex mb3">
            <div className="add-doc" >
              <div className={(this.state.regulations === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="regulations"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Устав
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.registration_certificate === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="registration_certificate"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Свидетельство о регистрации
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.taxpayer_certificate === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="taxpayer_certificate"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Свидетельство налогоплательщика
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.decree === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="decree"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Приказ
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.power_of_attorney === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="power_of_attorney"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Доверенность
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.document === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="document"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Документ
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="add-doc">
              <div className={(this.state.contract_template === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input
                  className="add-file"
                  accept="*"
                  type="file"
                  name="contract_template"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
                Шаблон договора
              </p>
            </div>
            <div className="add-doc">
              <div className={(this.state.contract_add_tempalte === null ? 'in_add-doc' : 'in_added-doc')}>
                <Icon type="plus-circle" />
                <input 
                  className="add-file"
                  accept="*"
                  type="file"
                  name="contract_add_tempalte"
                  onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                />
              </div>
              <p className="fm-RobotoRegular fs-14 black-text mt1">
              Шаблон доп соглашения
              </p>
            </div>
          </div>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <div className="add-doc">
                <div className="in_add-doc">
                  <Icon type="plus-circle" />
                  <input 
                    className="add-file"
                    accept="image/*"
                    type="file"
                    multiple
                    name="contract_add_tempalte"
                    onChange={ (e) => this.handleChangeGallery(e.target.files,e.target.name) }
                  />
                </div>
              </div>
              <p className="fm-RobotoRegular fs-14 black-text my1">
                Добавить галерею:
              </p>
              <Button
                icon="plus"
                disabled={this.state.galleryFile === null}
                className="btn btn-blue btn-block"
                onClick={this.handleAddGallery}
              >Сохранить</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <div className="add-doc">
                <div className="in_add-doc">
                  <Icon type="plus-circle" />
                  <input 
                    className="add-file"
                    type="file"
                    multiple
                    accept="*"
                    name="contract_add_tempalte"
                    onChange={ (e) => this.handleChangePresentation(e.target.files,e.target.name) }
                  />
                </div>
              </div>
              <p className="fm-RobotoRegular fs-14 black-text my1">
                Добавить презентацию
              </p>
              <Button
                icon="plus"
                disabled={this.state.presentFile === null}
                className="btn btn-blue btn-block"
                onClick={this.handleAddPresentation}
              >Сохранить</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <div className="add-doc">
                <div className="in_add-doc">
                  <Icon type="plus-circle" />
                  <input 
                    className="add-file"
                    type="file"
                    accept="video/mp4,video/x-m4v,video/*"
                    multiple
                    name="contract_add_tempalte"
                    onChange={ (e) => this.handleChangeVideo(e.target.files,e.target.name) }
                  />
                </div>
              </div>
              <p className="fm-RobotoRegular fs-14 black-text my1">
                Добавить видео
              </p>
              <Button
                icon="plus"
                disabled={this.state.videoFile === null}
                className="btn btn-blue btn-block"
                onClick={this.handleAddVideo}
              >Сохранить</Button>
            </Col>
          </Row>
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit">Сохранить</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                key="back"
                onClick={this.cancelProfileModal.bind(this)}>
                Отмена
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(ProfileModal);

const mapStateToProps = (state) => ({
  roles: state.profile.roles,
  regions: state.profile.regions,
  companyTypes: state.company.companyTypes,
  industrySegments: state.company.industrySegments,
  bankInfo: state.company.bankInfo,
  isLoading: state.auth.isLoggingIn,
  isLoggedIn: state.auth.isLoggedIn,
  errorMessage: state.auth.errorMessage,
  userProfile: state.user.userProfile,
  companyProfile: state.profile.companyProfile
})

const mapDispatchToProps = {
  onUpdateProfile: profileActions.updateProfile,
  onGetBankInfoByIIK: companyActions.getBankInfoByIIK,
  onSendGallery : profileActions.sendGallery,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
