import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row,Col,Input,Button,Icon,Form,Select,notification,DatePicker,Modal } from 'antd';
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import _ from "lodash";
import { SearchBox } from  "react-google-maps/lib/components/places/SearchBox";
import Geocode from "react-geocode";
import moment from 'moment';
import * as authActions from "../actions/authActions";
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

import PropTypes from 'prop-types';
import "../styles/Login.css";

const FormItem = Form.Item;
const Option = Select.Option;

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      birth_date: "",
      birth_place : "",
      id_number : "",
      role: null,
      company_name: "",
      company_type: "",
      industry_segment_obj: "",
      BIN: "",
      organization : "",
      director_full_name: "",
      person_in_charge: "",
      person_position: "",
      person_genetive: "",
      IIK: "",
      registration_series : "",
      registration_number : "",
      registration_given_date : null,
      registration_given_by : "",
      BIK: this.props.bankInfo.bank_code || "",
      bank_name: this.props.bankInfo.bank_name || "",
      actual_address: "",
      legal_address: "",
      postcode: "",
      company_site : "",
      phone_number: "",
      regulations: null,
      registration_certificate: null,
      taxpayer_certificate: null,
      decree: null,
      power_of_attorney: null,
      document: null,
      document2 :null,
      confirmDirty: false,
      showNewRow : false,
      showMapBtn : false,
      showMap : false,
      corditanes : null,
      stateAddressA : null,
      corditanesA : null,
    }
    this.getAddressA = this.getAddressA.bind(this);

  }
  static propTypes = {
    registrationSubmit: PropTypes.func.isRequired,
    registrationCancel: PropTypes.func.isRequired
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
      this.setState({
        BIK: nextProps.bankInfo.BIK,
        bank_name: nextProps.bankInfo.bank_name
      })
    }
  }
  handleRegisterClick = () => {
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("email", this.state.email);
    data.append("birth_date", this.state.birth_date);
    data.append("birth_place", this.state.birth_place);
    data.append("id_number", this.state.id_number);
    data.append("company_name", this.state.company_name);
    data.append("company_type", this.state.company_type);
    data.append("role", this.state.role);
    data.append("industry_segment_obj", this.state.industry_segment_obj);
    data.append("BIN", this.state.BIN);
    data.append("director_full_name", this.state.director_full_name);
    data.append("person_in_charge", this.state.person_in_charge);
    data.append("person_in_charge_position", this.state.person_position);
    data.append("person_in_charge_genetive", this.state.person_genetive);
    data.append("IIK", this.state.IIK);
    data.append("BIK", this.state.BIK);
    data.append("bank_name", this.state.bank_name);
    data.append("actual_address", this.state.actual_address);
    data.append("company_site", this.state.company_site);
    data.append("legal_address", this.state.legal_address);
    data.append("postcode", this.state.postcode);
    data.append("phone_number", this.state.phone_number);
    data.append("registration_series", this.state.registration_series);
    data.append("registration_number", this.state.registration_number);
    if(this.state.registration_given_date !== null){
      data.append("registration_given_date", this.state.registration_given_date);
    }
    data.append("registration_given_by", this.state.registration_given_by);
    if(this.state.company_type !== 5){
      data.append("decree", this.state.decree);
      data.append("regulations", this.state.regulations);
      data.append("registration_certificate", this.state.registration_certificate);
      data.append("taxpayer_certificate", this.state.taxpayer_certificate);
    }
    if(this.state.role === 3 || this.state.role === 4 || this.state.role === 1){
      data.append("longitude", parseFloat(this.state.corditanes.lon).toFixed(4));
      data.append("latitude", parseFloat(this.state.corditanes.lat).toFixed(4));
      data.append("region", this.state.region);
    }
    if(this.state.power_of_attorney !== null)
      data.append("power_of_attorney", this.state.power_of_attorney);
    if(this.state.document !== null)
      data.append("document", this.state.document);
    if(this.state.document2 !== null && this.state.company_type === 5)
      data.append("document2", this.state.document2);
    this.props.onRegister(data);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.company_type !== 5 && this.state.regulations === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Устав"',
          });
        }
        else if(this.state.company_type !== 5 && this.state.registration_certificate === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Свидетельство о регистрации"',
          });
        }
        else if(this.state.company_type !== 5 && this.state.taxpayer_certificate === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Свидетельство налогоплательщика"',
          });
        }
        else if(this.state.company_type !== 5 && this.state.decree === null) {
          notification.error({
            message: 'Ошибка',
            description: 'Вы не загрузили документ "Приказ"',
          });
        } else {
          this.handleRegisterClick();
        }
      }
    });

  }
  cancelRegistrationModal(){
    this.props.registrationCancel(true);
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
      case "document2":
        this.setState({
          document2 : selectorFiles[0]
        })
      break;
      default:
        break;
    }
  }
  handleChangeRole = (e) =>{
    if(e === 4 || e === 1 || e === 3){
      this.setState({ 
        showMapBtn : true,
        role : e
      });
    }else{
      this.setState({ 
        showMapBtn : false,
        role : e
      });
    }
  }
  handleChangeCompany = (e) =>{
    this.setState({ company_name : e.target.value});
  }
  handleChangeType = (e) =>{
    if(e === 5){
      this.setState({
        showNewRow : true,
        company_type : e
      })
    }else{
      this.setState({
        showNewRow : false,
        company_type : e
      })
    }
  }
  handleChangeSegment = (e) =>{
    this.setState({ industry_segment_obj : e});
  }
  handleChangeBIN = (e) => {
    this.setState({ BIN : e.target.value });
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
  handleChangeSite = (e) => {
    this.setState({company_site : e.target.value});
  }
  handleChangeIIK = (e) =>{
    this.setState({ IIK : e.target.value});
    let data = {
      iik: e.target.value
    };
    this.props.onGetBankInfoByIIK(data);
    e.preventDefault();
  }
  handleSelectRegion = (value) => {
    this.setState({ region: value });
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
    this.setState({
      email : e.target.value,
      username : e.target.value,
    });
  }
  handleChangePhone = (e) =>{
    this.setState({ phone_number : e.target.value});
  }
  handleChangeBirthDate = (e) => {
    let birthDate = moment(e).utc().format("DD-MM-YYYY");
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
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Не соответствует!');
    } else {
      this.setState({ password : value});
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleOpenMap = () => {
    this.setState({
      showMap : true,
    })
  }
  handleCloseMap = () => {
    this.setState({
      showMap : false,
    })
  }
  getAddressA(lat,lon){
    Geocode.setApiKey("AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA");
    Geocode.fromLatLng(lat, lon).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({
          corditanes : {
            lat : lat,
            lon : lon
          }
        });
        this.getCordinateA(address);
      },
      error => {
        console.error(error);
      }
    );
  }
  getCordinateA(adres){
    this.setState({
      stateAddressA : adres
    })
  }
  renderGoogleA(){
    var locCenter = this.state.corditanes ? this.state.corditanes : this.props.regions.filter(st => st.id === this.state.region)[0];
    const MapWithASearchBox = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {}

          this.setState({
            bounds: null,
            center: {
              lat: locCenter.lat, lng: locCenter.lon
            },
            markers: [],
            onMapMounted: ref => {
              refs.map = ref;
            },
            onBoundsChanged: () => {
              this.setState({
                bounds: refs.map.getBounds(),
                center: refs.map.getCenter(),
              })
            },
            onSearchBoxMounted: ref => {
              refs.searchBox = ref;
            },
            onPlacesChanged: (ref) => {
              const places = refs.searchBox.getPlaces();
              const bounds = new window.google.maps.LatLngBounds();

              places.forEach(place => {
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport)
                } else {
                  bounds.extend(place.geometry.location)
                }
              });
              const nextMarkers = places.map(place => ({
                position: place.geometry.location,
              }));
              const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
              this.props.onPlaceSelected(places[0].geometry.location.lat(),places[0].geometry.location.lng())
              this.setState({
                center: nextCenter,
                markers: nextMarkers,
              });
            },
          })
        },
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        ref={props.onMapMounted}
        defaultZoom={15}
        center={props.center}
        onBoundsChanged={props.onBoundsChanged}
        onClick={this._onClickMap}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Введите адрес"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
        {this.state.corditanes && <Marker position={{ lat: this.state.corditanes.lat, lng: this.state.corditanes.lon}}/>}
      </GoogleMap>
    );
    return(
      <MapWithASearchBox onPlaceSelected={this.getAddressA}/>
    )
  }
  _onClickMap = (map, evt) => {
    this.setState({
      corditanes : {
        lat : map.latLng.lat(),
        lon : map.latLng.lng()
      },
      showMap : false,
    });
    this.getAddressA(map.latLng.lat(),map.latLng.lng())
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const roleItems = this.props.roles.map((role) =>
      <Option value={role.id} key={role.id}>
        {role.name}
      </Option>
    );
    const companyTypes = this.props.companyTypes.map((type) =>
      <Option value={type.id} key={type.id}>
        {type.name}
      </Option>
    )
    const industrySegments = this.props.industrySegments.map((industry) =>
      <Option value={industry.id} key={industry.id}>
        {industry.name}
      </Option>
    )
    const regionItems = this.props.regions.map((region) =>
      <Option value={region.id} key={region.id}>
        {region.name}
      </Option>
    );
    return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h2 className="fm-RobotoMedium fs-17 light-blue-text mt3">Данные для входа</h2>
          <div className="btm-border my1"/>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [
                    {type: 'email', message: 'Неправильный формат'},
                    {required: true, message: 'Пожалуйста введите вашу почту!'}],
                  onChange: (e) => this.handleChangeEmail(e)
                })(
                  <Input type="email" placeholder="Напишите ваш email"/>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Пароль:"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Пожалуйста введите ваш пароль'
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" placeholder="Напишите ваш пароль" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Подверждение пароля"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Пожалуйста повторите ваш пароль',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" placeholder="Повторите ваш пароль" onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>
            </Col>
          </Row>
          <h2 className="fm-RobotoMedium fs-17 light-blue-text">Основное</h2>
          <div className="btm-border my1"/>
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Организационно-правовая форма (ОПФ):"
                hasFeedback
              >
                {getFieldDecorator('organization', {
                  rules: [{ required: true, message: 'Выберите вашу организацию' },],
                  onChange: (e) => this.handleChangeType(e)
                })(
                  <Select 
                    showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
                    placeholder="Выберите тип организации">
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
                  rules: [{required: true, message: 'Пожалуйста введите ваше имя'}],
                  onChange: (e) => this.handleChangeCompany(e)
                })(
                  <Input type="text" placeholder="Введите ваше имя" />
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
                  onChange: (e) => this.handleChangeRole(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите вашу роль!">
                    {roleItems}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          {
            this.state.showMapBtn &&
            <Row gutter={24} type="flex" align="middle">
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  label="Регион"
                  hasFeedback
                >
                  {getFieldDecorator('region', {
                    rules: [{ required: true, message: 'Выберите регион' },],
                    onChange: (e) => this.handleSelectRegion(e)
                  })(
                    <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите регион">
                      {regionItems}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <Button
                  style={{marginTop : 15}}
                  className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                  onClick={this.handleOpenMap}>Показать местоположения на карте</Button>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <p className="fm-RobotoRegular fs-14 black-text my1">{this.state.corditanes && this.state.stateAddressA}</p>
              </Col>
            </Row>
          }
          <Row gutter={24}>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                label="Отраслевой сегмент:"
                hasFeedback
              >
                {getFieldDecorator('industry_segment_obj', {
                  rules: [{ required: true, message: 'Выберите вашу сегмент' },],
                  onChange: (e) => this.handleChangeSegment(e)
                })(
                  <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите вашу сегмент!">
                    {industrySegments}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="БИН/ИИН:"
              >
                {getFieldDecorator('BIN', {
                  rules: [
                    {required: true, message: 'Пожалуйста введите ваш БИН'},
                    {max: 12, message: 'Максимально 12 цифр'}
                  ],
                  onChange: (e) => this.handleChangeBIN(e)
                })(
                  <Input type="number" placeholder="Введите ваш БИН!" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="ФИО руководителя:"
              >
                {getFieldDecorator('director_full_name', {
                  rules: [{required: true, message: 'Пожалуйста введите ваши ФИО'}],
                  onChange: (e) => this.handleChangeFullName(e)
                })(
                  <Input type="text" placeholder="Введите ваши ФИО!" />
                )}
              </FormItem>
            </Col>
          </Row>
          {
            this.state.showNewRow &&
            <Row gutter={24}>
              {this.state.company_type !== 5 && 
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    label="Год рождения:"
                    className="fm-RobotoRegular fs-14 black-text">
                    {getFieldDecorator('birth_date', {
                      rules: [{required: true, message: 'Пожалуйста введите вашу дату рождения'}],
                      onChange: (e) => this.handleChangeBirthDate(e)
                    })(
                      <DatePicker placeholder="дд-мм-гггг" format="DD-MM-YYYY"/>
                    )}
                  </FormItem>
                </Col>
              }
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Место Рождения:"
                >
                  {getFieldDecorator('birth_place', {
                    rules: [{required: true, message: 'Пожалуйста введите где вы родились'}],
                    onChange: (e) => this.handleChangeBirthPlace(e)
                  })(
                    <Input type="text" placeholder="Введите где вы родились" />
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
                    onChange: (e) => this.handleChangeIdNumber(e)
                  })(
                    <Input type="number" placeholder="Введите ваш номер удостоверения"/>
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
                    rules: [{required: true, message: 'Пожалуйста введите ваши ФИО'}],
                    onChange: (e) => this.handleChangePersonPosition(e)
                  })(
                    <Input type="text" placeholder="Введите ваши ФИО"  />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="ФИО руководителя в родительном падеже:"
                >
                  {getFieldDecorator('person_in_charge_genetive', {
                    rules: [{required: true, message: 'Пожалуйста введите ваши ФИО'}],
                    onChange: (e) => this.handleChangePersonGenetive(e)
                  })(
                    <Input type="text" placeholder="Введите ваши ФИО" />
                  )}
                </FormItem>
              </Col>
              <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                <FormItem
                  className="fm-RobotoRegular fs-14 black-text"
                  label="Ответственное лицо:"
                >
                  {getFieldDecorator('person_in_charge', {
                    rules: [{required: true, message: 'Пожалуйста введите ваш имя'}],
                    onChange: (e) => this.handleChangePersonCharge(e)
                  })(
                    <Input type="text" placeholder="Введите ваши имя" />
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
                      rules: [{ message: 'Пожалуйста введите вашу серию'}],
                      onChange: (e) => this.handleChangeRegSeries(e)
                    })(
                      <Input type="text" placeholder="Введите вашу серию" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    className="fm-RobotoRegular fs-14 black-text"
                    label="Номер:"
                  >
                    {getFieldDecorator('registration_number', {
                      rules: [{ message: 'Пожалуйста введите ваш номер'}],
                      onChange: (e) => this.handleChangeRegNumber(e)
                    })(
                      <Input type="text" placeholder="Введите ваш номер"/>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={8} md={8} sm={24} xs={24} >
                  <FormItem
                    label="Дата выдачи:"
                    className="fm-RobotoRegular fs-14 black-text">
                    {getFieldDecorator('registration_given_date', {
                      rules: [{type: 'object',  message: 'Пожалуйста введите дата выдачи'}],
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
                      rules: [{ message: 'Пожалуйста введите кем выдано'}],
                      onChange: (e) => this.handleChangeRegGivenBy(e)
                    })(
                      <Input type="text" placeholder="Введите кем выдано" />
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
                  onChange: (e) => this.handleChangeIIK(e)
                })(
                  <Input type="text" placeholder="Введите ваш ИИК" />
                )}
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="БИК:"
              >
                <Input type="text"  placeholder="Введите ваш БИК" onChange={(e) => this.handleChangeBIK(e)} value={this.state.BIK} />
              </FormItem>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <FormItem
                className="fm-RobotoRegular fs-14 black-text"
                label="Наименование банка:"
              >
                <Input type="text" placeholder="Введите наименование банка" onChange={(e) => this.handleChangeNameBank(e)} value={this.state.bank_name} />
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
                  onChange: (e) => this.handleChangeActualAddress(e)
                })(
                  <Input type="text" placeholder="Введите ваш фактический адрес" />
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
                  onChange: (e) => this.handleChangeLegalAddress(e)
                })(
                  <Input type="text" placeholder="Введите ваш юридический адрес" />
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
                  onChange: (e) => this.handleChangPostcode(e)
                })(
                  <Input type="text" placeholder="Введите почтовый индекс"/>
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
                  },],
                  onChange: (e) => this.handleChangeSite(e)
                })(
                  <Input placeholder="Введите ваш сайт"/>
                )}
              </FormItem>
            </Col>
          </Row>
          <h2 className="fm-RobotoBold fs-18 black-text mt3 mb2">{this.state.company_type === 5 ? "ДОКУМЕНТЫ" : "УЧРЕДИТЕЛЬНЫЕ ДОКУМЕНТЫ"}</h2>
            {this.state.company_type !== 5 && 
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
            }
            {this.state.company_type === 5 &&
              <div className="flex mb3">
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
                <div className="add-doc">
                  <div className={(this.state.document2 === null ? 'in_add-doc' : 'in_added-doc')}>
                    <Icon type="plus-circle" />
                    <input
                      className="add-file"
                      accept="*"
                      type="file"
                      name="document2"
                      onChange={ (e) => this.handleChange(e.target.files,e.target.name) }
                    />
                  </div>
                  <p className="fm-RobotoRegular fs-14 black-text mt1">
                    Документ
                  </p>
                </div>
              </div>
            }
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                loading={this.props.isLoading}
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                htmlType="submit">Подать Заявку</Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24} >
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                key="back"
                onClick={this.cancelRegistrationModal.bind(this)}>
                Отмена
              </Button>
            </Col>
          </Row>
        </Form>
        <Modal
          width={1000}
          visible={this.state.showMap}
          className="stock-modal"
          onCancel={this.handleCloseMap}
          footer={[
            <Row>
              <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15" onClick={this.handleCloseMap}>Сохранить</Button>
              </Col>
            </Row>,
          ]}
        >
          {this.renderGoogleA()}

        </Modal>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegisterModal);

const mapStateToProps = (state) => ({
  roles: state.profile.roles,
  regions: state.profile.regions,
  companyTypes: state.company.companyTypes,
  industrySegments: state.company.industrySegments,
  bankInfo: state.company.bankInfo,
  isLoading: state.auth.isLoggingIn,
  isLoggedIn: state.auth.isLoggedIn,
  errorMessage: state.auth.errorMessage,
  isRegisterCompleted: state.auth.isRegisterCompleted,
})

const mapDispatchToProps = {
  onRegister: authActions.register,
  onGetBankInfoByIIK: companyActions.getBankInfoByIIK,

  onGetProfile: profileActions.getCompanyProfile,
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
