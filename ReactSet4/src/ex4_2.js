import injectTapEventPlugin from 'react-tap-event-plugin';

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import people from './people'
injectTapEventPlugin();

class PersonInfoItem extends Component {
	render() {
		return (
			<div>
			{this.props.title}
			<TextField value={this.props.value} onChange={(e, v) => {this.props.onChange(v);}} />
			</div>
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
	
	edit = (field, value) => {
		if (field === "year") {
			if (value.length > 0)
				value = parseInt(value, 10);
			if (isNaN(value))
				return
			
		}
			
		people[this.state.personIndex][field] = value;
		this.setState({
			
		});
	}
	
	move = (distance) => {
		this.setState({
			personIndex: this.state.personIndex+distance,
		});
	}
	
	render() {
		return (
		<MuiThemeProvider>
			<div className="App">
				<Paper style={{width: 600, textAlign: 'left',}}>
					<PersonInfoItem title="First name:" onChange={(v) => {this.edit("first", v);}} value={people[this.state.personIndex].first} />
					<PersonInfoItem title="Last name:" onChange={(v) => {this.edit("last", v);}} value={people[this.state.personIndex].last} />
					<PersonInfoItem title="Birth town:" onChange={(v) => {this.edit("town", v);}} value={people[this.state.personIndex].town} />
					<PersonInfoItem title="Birth year:" onChange={(v) => {this.edit("year", v);}} value={people[this.state.personIndex].year} />
					
					<RaisedButton disabled={this.state.personIndex <= 0} label="previous" onClick={() => {this.move(-1);}} />
					<RaisedButton disabled={(this.state.personIndex >= (people.length-1))} label="next" onClick={() => {this.move(1);}} />
				</Paper>
			</div>
		</MuiThemeProvider>
		);
	}
}

export default App;
