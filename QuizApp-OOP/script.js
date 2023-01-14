const ui = new UI();

ui.btn_start.addEventListener("click", function () {
    ui.quiz_box.classList.add("active");
    startTimer(10);
    startTimerLine();
    ui.showQuestion(quiz.getQuestion());
    ui.showQuestionNumber(quiz.questionIndex + 1, quiz.questions.length);
    ui.next_btn.classList.remove("show");
})

ui.next_btn.addEventListener("click", function () {
    if (quiz.questions.length != quiz.questionIndex + 1) {
        quiz.questionIndex += 1;
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(10);
        startTimerLine();
        ui.showQuestion(quiz.getQuestion());
        ui.showQuestionNumber(quiz.questionIndex + 1, quiz.questions.length);
        ui.next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Quiz ended");
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.showScore(quiz.questions.length, quiz.trueAnswerNumber);
    }
})

ui.btn_quit.addEventListener("click", function () {
    window.location.reload();
})

ui.btn_replay.addEventListener("click", function () {
    quiz.questionIndex = 0;
    quiz.trueAnswerNumber = 0;
    ui.btn_start.click();
    ui.score_box.classList.remove("active");
})

function optionsSelected(option) {
    clearInterval(counter);
    clearInterval(counterLine);
    let choice = option.querySelector("span b").textContent;
    let question = quiz.getQuestion();
    console.log(counter)

    if (question.checkAnswer(choice.toLowerCase())) {
        quiz.trueAnswerNumber += 1;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for (let i = 0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled")
    }

    ui.next_btn.classList.add("show");

}

let counter;

function startTimer(second) {
    ui.time_second.textContent = second;
    // JS bug: without any let, var, const declaration, counter object will be global
    // var: function scope, let block scope
    counter = setInterval(timer, 1000);
    function timer() {
        second -= 1;
        ui.time_second.textContent = second;

        if (second === 0) {
            clearInterval(counter);
            console.log("Time up");
            let answer = quiz.getQuestion().trueAnswer;

            for (let option of ui.option_list.children) {
                if (option.querySelector("span b").textContent.toLowerCase() == answer) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                }
                for (let i = 0; i < ui.option_list.children.length; i++) {
                    ui.option_list.children[i].classList.add("disabled")
                }
            }

            ui.next_btn.classList.add("show")

        }
    }
}

let counterLine;

function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, 10);

    function timer() {
        line_width += 0.55;
        ui.time_line.style.width = line_width + "px";

        if (line_width >= 548.9) {
            clearInterval(counterLine);
        }
    }
}