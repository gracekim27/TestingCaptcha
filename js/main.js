document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prolificID = urlParams.get('prolificID');
  
    // Log Prolific ID when the user joins (using GET request)
    if (prolificID) {
      fetch(`https://script.google.com/macros/s/AKfycby-oudoZ6n51iFzDfCgAdxk5-Em3RSGpZFhfGCsNLqn_NCznHKbWOEOor51ODZQpu1B/exec?prolificID=${prolificID}&event=joined`, {
        method: 'GET'  // Use GET method
      })
      .then(response => response.json())
      .then(data => console.log('Prolific ID logged for join:', data))
      .catch(error => console.error('Error logging join event:', error));
    }

    // Automatically execute CAPTCHA after the page loads
    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute('6Lf0Zl4qAAAAAAkBH80KSvveZtPbgjHZ_JrSOCci', { action: 'submit' });

      if (token && prolificID) {
        // Send CAPTCHA completion log via GET request
        fetch(`https://script.google.com/macros/s/AKfycby-oudoZ6n51iFzDfCgAdxk5-Em3RSGpZFhfGCsNLqn_NCznHKbWOEOor51ODZQpu1B/exec?prolificID=${prolificID}&event=captcha_completed&token=${token}`, {
          method: 'GET'  // Use GET method
        })
        .then(response => response.json())
        .then(data => {
          console.log('CAPTCHA completed and logged:', data);
          document.getElementById('placeholderImage').style.display = 'block';  // Show the placeholder image
        })
        .catch(error => console.error('Error logging CAPTCHA completion:', error));
      } else {
        console.error('CAPTCHA token or Prolific ID missing.');
      }
    });
});

