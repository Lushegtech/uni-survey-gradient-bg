// js/survey.js
class SurveyForm {
    constructor() {
        this.form = document.getElementById('surveyForm');
        this.modal = document.getElementById('ratingModal');
        this.transportationInputs = document.querySelectorAll('input[name="transportation"]');
        this.submitButton = document.querySelector('.button-style');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormAnimations();
    }

    setupEventListeners() {
        // Listen for transportation selection
        this.transportationInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.showRatingModal();
            });
        });

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    setupFormAnimations() {
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
    }

    showRatingModal() {
        this.modal.classList.add('active');
    }

    hideRatingModal() {
        this.modal.classList.remove('active');
    }

    validateForm() {
        const transportation = document.querySelector('input[name="transportation"]:checked');
        const experience = document.querySelector('input[name="experience"]:checked');
        let isValid = true;
        let errorMessages = [];

        // Remove existing error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('fieldset').forEach(fieldset => {
            fieldset.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });

        if (!transportation) {
            isValid = false;
            errorMessages.push('Please select your preferred mode of transportation');
            this.highlightError('transportation');
        }

        if (!experience) {
            isValid = false;
            errorMessages.push('Please rate your experience');
            this.highlightError('experience');
        }

        return { isValid, errorMessages };
    }

    highlightError(fieldName) {
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

    async handleSubmit(event) {
        event.preventDefault();
        const { isValid, errorMessages } = this.validateForm();

        if (!isValid) {
            this.submitButton.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                this.submitButton.style.animation = '';
            }, 500);
            return;
        }

        this.submitButton.disabled = true;
        this.submitButton.style.width = this.submitButton.offsetWidth + 'px';
        this.submitButton.textContent = '✓ Submitted!';
        this.submitButton.style.background = 'linear-gradient(135deg, #00c853, #64dd17)';

        const formData = {
            transportation: document.querySelector('input[name="transportation"]:checked').value,
            experience: document.querySelector('input[name="experience"]:checked').value
        };

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showFeedback('Thank you for your feedback!', 'success');
            
            setTimeout(() => {
                this.form.reset();
                this.hideRatingModal();
                this.submitButton.disabled = false;
                this.submitButton.textContent = 'Submit Survey';
                this.submitButton.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
            }, 2000);

        } catch (error) {
            this.showFeedback('Something went wrong. Please try again.', 'error');
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Submit Survey';
        }
    }

    showFeedback(message, type) {
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
}

// Initialize survey form
document.addEventListener('DOMContentLoaded', () => {
    new SurveyForm();
});

// Add animations
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