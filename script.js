"use strict";

/* ======================================================
   HELPERS
====================================================== */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  Array.from(
    document.querySelectorAll(selector)
  );


/* ======================================================
   HEADER
====================================================== */

const header = $("#header");
const topBtn = $("#top");
const menu = $("#menu");
const nav = $("#nav");

window.addEventListener(
  "scroll",
  () => {

    header.classList.toggle(
      "scrolled",
      window.scrollY > 18
    );

    topBtn.classList.toggle(
      "show",
      window.scrollY > 650
    );

  },
  {
    passive: true
  }
);


topBtn.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


menu.addEventListener(
  "click",
  () => {

    nav.classList.toggle(
      "open"
    );

  }
);


$$("nav a").forEach(
  link => {

    link.addEventListener(
      "click",
      () => {

        nav.classList.remove(
          "open"
        );

      }
    );

  }
);


/* ======================================================
   ANNOUNCEMENT
====================================================== */

const notice =
  $("#notice");

const noticeClose =
  $("#noticeClose");

noticeClose.addEventListener(
  "click",
  () => {

    notice.remove();

    localStorage.setItem(
      "chemistryNoticeClosed",
      "1"
    );

  }
);


if (
  localStorage.getItem(
    "chemistryNoticeClosed"
  )
) {

  notice?.remove();

}


/* ======================================================
   YEAR
====================================================== */

$("#year").textContent =
  new Date().getFullYear();


/* ======================================================
   COUNTERS
====================================================== */

const countObserver =
  new IntersectionObserver(
    entries => {

      if (
        !entries[0].isIntersecting
      ) {
        return;
      }

      $$("[data-count]").forEach(
        element => {

          const target =
            Number(
              element.dataset.count
            );

          const start =
            performance.now();

          const duration =
            1000;


          const tick = now => {

            const progress =
              Math.min(
                (now - start) /
                duration,
                1
              );


            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            element.textContent =
              Math.round(
                target * eased
              ).toLocaleString();


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                tick
              );

            }

          };


          requestAnimationFrame(
            tick
          );

        }
      );


      countObserver.disconnect();

    },
    {
      threshold: .3
    }
  );


countObserver.observe(
  document.querySelector(".stats")
);


/* ======================================================
   LEARNING LENS
====================================================== */

const lensData = {

  jee: {

    label:
      "JEE / STUDY VIEW",

    title:
      "When a lecture gets difficult, turn it into a problem.",

    text:
      "Pause at each new idea. Write the physical situation, define the variables, then ask what quantity should be conserved or minimized.",

    list: [
      "Identify the system",
      "Sketch the particles",
      "Write the relation",
      "Test with a question"
    ]

  },


  neet: {

    label:
      "NEET / STUDY VIEW",

    title:
      "When a lecture gets dense, build one clean mental picture.",

    text:
      "Use a deep explanation to create a stable concept, then compress it into a small set of facts, patterns and application questions.",

    list: [
      "Name the phenomenon",
      "Draw the process",
      "Recall the key pattern",
      "Solve a quick question"
    ]

  },


  mit: {

    label:
      "MIT / STUDY VIEW",

    title:
      "When a model works, ask what assumptions made it work.",

    text:
      "Treat the lecture as a model-building exercise: define the system, identify assumptions, then examine what changes when one assumption is relaxed.",

    list: [
      "Define the system",
      "State assumptions",
      "Predict the consequence",
      "Check the model"
    ]

  }

};


$$(".lens").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".lens").forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        const data =
          lensData[
            button.dataset.lens
          ];


        const detail =
          $("#lensDetail");


        detail
          .querySelector(
            ".detail-index"
          )
          .textContent =
          data.label;


        detail
          .querySelector("h3")
          .textContent =
          data.title;


        detail
          .querySelector("p")
          .textContent =
          data.text;


        detail
          .querySelector(
            ".detail-list"
          )
          .innerHTML =
          data.list
            .map(
              (item,index) =>
                "<span>0" +
                (index + 1) +
                "&nbsp; " +
                item +
                "</span>"
            )
            .join("");

      }
    );

  }
);


/* ======================================================
   PERIODIC TABLE DATA
====================================================== */

const periods = [

  [
    "H", null, null, null, null, null,
    null, null, null, null, null, null,
    null, null, null, null, null, "He"
  ],

  [
    "Li", "Be", null, null, null, null,
    null, null, null, null, null, null,
    "B", "C", "N", "O", "F", "Ne"
  ],

  [
    "Na", "Mg", null, null, null, null,
    null, null, null, null, null, null,
    "Al", "Si", "P", "S", "Cl", "Ar"
  ],

  [
    "K", "Ca", "Sc", "Ti", "V", "Cr",
    "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
    "Ga", "Ge", "As", "Se", "Br", "Kr"
  ],

  [
    "Rb", "Sr", "Y", "Zr", "Nb", "Mo",
    "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
    "In", "Sn", "Sb", "Te", "I", "Xe"
  ],

  [
    "Cs", "Ba", "La", "Hf", "Ta", "W",
    "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "Tl", "Pb", "Bi", "Po", "At", "Rn"
  ],

  [
    "Fr", "Ra", "Ac", "Rf", "Db", "Sg",
    "Bh", "Hs", "Mt", "Ds", "Rg", "Cn",
    "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
  ]

];


const lanthanides = [
  "La", "Ce", "Pr", "Nd", "Pm",
  "Sm", "Eu", "Gd", "Tb", "Dy",
  "Ho", "Er", "Tm", "Yb", "Lu"
];


const actinides = [
  "Ac", "Th", "Pa", "U", "Np",
  "Pu", "Am", "Cm", "Bk", "Cf",
  "Es", "Fm", "Md", "No", "Lr"
];


const names = {

  H: "Hydrogen",
  He: "Helium",

  Li: "Lithium",
  Be: "Beryllium",
  B: "Boron",
  C: "Carbon",
  N: "Nitrogen",
  O: "Oxygen",
  F: "Fluorine",
  Ne: "Neon",

  Na: "Sodium",
  Mg: "Magnesium",
  Al: "Aluminium",
  Si: "Silicon",
  P: "Phosphorus",
  S: "Sulfur",
  Cl: "Chlorine",
  Ar: "Argon",

  K: "Potassium",
  Ca: "Calcium",
  Sc: "Scandium",
  Ti: "Titanium",
  V: "Vanadium",
  Cr: "Chromium",
  Mn: "Manganese",
  Fe: "Iron",
  Co: "Cobalt",
  Ni: "Nickel",
  Cu: "Copper",
  Zn: "Zinc",

  Ga: "Gallium",
  Ge: "Germanium",
  As: "Arsenic",
  Se: "Selenium",
  Br: "Bromine",
  Kr: "Krypton",

  Rb: "Rubidium",
  Sr: "Strontium",
  Y: "Yttrium",
  Zr: "Zirconium",
  Nb: "Niobium",
  Mo: "Molybdenum",
  Tc: "Technetium",
  Ru: "Ruthenium",
  Rh: "Rhodium",
  Pd: "Palladium",
  Ag: "Silver",
  Cd: "Cadmium",

  In: "Indium",
  Sn: "Tin",
  Sb: "Antimony",
  Te: "Tellurium",
  I: "Iodine",
  Xe: "Xenon",

  Cs: "Cesium",
  Ba: "Barium",
  La: "Lanthanum",
  Ce: "Cerium",
  Pr: "Praseodymium",
  Nd: "Neodymium",
  Pm: "Promethium",
  Sm: "Samarium",
  Eu: "Europium",
  Gd: "Gadolinium",
  Tb: "Terbium",
  Dy: "Dysprosium",
  Ho: "Holmium",
  Er: "Erbium",
  Tm: "Thulium",
  Yb: "Ytterbium",
  Lu: "Lutetium",

  Hf: "Hafnium",
  Ta: "Tantalum",
  W: "Tungsten",
  Re: "Rhenium",
  Os: "Osmium",
  Ir: "Iridium",
  Pt: "Platinum",
  Au: "Gold",
  Hg: "Mercury",

  Tl: "Thallium",
  Pb: "Lead",
  Bi: "Bismuth",
  Po: "Polonium",
  At: "Astatine",
  Rn: "Radon",

  Fr: "Francium",
  Ra: "Radium",
  Ac: "Actinium",
  Th: "Thorium",
  Pa: "Protactinium",
  U: "Uranium",
  Np: "Neptunium",
  Pu: "Plutonium",
  Am: "Americium",
  Cm: "Curium",
  Bk: "Berkelium",
  Cf: "Californium",
  Es: "Einsteinium",
  Fm: "Fermium",
  Md: "Mendelevium",
  No: "Nobelium",
  Lr: "Lawrencium",

  Rf: "Rutherfordium",
  Db: "Dubnium",
  Sg: "Seaborgium",
  Bh: "Bohrium",
  Hs: "Hassium",
  Mt: "Meitnerium",
  Ds: "Darmstadtium",
  Rg: "Roentgenium",
  Cn: "Copernicium",
  Nh: "Nihonium",
  Fl: "Flerovium",
  Mc: "Moscovium",
  Lv: "Livermorium",
  Ts: "Tennessine",
  Og: "Oganesson"

};


/* ======================================================
   ELEMENT CATEGORIES
====================================================== */

const alkali =
  new Set([
    "Li",
    "Na",
    "K",
    "Rb",
    "Cs",
    "Fr"
  ]);


const noble =
  new Set([
    "He",
    "Ne",
    "Ar",
    "Kr",
    "Xe",
    "Rn",
    "Og"
  ]);


const halogen =
  new Set([
    "F",
    "Cl",
    "Br",
    "I",
    "At",
    "Ts"
  ]);


const nonmetal =
  new Set([
    "H",
    "C",
    "N",
    "O",
    "P",
    "S",
    "Se"
  ]);


const transition =
  new Set(
    periods
      .slice(3)
      .flat()
      .filter(Boolean)
      .filter(
        (symbol,index) =>
          index < 20
      )
  );


function category(symbol) {

  if (
    alkali.has(symbol)
  ) {
    return "alkali";
  }

  if (
    noble.has(symbol)
  ) {
    return "noble";
  }

  if (
    halogen.has(symbol)
  ) {
    return "halogen";
  }

  if (
    nonmetal.has(symbol)
  ) {
    return "nonmetal";
  }

  if (
    transition.has(symbol)
  ) {
    return "transition";
  }

  return "other";
}


/* ======================================================
   POSITIONS
====================================================== */

const atomicSymbols =
  periods
    .flat()
    .filter(Boolean)
    .concat(
      lanthanides,
      actinides
    );


const positions = [];


periods.forEach(
  (row, periodIndex) => {

    row.forEach(
      (symbol, groupIndex) => {

        if (!symbol) {
          return;
        }

        positions.push({
          symbol,
          row:
            periodIndex + 1,
          col:
            groupIndex + 1
        });

      }
    );

  }
);


lanthanides.forEach(
  (symbol,index) => {

    positions.push({
      symbol,
      row: 9,
      col: index + 4
    });

  }
);


actinides.forEach(
  (symbol,index) => {

    positions.push({
      symbol,
      row: 10,
      col: index + 4
    });

  }
);


/* ======================================================
   ELEMENT STUDY TEXT
====================================================== */

const detailText = {

  alkali:
    "Compare how one extra electron changes reactivity down a group. Use this as a prompt for periodic trends rather than a memorisation table.",

  noble:
    "Use the column position to reason about valence structure and why these elements behave differently from neighbouring groups.",

  halogen:
    "Track what happens as the outer shell approaches a full configuration; compare size and reactivity down the group.",

  nonmetal:
    "Start with bonding and electron sharing. Compare neighbours to build a trend instead of memorising a list.",

  transition:
    "Ask how partially filled d orbitals relate to variable oxidation states, colour and coordination behaviour.",

  other:
    "Use position, neighbourhood and periodic trends as your first three clues."

};


/* ======================================================
   RENDER PERIODIC TABLE
====================================================== */

const periodic =
  $("#periodic");


function renderTable(
  filter = "all",
  search = ""
) {

  periodic.innerHTML =
    "";


  positions.forEach(
    item => {

      const type =
        category(
          item.symbol
        );


      const filterMatches =
        filter === "all" ||
        type === filter;


      const needle =
        search
          .trim()
          .toLowerCase();


      const searchMatches =
        !needle ||
        item.symbol
          .toLowerCase()
          .includes(
            needle
          ) ||
        (
          names[item.symbol] || ""
        )
          .toLowerCase()
          .includes(
            needle
          );


      const atomicNumber =
        atomicSymbols.indexOf(
          item.symbol
        ) + 1;


      const element =
        document.createElement(
          "button"
        );


      element.className =
        "element " +
        type +
        (
          filterMatches &&
          searchMatches
            ? ""
            : " dim"
        );


      element.style.gridColumn =
        item.col;

      element.style.gridRow =
        item.row;


      element.innerHTML = `

        <span class="z">
          ${atomicNumber}
        </span>

        <span class="sym">
          ${item.symbol}
        </span>

        <span class="name">
          ${names[item.symbol] || item.symbol}
        </span>

      `;


      element.addEventListener(
        "click",
        () => {

          selectElement(
            item.symbol,
            atomicNumber,
            item.row,
            item.col,
            type
          );

        }
      );


      periodic.appendChild(
        element
      );

    }
  );

}


/* ======================================================
   ELEMENT DETAIL
====================================================== */

function selectElement(
  symbol,
  atomicNumber,
  row,
  column,
  type
) {

  $$(".element").forEach(
    element => {

      element.classList.toggle(
        "selected",
        element
          .querySelector(
            ".sym"
          )
          ?.textContent ===
        symbol
      );

    }
  );


  $("#detailSymbol")
    .textContent =
    symbol;


  $("#detailNumber")
    .textContent =
    atomicNumber +
    " · " +
    (
      names[symbol] ||
      symbol
    ).toUpperCase();


  $("#detailName")
    .textContent =
    names[symbol] ||
    symbol;


  $("#detailGroup")
    .textContent =
    column;


  $("#detailPeriod")
    .textContent =
    row;


  $("#detailCategory")
    .textContent =
    type;


  $("#detailText")
    .textContent =
    detailText[type] ||
    detailText.other;


  const tag =
    type === "transition"
      ? "STRUCTURE + BONDING"
      : type === "noble"
        ? "PERIODIC TRENDS"
        : type;


  $("#detailTag")
    .textContent =
    "STUDY LENS · " +
    tag.toUpperCase();

}


/* INITIAL TABLE */

renderTable();


/* ======================================================
   FILTERS
====================================================== */

let activeFilter =
  "all";


$$(".filter").forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        $$(".filter").forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


        button.classList.add(
          "active"
        );


        activeFilter =
          button.dataset.filter;


        renderTable(
          activeFilter,
          $("#elementSearch")
            .value
        );

      }
    );

  }
);


/* SEARCH */

$("#elementSearch")
  .addEventListener(
    "input",
    event => {

      renderTable(
        activeFilter,
        event.target.value
      );

    }
  );


/* ======================================================
   HERO CANVAS
====================================================== */

const heroCanvas =
  $("#heroCanvas");

const heroCtx =
  heroCanvas.getContext(
    "2d"
  );


let heroParticles = [];

let heroRAF = 0;


function sizeCanvas(canvas) {

  const rect =
    canvas.getBoundingClientRect();


  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );


  canvas.width =
    rect.width * dpr;

  canvas.height =
    rect.height * dpr;


  const context =
    canvas.getContext(
      "2d"
    );


  context.setTransform(
    dpr,
    0,
    0,
    dpr,
    0,
    0
  );

}


function resetHero() {

  sizeCanvas(
    heroCanvas
  );


  heroParticles = [];


  const width =
    heroCanvas.clientWidth;

  const height =
    heroCanvas.clientHeight;


  for (
    let i = 0;
    i < 48;
    i++
  ) {

    heroParticles.push({

      x:
        Math.random() *
        width,

      y:
        Math.random() *
        height,

      vx:
        (
          Math.random() -
          .5
        ) * .3,

      vy:
        (
          Math.random() -
          .5
        ) * .3,

      r:
        1.2 +
        Math.random() * 2

    });

  }

}


function drawHero() {

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


  /* Grid */

  heroCtx.strokeStyle =
    "rgba(62,111,87,.08)";


  for (
    let x = 0;
    x < width;
    x += 44
  ) {

    heroCtx.beginPath();

    heroCtx.moveTo(
      x,
      0
    );

    heroCtx.lineTo(
      x,
      height
    );

    heroCtx.stroke();

  }


  for (
    let y = 0;
    y < height;
    y += 44
  ) {

    heroCtx.beginPath();

    heroCtx.moveTo(
      0,
      y
    );

    heroCtx.lineTo(
      width,
      y
    );

    heroCtx.stroke();

  }


  /* Central atom */

  const centerX =
    width / 2;

  const centerY =
    height / 2;


  for (
    const radius of [
      72,
      128,
      184
    ]
  ) {

    heroCtx.strokeStyle =
      "rgba(62,111,87,.18)";

    heroCtx.beginPath();

    heroCtx.arc(
      centerX,
      centerY,
      radius,
      0,
      Math.PI * 2
    );

    heroCtx.stroke();

  }


  heroCtx.fillStyle =
    "#3e6f57";


  heroCtx.beginPath();

  heroCtx.arc(
    centerX,
    centerY,
    25,
    0,
    Math.PI * 2
  );

  heroCtx.fill();


  /* Floating particles */

  heroParticles.forEach(
    particle => {

      particle.x +=
        particle.vx;

      particle.y +=
        particle.vy;


      if (
        particle.x < 0 ||
        particle.x > width
      ) {

        particle.vx *= -1;

      }


      if (
        particle.y < 0 ||
        particle.y > height
      ) {

        particle.vy *= -1;

      }


      heroCtx.fillStyle =
        "rgba(62,111,87,.45)";


      heroCtx.beginPath();

      heroCtx.arc(
        particle.x,
        particle.y,
        particle.r,
        0,
        Math.PI * 2
      );

      heroCtx.fill();

    }
  );


  /* Electrons */

  const time =
    performance.now() *
    .0003;


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const angle =
      time +
      i *
      (
        Math.PI * 2 / 5
      );


    const x =
      centerX +
      Math.cos(angle) *
      150;


    const y =
      centerY +
      Math.sin(angle) *
      90;


    heroCtx.fillStyle =
      "#b34f32";


    heroCtx.beginPath();

    heroCtx.arc(
      x,
      y,
      4,
      0,
      Math.PI * 2
    );

    heroCtx.fill();

  }


  heroRAF =
    requestAnimationFrame(
      drawHero
    );

}


/* ======================================================
   ELECTROCHEMISTRY VISUAL
====================================================== */

const modelCanvas =
  $("#modelCanvas");

const modelCtx =
  modelCanvas.getContext(
    "2d"
  );


let modelParticles = [];

let modelRAF = 0;

let modelRunning =
  true;


function resetModel() {

  sizeCanvas(
    modelCanvas
  );


  modelParticles =
    [];


  const width =
    modelCanvas.clientWidth;

  const height =
    modelCanvas.clientHeight;


  for (
    let i = 0;
    i < 34;
    i++
  ) {

    modelParticles.push({

      x:
        width * .25 +
        Math.random() *
        width * .5,

      y:
        height * .25 +
        Math.random() *
        height * .47,

      vx:
        (
          Math.random() -
          .5
        ) * .22,

      vy:
        (
          Math.random() -
          .5
        ) * .22,

      r:
        2

    });

  }

}


function drawModel() {

  const width =
    modelCanvas.clientWidth;

  const height =
    modelCanvas.clientHeight;


  modelCtx.clearRect(
    0,
    0,
    width,
    height
  );


  const left =
    width * .25;

  const right =
    width * .75;

  const top =
    height * .23;

  const bottom =
    height * .78;


  /* Electrodes */

  modelCtx.strokeStyle =
    "rgba(195,215,191,.36)";

  modelCtx.lineWidth =
    3;


  modelCtx.beginPath();

  modelCtx.moveTo(
    left,
    top
  );

  modelCtx.lineTo(
    left,
    bottom
  );

  modelCtx.stroke();


  modelCtx.beginPath();

  modelCtx.moveTo(
    right,
    top
  );

  modelCtx.lineTo(
    right,
    bottom
  );

  modelCtx.stroke();


  /* Electrolyte */

  modelCtx.fillStyle =
    "rgba(195,215,191,.025)";

  modelCtx.fillRect(
    left + 18,
    top,
    right - left - 36,
    bottom - top
  );


  /* External circuit */

  modelCtx.strokeStyle =
    "rgba(179,79,50,.45)";

  modelCtx.lineWidth =
    2;


  modelCtx.beginPath();

  modelCtx.moveTo(
    left,
    top
  );

  modelCtx.bezierCurveTo(
    left,
    height * .1,
    right,
    height * .1,
    right,
    top
  );

  modelCtx.stroke();


  /* Electrons */

  const time =
    performance.now() *
    .00025;


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const progress =
      (
        time +
        i / 5
      ) % 1;


    const x =
      left +
      (
        right - left
      ) *
      progress;


    const y =
      height * .105;


    modelCtx.fillStyle =
      "#c8b77c";


    modelCtx.beginPath();

    modelCtx.arc(
      x,
      y,
      4,
      0,
      Math.PI * 2
    );

    modelCtx.fill();

  }


  /* Ions */

  if (modelRunning) {

    modelParticles.forEach(
      particle => {

        particle.x +=
          particle.vx;

        particle.y +=
          particle.vy;


        if (
          particle.x <
          left + 25 ||
          particle.x >
          right - 25
        ) {

          particle.vx *= -1;

        }


        if (
          particle.y <
          top + 25 ||
          particle.y >
          bottom - 25
        ) {

          particle.vy *= -1;

        }


        modelCtx.fillStyle =
          "rgba(195,215,191,.75)";


        modelCtx.beginPath();

        modelCtx.arc(
          particle.x,
          particle.y,
          particle.r,
          0,
          Math.PI * 2
        );

        modelCtx.fill();

      }
    );

  }


  modelRAF =
    requestAnimationFrame(
      drawModel
    );

}


/* START */

function restartVisuals() {

  cancelAnimationFrame(
    heroRAF
  );

  cancelAnimationFrame(
    modelRAF
  );


  resetHero();

  resetModel();


  drawHero();

  drawModel();

}


window.addEventListener(
  "resize",
  restartVisuals
);


restartVisuals();


/* ======================================================
   PAUSE VISUAL
====================================================== */

$("#pauseVisual")
  .addEventListener(
    "click",
    () => {

      modelRunning =
        !modelRunning;


      $("#pauseVisual")
        .textContent =
        modelRunning
          ? "Pause visual"
          : "Play visual";


      $("#visualStatus")
        .textContent =
        modelRunning
          ? "RUNNING"
          : "PAUSED";

    }
  );


/* ======================================================
   ENQUIRY FORM
====================================================== */

const enquiryForm =
  $("#enquiryForm");


enquiryForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const name =
      $("#studentName")
        .value
        .trim();


    const phone =
      $("#studentPhone")
        .value
        .trim();


    const goal =
      $("#studentGoal")
        .value;


    if (
      !name ||
      !phone ||
      !goal
    ) {

      return;

    }


    const message =
      [
        "Chemistry Lab Enquiry",
        "",
        "Student: " + name,
        "Mobile: " + phone,
        "Goal: " + goal
      ].join("\n");


    const whatsappURL =
      "https://wa.me/?text=" +
      encodeURIComponent(
        message
      );


    $("#formMessage")
      .textContent =
      "Opening WhatsApp with a pre-filled enquiry…";


    window.open(
      whatsappURL,
      "_blank",
      "noopener"
    );

  }
);


/* ======================================================
   VISIBILITY PERFORMANCE
====================================================== */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      cancelAnimationFrame(
        heroRAF
      );

      cancelAnimationFrame(
        modelRAF
      );

    } else {

      restartVisuals();

    }

  }
);
/* ======================================================
   SADOWAY LECTURE LIBRARY
====================================================== */

const sadowayLectures = [

  {
    id: "kI7D2lkcF8E",
    number: "00",
    title: "Course Introduction",
    description:
      "Start here. Understand the structure and purpose of the course before the technical lectures.",
    tags: ["JEE", "NEET", "MIT"],
    mode: ["jee", "neet", "mit"],
    duration: "COURSE START"
  },

  {
    id: "vPQ9a_xIqRg",
    number: "01",
    title: "Lecture 1",
    description:
      "Begin the first principles journey and establish the chemistry framework.",
    tags: ["JEE", "NEET", "MIT"],
    mode: ["jee", "neet", "mit"],
    duration: "LECTURE 01"
  },

  {
    id: "h57hFAsLAGo",
    number: "02",
    title: "Lecture 2",
    description:
      "Build the conceptual foundation and connect chemistry with physical reasoning.",
    tags: ["JEE", "MIT"],
    mode: ["jee", "mit"],
    duration: "LECTURE 02"
  },

  {
    id: "Io_4ZckeQ1k",
    number: "03",
    title: "Lecture 3",
    description:
      "Continue the progression from atomic-level ideas toward measurable behaviour.",
    tags: ["JEE", "NEET", "MIT"],
    mode: ["jee", "neet", "mit"],
    duration: "LECTURE 03"
  },

  {
    id: "5l_S8WwBVnM",
    number: "04",
    title: "Lecture 4",
    description:
      "Useful for strengthening conceptual structure before moving into exam questions.",
    tags: ["JEE", "NEET"],
    mode: ["jee", "neet"],
    duration: "LECTURE 04"
  },

  {
    id: "K30HeE8fEq8",
    number: "05",
    title: "Lecture 5",
    description:
      "Go deeper into the physical picture instead of memorising isolated facts.",
    tags: ["JEE", "MIT"],
    mode: ["jee", "mit"],
    duration: "LECTURE 05"
  },

  {
    id: "giPLtjL0Mnc",
    number: "06",
    title: "Lecture 6",
    description:
      "A good session for deliberate note-making: system, variables, relation and consequence.",
    tags: ["JEE", "NEET", "MIT"],
    mode: ["jee", "neet", "mit"],
    duration: "LECTURE 06"
  },

  {
    id: "c_4dDw7iLn8",
    number: "07",
    title: "Lecture 7",
    description:
      "Use the deeper explanation, then compress it into the language of an Indian entrance exam.",
    tags: ["JEE", "NEET"],
    mode: ["jee", "neet"],
    duration: "LECTURE 07"
  },

  {
    id: "kZJgJCxcHZE",
    number: "08",
    title: "Lecture 8",
    description:
      "Look for patterns and relationships rather than treating each equation as a separate fact.",
    tags: ["JEE", "MIT"],
    mode: ["jee", "mit"],
    duration: "LECTURE 08"
  },

  {
    id: "up3zP2z81SE",
    number: "09",
    title: "Lecture 9",
    description:
      "A useful point to pause and make your own one-page conceptual map.",
    tags: ["JEE", "NEET", "MIT"],
    mode: ["jee", "neet", "mit"],
    duration: "LECTURE 09"
  },

  {
    id: "wyoFOdR64U8",
    number: "10",
    title: "Lecture 10",
    description:
      "Continue deeper into the course and connect the lecture back to your syllabus.",
    tags: ["JEE", "MIT"],
    mode: ["jee", "mit"],
    duration: "LECTURE 10"
  }

];


/* ======================================================
   RENDER LECTURES
====================================================== */

const lectureLibrary =
  document.querySelector(
    "#lectureLibrary"
  );


function renderSadowayLectures(
  mode = "all"
) {

  if (!lectureLibrary) {
    return;
  }


  lectureLibrary.innerHTML = "";


  const filtered =
    sadowayLectures.filter(
      lecture =>
        mode === "all" ||
        lecture.mode.includes(mode)
    );


  filtered.forEach(
    lecture => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "lecture-card";


      card.innerHTML = `

        <div
          class="lecture-thumb"
          data-video="${lecture.id}"
          data-number="${lecture.number}"
          data-title="${lecture.title}"
        >

          <img
            src="https://i.ytimg.com/vi/${lecture.id}/hqdefault.jpg"
            alt="${lecture.title}"
            loading="lazy"
          >

        </div>


        <div class="lecture-info">

          <div class="lecture-topline">

            <span>
              MIT 3.091SC
            </span>

            <span class="lecture-number">
              ${lecture.number}
            </span>

          </div>


          <h3>
            ${lecture.title}
          </h3>


          <p>
            ${lecture.description}
          </p>


          <div class="lecture-meta">

            ${lecture.tags
              .map(
                tag =>
                  `<span>${tag}</span>`
              )
              .join("")}

          </div>


          <div class="lecture-link">

            <a
              href="https://www.youtube.com/watch?v=${lecture.id}"
              target="_blank"
              rel="noopener"
            >
              WATCH VIDEO ↗
            </a>

            <span class="lecture-duration">
              ${lecture.duration}
            </span>

          </div>

        </div>

      `;


      lectureLibrary.appendChild(
        card
      );

    }
  );


  attachLecturePlayers();

}


/* ======================================================
   PLAY LECTURE IN FEATURED PLAYER
====================================================== */

function attachLecturePlayers() {

  document
    .querySelectorAll(
      ".lecture-thumb"
    )
    .forEach(
      thumbnail => {

        thumbnail.addEventListener(
          "click",
          () => {

            const id =
              thumbnail.dataset.video;

            const number =
              thumbnail.dataset.number;

            const title =
              thumbnail.dataset.title;


            const player =
              document.querySelector(
                "#featuredPlayer"
              );


            const heading =
              document.querySelector(
                "#featuredHeading"
              );


            const featuredTitle =
              document.querySelector(
                "#featuredTitle"
              );


            const featuredNumber =
              document.querySelector(
                "#featuredNumber"
              );


            const description =
              document.querySelector(
                "#featuredDescription"
              );


            const youtube =
              document.querySelector(
                "#featuredYoutube"
              );


            if (!player) {
              return;
            }


            player.innerHTML = `

              <iframe
                src="https://www.youtube.com/embed/${id}?rel=0"
                title="${title}"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share
                "
                allowfullscreen
              ></iframe>

            `;


            featuredTitle.textContent =
              title;

            featuredNumber.textContent =
              number;

            heading.textContent =
              title;


            description.textContent =
              "Selected from the original MIT 3.091SC lecture archive. Watch the lecture first, then map the concept to your JEE/NEET or university study plan.";


            youtube.href =
              "https://www.youtube.com/watch?v=" +
              id;


            player.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          }
        );

      }
    );

}


/* ======================================================
   INDIA STUDY MODE
====================================================== */

document
  .querySelectorAll(
    ".india-mode"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".india-mode"
            )
            .forEach(
              item =>
                item.classList.remove(
                  "active"
                )
            );


          button.classList.add(
            "active"
          );


          renderSadowayLectures(
            button.dataset.studyMode
          );

        }
      );

    }
  );


/* INITIAL */

renderSadowayLectures(
  "all"
);
