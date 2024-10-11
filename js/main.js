document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');

    // Log Prolific ID when the user joins (using GET request)
    if (prolificID) {
      fetch(`https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec?prolificID=${prolificID}&event=joined`, {
        method: 'GET'  // Using GET method for logging join event
      })
      .then(response => response.json())
      .then(data => console.log('Prolific ID logged for join:', data))
      .catch(error => console.error('Error logging join event:', error));
    }

    // Function to handle CAPTCHA completion
    function onCaptchaCompleted(token) {
        // Log CAPTCHA completion to Google Apps Script
        fetch(`https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec?prolificID=${prolificID}&event=captcha_completed&token=${token}`, {
            method: 'GET'  // Using GET method for logging CAPTCHA completion
        })
        .then(response => response.json())
        .then(data => {
            console.log('CAPTCHA completed and logged:', data);
            // Display the placeholder image if CAPTCHA is successful
            document.getElementById('placeholderImage').style.display = 'block';
        })
        .catch(error => console.error('Error logging CAPTCHA completion:', error));
    }

    // Bind the callback to the reCAPTCHA completion event
    window.onloadCallback = function() {
        grecaptcha.render('g-recaptcha', {
            'sitekey': '6LfJzF4qAAAAALXCzt0YbG4tZirZYeOewOlFj9ov',
            'callback': onCaptchaCompleted // Callback function on successful CAPTCHA completion
        });
    };
});
