import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
        }
    }
    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
    }

    render() {
        return (
            <MuiThemeProvider>
                <AppBar 
                    title="Menus, dialogs, etc"
                    onLeftIconButtonClick={this.toggleDrawer}
                >
                </AppBar>
                <Drawer 
                    open={this.state.drawerOpen}>
                </Drawer>
            </MuiThemeProvider>
        );
    }
}

export default App;