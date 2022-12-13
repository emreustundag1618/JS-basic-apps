const carModels = [
    {
        name: "Ferrari",
        image: "./img/0x0.jpg",
        link: "https://www.forbes.com/sites/jimgorzelany/2019/07/23/here-are-the-coolest-new-cars-for-2020/?sh=d6c4fc311be8"
    },
    {
        name: "Chevrolet Beyaz",
        image: "./img/2020_Chevrolet_Corvette_Stingray_3LT__EVOX.jpg",
        link: "https://www.google.com/search?q=car&rlz=1C1YTUH_trTR1010TR1010&sxsrf=ALiCzsby0F_64RssbqOsnovAqfPL5GAvbg:1670913995931&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjIy7XZ__X7AhViQfEDHbjCDL0Q_AUoAXoECAEQAw&biw=670&bih=896&dpr=1.3#imgrc=z-d-hD889Ad7WM&imgdii=kybFMGjSQ0d8gM"
    },
    {
        name: "Chevrolet Turunce",
        image: "./img/2022-Chevrolet-Corvette-Stingray-Amplify-Organge.jpg",
        link: "https://www.google.com/search?q=car&rlz=1C1YTUH_trTR1010TR1010&sxsrf=ALiCzsby0F_64RssbqOsnovAqfPL5GAvbg:1670913995931&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjIy7XZ__X7AhViQfEDHbjCDL0Q_AUoAXoECAEQAw&biw=670&bih=896&dpr=1.3#imgrc=eim-Th3Pk8RLbM&imgdii=jr36jC7lCDdT4M"
    },
    {
        name: "Siyah Lüks",
        image: "./img/images (1).jpg",
        link: "https://www.google.com/search?q=car&rlz=1C1YTUH_trTR1010TR1010&sxsrf=ALiCzsby0F_64RssbqOsnovAqfPL5GAvbg:1670913995931&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjIy7XZ__X7AhViQfEDHbjCDL0Q_AUoAXoECAEQAw&biw=670&bih=896&dpr=1.3#imgrc=yvb4iwY31ivjYM&imgdii=CM3O2kY5p3cmWM"
    },
    {
        name: "Gri Lüks",
        image: "./img/images.jpg",
        link: "https://www.kbb.com/convertible/"
    },
];

carModels.forEach(car => {
    console.log(car.link)
});


let startSlide = 2;
let index = startSlide;
let slideCount = carModels.length;
let interval;

const settings = {
    duration: '2000',
    random: false
}


function init(settings){

    let previous;

    interval = setInterval(function(){

        if(settings.random) {
            //random index
            do{
                index = Math.floor(Math.random() * slideCount);
                // console.log("Previous İndex:",previous)
                // console.log("Current İndex:",index)
            }while(index == previous)  // index previous ile aynı olduğu sürece yeni index üret
            previous = index;
            
        } else {
            //artan index yani sıralı
            if(slideCount == index + 1) {
                index = 0;
            } else {
                index++;
            }
        };
        
        // console.log(index)
        displaySlide(index);
    
    }, settings.duration)
}

init(settings);

displaySlide(index);

// slider arrow buttons events
document.querySelector(".fa-circle-arrow-left").addEventListener("click", () => {
    index -= 1
    displaySlide(index);
})

document.querySelector(".fa-circle-arrow-right").addEventListener("click", () => {
    index += 1
    displaySlide(index);
    console.log(index)
})

// display car models to slider
function displaySlide(i) {

    index = i

    if(index<0) {
        index = slideCount - 1
    }
    if(index>4) {
        index = 0
    }

    document.querySelector(".card-img-top").setAttribute("src", carModels[index].image);
    document.querySelector(".card-title").textContent = carModels[index].name;
    document.querySelector(".card-body>a").setAttribute("href", carModels[index].link);
}

document.querySelector(".card").addEventListener("mouseenter", function(){
    clearInterval(interval);
})
document.querySelector(".card").addEventListener("mouseleave", function(){
    init(settings);
})



