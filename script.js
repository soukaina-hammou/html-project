document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.interactive-input');

    inputs.forEach(input => {
        // Function to update visual feedback
        const updateFeedback = (el) => {
            const card = el.closest('.card');
            const feedbackVal = card.querySelector('.val');
            
            if (!feedbackVal) return;

            if (el.type === 'checkbox') {
                feedbackVal.textContent = el.checked ? 'Checked' : 'Unchecked';
            } else if (el.type === 'file') {
                feedbackVal.textContent = el.files[0] ? el.files[0].name : 'No file chosen';
            } else if (el.value === "") {
                feedbackVal.textContent = 'None';
            } else {
                feedbackVal.textContent = el.value;
            }
        };

        // Listen for both input (real-time) and change events
        input.addEventListener('input', (e) => updateFeedback(e.target));
        input.addEventListener('change', (e) => updateFeedback(e.target));
    });

    // Console log for initialization (Senior Dev touch)
    console.log("🚀 HTML Input Reference Loaded Successfully.");
});
