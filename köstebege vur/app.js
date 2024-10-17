const köstebekler = document.querySelectorAll(".köstebek");
const baslatButon = document.getElementById("baslat");
const skorText = document.querySelector("#skor");
const süreText = document.querySelector("#süre");

const body = document.querySelector("body");
const button = document.querySelector(".btn");
const colors = [
  "yellow",
  "green",
  "#c7bf67",
  "#7b55cf",
  "#de4747",
  "#2963ab",
];

let öncekiKöstebek;
let süreDoldu = false;
let skor = 0;
let süre = 15;

baslatButon.addEventListener("click", startGame);
köstebekler.forEach((köstebek) => köstebek.addEventListener("click", vur));

function rastgeleKostebek() {
  const sıra = Math.floor(Math.random() * köstebekler.length);
  const secilen = köstebekler[sıra];
  if (öncekiKöstebek === secilen) {
    return rastgeleKostebek();
  } else {
    öncekiKöstebek = secilen;
  }
  return secilen;
}

function rastgeleSüre(min, max) {
  const time = Math.round(Math.random() * (max - min)) + min;
  return time;
}

function yukarı() {
  const köstebek = rastgeleKostebek();
  const köstebekSüresi = rastgeleSüre(750, 1250);
  köstebek.classList.add("secilen");
  setTimeout(() => {
    köstebek.classList.remove("secilen");
    if (!süreDoldu) yukarı();
  }, köstebekSüresi);
}

function süreyiBaslat() {
  if (!süreDoldu) {
    süre--;
    süreText.textContent = süre;
  } else {
    süreText.textContent = "süre doldu";
  }
}

function startGame() {
  süre = 15;
  skor = 0;
  süreDoldu = false;
  const interval = setInterval(() => {
    süreyiBaslat();
    if (süreDoldu) clearInterval(interval);
  }, 1000);
  yukarı();
  setTimeout(() => {
    süreDoldu = true;
  }, süre * 1000);
}

function vur(e) {
  if (e.target.classList.contains("secilen")) {
    skor++;
    e.target.classList.remove("secilen");
  }
  skorText.textContent = skor;
}



button.addEventListener("click", changeBackground);

let sıra = 0;

function changeBackground() {
  // rastgele bir renk

  //   const rastgeleSayi = Math.floor(Math.random() * colors.length);
  //   const secilenRenk = colors[rastgeleSayi];
  //   console.log(rastgeleSayi, secilenRenk);
  //   body.style.backgroundColor = secilenRenk;

  // sırayla arkaplan rengi seç

  if (sıra == 7) sıra = 0;
  const secilenRenk = colors[sıra];
  sıra++;
  body.style.backgroundColor = secilenRenk;
}

