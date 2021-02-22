import quotes from "./sivananda-quotes.js";

const quote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector(".footer section.quote").textContent = quote;

document.getElementById("add-question")?.addEventListener("click", function () {
  const question = prompt("Please type in your new question");

  if (question) {
    const escapedQuestion = escapeHtml(question);
    addQuestion(escapedQuestion);
  }
});

function addQuestion(question) {
  const $diary = document.querySelector(".diary");

  const $question = document.createElement("div");
  $question.classList.add("diary__question");
  $question.innerHTML = question;

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
}

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

document
  .getElementById("add-standard-questions")
  .addEventListener("click", function (event) {
    const questions = [
      "When did you go to bed last night?",
      "When did you get up from bed?",
      "How many hours did you sleep?",
      "How many Malas of Japa?",
      "How long in Kirtan?",
      "How many Pranayamas?",
      "How long did you perform Asanas?",
      "How long did you meditate in one Asana?",
      "How many Gita Slokas did you read or get by heart?",
      "How long in the company of the wise (Satsanga)?",
      "How many hours did you observe Mouna?",
      "How long in disinterested selfless service?",
      "How much did you give in charity?",
      "How many Mantras you wrote?",
      "How long did you practice physical exercise?",
      "How many lies did you tell and with what self-punishment?",
      "How many times and how long of anger and with what self-punishment?",
      "How many hours you spent in useless company?",
      "How many times you failed in Brahmacharya?",
      "How long in study of religious books?",
      "How many times you failed in the control of evil habits and with what self-punishment?",
      "How long you concentrated on your Ishta Devata (Saguna or Nirguna Dhyana)?",
      "How many days did you observe fast and vigil?",
      "Were you regular in your meditation?",
      "What virtue are you developing?",
      "What evil quality are you trying to eradicate?",
      "What Indriya is troubling you most?",
    ];

    questions.forEach(addQuestion);
    event.target.classList.add("hidden");
  });

window.addEventListener("offline", function () {
  document
    .querySelector(".main")
    .insertAdjacentHTML(
      "afterBegin",
      `<div id="offline-alert">You are currently offline</div>`
    );
});

window.addEventListener("online", function () {
  document.querySelector("#offline-alert").remove();
});
