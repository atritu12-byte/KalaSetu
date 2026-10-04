const intro = document.getElementById("intro");
const site = document.getElementById("site");
const skipButton = document.getElementById("skipIntro");

const INTRO_DURATION = 4800; // 4.8 seconds

function finishIntro() {
  if (intro.classList.contains("hide")) return;

  intro.classList.add("hide");
  site.classList.add("show");

  // Remember that the intro has played during this browser session.
  sessionStorage.setItem("kalasetuIntroPlayed", "true");
}

function startIntro() {
  const alreadyPlayed =
    sessionStorage.getItem("kalasetuIntroPlayed") === "true";

  if (alreadyPlayed) {
    intro.classList.add("hide");
    site.classList.add("show");
    return;
  }

  setTimeout(finishIntro, INTRO_DURATION);
}

skipButton.addEventListener("click", finishIntro);

window.addEventListener("load", startIntro);
