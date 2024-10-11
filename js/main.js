document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');
  
    // Log Prolific ID when the user joins
    if (prolificID) {
      fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Replace with your Apps Script Web App URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prolificID, event: 'joined' })
      })
      .then(response => response.json())
      .then(data => console.log('Prolific ID logged for join:', data))
      .catch(error => console.error('Error logging join event:', error));
    }
});

function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6LfJzF4qAAAAALXCzt0YbG4tZirZYeOewOlFj9ov', { action: 'submit' });
      const urlParams = new URLSearchParams(window.location.search);
      const prolificID = urlParams.get('prolificID');

      if (token && prolificID) {
        // Send CAPTCHA completion log to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Replace with your Apps Script Web App URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prolificID, event: 'captcha_completed' })
        })
        .then(response => response.json())
        .then(data => {
          console.log('CAPTCHA completed and logged:', data);
          document.getElementById('placeholderImage').style.display = 'block';
        })
        .catch(error => console.error('Error logging CAPTCHA completion:', error));
      } else {
        console.error('CAPTCHA token or Prolific ID missing.');
      }
    });
}

document.getElementById('captchaButton').addEventListener('click', onClick);
