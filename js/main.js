window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {

        preloader.style.opacity = "0";

        preloader.style.pointerEvents = "none";

        setTimeout(() => {
            preloader.remove();
        }, 500);

    }, 1500);

});

// =========================
// STORY GENERATOR
// =========================

const container = document.getElementById("story-container");

if (container && typeof chapters !== "undefined") {

    chapters.forEach((chapter, index) => {

        const reverse = index % 2 !== 0;

        const article = document.createElement("article");

        article.classList.add("chapter");
        article.classList.add("reveal");

        article.innerHTML = reverse ? `

        <div class="chapter-content">

            <span class="chapter-number">
                Chapter ${index + 1}
            </span>

            <h2>${chapter.title}</h2>

            <p>${chapter.text}</p>

        </div>

        <img src="${chapter.image}" alt="${chapter.title}">

        ` : `

        <img src="${chapter.image}" alt="${chapter.title}">

        <div class="chapter-content">

            <span class="chapter-number">
                Chapter ${index + 1}
            </span>

            <h2>${chapter.title}</h2>

            <p>${chapter.text}</p>

        </div>

        `;

        container.appendChild(article);

    });

}

// =========================
// SCROLL REVEAL
// =========================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(item => {
    observer.observe(item);
});


const pig = document.querySelector('.pig-scroll');

if(pig){

    window.addEventListener('scroll', () => {

        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            window.scrollY / maxScroll;

        const moveDistance =
            window.innerHeight - 1250;

        pig.style.transform =
            `translateY(${progress * moveDistance}px)`;

    });

}

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){

        navbar.classList.add("navbar-scrolled");

    }else{

        navbar.classList.remove("navbar-scrolled");

    }

});

document.getElementById("backToTop")
.addEventListener("click", () => {

    console.log("CLICK");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// =========================
// QUIZ
// =========================

const quizData = [

{
question: "Who does Napoleon represent?",
answers: [
"Joseph Stalin",
"Karl Marx",
"Winston Churchill",
"Tsar Nicholas II"
],
correct: 0
},

{
question: "Who does Snowball represent?",
answers: [
"Leon Trotsky",
"Lenin",
"Churchill",
"Roosevelt"
],
correct: 0
},

{
question: "What does Boxer symbolize?",
answers: [
"The working class",
"The aristocracy",
"The military",
"The government"
],
correct: 0
},

{
question: "Who is the main propagandist on the farm?",
answers: [
"Napoleon",
"Boxer",
"Squealer",
"Benjamin"
],
correct: 2
},

{
question: "What is the primary theme of Animal Farm?",
answers: [
"Friendship",
"Adventure",
"The corruption of power",
"Technology"
],
correct: 2
},

{
question: "What does the Windmill mainly symbolize?",
answers: [
"Military power",
"Political promises",
"Religion",
"Nature"
],
correct: 1
},

{
question: "Why are the Seven Commandments important?",
answers: [
"They teach farming",
"They show how truth can be manipulated",
"They explain economics",
"They describe military strategy"
],
correct: 1
},

{
question: "Who originally inspires the revolution?",
answers: [
"Napoleon",
"Snowball",
"Old Major",
"Squealer"
],
correct: 2
},

{
question: "What happens to Snowball?",
answers: [
"He becomes leader",
"He leaves voluntarily",
"He is expelled from the farm",
"He dies during the rebellion"
],
correct: 2
},

{
question: "What do the dogs represent?",
answers: [
"The working class",
"Secret police and repression",
"Foreign governments",
"The media"
],
correct: 1
},

{
question: "Which animal is known for the phrase 'I will work harder'?",
answers: [
"Benjamin",
"Clover",
"Boxer",
"Napoleon"
],
correct: 2
},

{
question: "What is Orwell criticizing through the novel?",
answers: [
"The Industrial Revolution",
"Totalitarian governments",
"Ancient monarchies",
"Capitalism only"
],
correct: 1
},

{
question: "What eventually happens to Boxer?",
answers: [
"He becomes a leader",
"He retires peacefully",
"He is betrayed and sold",
"He leaves the farm"
],
correct: 2
},

{
question: "Why does Squealer constantly change information?",
answers: [
"To entertain the animals",
"To preserve traditions",
"To manipulate public opinion",
"To teach history"
],
correct: 2
},

{
question: "What lesson does Animal Farm ultimately teach?",
answers: [
"Power should never exist",
"Revolutions always fail",
"Citizens must remain critical and vigilant",
"Animals make poor leaders"
],
correct: 2
}

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

const progressBar =
document.getElementById("progress-bar");

const counter =
document.getElementById("question-counter");

function loadQuestion(){

    answered = false;

    const q = quizData[currentQuestion];

    questionEl.textContent = q.question;

    answersEl.innerHTML = "";

    // Progress Bar
    progressBar.style.width =
    `${((currentQuestion + 1) / quizData.length) * 100}%`;

    counter.textContent =
    `Question ${currentQuestion + 1} of ${quizData.length}`;

    q.answers.forEach((answer,index)=>{

        const btn = document.createElement("button");

        btn.classList.add("answer-btn");

        btn.textContent = answer;

        btn.addEventListener("click",()=>{

            if(answered) return;

            answered = true;

            if(index === q.correct){

                btn.classList.add("correct");

                score++;

            }else{

                btn.classList.add("wrong");

            }

            document
            .querySelectorAll(".answer-btn")
            .forEach((b,i)=>{

                b.disabled = true;

                if(i === q.correct){

                    b.classList.add("correct");
                }

            });

        });

        answersEl.appendChild(btn);

    });

}

nextBtn.addEventListener("click",()=>{

    if(!answered) return;

    currentQuestion++;

    if(currentQuestion < quizData.length){

        loadQuestion();

    }else{

        let rank = "";
        let message = "";

        if(score <= 5){

            rank = "🐑 Farm Visitor";
            message =
            "You may want to revisit the story.";

        }else if(score <= 10){

            rank = "🐎 Revolutionary";
            message =
            "You understand the core themes of Animal Farm.";

        }else{

            rank = "🐷 Orwell Expert";
            message =
            "Excellent understanding of the allegories and symbolism.";

        }

        questionEl.textContent = "Quiz Completed!";

        answersEl.innerHTML = "";

        resultEl.innerHTML = `
            <h2>${rank}</h2>
            <p>${message}</p>
            <h3>${score} / ${quizData.length}</h3>
        `;

        nextBtn.style.display = "none";

        progressBar.style.width = "100%";

        counter.textContent =
        `Finished - Score: ${score}/${quizData.length}`;
    }

});

loadQuestion();

// =========================
// MUSIC PLAYER
// =========================

const music =
document.getElementById("bg-music");

const musicBtn =
document.getElementById("music-toggle");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if(!isPlaying){

        music.play();

        musicBtn.textContent =
        "🔇 Pause Music";

        isPlaying = true;

    }else{

        music.pause();

        musicBtn.textContent =
        "🎵 Play Music";

        isPlaying = false;

    }

});
