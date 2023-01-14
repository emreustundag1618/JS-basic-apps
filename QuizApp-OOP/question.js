// OOP
/* Object sample
let question = {
    text: "Which one is a JS package management application?",
    choices: {
        a: "Node.js",
        b: "TypeScript",
        c: "Npm"
    },
    trueAnswer: "c",
    checkAnswer: function(choice) {
        return choice === this.trueAnswer
    }
}


console.log(question.text)
console.log(question.checkAnswer("c"))
 */

// in ES5: constructor, not class. new instance something like a function call
function Question(text, choices, trueAnswer) {
        this.text = text,
        this.choices = choices,
        this.trueAnswer = trueAnswer
}
// look at Question object's prototype part on browser's console
Question.prototype.checkAnswer = function (choice) {
    return choice === this.trueAnswer
}


let question1 = new Question("Which one is a JS package management application?", { a: "Node.js", b: "TypeScript", c: "Npm" }, "c")
 console.log(question1)
/*console.log(question1.text)
console.log(question1.choices)
console.log(question1.choices.b)
*/

let question2 = new Question("Which one is the most useful language for data science?", { a: "Python", b: "Java", c: "C#" }, "a")
/* 
console.log(question2)
console.log(question2.text)
console.log(question2.choices)
console.log(question2.trueAnswer)
 */

const questions = [
    new Question("Which one is a JS package management application?", { a: "Node.js", b: "TypeScript", c: "Npm", d: "Nuget" }, "c"),
    new Question("Which one is the most useful language for data science?", { a: "Python", b: "Java", c: "C#" }, "a"),
    new Question("Which JS library or framework is for backend?", { a: "Node.js", b: "Typescript", c: "Angular", d: "React" }, "a")
]
/*
console.log(questions)
console.log(questions[1].checkAnswer("a"))
*/
// method using from prototype. it's the same as
// console.log(question2.checkAnswer("a"))

