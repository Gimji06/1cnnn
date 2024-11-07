document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const note = document.getElementById('note');
    const continueButton = document.getElementById('continueButton');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (checkboxes[0].checked || checkboxes[1].checked) {
                note.style.display = 'none';
                continueButton.disabled = false;
            } else {
                note.style.display = 'block';
                continueButton.disabled = true;
            }
        });
    });
});
