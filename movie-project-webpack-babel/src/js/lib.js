// private members: export yok
// const PI = 3.145926;

// // public members
// export function sum(...numbers) {
//     return numbers.reduce((number, total) => total + number);
// }

// export function mult(...numbers) {
//     return numbers.reduce((number, total) => total * number);
// }

// custom js es5: önüne export olmadan
// module.exports = {
//     sum,
//     mult
// }

// extracted as myLib on index js

export default class {
    constructor() {
        const PI = 3.145926;
    }

    // public members
    sum(...numbers) {
        return numbers.reduce((number, total) => total + number);
    }

    mult(...numbers) {
        return numbers.reduce((number, total) => total * number);
    }
}
