const baseURL = 'https://deckofcardsapi.com/api/deck';
let deckId;

function getRandomRotation() {
    return Math.floor(Math.random() * 360);
}

function getRandomOffset() {
    return Math.floor(Math.random() * 10 - 5);
}

function updateRemaining(remaining) {
    document.getElementById('remaining').textContent = `Cards remaining: ${remaining}`;
}

async function initializeDeck() {
    try {
        const response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
        deckId = response.data.deck_id;
        updateRemaining(response.data.remaining);
        document.getElementById('draw-card').disabled = false;
    } catch (error) {
        console.error('Error initializing deck:', error);
    }
}

async function drawCard() {
    try {
        const response = await axios.get(`${baseURL}/${deckId}/draw/?count=1`);
        
        if (response.data.remaining === 0) {
            this.disabled = true;
            this.textContent = 'No cards left';
        }
        
        updateRemaining(response.data.remaining);
        
        const card = response.data.cards[0];
        const cardArea = document.getElementById('card-area');
        const cardElement = document.createElement('img');
        cardElement.src = card.image;
        cardElement.className = 'card';
        
        const rotation = getRandomRotation();
        const offsetX = getRandomOffset();
        const offsetY = getRandomOffset();
        
        cardElement.style.transform = `rotate(${rotation}deg) translate(${offsetX}px, ${offsetY}px)`;
        cardElement.style.zIndex = 52 - response.data.remaining;
        
        cardArea.appendChild(cardElement);
    } catch (error) {
        console.error('Error drawing card:', error);
    }
}


initializeDeck();
document.getElementById('draw-card').addEventListener('click', drawCard);