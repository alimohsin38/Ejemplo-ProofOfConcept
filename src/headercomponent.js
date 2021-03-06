import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {$, popper, bootstrap} from './App';
import NavigationStrip from './navigationstrip';
import {BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import {userNameAndPassword} from './logincomponent';
import {store} from './logincomponent';
import { connect } from 'react-redux';


class Header extends Component{
	constructor(props){
		super(props);
		this.state = {search: "Search...", serchOpened: true, logOut: "Logout", navigationToggle: true};
		this.openSearchBox = this.openSearchBox.bind(this);
		this.search = this.search.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.revertsearch = this.revertsearch.bind(this);
		this.loggedOut = this.loggedOut.bind(this);
		this.navigationToggle = this.navigationToggle.bind(this);
		this.navigatetoHome = this.navigatetoHome.bind(this);
	}
	
	
	updateDimensions() {
		if(navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1){
			$("#BootstrapSlider").css({"width":"100%"});
		}		
	}


	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}


	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	
	
	openSearchBox(event){		
		this.setState(prevState => ({serchOpened: !prevState.serchOpened}));		
		if(this.state.serchOpened){
			$("input[name='search']").css({"opacity":"1", "width":"200px", "transition": "all 0.5s 0.0s"});
			$("i[name='searchIcon']").css({"color":"#000"});
		}else{
			$("input[name='search']").css({"opacity":"0", "width":"0px", "transition": "all 0.5s 0.0s"});
			$("i[name='searchIcon']").css({"color":"#888"});
			this.setState({search: 'Search...'});
		}
	}
	
	
	search(event){
		this.setState({search: event.target.value});
	}
	clearSearch(){
		if(this.state.search == 'Search...'){
			this.setState({search: ''});
			$("input[name='search']").css({"color":"#000"});
		}
	}
	revertsearch(){
		if(this.state.search == ''){
			this.setState({search: 'Search...'});
			$("input[name='search']").css({"color":"#888"});
		}
	}
	
	
	loggedOut(){
		this.setState({logOut: "Wait..."});
		setTimeout(()=> window.location.reload(), 1000);		
	}
	
	
	navigationToggle(){
		this.setState(prevState => ({navigationToggle: !prevState.navigationToggle}));
		if(this.state.navigationToggle){
			$(".nav ul").css({"display":"block"});
		}else{
			$(".nav ul").css({"display":"none"});
		}
	}
	
	
	navigatetoHome(event){
		store.dispatch({type: "home"});	
	}
	
	
	render(){
		const MenuItems = ["home", "pages", "elements", "classes", "trainers", "about", "blog"];
		return(			
			<div className={"container-fluid bgWhite"}>
				<div className={"row"}>
					<div className={"container noPadding"}>
						<div className={"col displayFlex noPadding"}>
							<div className={"col-4 col-xl-2 col-lg-2 col-md-2 col-sm-4 noPadding logo"}>
								<div className={"logoContainer"}>
									<Link to={"./home"} onClick={this.navigatetoHome}>GYM</Link>
								</div>
							</div>
							
							<div className={"col-4 col-xl-8 col-lg-7 col-md-7 col-sm-4 noPadding nav"}>
								<NavigationStrip value={MenuItems} />
								<div onClick={this.navigationToggle} className={"toggleButton"}>
									<span></span><span></span><span></span>
								</div>
							</div>
							
							<div className={"col-4 col-xl-3 col-lg-3 col-md-3 col-sm-4 noPadding xsAlignRignt"}>
								<div className={"searchBox"}>
									<i name={"searchIcon"} onClick={this.openSearchBox} className={"fa fa-search"}></i>
									<input tabIndex={"1"} onFocus={this.clearSearch} onBlur={this.revertsearch} onClick={this.clearSearch} onChange={this.search} type="text" name={"search"} value={this.state.search} />
									<font>|</font>
								</div>
								
								<Link to="profile"><label name="userNameHome">Hi, {userNameAndPassword.defaultUser}</label></Link>
								
								<div className={"logOut"}>
									<Link to="/" onClick={this.loggedOut}>{this.state.logOut}</Link>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Header;