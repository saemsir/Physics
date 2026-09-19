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
