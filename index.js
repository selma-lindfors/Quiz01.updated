const contentTitles = [...new Set(questions.map(question => question.content))];
const contentIds = [...new Set(questions.map(question => question.contentId))];
let questions = [];

const getData = () => {
  contentTitles.forEach(contentTitle => {
    createHyperlink(contentTitles, contentIds);
  });
};

const createHyperlink = (text, id) => {
  const a = document.createElement("a");
  const href = document.createAttribute("href");
  href.value = "game.html?contentId=" + id;
  a.setAttributeNode(link);
  a.innerText = text;
  a.classList.add("btn");
};

d3.csv(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfBk-rwrIauBPn7iuoLXBxP2sSYOXRYCbJ2GflzSK6wxGVGDr_fAqORJ0JWPdajFLxnGegmrlI26HB/pub?output=csv"
)
  .then(data => {
    questions = data.filter(question => {
      if (id === "0") return true;
      else return question.contentId === id;
    });
    getData();
  })
  .catch(function(error) {
    //
  });
