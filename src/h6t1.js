/**
 * Incomplete answer. I couldn't figure out
 * how to store the edited fields inside the
 * component and only commit the changes if the
 * user presses ok on the dialog.
 */

import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

let people = [
    {
        firstName: "Matti",
        lastName: "Möttönen",
        birthTown: "Toijala"
    },
    {
        firstName: "Tuija",
        lastName: "Tavallinen",
        birthTown: "Helsinki"
    },
    {
        firstName: "John",
        lastName: "Doe",
        birthTown: "Houston"
    },
    {
        firstName: "Molly",
        lastName: "Molls",
        birthTown: "Chicago"
    },
]

class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstEdited: null,            
            lastEdited: null,            
            townEdited: null,            
        }
    }

    actions = [
        <FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onClick={() => {this.props.closeDialog(true);}}
        />,
        <FlatButton
            label="Cancel"
            primary={false}
            onClick={() => {this.props.closeDialog(false);}}
        />
    ]    
    
    render() {
        return (
            <Dialog                
                title="Edit person info"
                actions={this.actions}
                modal={true}
                open={this.props.open}
            >
                <div>
                    First name: 
                    <TextField 
                        value={this.props.first}
                        onChange={(e,v) => {this.props.updateValue("firstName", v)}}
                    />
                </div>
                <div>
                    Last name: 
                    <TextField 
                        value={this.props.last}
                        onChange={(e,v) => {this.props.updateValue("lastName", v)}} 
                    />
                </div>
                <div>
                    Birth Town: 
                    <TextField 
                        value={this.props.town}
                        onChange={(e,v) => {this.props.updateValue("birthTown", v)}} 
                    />
                </div>
            </Dialog>
        );
    }

}

class App extends Component {    
    constructor() {
        super();
        this.state = {
            currentPerson: 0,            
            maxPeople: people.length,
            dialogOpen: false            
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

    openDialog = () => {
        this.setState({
            dialogOpen: true
        });
    }
    
    closeDialog = (commit) => {
        this.setState({
            dialogOpen: false
        });
    }

    updateValue = (field, newValue) => {
        people[this.state.currentPerson][field] = newValue;
        this.setState({

        })
    }

    render() {
        let ind = this.state.currentPerson;
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 6.1"                         
                    
                    >                    
                    </AppBar>                    

                    <Paper style={{width: 600, margin: 'auto'}}>                        
                        <div>
                            Index {ind} 
                        </div>
                        <div>
                            Person: {people[ind].firstName} {people[ind].lastName}                            
                        </div>
                        <div>
                            <RaisedButton label="Edit" onClick={this.openDialog}/>
                        </div>    
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
                    <EditDialog
                        open={this.state.dialogOpen}
                        closeDialog={this.closeDialog}
                        first={people[ind].firstName}
                        last={people[ind].lastName}
                        town={people[ind].birthTown}
                        updateValue = {this.updateValue}
                    />
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
