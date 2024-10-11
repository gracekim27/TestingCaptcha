const params = new URLSearchParams(window.location.search);
const prolificID = params.get('prolificID');

if (prolificID) {
    // Send Prolific ID to the server to log the click
    fetch('/logClick', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prolificID })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Prolific ID logged:', data);
        })
        .catch(error => {
            console.error('Error logging Prolific ID:', error);
        });
}

document.getElementById('captchaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const captchaResponse = grecaptcha.getResponse();
    if (captchaResponse.length === 0) {
        alert('Please complete the CAPTCHA.');
    } else {
        fetch('/verifyCaptcha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ captchaResponse, prolificID })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // CAPTCHA was successful, display placeholder image
                    document.getElementById('placeholderImage').style.display = 'block';
                } else {
                    alert('CAPTCHA failed. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
    }
});


if (data.success) {
    // CAPTCHA was successful, display placeholder image
    document.getElementById('placeholderImage').style.display = 'block';
}
