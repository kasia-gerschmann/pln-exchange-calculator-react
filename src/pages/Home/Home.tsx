import React, {ChangeEvent, useState} from "react";
import css from "./Home.module.css";
import axios from "axios";
import classNames from "classnames";
import Loader from "../../components/loader/Loader";
import IonIcon from "@reacticons/ionicons";

function Home() {
    const [amount, setAmount] = useState<number>();
    const [currency, setCurrency] = useState<string>("EUR");
    const [result, setResult] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const errorClass = classNames({
        [css.error]: true,
        hidden: !error,
    });

    const btnClass = classNames({
        btn: true,
        "no-pointer-events": error === undefined || !!error
    });

    const convert = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}?format=json`);
            const exchangeRate = response.data.rates[0].mid;
            const formattedLocalAmount = amount!
                .toLocaleString(navigator.language, {style: "currency", currency: "PLN"});
            const formattedForeignAmount = (amount! / exchangeRate)
                .toLocaleString(navigator.language, {style: "currency", currency: currency});
            setResult(`${formattedLocalAmount} = ${formattedForeignAmount}`);
        } catch (err) {
            alert("Spróbuj później");
        } finally {
            setLoading(false);
        }
    };


    function onAmountChange(event: ChangeEvent<HTMLInputElement>) {
        const amountText = event.target.value;
        const amount: number = Number(amountText);
        setAmount(amount);

        let errorText = ``;
        if (!amountText || amount === 0) {
            errorText += `Kwota nie może być pusta!`;
        }

        if (amount < 0) {
            errorText += `Kwota nie może być ujemna!`;
        }

        setError(errorText);
        setResult("");
    }

    function onCurrencyChange(event: ChangeEvent<HTMLSelectElement>) {
        setResult("");
        setCurrency(event.target.value);
    }

    return (
        <div className="container">
            <header>
                <h1>Przelicznik walut</h1>
                <p className="text-center">
                    <IonIcon className="header-icon" name="cash-outline"></IonIcon>
                </p>

            </header>
            <section>
                <form name="currencyExchangeForm" noValidate className="container grid grid--3-cols">
                    <div className="user-input--amount">
                        <label htmlFor="amount">Wprowadź kwotę (PLN)</label>
                        <input
                            id="amount" type="number" placeholder="PLN"
                            name="amount" step="0.01"
                            value={amount || ''}
                            onChange={onAmountChange}
                        />
                        <div className={errorClass}>{error}</div>
                    </div>
                    <div className="user-input--currency">
                        <label htmlFor="currency">Wybierz walutę</label>
                        <select id="currency" name="currency" value={currency} onChange={onCurrencyChange} required>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="CHF">CHF</option>
                        </select>
                    </div>
                    <div className="btn--container">
                        <button className={btnClass} type="button" onClick={convert}>
                            Przelicz
                        </button>
                    </div>
                </form>
            </section>
            <div className={css.resultContainer}>
                <h3>{result}</h3>
                {loading ? <Loader /> : undefined}
            </div>
        </div>
    );
}

export default Home;