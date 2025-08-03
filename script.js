const messages = {
  1: { text: "Bu fotoyu baya sevirem, ilk zamanlarimizda baya utanirdiq qucaqlasmaga bele. Burda uniden evvel gelib oturmusduq parkda ve sarilib oturmusduq ilk defe. Hemise saqqalimla oynayirdin, SEN HER SAQQALIMLA OYNADIGINDA ERIYIREEMMMMMM, umarim her zaman birlikte olariqki sarilariiiiiiqqqqq :) !", image: "adv/1.jpg" },
  2: { text: "Ilk defe pizza yemeye getmisdik, ay Allah o gun nece gozel idinse hele de yadimdadi. Yuzun, kombinin falan indiye qederki favori halin idi, saclarin da cox ama cox qeseng idi <3", image: "adv/2.jpg" },
  3: { text: "Bura evvel de getmek istemisdik, amma alinmamisdi bextimizden. Sonra gedende cox ama coxxxxx eglenmistik, surmeyie de baya iyi bacarirdiq (supheli)", image: "adv/3.jpg" },
  4: { text: "Ilk defe sushi yemeye gettiyimiz gundu, o sahil olan yere getmisdik. O gunde ASIRI guzel idin, gozlerine heyranam :)", image: "adv/4.jpg" },
  5: { text: "QIS, EN EGLENDIGIM GUNLER IDI, of kas qis geri gelseydi de qar yagasaydi yene qarda tumgun gezerdik. INSALLAH GELEN QISLARDA DAHA COX GEZERIK", image: "adv/5.jpg" },
  6: { text: "Getmisdik tarqovuda festivala, bisssuruuuu dadli yemekler yemisdik. ve YENE COX GOZEL IDIN, nasil her sekilde bu qeder gozel ola bilirsen anlamiram. HANSI SEKILI ALIM DEYE 2 SAAT DUSUNMUSEM", image: "adv/6.jpg" },
  7: { text: "Seki gezimiz tabiki en guzellerinden biriydi :D, baya eglenmistim senin memleketi SENLE gezerken. Umarim nisanlananda, evlenende tetile falan gelirik DAHA COKKKKKKKKKK", image: "adv/7.jpg" },
  8: { text: "getmisdik ilk defe sahile, YENE LA NASIL BU QEDER GOZEL OLA BILIRSEN ANLAMIRAM. Bu foto bu arada en fav fotolarimdan biri cox tatli dusmusukkkkkkkkk", image: "adv/8.jpg" },
  9: { text: "bu fotoda da 9 cu ay donumumuz idi, YENE SUSHIYE GITMISDIK. Ama karim oldukdan sonra harda olsam mene ferqi yoxdur :)", image: "adv/9.jpg" },
  10: { text: "bu fotoyuda baya sevirem cunku TAM BIR EVLI CIFTE BENZIYIRIK, karimin herseyini tasirim men OLURUM KARIMA, SENI COX AMA COX SEVIREM UMARIM DAHA COX SEKIL VE AY DONUMU KECIRDERIKKKKKKKKKKK.", image: "adv/10.jpg" }
};

const sky = document.querySelector(".sky");
const popup = document.getElementById("popup");
const messageText = document.getElementById("message-text");
const closeButton = document.getElementById("close");

const usedPositions = [];
let currentMessage = 1;

function isFarEnough(x, y) {
  return usedPositions.every(pos => {
    const dx = pos.x - x;
    const dy = pos.y - y;
    return Math.sqrt(dx * dx + dy * dy) > 25;
  });
}

let i = 0;
while (i < 10) {
  const x = Math.random() * 90 + 5;
  const y = Math.random() * 90 + 5;

  if (!isFarEnough(x, y)) continue;

  usedPositions.push({ x, y });

  const star = document.createElement("span");
  star.classList.add("star");
  star.textContent = "★";
  star.style.left = `${x}%`;
  star.style.top = `${y}%`;         

  star.addEventListener("click", () => {
    if (currentMessage > 10) return;
    if (star.classList.contains("clicked")) return;

    const message = messages[currentMessage];
    messageText.innerHTML = `
      <p>${message.text}</p>
      <img src="${message.image}" alt="memory" class="popup-img">
    `;

    popup.classList.remove("hide");
    popup.classList.add("show");
    popup.style.display = "block";

    star.classList.add("clicked");
    star.style.color = "#ffd700";

    currentMessage++;
  });

  sky.appendChild(star);
  i++;
}

closeButton.addEventListener("click", () => {
  popup.classList.remove("show");
  popup.classList.add("hide");

  setTimeout(() => {
    popup.style.display = "none";
  }, 300); 
});

Object.values(messages).forEach(msg => {
  const img = new Image();
  img.src = msg.image;
});

const audio = document.getElementById("bg-music");
audio.volume = 0;

function startMusicWithFade() {
  // Only run this once
  if (audio.dataset.started === "true") return;
  audio.dataset.started = "true";

  audio.play().then(() => {
    let volume = 0;
    const maxVolume = 7.0;
    const fadeSpeed = 0.01;
    const fadeInterval = 300; // ms

    const fadeIn = setInterval(() => {
      if (volume < maxVolume) {
        volume += fadeSpeed;
        audio.volume = Math.min(volume, maxVolume);
      } else {
        clearInterval(fadeIn);
      }
    }, fadeInterval);
  }).catch(err => {
    console.warn("Still blocked:", err);
  });
}

// Listen for first user interaction
window.addEventListener("click", startMusicWithFade, { once: true });
window.addEventListener("keydown", startMusicWithFade, { once: true });

