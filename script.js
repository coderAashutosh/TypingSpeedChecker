const typingText = document.querySelector('.typing-text p'),
    inputField = document.querySelector('.wrapper .input-field'),
    timeTag = document.querySelector('.time span b'),
    mistakeTag = document.querySelector('.Mistakes span'),
    wpmTag = document.querySelector('.wpm span'),
    cpmTag = document.querySelector('.cpm span'),
    tryAgainBtn = document.querySelector('button');

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    // Getting random number and it'll always be less than the paragraphs length.
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = ''
    // Getting random item from the paragraphs array, spliting all characters.
    // of it, adding each charaElacter inside span and then adding this span inside p tag.
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown', () => inputField.focus());
    typingText.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inputField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) { //Once timer is started, ot won't restart again on every key clicked
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        // timer = setInterval(initTimer, 1000);

        // If user hasn't entered any character or pressed backspace.
        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--;
            }
            characters[charIndex].classList.remove('correct', 'incorrect')
        }
        else {
            if (characters[charIndex].innerText === typedChar) {
                // If user's typed Char and shown Character matches,
                // Then add correct class else increment mistake and incorrect class.
                characters[charIndex].classList.add("correct")
            }
            else {
                mistakes++;
                characters[charIndex].classList.add('incorrect')
            }
            // Increment charIndex either user typed correct or incorrect Character.
            charIndex++;
        }
        characters.forEach(span => span.classList.remove('active'))

        characters[charIndex].classList.add('active');

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        // If wpm value is 0, empty or infinity then it'll be 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        mistakeTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;  // Cpm will not count mistakes.
    } else {
        inputField.value = ''
        clearInterval(timer)
    }
}

function initTimer() {
    // If timeLeft is greater than 0, then decrement timeLeft, else clear timer.
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    }
    else {
        clearInterval(timer)
    }
}

function reset() {
    randomParagraph();
    inputField.value = ''
    clearInterval(timer)
    timeLeft = maxTime,
        charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0
}

randomParagraph();
inputField.addEventListener('input', initTyping)
tryAgainBtn.addEventListener('click', reset)