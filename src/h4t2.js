// The year validation RegEx is in constant numPattern, but 
// unfortunately I didn't know how to implement it to
// the edit dialog.

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import people from './peopleData'

const numPattern = new RegExp("[0-9]{4}");

class PersonInfoItem extends Component {
    render() {
        return (
            <div>
                <div style={{width: 200, display: 'inline-block'}}>{this.props.title}</div>
                <TextField disabled={false} value={this.props.value} id="displayField" />
                <RaisedButton onClick={this.props.onclick} label="Edit..." />
            </div>            
        );
    }
}

class App extends Component {    
    constructor() {
        super();
        this.state = {
            currentPerson: 0,
            targetField: null,
            dialogOpen: false,
            editedValue: 0,                        
            people: people,
            maxPeople: 5,            
        }
    }

    handleMove = (forward) => {
        if(forward){
            if(this.state.currentPerson < this.state.maxPeople -1){
                this.setState(prevState => {
                    return {currentPerson: prevState.currentPerson +1}             
                });
            }            
        }
        else {
            if(this.state.currentPerson !== 0){
                this.setState(prevState => {
                    return {currentPerson: prevState.currentPerson -1}  
                });
            }            
        }                
    }

    initEdit = (field) => {
        const currentValue = this.state.people[this.state.currentPerson][field];
        
        this.setState({
            targetField: field,
            dialogOpen: true,
            editedValue: currentValue,                        
        });
    }

    valueChange = (event) => {
		this.setState({
			editedValue: event.target.value,
		});
	}

    handleClose = (confirm) => {
        if (confirm)
            this.state.people[this.state.currentPerson][this.state.targetField] = this.state.editedValue; 
        this.setState({
            targetField: null,
            dialogOpen: false,
            editedValue: null,            
        });
    }

    updatePerson(newPerson) {
        this.setState({
            currentPerson: newPerson,            
        });
    }    

    render() {
        const actions = [
            <FlatButton
            label="Confirm Edit"
            primary={true}
            keyboardFocused={true}
            onClick={() => {this.handleClose(true);}}
            />,
            <FlatButton
            label="Cancel Edit"
            primary={false}
            onClick={() => {this.handleClose(false);}}
            />
        ];

        let people = this.state.people;
        let ind = this.state.currentPerson;
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 4.2"                         
                    
                    >                    
                    </AppBar>                    

                    <Paper style={{width: 600, margin: 'auto'}}>                        
                        <TextField
                            label="Index:"
                            value={this.state.currentPerson}
                            id="index"                             
                        />
                        <PersonInfoItem 
                            title="First name:" 
                            value={people[ind].firstName} 
                            onclick={() => {this.initEdit("firstName")}} 
                        />
                        <PersonInfoItem 
                            title="Last name:" 
                            value={people[ind].lastName} 
                            onclick={() => {this.initEdit("lastName")}} 
                        />
                        <PersonInfoItem 
                            title="Birth Town:" 
                            value={people[ind].birthTown} 
                            onclick={() => {this.initEdit("birthTown")}} 
                        />                        
                        <PersonInfoItem 
                            title="Birth Country:" 
                            value={people[ind].birthCountry} 
                            onclick={() => {this.initEdit("birthCountry")}} 
                        />                        
                        <PersonInfoItem 
                            title="Birth Year:" 
                            value={people[ind].birthYear}
                            onclick={() => {this.initEdit("birthYear")}} 
                        />                        
                        <div>                            
                            <RaisedButton 
                                label="Previous"
                                onClick={() => {this.handleMove(false);}}
                            />
                            <RaisedButton 
                                label="Next"
                                onClick={() => {this.handleMove(true);}}
                            />
                        </div>
                    </Paper>

                    <Dialog                    
                        title="Set value"                    
                        actions={actions}
                        modal={true}
                        open={this.state.dialogOpen}
                        onRequestClose={this.handleClose}
                    >                        
                        {this.state.targetField} :
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
