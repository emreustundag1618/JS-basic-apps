function UI() {
    this.btn_start = document.querySelector(".btn_start"),
        this.next_btn = document.querySelector(".next_btn"),
        this.quiz_box = document.querySelector(".quiz_box"),
        this.btn_replay = document.querySelector(".btn-replay"),
        this.btn_quit = document.querySelector(".btn-quit"),
        this.question_text = document.querySelector(".question_text"),
        this.option_list = document.querySelector(".option_list"),
        this.correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>',
        this.incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>',
        this.score_box = document.querySelector(".score_box"),
        this.score_text = this.score_box.querySelector(".score_text"),
        this.time_text = document.querySelector(".time_text"),
        this.time_second = document.querySelector(".time_second"),
        this.time_line = document.querySelector(".time_line")
}

UI.prototype.showQuestion = function (question) {
    let questionElement = `<span>${question.text}</span>`;
    let options = "";
    for (let choice in question.choices) {
        options +=
            `<div class="option">
                    <span><b>${choice.toUpperCase()}</b>. ${question.choices[choice]}</span>
                </div>`;
    }

    this.question_text.innerHTML = questionElement;
    this.option_list.innerHTML = options;

    const optionList = this.option_list.querySelectorAll(".option");

    for (let opt of optionList) {
        opt.setAttribute("onclick", "optionsSelected(this)")
    }

}

UI.prototype.showQuestionNumber = function (current, total) {
    let tag = `<span class="badge bg-warning">${current} / ${total}</span>`;
    document.querySelector(".quiz_box .question-index").innerHTML = tag;
}

UI.prototype.showScore = function (total, trueAnswer) {
    let tag = `${trueAnswer} true answers among ${total} questions`;
    this.score_text.innerHTML = tag;
}
