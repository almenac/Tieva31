import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import CheckBox from 'material-ui/Checkbox'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Slider from 'material-ui/Slider'

class App extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
            uiEnabled: true,
            uiColor: 'red',
            dialogModal: false,
            latestZ: 5,
        }
    }

    updateLatestZ = (value) => {
        this.setState({
            latestZ: value
        });
    }

    toggleDrawer = () => {
        this.setState(
            (prevState, props) => ({
                drawerOpen: !prevState.drawerOpen,
            })
        );
    }

    enableUi = (e, checked) => {
        this.setState({
            uiEnabled: checked
        });
    }

    setColor = (e, value) => {
        this.setState({
            uiColor: value
        });
    }

    setModal = (e, checked) => {
        this.setState({
            dialogModal: checked
        });
    }

    render() {                        
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar title="Menus, dialogs, etc." 
                        onLeftIconButtonClick={this.toggleDrawer}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <CheckBox label="Enable UI" checked={this.state.uiEnabled} onCheck={this.enableUi}/>
                                <CheckBox label="Modal dialog" checked={this.state.dialogModal} onCheck={this.setModal}/>
                                <RadioButtonGroup name="colorGroup" onChange={this.setColor}>
                                    <RadioButton value="red" label="Red" ></RadioButton>
                                    <RadioButton value="blue" label="Blue"></RadioButton>
                                </RadioButtonGroup>
                            </IconMenu>
                        }
                    >                    
                    </AppBar>
                    <RaisablePaper 
                        id="paper1"
                        uiColor={this.state.uiColor}
                        dialogModal={this.state.dialogModal}
                        paperZ={1}
                        uiEnabled={this.state.uiEnabled}
                        onNewZ={this.updateLatestZ}
                    />
                    <br />
                    <RaisablePaper 
                        id="paper2"
                        uiColor={this.state.uiColor}
                        dialogModal={this.state.dialogModal}
                        paperZ={5}
                        uiEnabled={this.state.uiEnabled}
                        onNewZ={this.updateLatestZ}
                    />
                    <Drawer open={this.state.drawerOpen}>
                        <MenuItem onClick={this.toggleDrawer}>Hide Drawer</MenuItem>
                    </Drawer>
                    <p>Latest Z: {this.state.latestZ}</p>                    
                </div>
            </MuiThemeProvider>        
            
        );
    }
}

class RaisablePaper extends React.Component {
    constructor(props) {
        super();
        this.state = {
            paperZ: props.paperZ,
            dialogOpen: false,
            editedValue: null,            
        };
    }

    initEdit = () => {
        this.setState({
            dialogOpen: true,
            editedValue: this.state.paperZ,
        });
    }

    handleClose = (commitValue) => {
        if(commitValue)
            this.props.onNewZ(this.state.editedValue);
        this.setState({
            dialogOpen: false,
            editedValue: null,
            paperZ: commitValue?this.state.editedValue:this.state.paperZ            
        });
    }

    valueChange = (e, v) => {
        this.setState({
            editedValue: v
        });
    }


    render() {
        const actions = [
            <FlatButton
            label="Cancel"
            primary={false}
            onClick={() => {this.handleClose(false);}}
            />,
            <FlatButton 
            label="OK"
            primary={true}
            keyboardFocused={true}
            onClick={ () => {this.handleClose(true);}}
            />
        ];

        return(
            <div>
                <Paper zDepth={this.state.paperZ} style={{background: this.props.uiColor, left: 10, width: 600, textAlign: 'left'}}>
                    <RaisedButton disabled={!this.props.uiEnabled} label="Adjust height" onClick={this.initEdit} />
                </Paper>
                <Dialog
                    title="Set UI z-value"
                    actions={actions}
                    modal={this.props.dialogModal}
                    open={this.state.dialogOpen}
                    onRequestClose={this.handleClose}
                >
                    <Slider 
                        id="dialogSlider"
                        value={this.state.editedValue}
                        onChange={this.valueChange}
                        min={0} max={5} step={1}
                    />                    
                </Dialog>
            </div>
        );        
    }    
};


export default App;
