const openLetter = document.getElementById("openLetter");
const letter = document.getElementById("letter");

const playButton = document.getElementById("playbutton");
const music = document.getElementById("music");

const progress = document.getElementById("progress");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("currentTime");

const visualizer = document.getElementById("visualizer");

let heartInterval = null;



const images = [
    "images/download.gif",
    "images/download(1).gif",
    "images/StickeACHTUNGFind&hareonGIPHY.gif",
    "images/download.gif",
    "images/download(1).gif",
    "images/StickeACHTUNGFind&hareonGIPHY.gif",
    "images/download.gif",
    "images/download(1).gif",
    "images/StickeACHTUNGFind&hareonGIPHY.gif",
    "images/download.gif",
    "images/download(1).gif",
    "images/StickeACHTUNGFind&hareonGIPHY.gif"
];

openLetter.addEventListener("click", function(event) {

    event.stopPropagation();

    letter.classList.add("show");

    for (let i = 0; i < 5; i++) {
        createHeart();
    }

    images.forEach(function(imagePath) {

        const image = document.createElement("img");

        image.src = imagePath;
        image.classList.add("flying-image");


        const rect = openLetter.getBoundingClientRect();

        image.style.left =
            rect.left + rect.width / 2 - 100 + "px";

        image.style.top =
            rect.top + rect.height / 2 - 100 + "px";


        const moveX =
            (Math.random() - 0.5) * 800;

        const moveY =
            (Math.random() - 0.5) * 800;


        image.style.setProperty(
            "--move-x",
            moveX + "px"
        );

        image.style.setProperty(
            "--move-y",
            moveY + "px"
        );


        document.body.appendChild(image);


        setTimeout(function() {
            image.remove();
        }, 5000);

    });

});




playButton.addEventListener("click", function() {

    if (music.paused) {

        music.play();
        playButton.textContent = "⏸";

        startHearts();

         visualizer.classList.add("playing");

         
    } else {

        music.pause();
        playButton.textContent = "▶";

       visualizer.classList.remove("playing");
    }

});


music.addEventListener("loadedmetadata", function() {

    progress.max = music.duration;

    duration.textContent = formatTime(music.duration);

});


music.addEventListener("timeupdate", function() {

    progress.value = music.currentTime;

    currentTime.textContent =
        formatTime(music.currentTime);

});


progress.addEventListener("input", function() {

    music.currentTime = progress.value;

});


music.addEventListener("ended", function() {

    playButton.textContent = "▶";

    progress.value = 0;

    currentTime.textContent = "0:00";

});


function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return minutes + ":" + String(seconds).padStart(2, "0");

}

document.addEventListener("click", function(event) {

    if (letter.classList.contains("show")) {

        if (!letter.contains(event.target)) {
            letter.classList.remove("show");
        }

    }

});

function createHeart() {
    const heart = document.createElement("div");

    heart.classList.add("heart");
    heart.textContent = "♥";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    document.body.appendChild(heart);

    setTimeout(function() {
        heart.remove();
    }, 5000);
}

function startHearts() {

    if (heartInterval === null) {

        heartInterval = setInterval(function() {
            createHeart();
        }, 500);

    }
}

music.addEventListener("ended", function() {

    playButton.textContent = "▶";

    progress.value = 0;

    currentTime.textContent = "0:00";

    visualizer.classList.remove("playing");

});