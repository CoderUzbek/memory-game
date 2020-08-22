// Shoxrux Rustamaliyev
// 2020 Avg 22

const CARDS_DIV = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard_div, secondCard_div;

function flipCard() {
    if (lockBoard || this == firstCard_div) return;
    this.classList.toggle("flip");
    
    if (!hasFlippedCard) {
        // Birinchi bosish bo'lsa, uni keyingi safar uchun true bilan belgilaymiz
        hasFlippedCard = true;
        firstCard_div = this;

        return
    }

    // Ikkinchi bosish bo'lsa, uni keyingi safar uchun false bilan belgilaymiz
    hasFlippedCard = false;
    secondCard_div = this;

    checkForMatch()
}


function checkForMatch() {
    let isMatch = firstCard_div.dataset.framework === secondCard_div.dataset.framework;
    
    // To'g'riligiga tekshirib, Hodisani yoki Klassni o'chiramiz
    isMatch ? disableCards() : unflipCards()
}


function disableCards() {
    firstCard_div.removeEventListener("click", flipCard);
    secondCard_div.removeEventListener("click", flipCard);
}


function unflipCards() {
    lockBoard = true;

    setTimeout( _ => {
        firstCard_div.classList.remove("flip");
        secondCard_div.classList.remove("flip");
        
        resetBoard()
    }, 1000);
}


function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard_div = secondCard_div = null
}


(function shuffle() {
    CARDS_DIV.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos
    })
})();


function main() {
    CARDS_DIV.forEach(element => {
        element.addEventListener("click", flipCard)
    });
}

main()