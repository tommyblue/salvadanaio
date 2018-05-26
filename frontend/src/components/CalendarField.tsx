import * as moment from 'moment';
import * as React from 'react';

// tslint:disable:no-var-requires
const bulmaCalendar = require('../lib/bulma-calendar');

export default class extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.selectDate = this.selectDate.bind(this);
    }

    public componentDidMount() {
        const bulma = new bulmaCalendar(document.getElementById(this.props.elementId), {
            closeOnOverlayClick: true,
            closeOnSelect: true,
            dateFormat: 'yyyy-mm-dd', // the date format `field` value
            lang: 'it', // internationalization
            onClose: null,
            onOpen: null,
            onRender: null,
            onSelect: this.selectDate,
            overlay: true,
            startDate: new Date(), // Date selected by default
        });
        if (bulma) {
            // tslint:disable:no-console
            console.debug("Bulma was initialized...")
        }
    }

    public render() {
        return (
            <input id={this.props.elementId} className="input" type="text" />
        );
    }

    private selectDate(value: string) {
        const date = moment(value);
        this.props.onSetDate(date.format("YYYY-MM-DD"));
    }
}
