// Main.js

document.addEventListener('DOMContentLoaded', () => {
    // Get Prolific ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');
  
    // Log Prolific ID when the user joins
    if (prolificID) {
      fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Replace with your Apps Script URL
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
    
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');
  
    if (!prolificID) {
      console.error('No Prolific ID found in the URL');
      return;
    }

    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Lf0Zl4qAAAAAAkBH80KSvveZtPbgjHZ_JrSOCci', { action: 'LOGIN' });
  
      if (token) {
        // Send CAPTCHA completion log to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Same Apps Script URL as above
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
        console.error('CAPTCHA failed, no token received.');
      }
    });
  }
  
  document.getElementById('captchaButton').addEventListener('click', onClick);
