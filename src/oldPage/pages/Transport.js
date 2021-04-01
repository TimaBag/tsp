import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {  Row,
          Col,
          Card,
          Tabs,
          Button,Select,
          Form,InputNumber,Modal} from 'antd';

import _ from "lodash";
import { compose, withProps, lifecycle, withState, withHandlers } from "recompose";
import Geocode from "react-geocode";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "react-google-maps";
import { SearchBox } from  "react-google-maps/lib/components/places/SearchBox";
import "../styles/Transport.css";

import * as contractActions from "../actions/contractActions";
import * as companyActions from "../actions/companyActions";
import * as profileActions from "../actions/profileActions";
import * as resourceActions from "../actions/resourceActions";

const TabPane = Tabs.TabPane;
// const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

// var locationA = null;
// var locationB = null;
// var addressB = null;

class TransportPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      position : null,
      currentExpeditor : null,
      region: null,
      datetime_expire: null,
      show: false,
      client: null,
      resource: null,
      metric_unit: null,
      selectedTariff: null,
      volume : null,
      sumDistance : '',
      linkCompany : false,
      showMap : false,
      showMapA : false,
      showMapB : false,
      corditanesA : null,
      corditanesB : null,
      addressA : "",
      stateAddressB : null,
      stateAddressA : null,

      regionSelected: false,
      resourceSelected: false,
      metricSelected: false
    }
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderGoogleA = this.renderGoogleA.bind(this);
    this.renderGoogleB = this.renderGoogleB.bind(this);
    this.handleSelectA = this.handleSelectA.bind(this);
    this.handleSelectB = this.handleSelectB.bind(this);
    this.handleSelectCloseA = this.handleSelectCloseA.bind(this);
    this.handleSelectCloseB = this.handleSelectCloseB.bind(this);
    this.getAddressA = this.getAddressA.bind(this);
    this.getAddressB = this.getAddressB.bind(this);
    this._onClickMapA = this._onClickMapA.bind(this);
    this._onClickMapB = this._onClickMapB.bind(this);
    this.renderGoogleA = this.renderGoogleA.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(){
    let data = {
        tariff: this.state.selectedTariff.id,
        client: this.props.userProfile.user,
        supplier: this.state.currentExpeditor.profile_json.user,
        distance : this.state.sumDistance,
        volume : this.state.volume,
        metric_unit : this.state.metric_unit,
        resource : this.state.resource
      };
    this.props.onCreateContract(data);
  }

  selectTariff(currExped) {
    if(this.state.metric_unit !== null && this.state.resource !== null){
      if(currExped.profile_json !== null && currExped.tariffs.length > 0){
        currExped.tariffs.map(t => {
          if (
            this.state.metric_unit === t.metric_unit &&
            this.state.resource === t.resource) {
              this.setState({
                selectedTariff: t
              })
            }
        })
      }
    }
  }

  handleSelectExpeditor(value){
    let currExped = null;
    if(value !== null) {
      currExped = this.props.expeditorList.filter(st => st.id === value)[0];
      this.setState({
        currentExpeditor: currExped,
        linkCompany : true
      })
    }else {
      this.setState({
        currentExpeditor: null,
        linkCompany : false
      })
    }
    this.selectTariff(currExped)
  }

  handleSelectRegion(e){
    this.setState({
      region : e,
      selectedTariff: null,
      currentExpeditor: null,
      showMap : true,
      regionSelected: true
    })

    let data = {
      region_id: e,
      type: 'expeditor'
    }
    this.props.onGetResourceList(data);
  }
  handleSelectResource(e){
    this.setState({
      resource : e,
      selectedTariff: null,
      currentExpeditor: null,
      resourceSelected: true
    });

    let data = {
      region_id: this.state.region,
      resource_id: e,
      type: 'expeditor'
    }
    this.props.onGetMeasureList(data);
  }
  handleEnterVolume(e){
    this.setState({
      volume : e
    })
  }

  handleSelectMeasure(e){
    console.log(e);
    this.setState({
      metric_unit : e,
      selectedTariff: null,
      currentExpeditor: null,
      metricSelected: true
    })

    let data = {
      region_id: this.state.region,
      resource_id: this.state.resource,
      metric_unit_id: e
    }
    this.props.onGetExpeditors(data);
  }

  handleDistanceMatrix = (response, status) => {
    if(status === "OK") {
        // var dest = response.destinationAddresses[0];
        var dist = response.rows[0].elements[0].distance.text;
        // outputDiv.innerHTML += dist;

        this.setState({
          sumDistance: dist
        })

        return response;
    } else {
        alert("Error: " + status);
    }
  }

  handleSelectA(){
    this.setState({
      showMapA : true,
    })
  }

  handleSelectB(){
    this.setState({
      showMapB : true,
    })
  }

  handleSelectCloseA(){
    this.setState({
      showMapA : false,
    })
  }

  handleSelectCloseB(){
    this.setState({
      showMapB : false,
    })
  }

  handleCalculate = () => {
    // var mapDist = "";
    if(this.state.corditanesA !== null && this.state.corditanesB !== null){
      const service = new window.google.maps.DistanceMatrixService();
      var origin1 = {lat: this.state.corditanesA.lat, lng: this.state.corditanesA.lon};
      var destinationB = {lat: this.state.corditanesB.lat, lng: this.state.corditanesB.lon};
      // var dd = "";
      service.getDistanceMatrix(
      {
          origins: [origin1],
          destinations: [destinationB],
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidHighways: false,
          avoidTolls: false,
          unitSystem: window.google.maps.UnitSystem.METRIC
        }, this.handleDistanceMatrix
      );
    }
  }
  getAddressA(lat,lon){
    Geocode.setApiKey("AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA");
    Geocode.fromLatLng(lat, lon).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({
          corditanesA : {
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
  _onClickMapA(map, evt) {
    this.setState({
      corditanesA : {
        lat: map.latLng.lat(),
        lon: map.latLng.lng()
      }
    });
    this.getAddressA(map.latLng.lat(),map.latLng.lng())
  }
  getCordinateA(adres){
    this.setState({
      stateAddressA : adres
    })
  }
  renderGoogleA(){
    var locCenter = this.state.corditanesA ? this.state.corditanesA :  this.props.regions.filter(st => st.id === this.state.region)[0];
    const MapWithASearchBox = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` }} />,
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
        onClick={this._onClickMapA}
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
        {this.state.corditanesA && <Marker position={{ lat: this.state.corditanesA.lat, lng: this.state.corditanesA.lon}}/>}
      </GoogleMap>
    );
    return(
      <MapWithASearchBox onPlaceSelected={this.getAddressA} />
    )
  }

  getAddressB(lat,lon){
    Geocode.setApiKey("AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA");
    Geocode.fromLatLng(lat, lon).then(
      response => {
        const address = response.results[0].formatted_address;
        this.setState({
          corditanesB : {
            lat : lat,
            lon : lon
          }
        });
        this.getCordinateB(address);
      },
      error => {
        console.error(error);
      }
    );
  }
  _onClickMapB(map, evt) {
    this.setState({
      corditanesB : {
        lat : map.latLng.lat(),
        lon : map.latLng.lng()
      }
    });
    this.getAddressB(map.latLng.lat(),map.latLng.lng())
  }
  getCordinateB(adres){
    this.setState({
      stateAddressB : adres
    })
  }
  renderGoogleB(){
    var locCenterB = this.state.corditanesB ? this.state.corditanesB : this.props.regions.filter(st => st.id === this.state.region)[0];
    const MapWithASearchBox = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {}

          this.setState({
            bounds: null,
            center: {
              lat: locCenterB.lat, lng: locCenterB.lon
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
        onClick={this._onClickMapB}
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
        {this.state.corditanesB && <Marker position={{ lat: this.state.corditanesB.lat, lng: this.state.corditanesB.lon}} />}
      </GoogleMap>
    );
    return(
      <MapWithASearchBox onPlaceSelected={this.getAddressB} />
    )
  }

  renderRegionGoogle(region){
    var locCenterC;
    var zoom;
    if(region === null){
      locCenterC = {
        lat : 49.064677,
        lon : 67.437972
      }
      zoom = 4;
    }else{
      locCenterC = this.props.regions.filter(st => st.id === region)[0];
      zoom = 8;
    }
    const MapWithControlledZoom = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withState('zoom', 'onZoomChange',zoom),
      withHandlers(() => {
        const refs = {
          map: undefined,
        }

        return {
          onMapMounted: () => ref => {
            refs.map = ref
          },
          onZoomChanged: ({ onZoomChange }) => () => {
            onZoomChange(refs.map.getZoom())
          }
        }
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultCenter={{ lat: locCenterC.lat, lng: locCenterC.lon }}
        zoom={props.zoom}
        ref={props.onMapMounted}
        onZoomChanged={props.onZoomChanged}
      >
        {region !== null &&
            <Marker
            position={{ lat: locCenterC.lat, lng: locCenterC.lon }}
            onClick={props.onToggleOpen}
          >
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <div>
                {" "}
                Controlled zoom: {props.zoom}
              </div>
            </InfoWindow>
          </Marker>
        }
      </GoogleMap>
    );
    return(
      <MapWithControlledZoom />
    )
  }

  renderRegionGoogleDirectionsRenderer(corditanesA, corditanesB){
    
    const MapWithControlledZoom = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkI_n70i5jHoC2KJxfyxiXOBMnNPa5nHA&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new window.google.maps.DirectionsService();

          DirectionsService.route({
            origin: new window.google.maps.LatLng(corditanesA.lat, corditanesA.lon),
            destination: new window.google.maps.LatLng(corditanesB.lat, corditanesB.lon),
            travelMode: window.google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result,
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new window.google.maps.LatLng(41.8507300, -87.6512600)}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
      </GoogleMap>
    );
    return(
      <MapWithControlledZoom />
    )
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { currentExpeditor } = this.state;
    const regionItems = this.props.regions.map((region) =>
      <Option value={region.id} key={region.id}>
        {region.name}
      </Option>
    );
    const resourceItems = this.props.resourceList.map((resource) =>
      <Option value={resource.id} key={resource.id}>
        {resource.name}
      </Option>
    );
    const measureItems = this.props.measureList.map((measure) =>
      <Option value={measure.id} key={measure.id}>
        {measure.name}
      </Option>
    );
    const expeditorItems = this.props.expeditorList.map((expeditor) => {
      // добавить функцую фильра для компании
      let tariff = null;
      if(this.state.metric_unit !== null && this.state.resource !== null && this.state.region !== null){
        if(expeditor.profile_json !== null && expeditor.profile_json.user !== null ){
          expeditor.tariffs.map(t => {
            if (
                this.state.metric_unit === t.metric_unit &&
                this.state.resource === t.resource) {
                  tariff = t;
                }
          })
        }
      }
      let expeditorName = expeditor.profile_json.user_json ? expeditor.profile_json.user_json.company_name : "";
      return tariff !== null && (<Option value={expeditor.id} key={expeditor.id}>{expeditorName}</Option>)
    });
    const { position } = this.state;
    return (
      <div>
      	<Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              bodyStyle={{ padding: 20,paddingTop:0 }}
              className="transport-card"
            >
              {/*<div className="el-absolute">
                <Row gutter={24}>
                  <Col xl={10} lg={10} md={10} sm={24} xs={24} offset={7}>
                    <Search
                      placeholder="Search"
                      className="el-block mr1 mt1"
                      onSearch={value => console.log(value)}
                    />
                  </Col>
                </Row>
              </div>*/}
              <Tabs
                animated={false}
                className="transport-tabs">
                <TabPane tab="Автотранспорт" key="1">
                  <p className="gray-text fs-12 px1"><i>В данном разделе, Вы можете воспользоваться услугами наших партнеров - автоперевозчиков товаров, в случае если перевозка груза возможна партнером в выбранном регионе.</i></p>
                  <hr/>
                  <Form onSubmit={this.handleSubmit}>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                        <FormItem
                          label="Регион"
                          className="fm-RobotoRegular fs-14 black-text"
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
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Наименование товара:"
                          hasFeedback>
                          {getFieldDecorator('resource', {
                            rules: [{ required: true, message: 'Выберите товар' },],
                            onChange: (e) => this.handleSelectResource(e)
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите товар" disabled={!this.state.regionSelected}>
                              {resourceItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Единица измерения">
                          {getFieldDecorator('metric_unit', {
                            rules: [{ required: true, message: 'Выберите единицу' },],
                            onChange: (e) => this.handleSelectMeasure(e)
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите единицу измерения" disabled={!this.state.resourceSelected}>
                              {measureItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    <Row gutter={24} type="flex" align="middle" className="mt1">
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <FormItem
                          label="Экспедиторская компания:"
                          className="fm-RobotoRegular fs-14 black-text"
                          hasFeedback>
                          {getFieldDecorator('exped', {
                            rules: [{ required: true, message: 'Выберите компанию' },],
                            onChange: (e) => this.handleSelectExpeditor(e)
                          })(
                            <Select showSearch
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите компанию" disabled={!this.state.metricSelected}>
                              {expeditorItems}
                            </Select>
                          )}
                        </FormItem>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        {this.state.linkCompany && this.state.currentExpeditor !== null && <Link to={"/profile/" + this.state.currentExpeditor.profile_json.user} target="_blank" >О компании</Link>}
                      </Col>
                    </Row>
                    <Row gutter={24}>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                        <FormItem
                          className="fm-RobotoRegular fs-14 black-text"
                          label="Объем транспортировки"
                        >
                          {getFieldDecorator('volume', {
                            rules: [{required: true, message: 'Пожалуйста введите Кол-во в наличии'}],
                            onChange: (e) => this.handleEnterVolume(e)
                          })(
                            <InputNumber min={1} placeholder="Кол-во в наличии" style={{ width: '100%' }} />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                    {
                      this.state.showMap &&
                      <div>
                        <Row gutter={24}>
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Row gutter={24}>
                              <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                                <p className="fm-RobotoRegular fs-14 black-text mb1">Точка А</p>
                              </Col>
                              <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                                <p className="fm-RobotoRegular fs-14 black-text mb1">{this.state.corditanesA && this.state.stateAddressA}</p>
                              </Col>
                            </Row>
                          </Col>
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14" onClick={this.handleSelectA}>Выбрать</Button>
                          </Col>
                        </Row>
                        <Row gutter={24} className="mt1">
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                                <p className="fm-RobotoRegular fs-14 black-text mb1">Точка B</p>
                              </Col>
                              <Col xl={16} lg={16} md={16} sm={24} xs={24}>
                                <p className="fm-RobotoRegular fs-14 black-text mb1">{this.state.corditanesB && this.state.stateAddressB}</p>
                              </Col>
                          </Col>
                          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14" onClick={this.handleSelectB}>Выбрать</Button>
                          </Col>
                        </Row>
                      </div>
                    }
                    <Row gutter={24} className="mt1">
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Button className="btn btn-block btn-blue fm-RobotoMedium fs-14" onClick={this.handleCalculate}>Рассчитать расстояние</Button>
                      </Col>
                      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <p className="fm-RobotoRegular fs-14 black-text mb1">Общее расстояние : {this.state.sumDistance}</p>
                      </Col>
                    </Row>
                    <div className="btm-border my2" />
                    { currentExpeditor !== null && currentExpeditor.tariffs.length > 0 &&
                      <div className="gray-border py1 px2 my2">
                        <h2 className="fm-RobotoBold fs-18">Результат</h2>
                        <div className="flex justify_between">
                          <span className="fm-RobotoRegular fs-15">Стоимость перевозки на км:</span>
                          <span className="fm-RobotoRegular fs-15">{this.state.selectedTariff.price} тнг</span>
                        </div>
                        <div className="flex justify_between">
                          <span className="fm-RobotoRegular fs-15">Сумма:</span>
                          <span className="fm-RobotoRegular fs-15">{parseFloat(parseFloat(this.state.sumDistance.replace(",", ".")).toFixed(2)) * this.state.selectedTariff.price}</span>
                        </div>
                      </div>
                    }

                    <div className="stock_card-footer my2">
                      <Row gutter={24}>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                         {currentExpeditor !== null &&
                            <p className="fm-RobotoRegular fs-14">Результат: <span className="fm-RobotoBold fs-21">{+parseFloat(parseFloat(this.state.sumDistance.replace(",", ".")).toFixed(2)) * (+this.state.selectedTariff.price)}тнг</span></p>
                          }
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                         {currentExpeditor !== null &&
                            <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15" onClick={this.handleSubmit}>Заключить контракт</Button>
                          }
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </TabPane>
                {/*<TabPane tab="Жд" key="2">
                  <div className="my2">
                    <p className="fm-RobotoMedium fs-16 black-text mr1">Тип вагона:</p>
                  </div>
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Select defaultValue="lucy" onChange={handleChange} className="el-block">
                        <Option value="jack">Цистерна</Option>
                        <Option value="lucy">Цистерна</Option>
                      </Select>
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Checkbox
                        className="el-block fm-RobotoRegular fs-14 black-text ml1"
                        value="A">Собственный вагон</Checkbox>
                      <Checkbox
                        className="el-block fm-RobotoRegular fs-14 black-text"
                        value="A">С учетом возврата</Checkbox>
                    </Col>
                  </Row>
                  <div className="my2 flex item-cnt">
                    <p className="fm-RobotoMedium fs-16 black-text mr1">Станция и дорога отправления</p>
                    <a className="fm-RobotoRegular fs-13 light-blue-text ml1">Станции отгрузки НПЗ</a>
                  </div>
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Код</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Наименование</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                  </Row>
                  <div className="my2 flex item-cnt">
                    <p className="fm-RobotoMedium fs-16 black-text mr1">Станция и дорога отправления</p>
                    <a className="fm-RobotoRegular fs-13 light-blue-text ml1">Станции отгрузки НПЗ</a>
                  </div>
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Код</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Наименование</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                  </Row>
                  <div className="my2 flex item-cnt">
                    <p className="fm-RobotoMedium fs-16 black-text mr1">Груз</p>
                    <a className="fm-RobotoRegular fs-13 light-blue-text ml1">Популярные грузы</a>
                  </div>
                  <Row gutter={24}>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Код</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoRegular fs-14 black-text">Наименование</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                  </Row>
                  <Row gutter={24} className="mt2">
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoMedium fs-16 black-text">Вес отправки вагона</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <p className="fm-RobotoMedium fs-16 black-text">Кол-во вагонов</p>
                      <Input placeholder="Basig usage" />
                    </Col>
                  </Row>
                  <Row gutter={24} className="mt1">
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                      <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15">Рассчитать</Button>
                    </Col>
                  </Row>
                </TabPane>*/}
              </Tabs>
          </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              title="Карта"
              className="transport-card"
              bodyStyle={{ padding: 20, paddingTop: 0 }}
            >
              <div className="mt2" id="map">
                {(this.state.corditanesB !== null && this.state.corditanesA !== null) ? this.renderRegionGoogleDirectionsRenderer(this.state.corditanesA, this.state.corditanesB) : this.renderRegionGoogle(this.state.region)}
              </div>
            </Card>
          </Col>
        </Row>
        <Modal
          visible={this.state.showMapA}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Напишите адрес</h2>}
          className="add-modal_transport"
          width={1000}
          footer={[
            <Row>
              <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15" onClick={this.handleSelectCloseA}>Сохранить</Button>
              </Col>
            </Row>,
          ]}
          onCancel={this.handleSelectCloseA}
        >
          {this.renderGoogleA()}
        </Modal>
        <Modal
          visible={this.state.showMapB}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Напишите адрес</h2>}
          className="add-modal_transport"
          width={1000}
          footer={[
            <Row>
              <Col xl={4} lg={4} md={4} sm={24} xs={24}>
                <Button className="btn btn-block btn-blue fm-RobotoMedium fs-15" onClick={this.handleSelectCloseB}>Сохранить</Button>
              </Col>
            </Row>,
          ]}
          onCancel={this.handleSelectCloseB}
        >
          {this.renderGoogleB()}
        </Modal>
      </div>
    );
  }
}

const WrappedAutoTransportForm = Form.create()(TransportPage);

const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  measureList: state.resource.measureList,
  expeditorList: state.resource.expeditorList,
  regions: state.profile.regions,
  userProfile: state.user.userProfile,
})

const mapDispatchToProps = {
  onCreateContract: contractActions.createContract,
  onGetRegionList: profileActions.getRegions,
  onGetResourceList: resourceActions.getResources,
  onGetMeasureList : resourceActions.getMeasureList,
  onGetExpeditors : resourceActions.getExpeditorList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAutoTransportForm);
