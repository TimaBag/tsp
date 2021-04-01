import React, { Component } from 'react';
import { Row, Col, Input, Card, Button, List} from 'antd';
import { connect } from 'react-redux';

import moment from 'moment';
import ruLocale from 'moment/locale/ru';

import '../styles/Message.css';
import * as chatActions from "../actions/chatActions";
import * as companyActions from "../actions/companyActions";

moment.updateLocale('ru', ruLocale);

// const Search = Input.Search;
const { TextArea } = Input;

const extractTime = (dateTime) => {
  if(dateTime !== null)
    return moment(dateTime)
        .format('D MMMM YYYY');
  else return '';
};

const mess_title = (
  <Row gutter={24}>
    <Col xl={14} lg={14} md={14} sm={24} xs={24}>
      <h2 className="fs-14 black-text">Сообщения</h2>
    </Col>
    {/*<Col xl={10} lg={10} md={10} sm={24} xs={24}>
      <Search
        placeholder="Поиск"
        className="el-block"
        onSearch={value => console.log(value)}
      />
    </Col>*/}
  </Row>
)

class ChatsPage extends Component {
  constructor(props){
    super(props)
    this.state={
      messageText: '',
      selectedChat_id: null,
    }
    this.refreshChat = this.refreshChat.bind(this);
  }
  componentWillMount() {
    this.props.onGetMyChats();
    this.props.onGetCompanies();
    if(this.props.match.params.user_id !== undefined){
      this.openCurrentChat(parseInt(this.props.match.params.user_id, 10))
    }
  }
  componentDidMount(){
    setInterval(this.refreshChat, 60000);
  }
  refreshChat(){
    this.props.onGetMyChats()
  }
  getUserInfo = (user_id) => {
    let user = null;
    if(this.props.companyList !== []){
      user = this.props.companyList.filter(cmp => cmp.id === user_id)[0];
    }
    if(user !== undefined && user !== null) return user.username;
    return user;
  }
  openCurrentChat = (item) => {
    this.setState({ selectedChat_id: item })
    let params = {
      user_id: item
    }
    this.props.onGetChatItem(params);
  }
  handleEnterMessage = (e) => {
    this.setState({ messageText: e.target.value })
  }
  handleSendMessage = () => {
    let data = {
      text: this.state.messageText,
      is_read: false,
      from_user: this.props.user.user,
      to_user: this.state.selectedChat_id
    }
    this.setState({ messageText: ''});
    var isReadChat = {
      is_read : true,
    }
    this.props.chatItem.map((item) => {
        if(item.to_user === this.props.user.user){
          this.props.onReadChat(item.id,isReadChat);
        }
      }
    )
    let params = {
      user_id: this.state.selectedChat_id
    }
    this.props.onGetChatItem(params);
    this.props.onSendMessage(data);
  }
	render(){
		return(
		  <div>
		    <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className="message-card"
              title={mess_title}
              bodyStyle={{ padding: 20}}
            >
              <div className="message-gray_block">
                <List
                  itemLayout="horizontal"
                  dataSource={this.props.myChatsList}
                  className="message-list"
                  renderItem={item => (
                    <List.Item
                      onClick={() => this.openCurrentChat(item.user_id)}
                    >
                      <Row gutter={24} style={{width : "100%"}}>
                        <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                          <div className="logo-medium"></div>
                        </Col>
                        <Col xl={18} lg={18} md={18} sm={24} xs={24}>
                          <div className="gray-text">
                            <p>{extractTime(item.last_message)}</p>
                            <p>От: <span className="fm-RobotoMedium fs-15 black-text">{this.getUserInfo(item.user_id)}</span></p>
                          </div>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            { this.state.selectedChat_id !== null &&
              (<Card
                bordered={false}
                className="message-card"
                bodyStyle={{ padding: 20}}
              >
                <div className="chat-container">
                { this.props.chatItem !== [] &&
                  this.props.chatItem.map(item =>
                  (
                    <div key={item.id} className="mb2">
                      <div className="btm-border my2" />
                      <div className="flex justify_between mb2">
                        <p className="black-text fm-RobotoMedium fs-15">{this.getUserInfo(item.from_user)}</p>
                        <p className="gray-text fm-RobotoRegular fs-13">{extractTime(item.datetime)}</p>
                      </div>
                      <div className="gray-block">
                        <p className="fm-RobotoMedium fs-15 black-text">{item.text}</p>
                        {item.is_read ? <p className="black-text"><small>Прочитано</small></p> : <p className="black-text"><small>Не прочитано</small></p>}
                      </div>
                    </div>
                  ))
                }
                </div>
                <div>
                  <TextArea rows={4} className="message-gray-txt_area" value={this.state.messageText}
                    onChange={(e) => this.handleEnterMessage(e)}/>
                  <Row gutter={24} className="mt1">
                    <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                      <Button className="btn btn-blue btn-block"
                        onClick={this.handleSendMessage.bind(this)}>Ответить</Button>
                    </Col>
                    {/*
                      <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                        <Button className="btn btn-outside btn-block">Отмена</Button>
                      </Col>
                    */}
                  </Row>
                </div>
              </Card>)
            }
          </Col>
        </Row>
		  </div>
	  );
	}
}

const mapStateToProps = (state) => ({
  myChatsList: state.chat.myChatsList,
  companyList: state.company.companyList,
  chatItem: state.chat.chatItem,
  isMessageSent: state.chat.isMessageSent,
  user: state.user.user
})

const mapDispatchToProps = {
  onGetMyChats: chatActions.getMyChats,
  onGetCompanies: companyActions.getCompanies,
  onGetChatItem: chatActions.getChatItem,
  onSendMessage: chatActions.sendMessage,
  onReadChat : chatActions.readMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatsPage);
