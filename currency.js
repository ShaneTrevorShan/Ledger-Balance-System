export let currency = "MYR";
export let rates = { MYR: 1 };

export async function loadRates() {
    try {
        const response = await fetch('https://api.frankfurter.dev/v1/latest?base=MYR&symbols=USD,SGD,EUR,GBP,JPY');
        const data = await response.json();
        rates = { MYR: 1, ...data.rates };
    } catch (error){
        console.log("Could not load exchange rates: ", error);
    }
}

export function money(value){
    return new Intl.NumberFormat("en-MY", {
        style: "currency",
        currency: currency,
    }).format(value);
}

export function setCurrency(newCode){
    currency = newCode;
}