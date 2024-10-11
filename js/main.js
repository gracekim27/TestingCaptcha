document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');
  
    // Log Prolific ID when the user joins (on page load)
    if (prolificID) {
      fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Replace with your Apps Script Web App URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prolificID, event: 'joined' })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => console.log('Prolific ID logged for join:', data))
      .catch(error => console.error('Error logging join event:', error));
    }

    // Automatically execute CAPTCHA after the page loads
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Lf0Zl4qAAAAAAkBH80KSvveZtPbgjHZ_JrSOCci', { action: 'submit' });

      if (token && prolificID) {
        // Send CAPTCHA completion log to Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbxmguNVGXbzuFvlT9HuWDSvcSv_cAhZvflpHGv8CmckOi2AfYOiEfeBenQ9bGBLMKGa/exec', {  // Replace with your Apps Script Web App URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prolificID, event: 'captcha_completed', token })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('CAPTCHA completed and logged:', data);
          document.getElementById('placeholderImage').style.display = 'block';  // Show the placeholder image if CAPTCHA is successful
        })
        .catch(error => console.error('Error logging CAPTCHA completion:', error));
      } else {
        console.error('CAPTCHA token or Prolific ID missing.');
      }
    });
});
