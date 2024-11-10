document.addEventListener('DOMContentLoaded', () => {
    // Interactive gradient background
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        if (interBubble) {
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        }
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();

    const surveyForm = document.getElementById('surveyForm');
    const submitButton = document.querySelector('.button-style');

    const formElements = document.querySelectorAll('.survey-question');
    formElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transform = 'translateY(-5px)';
            element.style.transition = 'transform 0.3s ease';
        });

        element.addEventListener('mouseout', () => {
            element.style.transform = 'translateY(0)';
        });
    });

    function validateForm() {
        const transportation = document.querySelector('input[name="transportation"]:checked');
        const experience = document.querySelector('input[name="experience"]:checked');
        let isValid = true;
        let errorMessages = [];

        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('fieldset').forEach(fieldset => {
            fieldset.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });

        if (!transportation) {
            isValid = false;
            errorMessages.push('Please select your preferred mode of transportation');
            highlightError('transportation');
        }

        if (!experience) {
            isValid = false;
            errorMessages.push('Please rate your experience');
            highlightError('experience');
        }

        return { isValid, errorMessages };
    }

    function highlightError(fieldName) {
        const fieldset = document.querySelector(`input[name="${fieldName}"]`).closest('fieldset');
        fieldset.style.borderColor = '#ff4444';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = `Please select an option for ${fieldName}`;
        fieldset.appendChild(errorDiv);
    }

    surveyForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const { isValid, errorMessages } = validateForm();

        if (!isValid) {
            submitButton.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                submitButton.style.animation = '';
            }, 500);
            return;
        }

        submitButton.disabled = true;
        submitButton.style.width = submitButton.offsetWidth + 'px';
        submitButton.textContent = '✓ Submitted!';
        submitButton.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';

        const formData = {
            transportation: document.querySelector('input[name="transportation"]:checked').value,
            experience: document.querySelector('input[name="experience"]:checked').value
        };

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFeedback('Thank you for your feedback!', 'success');
            
            setTimeout(() => {
                surveyForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Survey';
                submitButton.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
            }, 2000);

        } catch (error) {
            showFeedback('Something went wrong. Please try again.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Survey';
        }
    });

    function showFeedback(message, type) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `feedback-message ${type}`;
        feedbackDiv.style.position = 'fixed';
        feedbackDiv.style.top = '20px';
        feedbackDiv.style.left = '50%';
        feedbackDiv.style.transform = 'translateX(-50%)';
        feedbackDiv.style.padding = '1rem 2rem';
        feedbackDiv.style.borderRadius = '8px';
        feedbackDiv.style.color = 'white';
        feedbackDiv.style.zIndex = '1000';
        feedbackDiv.style.animation = 'slideDown 0.5s ease';

        if (type === 'success') {
            feedbackDiv.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';
        } else {
            feedbackDiv.style.background = 'linear-gradient(135deg, #ff5252, #ff1744)';
        }

        feedbackDiv.textContent = message;
        document.body.appendChild(feedbackDiv);

        setTimeout(() => {
            feedbackDiv.style.animation = 'slideUp 0.5s ease';
            setTimeout(() => feedbackDiv.remove(), 500);
        }, 3000);
    }
});

// Add necessary animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-5px); }
        40%, 80% { transform: translateX(5px); }
    }

    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }

    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }

    .error-message {
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);