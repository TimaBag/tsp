import React, { Component } from 'react';
import { Row, Col, Input, Card, List, Icon, Pagination, DatePicker, Modal, Button } from 'antd';

import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ruLocale from 'moment/locale/ru';

import * as newsActions from '../actions/newsActions';
import '../styles/News.css';

moment.updateLocale('ru', ruLocale);
const Search = Input.Search;
const extractTime = (dateTime) => {
  if (dateTime !== null) return moment(dateTime).format('D MMMM YYYY');
  else return '';
};

const { RangePicker } = DatePicker;

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewsDetail: false,
      selectedNewsItem: null,
      query: '',
      page: 0,
      limit: 7,
      date: [],
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleShowSortDate = this.handleShowSortDate.bind(this);
    this.handleCloseSortDate = this.handleCloseSortDate.bind(this);
    this.handleSortDate = this.handleSortDate.bind(this);
    this.handleCancelSortDate = this.handleCancelSortDate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    this.props.onGetNews(this.state.page);
  }
  componentWillReceiveProps(nextProps) {
    const paramsNewsID = this.props?.match?.params?.item_id;
    if (paramsNewsID !== undefined) {
      nextProps.newsList.map((news) => {
        if (parseInt(news.id, 10) === parseInt(paramsNewsID, 10)) {
          this.openNewsReader(news);
          return 0;
        }
        return 0;
      });
    }
  }
  handleShowSortDate() {
    this.setState({
      show_sort: true,
    });
  }
  handleCloseSortDate() {
    this.setState({
      show_sort: false,
    });
  }
  onChange(value, dateString) {
    this.setState({
      date: dateString,
    });
  }
  handleSortDate() {
    let data = {
      date_from: this.state.date[0],
      date_to: this.state.date[1],
      page: this.state.page,
    };
    this.setState({
      show_sort: false,
    });
    this.props.onGetNewsByDate(data);
  }
  handleCancelSortDate() {
    this.setState({
      show_sort: false,
    });
    this.props.onGetNews(this.state.page);
  }
  getStripedText(htmlText) {
    return htmlText.replace(/<(.|\n)*?>/g, '');
  }
  getNewsDesc(newsText) {
    return <div dangerouslySetInnerHTML={{ __html: newsText }} />;
  }
  openNewsReader = (newsItem) => {
    this.setState({
      showNewsDetail: true,
      selectedNewsItem: newsItem,
    });
  };
  closeNewsReader = () => {
    this.setState({
      showNewsDetail: false,
      selectedNewsItem: null,
    });
  };
  filterNewsList(newsList) {
    return newsList.filter((news) =>
      _.toLower(news.title).includes(_.toLower(this.state.query || ''))
    );
  }
  handleChangePage(page) {
    var data_page = page - 1;
    if (this.state.date.length !== 0) {
      let data = {
        date_from: this.state.date[0],
        date_to: this.state.date[1],
        page: this.state.limit * data_page,
      };
      this.props.onGetNewsByDate(data);
    } else {
      this.setState({
        page: this.state.limit * data_page,
      });
      this.props.onGetNews(this.state.limit * data_page);
    }
  }
  render() {
    const { selectedNewsItem, showNewsDetail } = this.state;
    return (
      <div>
        <Row gutter={24}>
          <Col xl={13} lg={13} md={13} sm={24} xs={24} className="mb1">
            {(!(showNewsDetail && selectedNewsItem !== null) || window.screen.width > 900) && (
              <Card
                title={
                  <Row gutter={24} className="flex item-cnt">
                    <Col xl={5} lg={5} md={5} sm={24} xs={24}>
                      <h2 className="fm-RobotoBold fs-14 black-text">НОВОСТИ</h2>
                    </Col>
                    <Col xl={8} lg={8} md={8} sm={24} xs={24}>
                      <h2
                        className="fm-RobotoRegular fs-12 black-text txt-underline txt-link"
                        onClick={this.handleShowSortDate}
                      >
                        Сортировка по дате
                      </h2>
                    </Col>
                    <Col xl={11} lg={11} md={11} sm={24} xs={24}>
                      <Search
                        placeholder="Поиск"
                        onChange={(event) => this.setState({ query: event.target.value })}
                      />
                    </Col>
                  </Row>
                }
                bordered={false}
                className="news-card btm-border_none"
                bodyStyle={{ padding: 20, paddingTop: 0 }}
              >
                <List
                  itemLayout="horizontal"
                  className="news_list"
                  dataSource={this.filterNewsList(this.props.newsList)}
                  renderItem={(item) => (
                    <List.Item
                      className={
                        selectedNewsItem !== null && item.id === selectedNewsItem.id
                          ? 'activeNews'
                          : ''
                      }
                    >
                      <List.Item.Meta
                        onClick={() => this.openNewsReader(item)}
                        title={<span className="blue-text">{extractTime(item.datetime)}</span>}
                        description={item.title}
                        className="news_card-list_news"
                      />
                    </List.Item>
                  )}
                />
                <Pagination
                  defaultCurrent={1}
                  total={this.props.newsCount}
                  onChange={this.handleChangePage}
                />
              </Card>
            )}
          </Col>

          <Col xl={11} lg={11} md={11} sm={24} xs={24}>
            {showNewsDetail && selectedNewsItem !== null && (
              <Card
                title={
                  <Row gutter={24}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <div className="flex justify_between item-cnt">
                        <a onClick={() => this.closeNewsReader()} className="back-link">
                          <Icon type="left" /> Назад
                        </a>
                        <a
                          onClick={() => this.closeNewsReader()}
                          className="btn btn-close blue-text fs-21"
                        >
                          <Icon type="close" />
                        </a>
                      </div>
                    </Col>
                  </Row>
                }
                bordered={false}
                className="news-card"
                bodyStyle={{ padding: 20, paddingTop: 0 }}
              >
                <div className="news-content">
                  <span className="news-current_date blue-text">
                    {extractTime(selectedNewsItem.datetime)}
                  </span>
                  <h2 className="news-current_title">{selectedNewsItem.title}</h2>
                  <div className="news-content_desc">{this.getNewsDesc(selectedNewsItem.text)}</div>
                  <span className="source-loc gray-text">
                    Источник новости: {selectedNewsItem.source}
                  </span>
                </div>
              </Card>
            )}
          </Col>
        </Row>
        <Modal
          title="Сортировка по дате"
          visible={this.state.show_sort}
          className="add-modal"
          onCancel={this.handleCloseSortDate}
        >
          <RangePicker
            format="YYYY-MM-DD"
            placeholder={['Начало', 'Конец']}
            onChange={this.onChange}
          />
          <Row gutter={24} className="mt2">
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                onClick={this.handleSortDate}
              >
                Сортировать
              </Button>
            </Col>
            <Col xl={8} lg={8} md={8} sm={24} xs={24}>
              <Button
                className="btn btn-block btn-blue fm-RobotoMedium fs-15"
                onClick={this.handleCancelSortDate}
              >
                Отменить
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newsList: state.news.newsList,
  newsCount: state.news.newsCount,
  newsNext: state.news.newsNext,
  newsPrevious: state.news.newsPrevious,
});

const mapDispatchToProps = {
  onGetNews: newsActions.getNews,
  onGetNewsByDate: newsActions.getNewsByDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
