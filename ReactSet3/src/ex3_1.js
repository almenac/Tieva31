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
import DatePicker from 'material-ui/DatePicker';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

let people = [
	{first: "John",
	 last: "Moe",
	 town: "Korso",
	 day: 3,
	 month: 12,
	 year: 1953,
	},
	{first: "Andy",
	 last: "Rollins",
	 town: "Urjala",
	 day: 13,
	 month: 2,
	 year: 1954,
	},
]

class PersonInfoItem extends Component {
	render() {
		return (
			<div>
			{this.props.title}
			<TextField onChange={this.props.onChange} value={this.props.value} id={this.props.id}/>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			personIndex: 0,
		};
	}
	
	handleChange = (event, value) => {
		let index = this.state.personIndex;
		if (value==="next")
			index = Math.min(index+1, people.length-1);
		else
			index = Math.max(0, index-1, 0);
		this.setState({
			personIndex: index,
		});
	};
	
	update = (value, field) => {
		people[this.state.personIndex][field] = value;
		// Since we are not updating state, we must 
		// explicitly tell React to update the UI.
		this.forceUpdate();
	}
	
	updateDate = (ref, date) => {
		people[this.state.personIndex]["year"] = date.getFullYear();
		people[this.state.personIndex]["month"] = date.getMonth();
		people[this.state.personIndex]["day"] = date.getDate();
		this.setState({
			personIndex: this.state.personIndex,
		});
	} 
	
	
	render() {
		const birth = new Date(people[this.state.personIndex].year, people[this.state.personIndex].month, people[this.state.personIndex].day, 0, 0, 0);
		
		return (
		<MuiThemeProvider>
			<div className="App">
				<AppBar title="Exercise 3.1"
					iconElementRight={<IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.handleChange}>
						<MenuItem value="next" primaryText="Next" disabled={this.state.personIndex >= people.length-1}/>
						<MenuItem value="previous" primaryText="Previous" disabled={this.state.personIndex <= 0}/>
					</IconMenu>}
				>
				</AppBar>
				
				<Paper style={{width: 600, textAlign: 'left',}}>
					<PersonInfoItem 
						title="First name:" 
						id="first" 
						value={people[this.state.personIndex].first} 
						onChange={(e, v) => {this.update(v, "first");}} 
					/>
					<PersonInfoItem 
						title="Last name:" 
						id="last" 
						value={people[this.state.personIndex].last} 
						onChange={(e, v) => {this.update(v, "last");}} 
					/>
					<PersonInfoItem 
						title="Birth town:" 
						id="town" 
						value={people[this.state.personIndex].town} 
						onChange={(e, v) => {this.update(v, "town");}} 
					/>
					<div style={{width: 200, display: 'inline-block',}}>Birth date: </div>
					<DatePicker hintText="Portrait Dialog" value={birth} onChange={(v, d) => this.updateDate(v,d)} />
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
