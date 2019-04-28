import Population from './Population'
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

let pop = new Population("NZ");
let people = [];
        
for(var i = 0; i < 5; i++){
    people.push(pop.nextPerson())
}


class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,            
            currentPerson: 0,
            maxPeople: 5,
            targetField: null                        
        }
    }

    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
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

    render() {        
        let ind = this.state.currentPerson;               

        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Excercise 2.2" 
                        onLeftIconButtonClick={this.toggleDrawer}                        
                    >                    
                    </AppBar>

                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleDrawer}>Hide Drawer</MenuItem>
                        <MenuItem onClick={() => {this.handleMove(false);}}>Previous</MenuItem>
                        <MenuItem onClick={() => {this.handleMove(true);}}>Next</MenuItem>
                    </Drawer>

                    <Paper style={{width: 600, margin: 'auto'}}>
                        <div>
                            <strong>Index: </strong> 
                            <TextField 
                                id="index" 
                                value={this.state.currentPerson}
                            />                            
                        </div>
                        <div>
                            <strong>First name: </strong> 
                            <TextField 
                                id="firstName" 
                                value={people[ind].firstName}
                                onChange={(e,v) => {this.updateValue("firstName", v)}}
                            />
                        </div> 
                        <div>
                            <strong>Last name: </strong>
                            <TextField 
                                id="lastName" 
                                value={people[ind].lastName}
                            />
                        </div> 
                        <div>
                            <strong>Birth town: </strong> 
                            <TextField 
                                id="birthTown" 
                                value={people[ind].birthTown} 
                                onChange={(e,v) => {this.updateValue("birthTown", v)}}
                            />                            
                        </div> 
                        <div>
                            <strong>Birth Year: </strong>
                            <TextField 
                                id="birthYear" 
                                value={people[ind].birthYear}
                            />
                        </div>
                    </Paper>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
