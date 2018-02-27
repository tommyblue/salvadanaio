import moment from 'moment';

const currency2symbol = {
    "EUR": "€",
    "USD": "$",
};

export const formatMoney = (money) => {
    return `${money.amount / 100} ${currency2symbol[money.currency]}`;
};

export const formatISODate = (date) => {
    return moment(date).format("23/05/2018");
};
