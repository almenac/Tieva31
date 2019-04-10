import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
  * Custom component for individual item of information. 
  * Edit dialog is not included but a global one is used.
  * Moving edit dialog inside this component could result 
  * in a bit more compact solution.
  */
class PersonInfoItem extends Component {
	render() {
		return (
			<div>
				<div style={{width: 200, display: 'inline-block',}}>{this.props.title}</div>
				<TextField disabled={true} value={this.props.value} id="displayField" />
				<RaisedButton onTouchTap={this.props.onclick} label="Edit..." />
			</div>
		);
	}
}

/**
  * This implementation recycles the same dialog for all edits
  * and uses the name of the edited field to index the data 
  * structure to minimize copied code. Using the field name
  * in the user interface (in dialog) is quite an ugly solution.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			personIndex: 0,
			targetField: null, // Which field is currently being edited in the dialog
			dialogOpen: false,
			editedValue: null, // value being edited is stored here during editing
		};
	}
	
	navigate = (event, value) => {
		this.setState({
			personIndex: this.state.personIndex+(value==="next"?1:-1),
		});
	};
	
	initEdit(field) {
		const currentValue = people[this.state.personIndex][field];
		this.setState({
			targetField: field,
			dialogOpen: true,
			editedValue: currentValue,
		});
	};
	
	valueChange = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}
	
	closeDialog = (storeValue) => {
		if (storeValue)
			people[this.state.personIndex][this.state.targetField] = this.state.editedValue;
		this.setState({
			targetField: null,
			dialogOpen: false,
			editedValue: null,
		});
	};
	
	render() {
		const actions = [
			<FlatButton
			 label="Cancel"
			 primary={true}
			 onTouchTap={() => {this.closeDialog(false);}}
			/>,
			<FlatButton
			 label="OK"
			 primary={true}
			 keyboardFocused={true}
			 onTouchTap={() => {this.closeDialog(true);}}
			/>,
		];
		const menu = <IconMenu 
						iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
						anchorOrigin={{horizontal: 'left', vertical: 'top'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						onChange={this.navigate}>
						<MenuItem value="next" disabled={this.state.personIndex === people.length-1} primaryText="Next" />
						<MenuItem value="previous"  disabled={this.state.personIndex === 0} primaryText="Previous" />
					</IconMenu>
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 2.3" iconElementRight={menu}></AppBar>
					<Paper style={{width: 600, textAlign: 'left',}}>
						<PersonInfoItem title="First name:" value={people[this.state.personIndex].first} onclick={() => {this.initEdit("first")}} />
						<PersonInfoItem title="Last name:" value={people[this.state.personIndex].last}  onclick={() => {this.initEdit("last")}} />
						<PersonInfoItem title="Birth town:" value={people[this.state.personIndex].town}  onclick={() => {this.initEdit("town")}} />
						<PersonInfoItem title="Birth year:" value={people[this.state.personIndex].year}  onclick={() => {this.initEdit("year")}} />
					</Paper>
					
					<Dialog
						title="Set value"
						actions={actions}
						modal={true}
						open={this.state.dialogOpen}
						onRequestClose={this.handleClose}
					>
						{this.state.targetField}:
						<TextField 
						 id="dialogField" 
						 disabled={false} 
						 value={this.state.editedValue==="null"?"":this.state.editedValue} 
						 onChange={this.valueChange} 
						/>
					</Dialog>
					
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
