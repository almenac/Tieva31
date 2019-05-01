import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import BUNDLE from './h7t1_bundle'

let people = [
    {
        firstName: "Jane",
        lastName: "Doe",
        birthTown: "Dallas"
    },
    {
        firstName: "Mac",
        lastName: "Anderson",
        birthTown: "Reykjavik"
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
            firstEdited: props.first,            
            lastEdited: props.last,            
            townEdited: props.town,                 
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
            label={this.props.bundle.cancel}
            primary={false}
            onClick={() => {this.props.closeDialog(false);}}
        />
    ]    

    editTemp = (field, newValue) => {
        if (field === "firstName") {
            this.setState({
                firstEdited: newValue
            })
        }
        else if (field === "lastName") {
            this.setState({
                lastEdited: newValue
            })
        }
        else if (field === "birthTown") {
            this.setState({
                townEdited: newValue
            })
        }
    }

    
    render() {
        const bundle = this.props.bundle;

        return (
            <Dialog                
                title={bundle.dialogTitle}
                actions={this.actions}
                modal={true}
                open={this.props.open}
            >
                <div>
                    {bundle.first}:
                    <TextField 
                        value={this.state.firstEdited}
                        onChange={(e,v) => {this.editTemp("firstName", v)}}
                    />
                </div>
                <div>
                    {bundle.last}: 
                    <TextField 
                        value={this.state.lastEdited}
                        onChange={(e,v) => {this.editTemp("lastName", v)}} 
                    />
                </div>
                <div>
                    {bundle.town}:
                    <TextField 
                        value={this.state.townEdited}
                        onChange={(e,v) => {this.editTemp("birthTown", v)}} 
                    />
                </div>
            </Dialog>
        );
    }

}

class App extends Component {    
    constructor() {
        super();
        let lang = localStorage.getItem('uiLanguage');
		if (lang === null)
			lang = "en";
        this.state = {
            language: lang,
            currentPerson: 0,                        
            maxPeople: people.length,
            dialogOpen: false            
        }
    }
    
    setLanguage = (e, value) => {
        this.setState({
            language: value,
        });
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

    updateValue = (field, newValue) => {
        people[this.state.currentPerson][field] = newValue;
        this.setState({
            
        })
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

        let bundle = BUNDLE.default;
		if (this.state.language in BUNDLE) {
			bundle = BUNDLE[this.state.language];
		}
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Exercise 7.1"                         
                    
                    >                    
                    </AppBar>                    

                    <Paper style={{width: 600, margin: 'auto'}}>                        
                        <div>
                            {bundle.index}: {ind} 
                        </div>
                        <div>
                            {bundle.person}: {people[ind].firstName} {people[ind].lastName}                            
                        </div>
                        <div>
                            <RaisedButton label={bundle.edit} onClick={this.openDialog}/>
                        </div>    
                        <div>                            
                            <RaisedButton 
                                label={bundle.previous}
                                onClick={() => {this.handleMove(false);}}
                            />
                            <RaisedButton 
                                label={bundle.next}
                                onClick={() => {this.handleMove(true);}}
                            />
                        </div>
                        <div>
                            <RadioButtonGroup name="setLang" onChange={this.setLanguage}>
                                <RadioButton value='en' label='En'/>
                                <RadioButton value='fi' label='Fi'/>
                            </RadioButtonGroup>
                        </div>
                    </Paper>
                    <EditDialog
                        open = {this.state.dialogOpen}
                        closeDialog = {this.closeDialog}                                     
                        first = {people[ind].firstName}
                        last = {people[ind].lastName}
                        town = {people[ind].birthTown}
                        updateValue = {this.updateValue}
                        bundle = {bundle}
                    />
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
