import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'

class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
            dialogOpen: false,            
        }
    }

    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
    }

    changePage = () => {
        this.setState({
            dialogOpen: true,            
        });
    }

    handleClose = (confirm) => {
        if(confirm)
            window.location.href = "https://www.tuni.fi/fi";
        this.setState({
            dialogOpen: false,            
        });
    }

    render() {                        
        const actions = [
            <FlatButton 
            label="OK"
            primary={true}
            keyboardFocused={true}
            onClick={ () => {this.handleClose(true);}}
            />,
            <FlatButton
            label="Cancel"
            primary={false}
            onClick={() => {this.handleClose(false);}}
            />
        ];
        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Excercise 2.1" 
                        onLeftIconButtonClick={this.toggleDrawer}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >                                
                            </IconMenu>
                        }
                    >                    
                    </AppBar>                    
                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleDrawer}>Hide Drawer</MenuItem>
                        <MenuItem onClick={this.changePage}>Go to TUNI homepage</MenuItem>
                    </Drawer>
                    <Dialog
                    title="Confirm Navigation"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                    >
                        <p>Really leave page?</p>
                    </Dialog>
                </div>
            </MuiThemeProvider>        
            
        );
    }
}

export default App;
