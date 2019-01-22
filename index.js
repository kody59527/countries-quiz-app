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

function addCorrect() {
    correctNumber++;
}

function nextQuestion() {
    if (questionNumber < STORE.length) {
        $('.questionNumber').text(questionNumber + 1);
        questionNumber++;
}


function endResults() {

}

function startOver() {

}