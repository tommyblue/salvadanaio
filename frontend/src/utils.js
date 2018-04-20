import moment from 'moment';

const currency2symbol = {
    "EUR": "€",
    "USD": "$",
};

export const formatMoney = (money) => {
    return `${int2Money(money.amount)} ${currency2symbol[money.currency]}`;
};

export const int2Money = (v) => (parseFloat((v / 100).toFixed(2)));

export const formatISODate = (date) => {
    return moment(date).format("DD/MM/YYYY");
};

export const formatDate = (dateLabel) => {
    // dateLabel has format YYYY-MM
    return moment(`${dateLabel}-01`).format("MMM YYYY")
};

export const formatCurrency = (value, currency) => (`${value.toFixed(2)}${currency || "€"}`);
