function validateForm(event) {
    const transportation = document.querySelector('input[name="transportation"]:checked');
    const experience = document.querySelector('input[name="experience"]:checked');
    if (!transportation || !experience) {
        alert('Please select an option for all questions before submitting!');
        event.preventDefault(); // Prevent form submission
        return false;
    }
    alert('Your feedback has been submitted!');
}