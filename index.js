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
  createLinkBtn("Play All", 0);
  content.forEach(content => {
    createLinkBtn(content.title, content.id);
  });
};

const createLinkBtn = (text, id) => {
  const a = document.createElement("a");
  contentBox.appendChild(a);
  const href = document.createAttribute("href");
  href.value = "game.html?contentId=" + id;
  a.setAttributeNode(href);
  a.innerText = text;
  a.classList.add("btn");
  a.classList.add("wide");
};
