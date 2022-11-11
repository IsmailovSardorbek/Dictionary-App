const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

const result = document.getElementById(`result`);

const sound = document.querySelector(`#sound`);

const btn = document.querySelector(`#search-btn`);

btn.addEventListener("click", () => {
  let inputWord = document.querySelector("#inp-word").value;

  fetch(`${API_URL}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
        <div class="word">
          <h3>${inputWord}</h3>
          <button onclick="playSound()">
            <i class="fa fa-volume-up"></i>
          </button>
        </div>

        <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || ""}
        </p>
          `;

      sound.src = `${
        data[0].phonetics[0].audio ||
        data[0].phonetics[1].audio ||
        data[0].phonetics[2].audio ||
        data[0].phonetics[3].audio
      }`;
    })
    .catch(() => {
      result.innerHTML = `<h3>Couldn't find the word</h3>`;
    });
});

function playSound() {
  sound.play();
}
