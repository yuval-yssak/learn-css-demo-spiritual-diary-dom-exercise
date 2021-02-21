import quotes from "./sivananda-quotes.js";

const quote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector(".footer section.quote").textContent = quote;

document.getElementById("add_question")?.addEventListener("click", function () {
  const question = prompt("Please type in your new question");
  const $diary = document.querySelector(".diary");

  const $question = document.createElement("div");
  $question.classList.add("dirary__question");
  $question.innerHTML = escapeHtml(question);

  $diary.insertAdjacentElement("beforeend", $question);
  new Array(7).fill(null).forEach(function (_, i) {
    const $diaryAnswer = document.createElement("div");
    $diaryAnswer.classList.add("diary__answer");
    $diaryAnswer.dataset.day = i;
    $diaryAnswer.innerHTML = "?";

    $diary.insertAdjacentElement("beforeend", $diaryAnswer);
  });

  // make all answers on that day editable on click.
  document.querySelectorAll(`.diary__answer`).forEach(addClickLogic);
});

function addClickLogic(newElement) {
  newElement.addEventListener("click", function (event) {
    const dayOfClickedDiv = event.target.dataset.day;

    // find all divs of the same day and replace them with input elements
    document
      .querySelectorAll(`.diary__answer[data-day="${dayOfClickedDiv}"]`)
      .forEach(function (answer) {
        answer.outerHTML = `<input class="diary__answer--edit" value=${answer.innerHTML} data-day=${dayOfClickedDiv} />`;
      });

    // show the "save" button
    const $saveButton = document.querySelector(".btn.save");
    $saveButton.classList.remove("hidden");

    // when clicking on the "save" button, replace the inputs back to divs
    $saveButton.addEventListener("click", function () {
      // find all inputs of the corresponding day and replace them with divs
      document
        .querySelectorAll(`.diary__answer--edit[data-day="${dayOfClickedDiv}"]`)
        .forEach(function (inputOnDay) {
          inputOnDay.outerHTML = `<div class="diary__answer" data-day=${dayOfClickedDiv}>${inputOnDay.value}</div>`;
        });

      // for each div on that day, make that editable on click
      document
        .querySelectorAll(`.diary__answer[data-day="${dayOfClickedDiv}"]`)
        .forEach(addClickLogic);

      // hide the "save" button
      $saveButton.classList.add("hidden");
    });
  });
}
