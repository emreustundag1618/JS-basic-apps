const container = document.querySelector('.container');
const count = document.querySelector("#count");
const price = document.querySelector("#price");
const select = document.querySelector("#movie");
const seats = container.querySelectorAll(".seat:not(.reserved)");

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        //toggle: varsa silsin yoksa eklesin
        e.target.classList.toggle("selected");
        calculateTotal();

    }
});

select.addEventListener("change", function (e) {
    calculateTotal();
})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = []
    const seatsArr = []

    selectedSeats.forEach((seat) => {
        selectedSeatsArr.push(seat);
    })

    seats.forEach((seat) => {
        seatsArr.push(seat);
    })

    // [1,3,4,5,22] gibi indexler local storage için
    let selectedSeatIndexes = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat);
    })

    console.log(selectedSeatIndexes)


    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    price.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexes);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index)>-1) {
                seat.classList.add("selected")
            }
        })
    }

    if (selectedMovieIndex !== null) {
        select.selectedIndex = selectedMovieIndex;
    }

}

function saveToLocalStorage(indexes) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexes));
    localStorage.setItem("selectedMovieIndex", select.selectedIndex)
}
