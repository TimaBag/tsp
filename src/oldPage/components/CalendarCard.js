import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, DatePicker,Modal } from 'antd';
import { connect } from 'react-redux';
import * as actions from "../actions/contractActions";
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/ru_RU';

import '../styles/Calendar.css';

const extractTimeNews = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('DD.MM.YYYY');
  else return '';
};


class CalendarCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      checkModal : false, 
      page : 0,
      limit : 7,
      calendarDate : moment().format("YYYY-MM-DD")
    }
  }

  onChange = (dates, dateStrings) => {
    let data = {
      user: 48
    }
    if(dateStrings.length !== 0){
      this.setState({
        calendarDate : moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD")
      })
      this.props.onGetContractListFilterTime(data,this.state.page,moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD"));
    }else{
      this.props.onGetContractList(data,this.state.page);
      this.setState({
        calendarDate : ""
      })
    }
  }

  componentWillMount() {
    let data = {
      user: 48,
    }
    this.props.onGetContractListFilterTime(data,this.state.page,this.state.calendarDate.toString());
  }

  transformMeasure(item){
    var data = this.props.measureList.filter((measure) => {
      if(item === measure.id) {
        return measure.name;
      } 
    })
    if(data.length === 0){
      return "нету"
    }else{
      return data[0].name
    }
  }

  handleCheckLogin(){
    if(!this.props.isLoggedIn){
      this.setState({
        checkModal : true,
      })
    }
  }
  handleCloseCheckLogin = () => {
    this.setState({
      checkModal : false,
    })
  }

  render() {
    return (
      <Card
        bordered={false}
        title="Календарь"
        className="calendar-card"
        bodyStyle={{ padding: 24, paddingTop: 0 }}
        style={{ marginTop: 35,height: 350 }}
      >
        <div className="calendar-card_date flex item-cnt">
          <div className="cur_date-in_calendar">{this.state.calendarDate.length === 0 ? "" : extractTimeNews(this.state.calendarDate)}</div>
          <DatePicker
            onChange={this.onChange}
            format={"DD.MM.YYYY"}
            locale={locale}
            placeholder="Выберите дату"
            defaultValue={moment()}
          />
        </div>
        {this.props.contract_list.length !== 0 ?
          <List
            itemLayout="horizontal"
            dataSource={(this.props.contract_list).slice(0,2)}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={this.props.isLoggedIn ? <div className="fs-15">{extractTimeNews(item.datetime)}</div> : <Link to="" onClick={this.handleCheckLogin.bind(this)}>{item.date}</Link>}
                  description={<div className="fs-14 fm-Monospaced ant-gray-text">Сделка между {item.client_obj.company_name} и {item.supplier_obj.company_name} - {item.contract_type} - Объём: {item.sub_contract_obj.volume} Единица измерения: {this.transformMeasure(item.sub_contract_obj.metric_unit)}</div>}
                  className="calendar-card_list-news"
                />
              </List.Item>
            )}
          />
          :
          <p className="mt1">Смените период ,в данном периоде нету данных</p>
        }
        <Modal
          visible={this.state.checkModal}
          title={<h2 className="fm-RobotoBold fs-18 black-text">Гостевой режиме</h2>}
          className="add-modal"
          width={1000}
          onCancel={this.handleCloseCheckLogin}
        >
          <p>Вы находитесь в гостевом режиме, в связи с этим данная опция недоступна для Вас.</p>
        </Modal>
      </Card>
    );
  }
}


const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  contract_list: state.contract.contract_list,
  measureList: state.resource.measureList,
})

const mapDispatchToProps = {
  onGetContractList: actions.getContractList,
  onGetContractListFilterTime: actions.getContractListFilterTime,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarCard);
