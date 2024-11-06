let fromOptionsBox = document.querySelector(".from-country-options");
let toOptionsBox = document.querySelector(".to-country-options");
let fromInputBox = document.querySelector(".from-input");
let toInputBox = document.querySelector(".to-input");

let fromInputFlag = document.querySelector(" .from-flag-img");
let toInputFlag = document.querySelector(" .to-flag-img");
let fromInput = document.querySelector(" .from-input input")
let toInput = document.querySelector(".container .to-input input");
 let convertbtn = document.querySelector(".convert-btn");
 let amount = document.querySelector(".amount input")
 let resultBox = document.querySelector(".result-box")
 let result = document.querySelector(".result-box .result");
 let switchbtn = document.querySelector(".container .switch-btn");

 let currFromValue , currToValue , currFromFlagSrc , currToFlagSrc;

let getSymbols = ()=>{
    let fromLi ="";
    let toLi = "";
    for(currency_code in countries){
       

        fromLi += `<li onclick = "getFromValue('${currency_code}')" >  <img src="https://flagsapi.com/${countries[currency_code]}/flat/64.png" alt="">   ${currency_code} </li>`;
        
        toLi += `<li onclick = "getToValue('${currency_code}')" >  <img src="https://flagsapi.com/${countries[currency_code]}/flat/64.png" alt="">   ${currency_code} </li>`;
    }
    fromOptionsBox.innerHTML = fromLi;
    toOptionsBox.innerHTML = toLi;

fromInputBox.addEventListener("click" , () => {
    fromOptionsBox.classList.toggle("active");
    toOptionsBox.classList.remove("active");
})

toInputBox.addEventListener("click" , () => {
    toOptionsBox.classList.toggle("active");
    fromOptionsBox.classList.remove("active");
})
}

let getFromValue = (country) => {
   fromInputFlag.src = `https://flagsapi.com/${countries[country]}/flat/64.png`
   fromInput.value = country;
   fromOptionsBox.classList.remove("active");
}
let getToValue = (country) => {
    toInputFlag.src = `https://flagsapi.com/${countries[country]}/flat/64.png`
    toInput.value = country;
    toOptionsBox.classList.remove("active");
 }

let getExchangeRate = () => {
    result.innerHTML = "Getting Exchange Rate..."
  result.style.fontSize = "12px";
    let url = `https://v6.exchangerate-api.com/v6/${Apikey}/latest/${fromInput.value}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        let exchangeRate = data.conversion_rates[toInput.value];
        let totalexchangeRange = (amount.value * exchangeRate).toFixed(2);
        result.innerHTML = `${amount.value} ${fromInput.value} = ${totalexchangeRange} ${toInput.value}`;
        result.style.fontSize = "15px";
    });
    resultBox.style.display = "block";
}

switchbtn.addEventListener("click" , () => {
    currFromValue = fromInput.value;
    currToValue = toInput.value;
    currFromFlagSrc = fromInputFlag.src
    currToFlagSrc = toInputFlag.src;
    fromInput.value = currToValue;
    toInput.value = currFromValue;
    fromInputFlag.src = currToFlagSrc;
    toInputFlag.src = currFromFlagSrc;
    getExchangeRate();
})

 convertbtn.addEventListener("click" , ()=> {
    if(amount.value != ""){
        getExchangeRate()
    }
 })



getSymbols();