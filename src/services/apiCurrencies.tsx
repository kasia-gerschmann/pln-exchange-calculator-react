import axios from "axios";

const apiUrl = "https://api.nbp.pl/api";
export const getCurrencyRate = (currency: string) => {
    return axios.get(`${apiUrl}/exchangerates/rates/a/${currency}?format=json`);
}