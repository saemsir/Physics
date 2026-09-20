"use strict";

/*
========================================================
CHEMISTRY WEBSITE CONFIGURATION
========================================================

Put your real contact details here.

Examples:

whatsapp:
"919876543210"

telegram:
"https://t.me/yourusername"

email:
"your@email.com"

googleForm:
"https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"

Leave anything blank if you don't have it yet.
========================================================
*/


const CONFIG = {

  whatsapp: "7033131480",

  telegram: "t.me/saemlabs",

  email: "saemlabs@gmail.com",

  googleForm: "docs.google.com/forms"

};


const PLAYLIST_ID = "PL36EC6A6180271B0F";


/*
========================================================
LECTURES

These video IDs have been verified as videos associated
with the MIT 3.091SC Fall 2010 YouTube archive.

For lectures where an exact topic title has not been
verified here, we intentionally use "Lecture X" rather
than inventing a topic.
========================================================
*/


const lectures = [

  {
    n: "01",
    title: "Foundations",
    sub: "Course introduction",
    id: "vPQ9a_xIqRg",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "02",
    title: "Periodic table",
    sub: "Periodic patterns",
    id: "h57hFAsLAGo",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "03",
    title: "Lecture 3",
    sub: "MIT 3.091SC",
    id: "Io_4ZckeQ1k",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "04",
    title: "Lecture 4",
    sub: "MIT 3.091SC",
    id: "5l_S8WwBVnM",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "05",
    title: "Lecture 5",
    sub: "MIT 3.091SC",
    id: "K30HeE8fEq8",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "06",
    title: "Lecture 6",
    sub: "MIT 3.091SC",
    id: "giPLtjL0Mnc",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "07",
    title: "Aufbau principle",
    sub: "Photoelectron spectroscopy",
    id: "c_4dDw7iLn8",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "08",
    title: "Ionic crystals",
    sub: "Born–Haber cycle",
    id: "kZJgJCxcHZE",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "09",
    title: "Lecture 9",
    sub: "MIT 3.091SC",
    id: "up3zP2z81SE",
    tags: ["jee", "neet", "deeper"]
  },

  {
    n: "10",
    title: "Lecture 10",
    sub: "MIT 3.091SC",
    id: "wyoFOdR64U8",
    tags: ["jee", "neet", "deeper"]
  }

];


/*
========================================================
DOM
========================================================
*/


const siteHeader =
  document.getElementById("siteHeader");

const menuToggle =
  document.getElementById("menuToggle");

const mainNav =
  document.getElementById("mainNav");

const announcementClose =
  document.getElementById("announcementClose");

const announcement =
  document.getElementById("announcement");

const backTop =
  document.getElementById("backTop");


/*
========================================================
STICKY HEADER
========================================================
*/


function updateHeader() {

  if (!siteHeader) return;

  if (window.scrollY > 20) {

    siteHeader.classList.add("scrolled");

  } else {

    siteHeader.classList.remove("scrolled");

  }
}


window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


updateHeader();


/*
========================================================
MOBILE MENU
========================================================
*/


if (menuToggle && mainNav) {

  menuToggle.addEventListener(
    "click",
    () => {

      const open =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  mainNav
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mainNav.classList.remove("open");

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/*
========================================================
ANNOUNCEMENT CLOSE
========================================================
*/


if (announcementClose) {

  announcementClose.addEventListener(
    "click",
    () => {

      if (announcement) {

        announcement.style.display = "none";

      }

    }
  );

}


/*
========================================================
BACK TO TOP
========================================================
*/


window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 500) {

      backTop.classList.add("show");

    } else {

      backTop.classList.remove("show");

    }

  },
  { passive: true }
);


if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/*
========================================================
REVEAL ANIMATIONS
========================================================
*/


const revealTargets =
  document.querySelectorAll(
    ".section-heading, .idea-card, .method-step, .pathway-card, .source-card, .contact-grid"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "reveal",
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.08
    }
  );


revealTargets.forEach(
  element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  }
);


/*
========================================================
LECTURE SYSTEM
========================================================
*/


const lectureList =
  document.getElementById(
    "lectureList"
  );

const lectureSearch =
  document.getElementById(
    "lectureSearch"
  );

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


const player =
  document.getElementById(
    "youtubePlayer"
  );

const playerNumber =
  document.getElementById(
    "playerNumber"
  );

const playerTitle =
  document.getElementById(
    "playerTitle"
  );

const playerSubtitle =
  document.getElementById(
    "playerSubtitle"
  );

const nextLecture =
  document.getElementById(
    "nextLecture"
  );


let activeFilter = "all";

let currentLectureIndex = 0;


/*
Create lecture card.
*/


function createLectureCard(
  lecture,
  originalIndex
) {

  const button =
    document.createElement("button");

  button.type = "button";

  button.className =
    "lecture-item";

  button.dataset.index =
    String(originalIndex);


  if (
    originalIndex ===
    currentLectureIndex
  ) {

    button.classList.add("active");

  }


  button.innerHTML = `

    <span class="lecture-item-number">
      ${lecture.n}
    </span>

    <span>

      <h4>
        ${escapeHTML(lecture.title)}
      </h4>

      <p>
        ${escapeHTML(lecture.sub)}
      </p>

    </span>

  `;


  button.addEventListener(
    "click",
    () => {

      loadLecture(originalIndex);

    }
  );


  return button;
}


/*
Escape HTML so future titles
cannot accidentally inject markup.
*/


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/*
Render lecture list.
*/


function renderLectures() {

  if (!lectureList) return;


  const query =
    (lectureSearch?.value || "")
      .trim()
      .toLowerCase();


  lectureList.innerHTML = "";


  let visibleCount = 0;


  lectures.forEach(
    (lecture, index) => {

      const matchesFilter =
        activeFilter === "all" ||
        lecture.tags.includes(activeFilter);


      const haystack =
        `${lecture.title} ${lecture.sub} ${lecture.n}`
          .toLowerCase();


      const matchesSearch =
        !query ||
        haystack.includes(query);


      if (
        matchesFilter &&
        matchesSearch
      ) {

        const card =
          createLectureCard(
            lecture,
            index
          );

        lectureList.appendChild(card);

        visibleCount++;

      }

    }
  );


  if (visibleCount === 0) {

    lectureList.innerHTML = `

      <div
        style="
          padding:30px;
          color:#6c6d65;
          font-size:13px;
        "
      >
        No lecture found.
      </div>

    `;

  }

}


/*
Load selected lecture.
*/


function loadLecture(index) {

  if (
    index < 0 ||
    index >= lectures.length
  ) {
    return;
  }


  currentLectureIndex =
    index;


  const lecture =
    lectures[index];


  if (player) {

    player.src =
      `https://www.youtube.com/embed/${lecture.id}?rel=0&modestbranding=1`;

  }


  if (playerNumber) {

    playerNumber.textContent =
      `LECTURE ${lecture.n}`;

  }


  if (playerTitle) {

    playerTitle.textContent =
      lecture.title;

  }


  if (playerSubtitle) {

    playerSubtitle.textContent =
      lecture.sub;

  }


  renderLectures();

}


/*
Filter buttons.
*/


filterButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add("active");


        activeFilter =
          button.dataset.filter ||
          "all";


        renderLectures();

      }
    );

  }
);


/*
Search.
*/


if (lectureSearch) {

  lectureSearch.addEventListener(
    "input",
    renderLectures
  );

}


/*
Next lecture.
*/


if (nextLecture) {

  nextLecture.addEventListener(
    "click",
    () => {

      let next =
        currentLectureIndex + 1;


      if (
        next >= lectures.length
      ) {

        next = 0;

      }


      loadLecture(next);


      document
        .querySelector(".lecture-player")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

    }
  );

}


/*
Initial render.
*/


renderLectures();


/*
========================================================
HERO CANVAS
========================================================
*/


const heroCanvas =
  document.getElementById(
    "heroCanvas"
  );

const heroCtx =
  heroCanvas
    ? heroCanvas.getContext("2d")
    : null;


let heroParticles = [];

let heroAnimationStarted = false;


function resizeCanvas(canvas) {

  if (!canvas) return null;


  const rect =
    canvas.getBoundingClientRect();


  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  canvas.width =
    Math.floor(rect.width * dpr);

  canvas.height =
    Math.floor(rect.height * dpr);


  const context =
    canvas.getContext("2d");


  context.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  return {
    width: rect.width,
    height: rect.height
  };

}


function initHeroParticles() {

  if (!heroCanvas) return;


  const size =
    resizeCanvas(heroCanvas);


  if (!size) return;


  heroParticles = [];


  const count =
    Math.max(
      28,
      Math.floor(
        (size.width * size.height) /
        18000
      )
    );


  for (let i = 0; i < count; i++) {

    heroParticles.push({

      angle:
        Math.random() *
        Math.PI *
        2,

      radius:
        30 +
        Math.random() *
        Math.min(
          size.width,
          size.height
        ) *
        .32,

      speed:
        (.0006 +
          Math.random() * .0015) *
        (Math.random() > .5 ? 1 : -1),

      size:
        1.5 +
        Math.random() * 2.5,

      orbit:
        Math.random()

    });

  }

}


function drawHero(time) {

  if (!heroCtx || !heroCanvas) {
    return;
  }


  const width =
    heroCanvas.clientWidth;

  const height =
    heroCanvas.clientHeight;


  heroCtx.clearRect(
    0,
    0,
    width,
    height
  );


  const cx =
    width / 2;

  const cy =
    height / 2;


  /*
  Orbit rings
  */


  for (let i = 0; i < 4; i++) {

    const radius =
      70 + i * 48;


    heroCtx.beginPath();

    heroCtx.ellipse(
      cx,
      cy,
      radius,
      radius * .65,
      i * .25,
      0,
      Math.PI * 2
    );


    heroCtx.strokeStyle =
      "rgba(47,97,74,.18)";

    heroCtx.lineWidth = 1;

    heroCtx.stroke();

  }


  /*
  Central nucleus.
  */


  heroCtx.beginPath();

  heroCtx.arc(
    cx,
    cy,
    18,
    0,
    Math.PI * 2
  );


  heroCtx.fillStyle =
    "#2f614a";

  heroCtx.fill();


  heroCtx.beginPath();

  heroCtx.arc(
    cx,
    cy,
    29,
    0,
    Math.PI * 2
  );


  heroCtx.strokeStyle =
    "rgba(47,97,74,.25)";

  heroCtx.stroke();


  /*
  particles.
  */


  heroParticles.forEach(
    particle => {

      particle.angle +=
        particle.speed *
        10;


      const orbitIndex =
        Math.floor(
          particle.radius /
          48
        ) % 4;


      const ellipseRadius =
        70 +
        orbitIndex * 48;


      const x =
        cx +
        Math.cos(particle.angle) *
        ellipseRadius;


      const y =
        cy +
        Math.sin(particle.angle) *
        ellipseRadius *
        .65;


      heroCtx.beginPath();


      heroCtx.arc(
        x,
        y,
        particle.size,
        0,
        Math.PI * 2
      );


      heroCtx.fillStyle =
        "rgba(23,24,21,.65)";


      heroCtx.fill();

    }
  );


  /*
  Central glow.
  */


  const gradient =
    heroCtx.createRadialGradient(
      cx,
      cy,
      0,
      cx,
      cy,
      150
    );


  gradient.addColorStop(
    0,
    "rgba(201,221,198,.25)"
  );


  gradient.addColorStop(
    1,
    "rgba(201,221,198,0)"
  );


  heroCtx.fillStyle =
    gradient;


  heroCtx.beginPath();

  heroCtx.arc(
    cx,
    cy,
    150,
    0,
    Math.PI * 2
  );

  heroCtx.fill();


  requestAnimationFrame(drawHero);

}


function startHero() {

  if (heroAnimationStarted) return;

  heroAnimationStarted = true;

  initHeroParticles();

  requestAnimationFrame(drawHero);

}


if (heroCanvas) {

  const heroObserver =
    new IntersectionObserver(
      entries => {

        if (
          entries[0].isIntersecting
        ) {

          startHero();

          heroObserver.disconnect();

        }

      },
      {
        threshold: .05
      }
    );


  heroObserver.observe(heroCanvas);

}


/*
Resize hero.
*/


window.addEventListener(
  "resize",
  () => {

    initHeroParticles();

  }
);


/*
========================================================
ELECTROCHEMICAL MODEL
========================================================
*/


const electroCanvas =
  document.getElementById(
    "electroCanvas"
  );

const electroCtx =
  electroCanvas
    ? electroCanvas.getContext("2d")
    : null;


const mobilitySlider =
  document.getElementById(
    "mobilitySlider"
  );


const mobilityValue =
  document.getElementById(
    "mobilityValue"
  );


const pauseModel =
  document.getElementById(
    "pauseModel"
  );


let ionParticles = [];

let electroPaused = false;

let electroRunning = false;


function initElectroParticles() {

  if (!electroCanvas) return;


  const rect =
    electroCanvas.getBoundingClientRect();


  ionParticles = [];


  const count = 24;


  for (let i = 0; i < count; i++) {

    ionParticles.push({

      x:
        30 +
        Math.random() *
        Math.max(
          100,
          rect.width - 60
        ),

      y:
        40 +
        Math.random() *
        Math.max(
          100,
          rect.height - 80
        ),

      phase:
        Math.random() *
        Math.PI *
        2,

      size:
        3 +
        Math.random() * 3

    });

  }

}


function resizeElectroCanvas() {

  if (!electroCanvas) return;


  const rect =
    electroCanvas.getBoundingClientRect();


  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  electroCanvas.width =
    Math.floor(
      rect.width * dpr
    );


  electroCanvas.height =
    Math.floor(
      rect.height * dpr
    );


  electroCtx.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );


  initElectroParticles();

}


function drawElectro(time) {

  if (
    !electroCanvas ||
    !electroCtx
  ) {
    return;
  }


  const width =
    electroCanvas.clientWidth;

  const height =
    electroCanvas.clientHeight;


  electroCtx.clearRect(
    0,
    0,
    width,
    height
  );


  /*
  lattice
  */


  const cols =
    Math.max(
      5,
      Math.floor(width / 70)
    );


  const rows =
    Math.max(
      4,
      Math.floor(height / 70)
    );


  for (let row = 0; row < rows; row++) {

    for (
      let col = 0;
      col < cols;
      col++
    ) {

      const x =
        35 +
        col *
        ((width - 70) /
          Math.max(
            1,
            cols - 1
          ));

      const y =
        35 +
        row *
        ((height - 70) /
          Math.max(
            1,
            rows - 1
          ));


      electroCtx.beginPath();

      electroCtx.arc(
        x,
        y,
        4,
        0,
        Math.PI * 2
      );


      electroCtx.fillStyle =
        "rgba(23,24,21,.18)";

      electroCtx.fill();

    }

  }


  /*
  Slider value.
  */


  const mobility =
    mobilitySlider
      ? Number(mobilitySlider.value) / 100
      : .5;


  /*
  Ion movement.
  */


  ionParticles.forEach(
    ion => {

      if (!electroPaused) {

        ion.x +=
          (.15 + mobility * 1.7);

        ion.y +=
          Math.sin(
            time * .001 +
            ion.phase
          ) * .15;


        if (
          ion.x >
          width + 20
        ) {

          ion.x = -20;

          ion.y =
            40 +
            Math.random() *
            Math.max(
              100,
              height - 80
            );

        }

      }


      /*
      Motion trail
      */


      electroCtx.beginPath();

      electroCtx.moveTo(
        ion.x - 20 * mobility,
        ion.y
      );


      electroCtx.lineTo(
        ion.x,
        ion.y
      );


      electroCtx.strokeStyle =
        "rgba(47,97,74,.22)";

      electroCtx.lineWidth = 2;

      electroCtx.stroke();


      /*
      Ion
      */


      electroCtx.beginPath();

      electroCtx.arc(
        ion.x,
        ion.y,
        ion.size,
        0,
        Math.PI * 2
      );


      electroCtx.fillStyle =
        "#2f614a";

      electroCtx.fill();


      /*
      Positive sign
      */


      electroCtx.beginPath();

      electroCtx.moveTo(
        ion.x - 2,
        ion.y
      );

      electroCtx.lineTo(
        ion.x + 2,
        ion.y
      );


      electroCtx.moveTo(
        ion.x,
        ion.y - 2
      );

      electroCtx.lineTo(
        ion.x,
        ion.y + 2
      );


      electroCtx.strokeStyle =
        "#fffdf7";

      electroCtx.lineWidth = 1;

      electroCtx.stroke();

    }
  );


  if (
    !electroPaused
  ) {

    requestAnimationFrame(
      drawElectro
    );

  } else {

    electroRunning = false;

  }

}


/*
Start electro animation safely.
*/


function startElectro() {

  if (
    electroRunning ||
    !electroCanvas
  ) {
    return;
  }


  electroRunning = true;

  requestAnimationFrame(
    drawElectro
  );

}


/*
Pause / resume.
*/


if (pauseModel) {

  pauseModel.addEventListener(
    "click",
    () => {

      electroPaused =
        !electroPaused;


      pauseModel.textContent =
        electroPaused
          ? "Resume animation"
          : "Pause animation";


      if (!electroPaused) {

        startElectro();

      }

    }
  );

}


/*
Slider.
*/


if (mobilitySlider) {

  mobilitySlider.addEventListener(
    "input",
    () => {

      if (mobilityValue) {

        mobilityValue.textContent =
          `${mobilitySlider.value}%`;

      }

    }
  );

}


/*
Initialize visual model only
when close to viewport.
*/


if (electroCanvas) {

  resizeElectroCanvas();


  const electroObserver =
    new IntersectionObserver(
      entries => {

        if (
          entries[0].isIntersecting
        ) {

          startElectro();

        }

      },
      {
        threshold: .05
      }
    );


  electroObserver.observe(
    electroCanvas
  );

}


window.addEventListener(
  "resize",
  resizeElectroCanvas
);


/*
========================================================
CONTACT ROUTING
========================================================
*/


const whatsappLink =
  document.getElementById(
    "whatsappLink"
  );

const telegramLink =
  document.getElementById(
    "telegramLink"
  );

const emailLink =
  document.getElementById(
    "emailLink"
  );


/*
WhatsApp
*/


if (
  whatsappLink &&
  CONFIG.whatsapp
) {

  whatsappLink.href =
    `https://wa.me/${CONFIG.whatsapp}`;


  whatsappLink.target =
    "_blank";


  whatsappLink.rel =
    "noopener";

}


/*
Telegram
*/


if (
  telegramLink &&
  CONFIG.telegram
) {

  telegramLink.href =
    CONFIG.telegram;


  telegramLink.target =
    "_blank";


  telegramLink.rel =
    "noopener";

}


/*
Email
*/


if (
  emailLink &&
  CONFIG.email
) {

  emailLink.href =
    `mailto:${CONFIG.email}`;

}


/*
========================================================
ENQUIRY FORM
========================================================
*/


const enquiryForm =
  document.getElementById(
    "enquiryForm"
  );


const formStatus =
  document.getElementById(
    "formStatus"
  );


if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document.getElementById(
          "studentName"
        )?.value.trim();


      const mobile =
        document.getElementById(
          "studentMobile"
        )?.value.trim();


      const goal =
        document.getElementById(
          "studentGoal"
        )?.value;


      const message =
        document.getElementById(
          "studentMessage"
        )?.value.trim();


      /*
      If Google Form has been configured,
      open it.
      */


      if (CONFIG.googleForm) {

        window.open(
          CONFIG.googleForm,
          "_blank",
          "noopener"
        );


        if (formStatus) {

          formStatus.textContent =
            "Google Form opened in a new tab.";

        }


        return;

      }


      /*
      Otherwise use WhatsApp.
      */


      if (CONFIG.whatsapp) {

        const text =

`Chemistry enquiry

Name: ${name || "Not provided"}
Mobile: ${mobile || "Not provided"}
Goal: ${goal || "General enquiry"}

Message:
${message || "No message provided."}`;


        const url =
          `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;


        window.open(
          url,
          "_blank",
          "noopener"
        );


        if (formStatus) {

          formStatus.textContent =
            "WhatsApp opened with your enquiry.";

        }


        return;

      }


      /*
      No endpoint configured.
      */


      if (formStatus) {

        formStatus.textContent =
          "Add your WhatsApp, Telegram, email or Google Form link in CONFIG inside script.js.";

      }

    }
  );

}


/*
========================================================
VISIBILITY OPTIMIZATION
========================================================
*/


document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.visibilityState ===
      "visible"
    ) {

      if (
        !electroPaused
      ) {

        startElectro();

      }

    }

  }
);
