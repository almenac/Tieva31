import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CheckBox from 'material-ui/Checkbox'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui/Slider';


class App extends Component {
    constructor(props) {
        super(props);
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
    setModal = (e, checked) => {
        this.setState({
            dialogModal: checked
        });
    }
    setColor = (e, value) => {
        this.setState({
            uiColor: value,
        });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar 
                        title="Menus, dialogs, etc"
                        onLeftIconButtonClick={this.toggleDrawer}
                        iconElementRight={
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <CheckBox label="Enable UI" checked={this.state.uiEnabled} onCheck={this.enableUi} />
                                <CheckBox label="Modal Dialog" checked={this.state.dialogModal} onCheck={this.setModal} />
                                <RadioButtonGroup name="setColor" onChange={this.setColor}>
                                    <RadioButton value='red' label='Red'/>
                                    <RadioButton value='blue' label='Blue'/>
                                </RadioButtonGroup>
                            </IconMenu>
                        }
                    >
                    </AppBar>
                    <Drawer 
                        open={this.state.drawerOpen}
                    >
                        <MenuItem onClick={this.toggleDrawer}>Hide Drawer</MenuItem>
                    </Drawer>
                    <RaisablePaper
                        id="paper1"
                        uiColor={this.state.uiColor}
                        dialogModal={this.state.dialogModal}
                        paperZ={1}
                        uiEnabled={this.state.uiEnabled}
                        onNewZ={this.updateLatestZ}             
                    />
                    <br/>
                    <RaisablePaper
                        id="paper2"
                        uiColor={this.state.uiColor}
                        dialogModal={this.state.dialogModal}
                        paperZ={5}
                        uiEnabled={this.state.uiEnabled}
                        onNewZ={this.updateLatestZ}                    
                    />
                    <p>Latest Z: {this.state.latestZ}</p>
                </div>
            </MuiThemeProvider>
        );
    }
}

class RaisablePaper extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            paperZ: props.paperZ,
            dialogOpen: false,
            editedValue: null,
        };
    }

    initEdit = () => {
        this.setState({
            dialogOpen: true,
            editedValue: this.state.paperZ
        });
    }

    handleClose = (commitValue) => {
        this.setState({
            dialogOpen: false,
            editedValue: null,
            paperZ: commitValue ? this.state.editedValue : this.state.paperZ
        });
        if (commitValue)
            this.props.onNewZ(this.state.editedValue);
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
                primary={true}
                onClick={() => {this.handleClose(false);}}
            />,
            <FlatButton
                label="OK"
                primary={false}
                onClick={() => {this.handleClose(true);}}
            />
        ];

        return (
            <div>
                <Paper
                zDepth={this.state.paperZ}
                style={{background: this.props.uiColor, left: 10, width: 600, textAlign: 'left'}}                    
                >
                    <RaisedButton disabled={!this.props.uiEnabled} label="Adjust height" onClick={this.initEdit}/>
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
}

    

export default App;