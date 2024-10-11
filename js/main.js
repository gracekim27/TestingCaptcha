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
document.addEventListener('DOMContentLoaded', () => {
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
      .then(data => console.log(data))
      .catch(error => console.error('Error logging join event:', error));
    }
  });
  
  function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Lf0Zl4qAAAAAAkBH80KSvveZtPbgjHZ_JrSOCci', { action: 'LOGIN' });
  
      const urlParams = new URLSearchParams(window.location.search);
      const prolificID = urlParams.get('prolificID');
  
      if (token && prolificID) {
        // Send CAPTCHA completion log to Google Sheets
        fetch('https://script.google.com/macros/s/your_script_id/exec', {  // Replace with your Apps Script URL
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prolificID, event: 'captcha_completed' })
        })
        .then(response => response.json())
        .then(data => {
          console.log('CAPTCHA completed:', data);
          document.getElementById('placeholderImage').style.display = 'block';
        })
        .catch(error => console.error('Error logging CAPTCHA completion:', error));
      }
    });
  }
  
  document.getElementById('captchaButton').addEventListener('click', onClick);
  