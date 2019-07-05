const contentBox = document.getElementById("content-box");
const home = document.getElementById("home");
let questions = [];
d3.csv(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfBk-rwrIauBPn7iuoLXBxP2sSYOXRYCbJ2GflzSK6wxGVGDr_fAqORJ0JWPdajFLxnGegmrlI26HB/pub?output=csv"
).then(data => {
  questions = data;
  getData();
});

const getData = () => {
  const contentTitles = [
    ...new Set(questions.map(question => question.content))
  ];
  let content = [];
  content = contentTitles.map(title => ({
    title: title,
    id: questions.filter(question => question.content === title)[0].contentId
  }));
  createLinkBtn("All Content", 0);
  content.forEach(content => {
    createLinkBtn(content.title, content.id);
  });
};

const createLinkBtn = (text, id) => {
  const div = document.createElement("div");
  contentBox.appendChild(div);
  const h4 = document.createElement("h4");
  div.appendChild(h4);
  h4.innerText = text;
  const gameLink = document.createElement("a");
  div.appendChild(gameLink);
  gameLink.innerText = "Play!";
  const gameHref = document.createAttribute("href");
  gameLink.setAttributeNode(gameHref);
  gameHref.value = "game.html?contentId=" + id;
  const highScoreLink = document.createElement("a");
  div.appendChild(highScoreLink);
  const highScoreHref = document.createAttribute("href");
  highScoreHref.value = "highscores.html?contentId=" + id;
  highScoreLink.setAttributeNode(highScoreHref);
  div.classList.add("content-container");
  highScoreLink.innerText = "High Scores";
};
