let questionNumber = 0;
let correctNumber = 0;
//creates the question from STORE
function createQuestion() {
    console.log('createQuestion ran');
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
        endResults();
        startOver();
        $('questionNumber').text(10)
    }
}

function renderQuestion() {
    console.log('renderQuestion ran');
    $('.quizForm').html(createQuestion());
}

function nextQuestion() {
    console.log('nextQuestion ran');
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}

function startNextQuestion() {
    console.log('startNextQuestion ran');
    $('main').on('click', '.continue', function(e) {
    nextQuestion();
    renderQuestion();
    selectedAnswer();
    });
}

function startQuiz() {
    console.log('startQuiz ran');
    $('.homePage').on('click', '.buttonStart', event => {
        $('.homePage').remove();
        $('.quizForm').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

function addCorrect() {
    console.log('addCorrect ran');
    correctNumber++;
}

function renderCorrectNumber() {
    console.log('renderCorrectNumber ran');
    addCorrect();
    $('.correctNumber').text(correctNumber);
}
//listens for user selection on question
function selectedAnswer() {
    console.log('selectedAnswer ran');
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
}

function userCorrectAnswer() {
    console.log('userCorrectAnswer ran');
    renderCorrectNumber();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div class="correctResult">
        <div class="flag">
            <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
            <p>You are Correct!</p>
            <button type=button class="continue">Continue</button>
        </div>`);
}

function userIncorrectAnswer() {
    console.log('userIncorrectAnswer ran');
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    $('.quizForm').html(`<div class="correctResult">
    <div class="flag">
        <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
        <p>Sorry, that's incorrect. The correct answer was ${correctAnswer}</p>
        <button type=button class="continue">Continue</button>
    </div>`);
}

function endResults() {
    console.log('endResults ran');
    $('.quizForm').html(`<div class="results correctResult">
        <p>You got ${correctNumber} right!</p>
        <p>Thank you for playing!</p>
        <button class="reset">Reset Quiz</button><div>`);
}

function startOver() {
    console.log('startOver ran');
    $('main').on('click', '.reset', function(e) {
        location.reload();
    });
}

function makeQuiz() {
    console.log('makeQuiz ran');
    startQuiz();
    renderQuestion();
    selectedAnswer();
    startNextQuestion();
}

$(makeQuiz);