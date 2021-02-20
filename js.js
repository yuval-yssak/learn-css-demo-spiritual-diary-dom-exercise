import quotes from "./sivananda-quotes.js";

const quote = quotes[Math.floor(Math.random() * quotes.length)];

console.log(quote);
console.log(document.querySelector(".footer section.quote"));
document.querySelector(".footer section.quote").textContent = quote;
