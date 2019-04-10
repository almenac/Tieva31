/*
 Unfortunately this app doesn't work. 
 I couldn't figure out how to pass the editable
 field's id (e.g. first name, last name) to the edit
 dialog. This would've been key to using a single
 dialog with dynamically updating contents.

 The only solution I could think of was to
 write a separate function and dialog for editing
 different data, but because that'd make the
 code unreadable and wouldn't make any sense I hope
 you'll accept my nonworking excercise.
*/


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

class App extends Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,            
            drawerOpen: false,
            people: [],
            currentPerson: 0,
            maxPeople: 5,
            firstNameEdited: "",
            activeId: "",                        
        }
    }

    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
    }

    initEdit = (id) => {
        this.setState({
            dialogOpen: true,
            activeId: id,            
        });
    }

    handleClose = (confirm) => {
        if(confirm){
            this.setState({
                dialogOpen: false,            
            });
        }
        this.setState({
            dialogOpen: false,            
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

    updateFirst = (props, newValue) => {
        this.setState({
            firstNameEdited: newValue,
        })
    }

    render() {        
        let pop = new Population("NZ");
        let ind = this.state.currentPerson;
        let max = this.state.maxPeople;
        
        if(this.state.people.length === 0){
            for(var i = 0; i < max; i++){
                this.state.people.push(pop.nextPerson())
            }
        }        

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
                        <div>
                            <strong>Index: </strong> <TextField id="index" value={this.state.currentPerson} />  
                        </div>
                        <div>
                            <strong>First name: </strong> <TextField id="firstName" value={this.state.people[ind].firstName} />
                            <RaisedButton id="editFirstName" ind={ind} label="Edit" onClick={this.initEdit} />
                        </div> 
                        <div>
                            <strong>Last name: </strong> <TextField id="lastName" value={this.state.people[ind].lastName} />
                            <RaisedButton id="editLastName" label="Edit" onClick={this.initEdit}/>
                        </div> 
                        <div>
                            <strong>Birth town: </strong> <TextField id="birthTown" value={this.state.people[ind].birthTown} />
                            <RaisedButton id="editTown" label="Edit" onClick={this.initEdit}/>
                        </div> 
                        <div>
                            <strong>Birth Year: </strong> <TextField id="birthYear" value={this.state.people[ind].birthYear} />
                            <RaisedButton id="editYear" label="Edit" onClick={this.initEdit}/>
                        </div>
                    </Paper>

                    <Dialog                    
                    title="Name"                    
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                    >                        
                        <strong>Edit name: </strong> <TextField id="firstName" onChange={(e,v) => {this.updateFirst(v);}} value={this.state.people[ind].firstName} />
                    </Dialog>
                </div>
            </MuiThemeProvider>                    
        );
    }
}

export default App;
