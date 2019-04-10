import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'

class TimeSelector extends Component {
    updateDate(newDate) {
        const updated = new Date(
            newDate.getFullYear(),
            newDate.getMonth(),
            newDate.getDate(),
            this.props.value.getHours(),
            this.props.value.getMinutes()
        );
        this.props.onChange(updated);
    }
    
    updateTime(newTime) {
        const updated = new Date(
            this.props.value.getFullYear(),
            this.props.value.getMonth(),
            this.props.value.getDate(),
            newTime.getHours(),
            newTime.getMinutes()
        );
        this.props.onChange(updated);
    }
    render() {
        return(
            <div>
                {this.props.label} 
                <DatePicker
                    autoOk={true}
                    id="date"
                    value={this.props.value}
                    onChange={(e,v) => {this.updateDate(v)}}
                />
                <TimePicker
                    autoOk={true}
                    id="time"
                    format="24hr"
                    value={this.props.value}
                    onChange={(e, v) => {this.updateTime(v)}}
                />
            </div>
        );
    }
}

export default TimeSelector