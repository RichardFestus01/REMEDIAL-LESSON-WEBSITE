const startEnglishButton = document.getElementById('start-english-btn');
const startMathButton = document.getElementById('start-math-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const introContainerElement = document.getElementById('intro-container');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const nameInput = document.getElementById('name-input');
const questionCounterElement = document.getElementById('question-counter');
const timerElement = document.getElementById('timer');

let activeQuestions, shuffledQuestions, currentQuestionIndex, userAnswers;
let score = 0;
let timer;
let timeRemaining = 1800; // 30 minutes in seconds

const englishQuestions = [
    // Nouns
    {
        question: "The <u>honesty</u> of the boy was commendable.",
        answers: [
            { text: 'Noun', correct: true },
            { text: 'Verb', correct: false },
            { text: 'Adjective', correct: false },
            { text: 'Adverb', correct: false }
        ]
    },
    {
        question: "My <u>family</u> will be visiting from the village.",
        answers: [
            { text: 'Pronoun', correct: false },
            { text: 'Noun', correct: true },
            { text: 'Verb', correct: false },
            { text: 'Preposition', correct: false }
        ]
    },
    {
        question: "We need to buy new <u>furniture</u> for the house.",
        answers: [
            { text: 'Adjective', correct: false },
            { text: 'Adverb', correct: false },
            { text: 'Noun', correct: true },
            { text: 'Verb', correct: false }
        ]
    },
    // Verbs
    {
        question: "The children <u>are playing</u> outside.",
        answers: [
            { text: 'Noun', correct: false },
            { text: 'Adjective', correct: false },
            { text: 'Adverb', correct: false },
            { text: 'Verb', correct: true }
        ]
    },
    {
        question: "She <u>has finished</u> her assignment.",
        answers: [
            { text: 'Verb', correct: true },
            { text: 'Preposition', correct: false },
            { text: 'Pronoun', correct: false },
            { text: 'Noun', correct: false }
        ]
    },
    {
        question: "The sun <u>shines</u> brightly.",
        answers: [
            { text: 'Adverb', correct: false },
            { text: 'Verb', correct: true },
            { text: 'Adjective', correct: false },
            { text: 'Noun', correct: false }
        ]
    },
    // Adjectives
    {
        question: "He bought a <u>beautiful</u> car.",
        answers: [
            { text: 'Adverb', correct: false },
            { text: 'Noun', correct: false },
            { text: 'Adjective', correct: true },
            { text: 'Verb', correct: false }
        ]
    },
    {
        question: "The soup is very <u>hot</u>.",
        answers: [
            { text: 'Adjective', correct: true },
            { text: 'Verb', correct: false },
            { text: 'Adverb', correct: false },
            { text: 'Pronoun', correct: false }
        ]
    },
    {
        question: "The <u>Nigerian</u> flag is green and white.",
        answers: [
            { text: 'Noun', correct: false },
            { text: 'Adjective', correct: true },
            { text: 'Preposition', correct: false },
            { text: 'Verb', correct: false }
        ]
    },
    // Adverbs
    {
        question: "She sings <u>beautifully</u>.",
        answers: [
            { text: 'Adjective', correct: false },
            { text: 'Verb', correct: false },
            { text: 'Adverb', correct: true },
            { text: 'Noun', correct: false }
        ]
    },
    {
        question: "He ran <u>quickly</u> to catch the bus.",
        answers: [
            { text: 'Adverb', correct: true },
            { text: 'Adjective', correct: false },
            { text: 'Verb', correct: false },
            { text: 'Preposition', correct: false }
        ]
    },
    {
        question: "The teacher spoke <u>loudly</u>.",
        answers: [
            { text: 'Noun', correct: false },
            { text: 'Adverb', correct: true },
            { text: 'Adjective', correct: false },
            { text: 'Verb', correct: false }
        ]
    },
    // Pronouns
    {
        question: "<u>She</u> is the captain of the team.",
        answers: [
            { text: 'Noun', correct: false },
            { text: 'Verb', correct: false },
            { text: 'Pronoun', correct: true },
            { text: 'Adjective', correct: false }
        ]
    },
    {
        question: "The book is for <u>you</u>.",
        answers: [
            { text: 'Pronoun', correct: true },
            { text: 'Noun', correct: false },
            { text: 'Preposition', correct: false },
            { text: 'Adverb', correct: false }
        ]
    },
    {
        question: "The students praised <u>themselves</u> after the performance.",
        answers: [
            { text: 'Adjective', correct: false },
            { text: 'Pronoun', correct: true },
            { text: 'Verb', correct: false },
            { text: 'Noun', correct: false }
        ]
    },
    // Prepositions
    {
        question: "The cat is sleeping <u>under</u> the table.",
        answers: [
            { text: 'Adverb', correct: false },
            { text: 'Conjunction', correct: false },
            { text: 'Preposition', correct: true },
            { text: 'Verb', correct: false }
        ]
    },
    {
        question: "He walked <u>across</u> the road.",
        answers: [
            { text: 'Preposition', correct: true },
            { text: 'Adverb', correct: false },
            { text: 'Verb', correct: false },
            { text: 'Adjective', correct: false }
        ]
    },
    // Mixed
    {
        question: "<u>Wow!</u> That was an incredible goal.",
        answers: [
            { text: 'Verb', correct: false },
            { text: 'Interjection', correct: true },
            { text: 'Adverb', correct: false },
            { text: 'Noun', correct: false }
        ]
    },
    {
        question: "I want to go, <u>but</u> I am too tired.",
        answers: [
            { text: 'Preposition', correct: false },
            { text: 'Adverb', correct: false },
            { text: 'Conjunction', correct: true },
            { text: 'Pronoun', correct: false }
        ]
    },
    {
        question: "The <u>old</u> man walked slowly.",
        answers: [
            { text: 'Noun', correct: false },
            { text: 'Adjective', correct: true },
            { text: 'Adverb', correct: false },
            { text: 'Verb', correct: false }
        ]
    }
];

const mathQuestions = [
    // Number Base (6 questions)
    { question: "Convert 1101 base 2 to base 10.", answers: [{ text: '13', correct: true }, { text: '11', correct: false }, { text: '14', correct: false }, { text: '9', correct: false }] },
    { question: "Convert 25 base 10 to base 2.", answers: [{ text: '11001', correct: true }, { text: '10101', correct: false }, { text: '11101', correct: false }, { text: '10011', correct: false }] },
    { question: "Calculate 101 base 2 + 11 base 2.", answers: [{ text: '1000 base 2', correct: true }, { text: '110 base 2', correct: false }, { text: '120 base 2', correct: false }, { text: '111 base 2', correct: false }] },
    { question: "What is 43 base 5 in base 10?", answers: [{ text: '23', correct: true }, { text: '43', correct: false }, { text: '28', correct: false }, { text: '18', correct: false }] },
    { question: "Convert 1A base 16 to base 10.", answers: [{ text: '26', correct: true }, { text: '11', correct: false }, { text: '36', correct: false }, { text: '16', correct: false }] },
    { question: "If 23 base x = 11 base 10, find x.", answers: [{ text: '4', correct: true }, { text: '5', correct: false }, { text: '3', correct: false }, { text: '6', correct: false }] },

    // Equations (6 questions)
    { question: "Solve for x: 3x - 7 = 14", answers: [{ text: '7', correct: true }, { text: '3', correct: false }, { text: '21', correct: false }, { text: '5', correct: false }] },
    { question: "If 5y + 3 = 3y + 9, what is y?", answers: [{ text: '3', correct: true }, { text: '2', correct: false }, { text: '6', correct: false }, { text: '1.5', correct: false }] },
    { question: "Solve the simultaneous equations: x + y = 5, x - y = 1", answers: [{ text: 'x=3, y=2', correct: true }, { text: 'x=2, y=3', correct: false }, { text: 'x=4, y=1', correct: false }, { text: 'x=1, y=4', correct: false }] },
    { question: "Find the value of p in p/4 = 5.", answers: [{ text: '20', correct: true }, { text: '1', correct: false }, { text: '1.25', correct: false }, { text: '9', correct: false }] },
    { question: "If 2(a - 3) = 8, find a.", answers: [{ text: '7', correct: true }, { text: '4', correct: false }, { text: '5', correct: false }, { text: '10', correct: false }] },
    { question: "Solve for k: 10 - 2k = 4", answers: [{ text: '3', correct: true }, { text: '7', correct: false }, { text: '-3', correct: false }, { text: '5', correct: false }] },

    // Sets (6 questions)
    { question: "If P = {1, 2, 3} and Q = {3, 4, 5}, find P ∪ Q.", answers: [{ text: '{1, 2, 3, 4, 5}', correct: true }, { text: '{3}', correct: false }, { text: '{1, 2, 4, 5}', correct: false }, { text: '{}', correct: false }] },
    { question: "If P = {a, b, c} and Q = {b, d}, find P ∩ Q.", answers: [{ text: '{b}', correct: true }, { text: '{a, b, c, d}', correct: false }, { text: '{a, c}', correct: false }, { text: '{d}', correct: false }] },
    { question: "Given U = {1,2,3,4,5,6} and A = {2,4,6}, find A'.", answers: [{ text: '{1, 3, 5}', correct: true }, { text: '{2, 4, 6}', correct: false }, { text: '{}', correct: false }, { text: '{1, 2, 3, 4, 5, 6}', correct: false }] },
    { question: "How many subsets does a set with 3 elements have?", answers: [{ text: '8', correct: true }, { text: '6', correct: false }, { text: '3', correct: false }, { text: '9', correct: false }] },
    { question: "If n(A) = 10, n(B) = 15, and n(A ∩ B) = 5, find n(A ∪ B).", answers: [{ text: '20', correct: true }, { text: '25', correct: false }, { text: '30', correct: false }, { text: '10', correct: false }] },
    { question: "Which of the following is an empty set?", answers: [{ text: '{x: x is a month with 32 days}', correct: true }, { text: '{0}', correct: false }, { text: '{}', correct: false }, { text: '{x: x > 2 and x < 3}', correct: false }] },

    // Quadratic Equations (6 questions)
    { question: "Find the roots of x² - 5x + 6 = 0.", answers: [{ text: 'x=2, x=3', correct: true }, { text: 'x=-2, x=-3', correct: false }, { text: 'x=1, x=6', correct: false }, { text: 'x=-1, x=-6', correct: false }] },
    { question: "Solve for x: x² = 16", answers: [{ text: 'x = ±4', correct: true }, { text: 'x = 4', correct: false }, { text: 'x = 8', correct: false }, { text: 'x = 16', correct: false }] },
    { question: "What is the nature of the roots of 2x² + 3x + 5 = 0?", answers: [{ text: 'No real roots', correct: true }, { text: 'Two equal real roots', correct: false }, { text: 'Two distinct real roots', correct: false }, { text: 'One real root', correct: false }] },
    { question: "Find the product of the roots of the equation 3x² - 8x - 4 = 0.", answers: [{ text: '-4/3', correct: true }, { text: '8/3', correct: false }, { text: '4/3', correct: false }, { text: '-8/3', correct: false }] },
    { question: "Factorize x² - 9.", answers: [{ text: '(x-3)(x+3)', correct: true }, { text: '(x-3)(x-3)', correct: false }, { text: '(x+3)(x+3)', correct: false }, { text: 'x(x-9)', correct: false }] },
    { question: "Find the sum of the roots of the equation 2x² + 6x - 7 = 0.", answers: [{ text: '-3', correct: true }, { text: '3', correct: false }, { text: '7/2', correct: false }, { text: '-7/2', correct: false }] },

    // Simple Arithmetics (6 questions)
    { question: "Calculate 15% of 200.", answers: [{ text: '30', correct: true }, { text: '15', correct: false }, { text: '20', correct: false }, { text: '40', correct: false }] },
    { question: "What is 3/4 as a decimal?", answers: [{ text: '0.75', correct: true }, { text: '0.25', correct: false }, { text: '3.4', correct: false }, { text: '0.34', correct: false }] },
    { question: "A man buys a pen for N50 and sells it for N70. What is his percentage profit?", answers: [{ text: '40%', correct: true }, { text: '20%', correct: false }, { text: '28.5%', correct: false }, { text: '50%', correct: false }] },
    { question: "Find the average of 10, 12, and 14.", answers: [{ text: '12', correct: true }, { text: '11', correct: false }, { text: '13', correct: false }, { text: '36', correct: false }] },
    { question: "Simplify: 2 + 5 × 3", answers: [{ text: '17', correct: true }, { text: '21', correct: false }, { text: '10', correct: false }, { text: '13', correct: false }] },
    { question: "If a car travels 120km in 2 hours, what is its average speed?", answers: [{ text: '60 km/h', correct: true }, { text: '120 km/h', correct: false }, { text: '240 km/h', correct: false }, { text: '30 km/h', correct: false }] }
];

startEnglishButton.addEventListener('click', () => startQuiz('english'));
startMathButton.addEventListener('click', () => startQuiz('math'));

nextButton.addEventListener('click', () => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        showResult();
    }
});
prevButton.addEventListener('click', () => {
    // Go to the previous question
    currentQuestionIndex--;
    setNextQuestion();
});

function startQuiz(quizType) {
    if (quizType === 'english') {
        activeQuestions = englishQuestions;
    } else if (quizType === 'math') {
        activeQuestions = mathQuestions;
    } else {
        return; // Do nothing if quiz type is unknown
    }

    const name = nameInput.value;
    if (name.trim() === "") {
        alert("Please enter your name to start the quiz.");
        return;
    }

    introContainerElement.classList.add('hide');
    resultContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');

    score = 0;
    userAnswers = [];
    shuffledQuestions = activeQuestions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;

    startTimer();
    setNextQuestion();
}

function startTimer() {
    timerElement.textContent = formatTime(timeRemaining);
    timer = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = formatTime(timeRemaining);
        if (timeRemaining <= 0) {
            clearInterval(timer);
            showResult();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    questionCounterElement.textContent = `Question ${currentQuestionIndex + 1} of ${activeQuestions.length}`;

    // Show/hide navigation buttons
    if (currentQuestionIndex > 0) {
        prevButton.classList.remove('hide');
    }
    // Show next button if an answer was already selected for this question
    if (userAnswers[currentQuestionIndex] !== undefined) {
        nextButton.classList.remove('hide');
    }
}

function showQuestion(question) {
    questionElement.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        // If this question was answered before, show the selection
        if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].selected === answer.text) {
            button.classList.add('selected');
            // No need to disable, user can change their mind
        }
        answerButtonsElement.appendChild(button);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.textContent = 'Next';
    } else {
        nextButton.textContent = 'Submit';
    }
}

function resetState() {
    nextButton.classList.add('hide');
    prevButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const clickedButton = e.target;
    const previouslySelectedButton = answerButtonsElement.querySelector('.selected');

    // Case 1: The user is deselecting their current answer
    if (clickedButton === previouslySelectedButton) {
        clickedButton.classList.remove('selected');
        // If the deselected answer was correct, decrement the score
        if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].isCorrect) {
            score--;
        }
        // Remove the answer and hide the next button
        userAnswers[currentQuestionIndex] = undefined;
        nextButton.classList.add('hide');
        return; // Stop further execution
    }

    // Case 2: The user is changing their answer
    if (previouslySelectedButton) {
        previouslySelectedButton.classList.remove('selected');
        // If the previous answer was correct, decrement the score
        if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].isCorrect) {
            score--;
        }
    }

    // Case 3: A new answer is selected (or changed to)
    clickedButton.classList.add('selected');
    const isCorrect = clickedButton.dataset.correct === "true";

    // Store the new answer
    userAnswers[currentQuestionIndex] = {
        question: shuffledQuestions[currentQuestionIndex].question,
        selected: clickedButton.textContent,
        correctAnswer: shuffledQuestions[currentQuestionIndex].answers.find(a => a.correct).text,
        isCorrect: isCorrect
    };

    // If the new answer is correct, increment the score
    if (isCorrect) {
        score++;
    }

    // An answer is selected, so we can proceed
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        // This is the last question, prepare for submission
        nextButton.textContent = 'Submit';
        nextButton.classList.remove('hide');
        userAnswers[currentQuestionIndex] = {
            question: shuffledQuestions[currentQuestionIndex].question,
            selected: selectedButton.textContent,
            correctAnswer: shuffledQuestions[currentQuestionIndex].answers.find(a => a.correct).text,
            isCorrect: isCorrect
        };
    }
}

function showResult() {
    clearInterval(timer);
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');

    const name = nameInput.value;
    let resultHTML = `
        <h2>Quiz Complete, ${name}!</h2>
        <p>You scored ${score} out of ${activeQuestions.length}!</p>
        <div class="review-section">
            <h3>Review Your Answers</h3>
    `;

    userAnswers.forEach((answer, index) => {
        resultHTML += `
            <div class="review-question">
                <p>Question ${index + 1}: ${answer.question}</p>
                <div class="review-answer">Your answer: ${answer.selected} ${answer.isCorrect ? '✔️' : '❌'}</div>
                ${!answer.isCorrect ? `<div class="review-answer correct-answer">Correct answer: ${answer.correctAnswer}</div>` : ''}
            </div>
        `;
    });

    resultHTML += '</div><button onclick="location.reload()" class="cta-button">Try Again</button>';
    resultContainerElement.innerHTML = resultHTML;
}
