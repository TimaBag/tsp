import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card, Tabs, DatePicker, Select } from 'antd';
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,PieChart,Pie,Cell } from 'recharts';

import * as actions from "../actions/resourceActions";

import "../styles/ChartCard.css";

const TabPane = Tabs.TabPane;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#22b319', '#5b19b3','#b31936'];
const Option = Select.Option;
const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class ChartCard extends Component {
  constructor(props){
    super(props);
    this.state={
      dateStart: moment().format("YYYY-MM-DD"),
      dateEnd: moment().add(7,'days').format("YYYY-MM-DD"),
      metric_unit_id: 1,
    };
  }

  componentDidMount(){
    this.props.onGetGraphSegmentation();
    let data = {
        start_date : moment().format("YYYY-MM-DD"),
        end_date : moment().add(7,'days').format("YYYY-MM-DD")
      }
    this.props.onGetGraphDate(1,1,data);
  }

  onChange = (dates, dateStrings) => {
    this.setState({
      dateStart : moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD"),
    })
    if(this.state.dateEnd.length !== 0){
      let data = {
        start_date : moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD"),
        end_date : this.state.dateStart
      }
      this.props.onGetGraphDate(this.props.resource_id,this.state.metric_unit_id,data);
    }
  }

  onChange2  = (dates, dateStrings) => {
    this.setState({
      dateEnd : moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD"),
    })
    if(this.state.dateStart.length !== 0){
      let data = {
        start_date : this.state.dateStart,
        end_date : moment(dateStrings,"DD.MM.YYYY").format("YYYY-MM-DD")
      }
      this.props.onGetGraphDate(this.props.resource_id,this.state.metric_unit_id,data);
    }
  }
  handleSelectMeasure = (value) => {
    let data = {
      start_date : this.state.dateStart,
      end_date : this.state.dateEnd
    }
    this.setState({
      metric_unit_id: value
    })
    this.props.onGetGraphDate(this.props.resource_id,value,data);
  }
  render () {
    var chartWidth = ((window.screen.width-265)*41.7/100)-80;
    if(window.screen.width <= 992){
      chartWidth = (window.screen.width*41.7/100)-80;
    }
    if(window.screen.width <= 767){
      chartWidth = (window.screen.width-80);
    }
    let dataRes = [];
    if(this.props.resourceList.length !== 0){
      dataRes = this.props.resourceList.filter((data)=>{
        if(this.props.resource_id === data.id){
          return data;
        }
      })[0]
    }
    for (var i in this.props.grapData) {
      this.props.grapData[i].date = moment(this.props.grapData[i].date).format("DD.MM.YYYY");
     }
    const measureItems = this.props.measureList.map((measure) =>
      <Option value={measure.id} key={measure.id}>
        {measure.name}
      </Option>
    );
    return (
      <Card
        bordered={false}
        className="chart-card"
        style={{ marginTop: 35, paddingTop: 0,height: 390 }}>
        <Tabs>
          <TabPane tab="Интерактивный график" key="1">
            <div className="flex flex-wrap">
              <DatePicker
                format={"DD.MM.YYYY"}
                placeholder="Выберите дату"
                onChange={this.onChange}
                defaultValue={moment()}
                style={{ width: '40%', marginRight:10}}
              />
              <DatePicker
                format={"DD.MM.YYYY"}
                placeholder="Выберите дату"
                onChange={this.onChange2}
                defaultValue={moment().add(7,'days')}
                style={{ width: '40%'}}
              />
              <Select
                className="mt2"
                style={{ width: '40%'}}
                onChange = {this.handleSelectMeasure}
                showSearch
                value={this.state.metric_unit_id}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Выберите единицу измерения">
                {measureItems}
              </Select>
            </div>
            {this.props.grapData.length !== 0 ?
              <AreaChart className="interact-chart" width={chartWidth} height={275} data={this.props.grapData}
              margin={{top: 20, right: 0, left: 0, bottom: 0}}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="35%" stopColor="#c1defa" stopOpacity={0.3}/>
                    <stop offset="65%" stopColor="#c1defa" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Area dataKey={dataRes.name} stroke='#0078e9' fillOpacity={1} fill="url(#colorUv)"/>
              </AreaChart>
              :
              <p className="mt1">Смените период в данном периоде нету данных и единицу измерения</p>
            }
          </TabPane>
          <TabPane tab="Сегментация" key="2">
            <div className={window.screen.width >  1250 ? "flex flex-row item-cnt" : "flex flex-column item-cnt"}>
              {this.props.grapSegmentData.length !== 0 ?
                <PieChart width={260} height={260} >
                  <Pie
                    data={this.props.grapSegmentData} 
                    cx={150} 
                    cy={100}  
                    outerRadius={70} 
                    fill="#8884d8"
                    label
                    dataKey='value'
                  >
                    {
                      this.props.grapSegmentData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                  </Pie>
                  <Tooltip/>
                </PieChart>
                :
                <p className="ml1">Смените период в данном периоде нету данных</p>
              }
              <div className="flex flex-column list-segments">
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(91, 25, 179)"}} /><p className="ml1">Промышленное предприятие</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(179, 25, 54)"}} /><p className="ml1">Предоставление услуг</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(0, 136, 254)"}} /><p className="ml1">Производитель</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(0, 196, 159)"}} /><p className="ml1">Импортер</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(91, 25, 179)"}} /><p className="ml1">Трейдер</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(255, 128, 66)"}} /><p className="ml1"> Розничный реализатор</p>
                </div>
                <div className="flex item-cnt fs-12">
                  <div style={{width:10 ,height:10 ,backgroundColor:"rgb(34, 179, 25)"}} /><p className="ml1">Предприятие аграрного сектора</p>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>

    );
  }
}



const mapStateToProps = (state) => ({
  resourceList: state.resource.resourceList,
  resource_id : state.resource.resourceId,
  grapSegmentData : state.resource.grapSegmentData,
  grapData : state.resource.grapData,
  measureList: state.resource.measureList
})

const mapDispatchToProps = {
  onGetGraph: actions.getGraph,
  onGetGraphDate : actions.getGraphDate,
  onGetGraphSegmentation : actions.getGraphSegmentation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartCard);