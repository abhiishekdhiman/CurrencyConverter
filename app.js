const BASE_URL = "https://open.er-api.com/v6/latest/";

const currency = document.querySelectorAll(".currency select");
const btn = document.querySelector("button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

for (select of currency) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.value = code;
    newOption.innerHTML = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => updateFlags(e.target));
}

const updateFlags = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
})
const updateExchangeRate =async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue <= 0) {
      amount.value = "1";
      amtValue = 1;
    }
    let URL = `${BASE_URL}/${fromCurrency.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data.rates[toCurrency.value];
    let totalExRate = (amtValue * exchangeRate).toFixed(2);
    document.querySelector(
      "#exchange-rate"
    ).innerText = `${amtValue} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
};
btn.addEventListener("click", async (e) => {
  e.preventDefault();
 updateExchangeRate();
});
