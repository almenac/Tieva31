import Population from './Population'
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

let pop = new Population("NZ");

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
            drawerOpen: false,
            people: [],
            maxPeople: 5,
        }
        
        for(var i = 0; i < this.state.maxPeople; i++){
            this.state.people.push(pop.nextPerson())
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

    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
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

    render() {
        let ind = this.state.currentPerson;
        
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

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Excercise 2.3" 
                        onLeftIconButtonClick={this.toggleDrawer}                        
                    >                    
                    </AppBar>

                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleDrawer}>Hide Drawer</MenuItem>
                        <MenuItem onClick={() => {this.handleMove(false);}}>Previous</MenuItem>
                        <MenuItem onClick={() => {this.handleMove(true);}}>Next</MenuItem>
                    </Drawer>

                    <Paper style={{width: 600, margin: 'auto'}}>
                        <TextField
                            label="Index:"
                            value={this.state.currentPerson}
                            id="index"                             
                        />
                        <PersonInfoItem title="First name:" value={this.state.people[this.state.currentPerson].firstName} onclick={() => {this.initEdit("firstName")}} />
                        <PersonInfoItem title="Last name:" value={this.state.people[this.state.currentPerson].lastName} onclick={() => {this.initEdit("lastName")}} />
                        <PersonInfoItem title="Birth Town:" value={this.state.people[this.state.currentPerson].birthTown} onclick={() => {this.initEdit("birthTown")}} />
                        <PersonInfoItem title="Birth Year:" value={this.state.people[this.state.currentPerson].birthYear} onclick={() => {this.initEdit("birthYear")}} />
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
