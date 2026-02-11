// Valentine's Day Quiz App
let currentQuestion = 1;
const totalQuestions = 4;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeHearts();
    showQuestion(1);
});

function initializeHearts() {
    const container = document.querySelector('.container');
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts';

    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);
    }

    container.appendChild(heartsContainer);
}

function showQuestion(questionNumber) {
    // Hide all questions
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('active');
    });

    // Show current question
    const currentQ = document.getElementById('question' + questionNumber);
    if (currentQ) {
        currentQ.classList.add('active');
        currentQuestion = questionNumber;

        // Focus on input if it exists
        const input = currentQ.querySelector('.answer-input');
        if (input) {
            setTimeout(() => input.focus(), 300);
        }
    }
}

function nextQuestion(questionNumber) {
    const answerInput = document.getElementById('answer' + questionNumber);
    const answer = answerInput.value.trim();

    if (answer === '') {
        // Show error message
        showError('Vennligst svar på spørsmålet først!');
        answerInput.focus();
        return;
    }

    // Add loading state
    const button = document.querySelector('.next-btn');
    button.classList.add('loading');
    button.disabled = true;

    // Simulate processing time for better UX
    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = false;

        if (questionNumber < totalQuestions) {
            showQuestion(questionNumber + 1);
        } else {
            showReveal();
        }
    }, 800);
}

function showReveal() {
    // Hide all questions
    document.querySelectorAll('.question').forEach(q => {
        q.classList.remove('active');
    });

    // Show reveal
    const reveal = document.getElementById('reveal');
    reveal.classList.add('active');

    // Add confetti effect or celebration
    celebrateReveal();
}

function celebrateReveal() {
    // Create floating hearts animation
    const container = document.querySelector('.container');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 200);
    }
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatUp 3s ease-out forwards';

    document.body.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

// Add CSS for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function restart() {
    // Reset all answers
    for (let i = 1; i <= totalQuestions; i++) {
        const input = document.getElementById('answer' + i);
        if (input) input.value = '';
    }

    // Go back to first question
    showQuestion(1);
}

function showError(message) {
    // Remove existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--accent-color);
        font-size: 0.9rem;
        margin-top: -20px;
        margin-bottom: 20px;
        font-weight: 500;
        animation: shake 0.5s ease-in-out;
    `;

    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // Insert after current question
    const currentQuestionDiv = document.querySelector('.question.active .question-content');
    const input = currentQuestionDiv.querySelector('.answer-input');
    input.parentNode.insertBefore(errorDiv, input.nextSibling);

    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const activeQuestion = document.querySelector('.question.active');
        if (activeQuestion) {
            const button = activeQuestion.querySelector('.next-btn');
            if (button && !button.disabled) {
                button.click();
            }
        }
    }

    if (e.key === 'Escape') {
        const reveal = document.getElementById('reveal');
        if (reveal.classList.contains('active')) {
            restart();
        }
    }
});

// Prevent form submission
document.addEventListener('submit', function(e) {
    e.preventDefault();
});