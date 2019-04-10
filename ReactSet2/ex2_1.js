import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

class App extends Component {
	constructor() {
		super();
		this.state = {
			naviDialOpen: false,
		}
	}
	
	handleChange = (event, value) => {
		this.setState({
			naviDialOpen: value==="leave",
		});
	}
	
	handleClose = () => {
		this.setState({
			naviDialOpen: false,
		});
	}
	
	handleNavigate = () => {
		window.location.href = "http://uta.fi";
	}
	
	render() {
		const actions = [
			<FlatButton
			 label="Cancel"
			 primary={true}
			 onTouchTap={this.handleClose}
			/>,
			<FlatButton
			 label="Leave"
			 primary={true}
			 keyboardFocused={true}
			 onTouchTap={this.handleNavigate}
			/>,
		];
		// The menu could be defined within render() but I stored
		// it into a variable here to keep the code readable.
		// The "origin" specifications are not really important with
		// such a small menu but with larger menus these value can
		// set how menu opens.
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.handleChange}>
							<MenuItem value="leave" primaryText="Leave page..." />
					</IconMenu>
					
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 2.1" iconElementRight={menu} ></AppBar>
					<Dialog
						title="Confirm navigation"
						actions={actions}
						modal={true}
						open={this.state.naviDialOpen}
						onRequestClose={this.handleClose}
					>
					Do you really want to leave the page?
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
