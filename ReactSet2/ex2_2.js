import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import DropDownMenu from 'material-ui/DropDownMenu';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// The list of people is set here as a global variable array. 
// Not exactly an elegant solution but keeps things simple for
// this small exercises.
let people = [
	{first: "John",
	 last: "Moe",
	 town: "Korso",
	 year: 1953,
	},
	{first: "Andy",
	 last: "Rollins",
	 town: "Urjala",
	 year: 1954,
	},
]

/**
  * Small custom component, displaying a simple item of information with a label.
  */
class PersonInfoItem extends Component {
	render() {
		return (
			<p>
				{this.props.title}
				<TextField value={this.props.value} disabled={true} />
			</p>
		);
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			personIndex: 0,
		}
	}
	
	handleChange = (event, value) => {
		let index = this.state.personIndex;
		if (value==="next" && this.state.personIndex < people.length-1)
			index++;
		if (value==="previous" && this.state.personIndex > 0)
			index--;
		this.setState({
			personIndex: index,
		});
	}
	
	render() {
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.handleChange}>
						<MenuItem value="next" primaryText="Next" disabled={this.state.personIndex >= people.length-1} />
						<MenuItem value="previous" primaryText="Previous" disabled={this.state.personIndex == 0}/>
					</IconMenu>
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 2.2" iconElementRight={menu} ></AppBar>
					<Paper style={{width: 600, textAlign: 'left',}}>
						<PersonInfoItem title="First name:" value={people[this.state.personIndex].first} />
						<PersonInfoItem title="Last name:"  value={people[this.state.personIndex].last} />
						<PersonInfoItem title="Birth town:" value={people[this.state.personIndex].town} />
						<PersonInfoItem title="Birth year:" value={people[this.state.personIndex].year} />
					</Paper>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
