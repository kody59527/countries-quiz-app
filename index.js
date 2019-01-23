let questionNumber = 0;
let correctNumber = 0;

function createQuestion() {
    if (questionNumber < STORE.length) {
        return `<div class='question${questionNumber}'>
            <h2 class='questionTitle'>Question ${questionNumber}</h2>
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
                    <button type='button' class='submitButton'>Submit</button>
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
    $('.quizForm').html(createQuestion());
}

function nextQuestion() {
    $('.questionNumber').text(questionNumber + 1);
    questionNumber++;
}

function startNextQuestion() {
    nextQuestion();
    renderQuestion();
    selectedAnswer();
}

function startQuiz() {
    $('.homePage').on('click', event => {
        $('.homePage').remove();
        $('.quizForm').css('display', 'block');
        $('.questionNumber').text(1);
    });
}

function addCorrect() {
    correctNumber++;
}

function selectedAnswer() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        let userAnswer = selected.val();
        let selection = $('input:checked');
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

function renderCorrectNumber() {
    addCorrect();
    $('.correctNumber').text(correctNumber);
}

function userCorrectAnswer() {
    renderCorrectNumber();
    $('.quizForm').html(`<div class="correctResult">
        <div class="flag">
            <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
            <p>You are Correct!</p>
            <button type=button class="continue">Continue</button>
        </div>`);
}

function userIncorrectAnswer() {
    $('.quizForm').html(`<div class="correctResult">
    <div class="flag">
        <img src="${STORE[questionNumber].flagImg}" alt="${STORE[questionNumber].alt}"/></div>
        <p>Sorry, that's incorrect. The correct answer was ${correctAnswer}</p>
        <button type=button class="continue">Continue</button>
    </div>`);
}

function endResults() {
    $('.quizForm').html(`<div class="results correctResult>
        <p>You got ${correctNumber} right!</p>
        <p>Thank you for playing!</p>
        <button class="reset">Reset Quiz</button>/<div>`);
}

function startOver() {
    $('main').on('click', '.reset', function(e) {
        location.reload();
    });
}

function makeQuiz() {
    startQuiz();
    renderQuestion();
    selectedAnswer();
    startNextQuestion();
}

$(makeQuiz);