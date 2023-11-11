document.addEventListener('DOMContentLoaded', function() {
    const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json";
    const carousel = document.getElementById("carousel");
    let activeIndex = 0;
    let people = [];

    function createCardElement(person) {
        let div = document.createElement('div');
        div.classList.add("box");
        div.innerHTML = `
        <div class="grid-individual-card card-background-yellow">
        <!-- BEGIN Casey -->
        <div class="header-basic-title">${person.Rank}</div>
        <div class="header-profile-name">${person.FirstName} ${person.LastName}</div>
        <div class="header-hp">${person.HitPoints}HP</div>
        <div class="header-icon">☻</div>
        <img src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image} " alt="${person.FirstName} ${person.LastName}">
        <div class="description-below-image-empty"><!-- empty cell to position description correctly --></div>
        <div class="description-below-image"><span class="description-below-image-background">${person.Department} Type-${person.Type}, ${person.EducationLevel} in ${person.FieldofStudy}</span></div>
        <div class="description-below-image-empty"><!-- empty cell to position description correctly --></div>
        <div class="skill-cost">☻ ☻</div>
        <div class="skill-description skill-center"><span class="skill-name">${person.Attack1}</span></div>
        <div class="skill-damage">${person.Attack1Damage}</div>
        <div class="skill-cost">☻ ☻ ☻</div>
        <div class="skill-description"><span class="skill-name">${person.Attack2}</span> Flip a coin. If tails, ${person.FirstName} does 10 damage to themself.</div>
        <div class="skill-damage">${person.Attack2Damage}</div>
        <div class="weakness wrr-header">weakness</div>
        <div class="resistance wrr-header">resistance</div>
        <div class="retreat wrr-header">retreat cost</div>
        <div class="weakness wrr-value">☻</div>
        <div class="resistance wrr-value"></div>
        <div class="retreat wrr-value">☻ ☻</div>
        <div class="description-above-footer">
          <ul>
            <li class="description-above-footer-border">${person.FirstName} ${person.LastName}, known for the hashtag ${person.HashTag}. He has a resistance of ${person.Resistances}, but weak to ${person.Weaknesses} LV. ${person.Cost} &nbsp; ${person.Gender}</li>
          </ul>
        </div>
        <div class="copyright"><strong>● Tucker Brown</strong> ©2023, CIS367. <strong>${person.id}/59 ●</strong></div>
        `;
        return div;
    }

    async function addAllCards() {
        try {
            let response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            people = await response.json();

            people.forEach((person, index) => {
                let cardElement = createCardElement(person);
                if (index === activeIndex) {
                    cardElement.classList.add("active");
                }
                carousel.appendChild(cardElement);
            });

            updateCards();
        } catch (error) {
            console.error("Failed to fetch and create cards:", error);
            // Optionally, handle user-facing error reporting here
        }
    }

    function updateCards() {
        const boxes = document.querySelectorAll(".carousel .box");
        boxes.forEach((box, index) => {
            if (index === activeIndex) {
                box.style.transform = 'translateX(0)';
                box.classList.add("active");
            } else {
                box.style.transform = `translateX(${100 * (index - activeIndex)}%)`;
                box.classList.remove("active");
            }
        });
    }

    document.getElementById("prevButton").addEventListener("click", () => {
        if (activeIndex > 0) {
            activeIndex--;
            updateCards();
        }
    });

    document.getElementById("nextButton").addEventListener("click", () => {
        if (activeIndex < people.length - 1) {
            activeIndex++;
            updateCards();
        }
    });
    

    addAllCards();
});
