import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, List, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
// import _ from 'lodash';
import moment from 'moment';

import * as newsActions from "../actions/newsActions";
import '../styles/News.css';

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format("DD.MM.YYYY");
  else return '';
};

class NewsCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      checkModal : false, 
      smallScreen: window.innerWidth < 992,
      sliceScreen: window.innerWidth < 1290 && window.innerWidth > 768,
    }
  }
  componentWillMount() {
    this.props.onGetNews();
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
    var sliceNumber = this.state.sliceScreen ? 2 : 3;
    return (
      <Card
        bordered={false}
        title="Новости"
        className="news_card-card"
        bodyStyle={{ padding: 24, paddingTop: 0 }}
        style={{ marginTop: 35, height: 360}}
        extra={this.props.isLoggedIn ? <a href="/news">Читать все новости <Icon type="right-circle-o" /></a> : <Link to="" onClick={this.handleCheckLogin.bind(this)}>Читать все новости <Icon type="right-circle-o" /></Link> }
      >
        <List
          itemLayout="vertical"
          dataSource={(this.props.newsList).slice(0,sliceNumber)}
          renderItem={item => (
            <List.Item className="mb0">
              <List.Item.Meta
                title={this.props.isLoggedIn ? <a href={"/news/" + item.id} >{extractTime(item.datetime)}</a> : <Link to="" onClick={this.handleCheckLogin.bind(this)}>{extractTime(item.datetime)}</Link>}
                description={item.source}
                className="news_card-list_news mb0"
              />
              {item.title}
            </List.Item>
          )}
        />
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
  newsList: state.news.newsList,
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = {
  onGetNews: newsActions.getNews,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsCard);
