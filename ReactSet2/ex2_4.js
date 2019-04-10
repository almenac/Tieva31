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
import Divider from 'material-ui/Divider';

let people = []

/**
  * Small function which generate different people and place names and birth years.
  */
function generatePeople(peopleToGenerate) {
    const FIRST_NAME_TEMPLATE = [["D", "R", "J"], ["on", "aughn", "ey"], ["", "ald", "os"]];
    const LAST_NAME_TEMPLATE = [["W", "C", "S"], ["olver", "amp", "eig"], ["sue", "ton", "son"]];
    const TOWN_TEMPLATE = [["Lon", "Wol", "Mil", "Til"], ["", "tin", "ver"], ["ton", "ton", "don", "ville", "burgh"]];
	var r = [];
	for (var i = 0; i < peopleToGenerate; i++) {
        let firstName = "";
        for (let n = 0; n < FIRST_NAME_TEMPLATE.length; n++)
            firstName += FIRST_NAME_TEMPLATE[n][Math.floor(Math.random()*FIRST_NAME_TEMPLATE[n].length)];
        let lastName = "";
        for (let n = 0; n < LAST_NAME_TEMPLATE.length; n++)
            lastName += LAST_NAME_TEMPLATE[n][Math.floor(Math.random()*LAST_NAME_TEMPLATE[n].length)];
        let town = "";
        for (let n = 0; n < TOWN_TEMPLATE.length; n++)
            town += TOWN_TEMPLATE[n][Math.floor(Math.random()*TOWN_TEMPLATE[n].length)];
		let year = 1900 + Math.floor(Math.random()*99);
		r.push({first: firstName, last: lastName, town: town, year: year});
    }
    return r;
}
		

/**
  * Custom component for individual item of information. 
  * Edit dialog is included. The implementation does a couple 
  * of things in two ways, especially different  dialogs are 
  * configured a little bit differently. This is to illustrate
  * the possibilities.
  */
class PersonInfoItem extends Component {
	constructor() {
		super();
		this.state = {
			dialogOpen: false,
			editedValue: null, // value being edited is stored here during editing
		};
	}

	initEdit = () => {
		this.setState({
			dialogOpen: true,
			editedValue: this.props.value,
		});
	};
	
	valueChange = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}
	
	closeDialog = (storeValue) => {
		if (storeValue) {
			people[this.props.personIndex][this.props.targetField] = this.state.editedValue;
			this.props.onUpdate();
		}
		this.setState({
			dialogOpen: false,
			editedValue: null,
		});
	};
	
	render() {
		const actions = [
			<FlatButton label="Cancel" primary={true} onTouchTap={() => {this.closeDialog(false);}}	/>,
			<FlatButton label="OK" primary={true} keyboardFocused={true} onTouchTap={() => {this.closeDialog(true);}} />,
		];
		return (
			<div>
				<div style={{width: 200, display: 'inline-block',}}>{this.props.title}</div>
				<TextField disabled={true} value={this.props.value} id="displayField" />
				<RaisedButton onTouchTap={this.initEdit} label="Edit..." />
			
				<Dialog	title="Set value" actions={actions} modal={true} open={this.state.dialogOpen} onRequestClose={() => {this.closeDialog(false);}} >
					{this.props.title}:
					<TextField 
					 id="dialogField" 
					 disabled={false} 
					 value={this.state.editedValue==="null"?"":this.state.editedValue} 
					 onChange={this.valueChange} 
					/>
				</Dialog>
					
			</div>
			
		);
	}
}

/**
  * The main app consists of generator dialog and statistics dialog.
  */
class App extends Component {
	constructor() {
		super();
		this.state = {
			personIndex: 0,
			generateDialogOpen: false,
			generateNumber: 1,
			statsOpen: false,
			stats: {
				unique: null,
				mode: null,
				min: null,
				max: null,
				average: null,
				median: null,
			}
		};
	}
	
	valueChange = (event, value) => {
		const n = parseInt(value, 10);
		this.setState({
			generateNumber: n,
		});
	}
	
	closeDialog = (generate) => {
		if (generate)
			people = generatePeople(this.state.generateNumber);
		this.setState({
			generateDialogOpen: false,
			personIndex: 0,
		});
	};	
	
	operateMenu = (event, value) => {
		if (value === "next" || value === "previous") {
			this.setState({
				personIndex: this.state.personIndex+(value==="next"?1:-1),
			});
		}
		if (value === "generate") {
			this.setState({
				generateDialogOpen: true,
			});
		}
		
		if (value === "statsFirst") {
			this.updateTextStats("first");
			this.setState({statsOpen: true});
		}
		if (value === "statsLast") {
			this.updateTextStats("last");
			this.setState({statsOpen: true});
		}
		if (value === "statsTown") {
			this.updateTextStats("town");
			this.setState({statsOpen: true});
		}
		if (value === "statsYear") {
			this.updateNumberStats("year");
			this.setState({statsOpen: true});
		}
	};
	
	/**
	  * Finds the most common string and number of individual strings.
	  */
	updateTextStats = (key) => {
		let names = {};
		let max = 0;
		let mode = null;
		for (var i = 0; i < people.length; i++) {
			if (!names[people[i][key]])
				names[people[i][key]] = 1;
			else
				names[people[i][key]] += 1;
			if (mode === null || names[people[i][key]] > max) {
				max = names[people[i][key]];
				mode = people[i][key];
			}
		}
		this.setState({
			stats: {
				unique: Object.keys(names).length,
				mode: mode,
				min: null,
			}
		});
	}

	/**
	  * Calculates min, max, median, average, mode of numbers.
	  */
	updateNumberStats = (key) => {
		let counter = {}; // Counter object to find mode
		let numbers = []; // Array of all numbers for min, max, median
		let total = 0; // Total for average
		let mode = null; // Current mode candidate
		let max = 0; // Current maximum count, i.e., current count of the current mode candidate
		for (var i = 0; i < people.length; i++) {
			numbers.push(people[i][key]);
			total += people[i][key];
			const ckey = key+people[i][key]; // string is formed from the number so that it can be used as an object key instead of a numeric index
			if (!counter[ckey])
				counter[ckey] = 1;
			else
				counter[ckey] += 1;
			if (mode === null || counter[ckey] > max) {
				max = counter[ckey];
				mode = people[i][key];
			}
		}
		numbers.sort(); // Sorting enables identification of min, max and median.
		this.setState({
			stats: {
				unique: null,
				mode: mode,
				min: numbers[0],
				max: numbers[numbers.length-1],
				median: numbers[numbers.length>>1],
				average: total / numbers.length,
			}
		});
		
	}
	
	update = () => {
		// This is called when the child component updates that "people" array was edited. 
		// This empty setState call makes React check if the UI needs to be updated.
		this.setState({});
	}
	
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
						onChange={this.operateMenu}>
						<MenuItem value="generate" primaryText="Generate..." />
						<Divider/>
						<MenuItem value="next" disabled={this.state.personIndex >= people.length-1} primaryText="Next" />
						<MenuItem value="previous" disabled={this.state.personIndex === 0} primaryText="Previous" />
						<Divider/>
						<MenuItem value="statsFirst" disabled={people.length===0} primaryText="First name statistics..." />
						<MenuItem value="statsLast" disabled={people.length===0} primaryText="Last name statistics..." />
						<MenuItem value="statsTown" disabled={people.length===0} primaryText="Birth place statistics..." />
						<MenuItem value="statsYear" disabled={people.length===0} primaryText="Birth year statistics..." />
					</IconMenu>
		
		let persons = [];
		if (people.length > 0) // Person information is displayed only if people have been generated
			persons = <div>
						<PersonInfoItem onUpdate={this.update} title="First name:" value={people[this.state.personIndex].first} targetField="first" personIndex={this.state.personIndex} />
						<PersonInfoItem onUpdate={this.update} title="Last name:" value={people[this.state.personIndex].last} targetField="last" personIndex={this.state.personIndex}  />
						<PersonInfoItem onUpdate={this.update} title="Birth town:" value={people[this.state.personIndex].town} targetField="town" personIndex={this.state.personIndex}  />
						<PersonInfoItem onUpdate={this.update} title="Birth year:" value={people[this.state.personIndex].year} targetField="year" personIndex={this.state.personIndex}  />
					</div>
				
		let statistics = "";
		if (this.state.stats.unique !== null)
			statistics = <span>unique values {this.state.stats.unique}, mode {this.state.stats.mode}.</span>
		if (this.state.stats.min != null)
			statistics = <span>minimum {this.state.stats.min}, maximum {this.state.stats.max}, average {this.state.stats.average}, median {this.state.stats.median}, mode {this.state.stats.mode}.</span>
				
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar title="Exercise 2.3" iconElementRight={menu}></AppBar>
					<Paper style={{width: 600, textAlign: 'left',}}>
						{persons}
					</Paper>
					
					<Dialog	title="Generator" actions={actions}	modal={true} open={this.state.generateDialogOpen} onRequestClose={this.handleClose}	>
						How many people to generate:
						<TextField id="generateNumber" disabled={false} value={this.state.generateNumber} onChange={this.valueChange} />
					</Dialog>
					
					<Dialog	
					 title="Statistics" 
					 actions={[<FlatButton label="OK" onTouchTap={() => {this.setState({statsOpen: false});}} />]} 
					 modal={false} open={this.state.statsOpen}	
					 onRequestClose={() => {this.setState({statsOpen: false});}} 
					>
						Statistics: {statistics}
					</Dialog>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
