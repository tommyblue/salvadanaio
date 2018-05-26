import * as moment from 'moment';

const currency2symbol = {
    "EUR": "€",
    "USD": "$",
};

export const formatMoney = (money: any): string => {
    return `${int2Money(money.amount)} ${currency2symbol[money.currency]}`;
};

export const int2Money = (v: number): number => (parseFloat((v / 100).toFixed(2)));

export const formatISODate = (date: any) => {
    return moment(date).format("DD/MM/YYYY");
};

export const formatDate = (dateLabel: string): string => {
    // dateLabel has format YYYY-MM
    return moment(`${dateLabel}-01`).format("MMM YYYY")
};

export const formatCurrency = (value: number, currency: string = "€"): string => (
    `${value.toFixed(2)}${currency}`
);
