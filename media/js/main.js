const questions = [
    {
        q: 'Вопрос',
        answers: [
            'image1.png',
            'image2.jpg',
            'image3.jpg',
            'image4.jpg',
        ],
        correct: 2,
        true: 'Правильно',
        false: 'Неправильно'
    },
    {
        q: 'Вопрос 2',
        answers: [
            'image2.jpg',
            'image1.png',
            'image4.jpg',
            'image3.jpg',
        ],
        correct: 2,
        true: 'Правильно',
        false: 'Неправильно'
    },
]

let total = parseInt(sessionStorage.getItem('total') || 0, 10);
let current = parseInt(sessionStorage.getItem('current') || 0, 10) - 1;
const results = [
    'Совсем ничего не знаешь',
    'Что-то знаешь',
    'Все знаешь'
]
const images = document.querySelector('.images')

function handleAnswer() {
    const index = [...this.parentElement.children].indexOf(this);
    if (index === questions[current].correct) {
        this.classList.add('image-true')
        total += 1
        sessionStorage.setItem('total', total)
        document.querySelector('.text p').innerText = questions[current].true
    } else {
        this.classList.add('image-false')

        document.querySelector('.text p').innerText = questions[current].false
    }
    images.style.pointerEvents = 'none'
    document.querySelector('.next').style.display = 'block'
}

function handleNext() {
    current += 1
    sessionStorage.setItem('current', current)
    if (current === questions.length) return endTest()
    document.querySelector('.text p').innerText = questions[current].q
    document.querySelector('.image-true, .image-false')?.classList?.remove('image-true', 'image-false')
    images.style.pointerEvents = ''
    document.querySelector('.next').style.display = 'none'
    for (let i = 0; i < questions[current].answers.length; i += 1) {
        document.querySelectorAll('.image img')[i].src = `/media/images/${questions[current].answers[i]}`
    }
    document.querySelector('.nav-item__active')?.classList?.remove('nav-item__active')
    document.querySelectorAll('.nav-item')[current].classList.add('nav-item__active')
}

function endTest() {
    images.style.display = 'none'
    document.querySelector('.next').style.display = 'none'
    document.querySelector('.text').style.margin = 'auto'
    document.querySelector('.text p').innerText = results[total]
}

function init() {
    for (const item of document.querySelectorAll('.image')) {
        item.addEventListener('click', handleAnswer)
    }
    
    document.querySelector('.next').addEventListener('click', handleNext)
    document.querySelector('.nav').innerHTML = '<a class="nav-item" href="#">Вопрос №</a>'.repeat(questions.length)
    handleNext()
}

init()