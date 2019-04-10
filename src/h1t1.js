import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            middleName: "",
            lastName: "",
            middleDisabled: true,            
        }
    }

    updateFirst = (newValue) => {
        this.setState({
            firstName: "" + newValue,            
        });
    }
    
    updateMiddle = (newValue) => {
        this.setState({
            middleName: "" + newValue,            
        });
    }
    
    updateLast = (newValue) => {
        this.setState({
            lastName: "" + newValue,            
        });
    }

    disableMiddle = (event, isChecked) => {        
        this.setState({
            middleDisabled: !isChecked,
        });        
    }

    autoFill = (event) => {
        this.setState({
            firstName: "Ville",
            middleName: "Kalervo",
            lastName: "Kauppila",
        });
    }

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <Paper style={{width: 600, textAlign: 'left'}}>
                        <strong>Exercise 1.1</strong>
                        <div>
                            First Name: <TextField id="firstName" onChange={(e,v) => {this.updateFirst(v);}} value={this.state.firstName} />
                        </div>
                        <div>
                            Middle Name: <TextField disabled={this.state.middleDisabled} id="middleName" onChange={(e,v) => {this.updateMiddle(v);}} value={this.state.middleName} />
                        </div>
                        <div>
                            Last Name: <TextField id="lastName" onChange={(e,v) => {this.updateLast(v);}} value={this.state.lastName} />
                        </div>                                               
                        <div>
                            <Checkbox onCheck={this.disableMiddle} label="Middle Name" />
                        </div>
                        <div>
                            <RaisedButton onClick={this.autoFill} id="autoFill" label="Autofill" />
                        </div>
                    </Paper>            
                </MuiThemeProvider>        
            </div>
        );
    }
}

export default App;
