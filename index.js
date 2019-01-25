let questionNumber = 0;
let correctNumber = 0;

function highlightButton() {
    console.log('highlightButton ran')
    $('label.answerChoice').on('click', function() {
        $('label.answerChoice').addClass('.selectedButton');
    });
}

//creates the question from STORE
function createQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class='question${questionNumber}'>
            <h2 class='questionTitle'>${STORE[questionNumber].question}</h2>
            <form>
                <fieldset>
                    <label class='answerChoice'>
                        <input type='radio' value='${STORE[questionNumber].choices[0]}' name='choice' required>
                        <span>${STORE[questionNumber].choices[0]}</span>
                    </label>
                    <label class='answerChoice'>
                        <input type='radio' value='${STORE[questionNumber].choices[1]}' name='choice' required>
                        <span>${STORE[questionNumber].choices[1]}</span>
                    </label>
                    <label class='answerChoice'>
                        <input type='radio' value='${STORE[questionNumber].choices[2]}' name='choice' required>
                        <span>${STORE[questionNumber].choices[2]}</span>
                    </label>
                    <label class='answerChoice'>
                        <input type='radio' value='${STORE[questionNumber].choices[3]}' name='choice' required>
                        <span>${STORE[questionNumber].choices[3]}</span>
                    </label>
                    <input type='submit' class='submitButton' value='Submit'>
                </fieldset>
            </form>
        </div>`;
    } else {
        startOver();
        endResults();
        $('questionNumber').text(questionNumber);
    }
    console.log(`'createQuestion ran' ${questionNumber}`);
}

function renderQuestion() {
    $('.quizForm').html(createQuestion());
    console.log(`'renderQuestion ran' ${questionNumber}`);
}

function nextQuestion() {
        questionNumber++;
        if (questionNumber != 10) {
            $('.questionNumber').text(questionNumber+1);
        } else {
            $('.questionNumber').text(questionNumber);
        }
        console.log(`'nextQuestion ran' ${questionNumber}`);
}

function startNextQuestion() {
    $('main').on('click', '.continue', function(e) {
    nextQuestion();
    renderQuestion();
    selectedAnswer();
    });
    console.log(`'startNextQuestion ran' ${questionNumber}`);
}

function startQuiz() {
    $('.homePage').on('click', '.buttonStart', event => {
        $('.homePage').remove();
        $('.quizForm').css('display', 'block');
        $('.questionNumber').text(questionNumber+1);
        //$('.questionNumber').text(1);
    });
    console.log(`'startQuiz ran' ${questionNumber}`);
}

function addCorrect() {
    correctNumber++;
    console.log(`'addCorrect ran' ${questionNumber}`);
}

function renderCorrectNumber() {
    addCorrect();
    $('.correctNumber').text(correctNumber);
    console.log(`'renderCorrectNumber ran' ${questionNumber}`);
}
//listens for user selection on question
function selectedAnswer() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        let selected = $('input:checked');
        let userAnswer = selected.val();
        let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
        if (userAnswer === correctAnswer) {
            selected.parent().addClass('correct');
            userCorrectAnswer();
        } else {
            selected.parent().addClass('incorrect');
            userIncorrectAnswer();
        }
    });
    console.log(`'selectedAnswer ran' ${questionNumber}`);
}

function userCorrectAnswer() {
    renderCorrectNumber();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div class="correctResult">
        <div class="flag">
            <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
            <p class="answerResponse">${correctAnswer} is correct!</p>
            <button type=button class="continue">Continue</button>
        </div>`);
        console.log(`'userCorrectAnswer ran' ${questionNumber}`);
}

function userIncorrectAnswer() {
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div class="correctResult">
    <div class="flag">
        <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
        <p class="answerResponse">Sorry, that's incorrect. The correct answer was ${correctAnswer}.</p>
        <button type=button class="continue">Continue</button>
    </div>`);
    console.log(`'userIncorrectAnswer ran' ${questionNumber}`);
}

function endResults() {
    if (correctNumber <= 5) {
        $('.quizForm').html(`<div class="results correctResult">
            <p>You got ${correctNumber} right out of 10.</p>
            <p>Ouch! Mulligan?</p>
            <button class="reset">Reset Quiz</button>
        <div>`);
    } else if (correctNumber > 5 && correctNumber <= 9) {
        $('.quizForm').html(`<div class="results correctResult">
            <p>You got ${correctNumber} right out of 10.</p>
            <p>Not bad at all!</p>
            <button class="reset">Reset Quiz</button>
        <div>`);
    } else {
        $('.quizForm').html(`<div class="results correctResult">
            <p>You got ${correctNumber} right out of 10.</p>
            <p>Amazing! Perfect score.</p>
            <button class="reset">Reset Quiz</button>
        <div>`);
    }
    console.log(`'endResults ran' ${questionNumber}`);
}

function startOver() {
    $('main').on('click', '.reset', function(e) {
        location.reload();
    });
    console.log(`'startOver ran' ${questionNumber}`);
}

function makeQuiz() {
    startQuiz();
    renderQuestion();
    selectedAnswer();
    startNextQuestion();
    console.log(`'makeQuiz ran' ${questionNumber}`);
}

$(makeQuiz);