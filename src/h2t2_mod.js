import Population from './Population'
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
            people: [],
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
        this.state.people[this.state.currentPerson][field] = newValue;
    }

    render() {        
        let pop = new Population("NZ");
        let ind = this.state.currentPerson;
        let max = this.state.maxPeople;        
        
        for(var i = 0; i < max; i++){
            this.state.people.push(pop.nextPerson())
        }

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
                            <strong>Index: </strong> <TextField id="index" value={this.state.currentPerson}></TextField>
                        </div>
                        <div>
                            <strong>First name: </strong> <TextField id="firstName" value={this.state.people[ind].firstName}></TextField>
                        </div> 
                        <div>
                            <strong>Last name: </strong> <TextField id="lastName" value={this.state.people[ind].lastName}></TextField>
                        </div> 
                        <div>
                            <strong>Birth town: </strong> 
                            <TextField 
                                id="birthTown" 
                                value={this.state.people[ind].birthTown} 
                                onChange={(e,v) => {this.updateValue("birthTown", v)}}
                                >
                            </TextField>
                        </div> 
                        <div>
                            <strong>Birth Year: </strong> <TextField id="birthYear" value={this.state.people[ind].birthYear}></TextField>
                        </div>
                    </Paper>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
