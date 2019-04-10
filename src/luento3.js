import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu'
import TextField from 'material-ui/TextField'
import TimeSelector from './TimeSelector';



class App extends Component {
    constructor() {
        super();

        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+1);
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+2);

        this.state = {
            start: start,
            end: end,
            room: "B2031",
            description: null,
            message: this.buildMessage(start, end, "B2031"),
        }
    }

    buildMessage = (start, end, room) => {
        let r = "Room " + room + " reserved ";
        if (start != null)
            r += " from " + start.toDateString() + " at " + start.toTimeString();
        if (end != null) {
            r += " until ";
            if (start.getDate() != end.getDate() || start.getMonth() != end.getMonth() || start.getFullYear() != end.getFullYear())
                r += end.toDateString() + " at ";
            r += end.toTimeString();
        }
        return r;

    }

    updateRoom(newRoom) {
        this.setState({
            room: newRoom,
            message: this.buildMessage(this.state.start, this.state.end, newRoom)
        });
    }

    UpdateDescription(d) {
        this.setState({
            description: d,
        })
    }

    updateStart(datetime) {
        this.setState({
            start: datetime,
            message: this.buildMessage(datetime, this.state.end, this.state.room)
        });
    }
    
    updateEnd(datetime) {
        this.setState({
            end: datetime,
            message: this.buildMessage(this.state.start, datetime, this.state.room)
        });
    }

    render() {
        return(
            <MuiThemeProvider>
                <Paper style={{width: 600, textAlign: 'left'}}>
                    <DropDownMenu 
                        value={this.state.room} 
                        onChange={(e, i, v) => {this.updateRoom(v);}}
                    >
                        <MenuItem value="B2031" primaryText="SimSpace" />
                        <MenuItem value="B2035" primaryText="B2035" />
                        <MenuItem value="B1065" primaryText="B1065" />
                        <MenuItem value="B0016" primaryText="B0016" />
                    </DropDownMenu>
                    <TimeSelector 
                        value={this.state.start}
                        onChange={(d) => {this.updateStart(d)}}
                        label="Start time"
                    />
                    <TimeSelector 
                        value={this.state.end}
                        onChange={(d) => {this.updateEnd(d)}}
                        label="End"
                    />
                    
                    <div>
                        Description: 
                    </div>
                    <TextField
                        name="desc"
                        hintText="Room usage"
                        multiLine={true}
                        rows={4}
                        onChange={(e, v) => {this.UpdateDescription(v)}}
                    />
                    <div style={{fontWeight: "bold"}}>
                        {this.state.message}
                    </div>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default App;
