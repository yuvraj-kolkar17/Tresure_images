const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Function to validate email format
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Error messages container
  const errorMessage = document.getElementById('form-message-warning');
  
  const body=  "Name : "+name +"\nEmail: "+ email+"\nSubject: "+ subject+"\nMessage: " +message;

  // Reset error message

  // Validation checks
  let isValid = true;
  if (name === "") {
    isValid = false;
  }
  if (email === "" || !validateEmail(email)) {
    isValid = false;
  }
  if (subject === "") {
    isValid = false;
  }
  if (message === "") {
    isValid = false;
  }

  // Send email if validation passes
  if (isValid) {

      Email.send({
    SecureToken : "ca9ce12b-320a-49db-8d3b-84bf06292149",
    To : 'udes251@gmail.com,kolkaryuvraj2@gmail.com', 
    From : "udes251@gmail.com",
    Subject : subject,
    Body : body
}).then(
  message => alert("Feedback Submited Successfully")
).catch(
    alert("error")
    );
  }
});



