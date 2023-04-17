import React, { ChangeEvent, useState } from "react";
import Button from "../../../components/Button/Button";
import Select from "../../../components/Select/Select";
import Input from "../../../components/Input/Input";
import Container from "../../../components/Container/Container";
import { getCurrencyRate } from "../../../services/apiCurrencies";
import { formatAmount } from "../../../utils/formattingUtils";
import HomeFormResult from "./Result/HomeFormResult";
import SelectOption from "../../../components/Select/Option/SelectOption";
import { CURRENCIES } from "../../../data/currencies";

function HomeForm() {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("EUR");
  const [result, setResult] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const convert = async () => {
    setLoading(true);
    try {
      const response = await getCurrencyRate(currency);
      const exchangeRate = response.data.rates[0].mid;
      const formattedLocalAmount = formatAmount(amount, "PLN");
      const formattedForeignAmount = formatAmount(
        amount! / exchangeRate,
        currency
      );
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
    <>
      <Container>
        <form
          name="currencyExchangeForm"
          noValidate
          className="grid grid--3-cols"
        >
          <Input
            onChange={onAmountChange}
            value={amount || ""}
            label="Wprowadź kwotę (PLN)"
            placeholder="PLN"
            type="number"
            name="amount"
            step="0.01"
            id="amount"
            error={error}
          ></Input>
          <Select
            id="currency"
            name="currency"
            value={currency}
            onChange={onCurrencyChange}
            label="Wybierz walutę"
            required
          >
            {CURRENCIES.map((currency) => (
              <SelectOption value={currency}>{currency}</SelectOption>
            ))}
          </Select>
          <Button
            onClick={convert}
            disabled={error === undefined || !!error}
            type="button"
          >
            Przelicz
          </Button>
        </form>
      </Container>
      <HomeFormResult result={result} loading={loading}></HomeFormResult>
    </>
  );
}

export default HomeForm;
