import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import * as actions from "../actions/resourceActions";
import '../styles/Sidebar.css';

const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smallScreen: window.innerWidth < 992,
    }
    this.handleClickResource = this.handleClickResource.bind(this);
  }
  handleClickResource(e,id){
    if(this.props.graphDate !== null){
      this.props.onGetGraphDate(id,this.props.graphDate);
    }else{
      this.props.onGetGraph(id);
    }
  }
  render() {
    return (
      <div className="sidebar">
        {
          (this.props.isLoggedIn && this.props.userProfile) && !this.state.smallScreen &&
          <div className="sidebar-header mt3 mb2">
            <Link to={"/profile/"+this.props.userProfile.user}>
              {this.props.userProfile.image ?
                <img src={"http://www.tradehouse.kz"+this.props.userProfile.image} className="logo-circle" style={{ width: 52, height: 52 }} />
                :
                <div  className="logo-medium" />
              }
            </Link>
            <p className="gray-text fm-RobotoRegular fs-14 txt-center mt1">Профиль:</p>
            <p className="fm-RobotoMedium fs-14 txt-center">{ this.props.userProfile.company_name}</p>
            <p className="fm-RobotoMedium fs-14 txt-center"><span className="gray-text">&#9733;</span> Рейтинг: { this.props.userProfile.rating}</p>
          </div>
        }

        <Menu theme="light" mode={this.state.smallScreen ? "horizontal" : "inline"}
          className="sidebar-menu">
          {this.props.categoryList.map((cat) =>
            <SubMenu 
              key={cat.id}
              className="sidebar-menu-item"
              title={<div className="flex sidebar-menu-title item-cnt"><img src={cat.icon} style={{height:10,width:10}} /><p>{cat.name}</p></div>}>
              {this.props.resourceList.map((res) =>
                (res.category === cat.id) && <Menu.Item onClick={(e) => this.handleClickResource(e,res.id)} key={res.id}>{res.name}</Menu.Item>
              )}
            </SubMenu>
          )}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps=(state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  resourceList: state.resource.resourceList,
  categoryList: state.resource.categoryList,
  userProfile: state.user.userProfile,
  graphDate : state.resource.graphDate,
})

const mapDispatchToProps={
  onGetGraph : actions.getGraph,
  onGetGraphDate : actions.getGraphDate,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
