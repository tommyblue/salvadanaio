import React from 'react';
import moment from 'moment';

const bulmaCalendar = require('../lib/bulma-calendar');

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.selectDate = this.selectDate.bind(this);
    }

    componentDidMount() {
        new bulmaCalendar(document.getElementById(this.props.elementId), {
            startDate: new Date(), // Date selected by default
            dateFormat: 'yyyy-mm-dd', // the date format `field` value
            lang: 'it', // internationalization
            overlay: true,
            closeOnOverlayClick: true,
            closeOnSelect: true,
            // callback functions
            onSelect: this.selectDate,
            onOpen: null,
            onClose: null,
            onRender: null
        });
    }

    render() {
        return (
            <input id={this.props.elementId} className="input" type="text" />
        );
    }

    selectDate(value) {
        const date = moment(value);
        this.props.onSetDate(date.format("YYYY-MM-DD"));
    }
}
