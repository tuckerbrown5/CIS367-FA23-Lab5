const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json";

function createCardHTML(person) {
    return `
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
    `
    ;
}

async function addAllCards() {
  let response = await fetch(API_URL);
  let people = await response.json();

  people.forEach(person => {
      let cardContainerDiv = document.createElement('div');
      cardContainerDiv.classList.add('card-container');

      let cardDiv = document.createElement('div');
      cardDiv.classList.add('grid-individual-card', 'card-background-yellow');
    
      cardDiv.innerHTML = createCardHTML(person); // Use the function to create HTML

      let buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('card-actions');
      buttonsDiv.innerHTML = `
          <button class="like-button">Like</button>
          <button class="share-button">Share</button>
          <button class="dislike-button">Dislike</button>
      `;

      // Append the card and buttons to the container div
      cardContainerDiv.appendChild(cardDiv);
      cardContainerDiv.appendChild(buttonsDiv);

      // Event listeners for the buttons
      buttonsDiv.querySelector('.like-button').addEventListener('click', function() {
          this.classList.toggle('liked');
      });
    
      buttonsDiv.querySelector('.dislike-button').addEventListener('click', function() {
          this.classList.toggle('disliked');
      });

      buttonsDiv.querySelector('.share-button').addEventListener('click', function() {
          let cardToShare = this.closest('.card-container');
          html2canvas(cardToShare, { logging: true, letterRendering: 1, useCORS: true }).then(canvas => {
              let image = canvas.toDataURL("image/png");
              let link = document.createElement('a');
              link.download = `${person.FirstName}_${person.LastName}_card.png`;
              link.href = image;
              link.click();
          });
      });

      // Append the card container div to the main container in the DOM
      document.getElementById('cardContainer').appendChild(cardContainerDiv);
  });
}

// Ensures that the script runs after the entire DOM is fully loaded
window.onload = addAllCards;