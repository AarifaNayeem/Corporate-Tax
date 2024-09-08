// Add event listener to the email input field to detect 'Enter' key
document.getElementById('userEmail').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Prevent any default form submit behavior
    validateEmail();  // Trigger the start button functionality
  }
});

// Function to validate the email input
function validateEmail() {
  var email = document.getElementById("userEmail").value;
  var emailError = document.getElementById("emailError");

  // Regular expression to check the validity of the email
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (emailPattern.test(email)) {
    // If valid email, hide the email input and show the questions
    document.getElementById("emailSection").style.display = "none";
    document.getElementById("questionsContainer").style.display = "block";
  } else {
    // Show error if the email is invalid
    emailError.style.display = "block";
  }
}


async function saveToGoogleSheets(email, responses) {
  try {
    const response = await fetch('http://localhost:3000/submit-data', {  // Send to your backend, not directly to Google Script
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, responses }),  // Sending the email and responses to backend server
    });

    if (!response.ok) {
      throw new Error('Failed to save data via backend');
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}



// Move to the next question automatically on radio button selection
function nextQuestion(questionNumber) {
  const currentQuestion = document.querySelector('.question.active');
  const radios = currentQuestion.querySelectorAll('input[type="radio"]');

  // Check if any radio button is selected
  let selected = Array.from(radios).some(radio => radio.checked);

  if (!selected) {
      alert('Please select an option before moving to the next question.');
      return; // Stop the function if no option is selected
  }

  // Hide the current question and show the next one
  currentQuestion.classList.remove('active');
  document.getElementById('question' + questionNumber).classList.add('active');
  document.getElementById('whatsappButton').style.display = 'none'; // Hide the WhatsApp button until the end
}

function prevQuestion(questionNumber) {
  // Get the current active question
  const currentQuestion = document.querySelector('.question.active');
  
  // Hide the current question
  currentQuestion.classList.remove('active');
  
  // Show the previous question
  document.getElementById('question' + questionNumber).classList.add('active');
}

function showResult() {
  document.getElementById('question10').classList.remove('active');

  // Get the email entered by the user
  const email = document.getElementById('userEmail').value;

  // Fetching all relevant question answers
  const responses = {
    q1: document.querySelector('input[name="q1"]:checked').value,
    q2: document.querySelector('input[name="q2"]:checked').value,
    q3: document.querySelector('input[name="q3"]:checked').value,  // Capture q3
    q4: document.querySelector('input[name="q4"]:checked').value,  // Capture q4
    q5: document.querySelector('input[name="q5"]:checked').value,
    q6: document.querySelector('input[name="q6"]:checked').value,
    q7: document.querySelector('input[name="q7"]:checked').value,
    q8: document.querySelector('input[name="q8"]:checked').value,  // Capture q8
    q9: document.querySelector('input[name="q9"]:checked').value,  // Capture q9
    q10: document.querySelector('input[name="q10"]:checked').value
  };

  let eligible = true;

  // Logic to determine eligibility
  if (responses.q1 === 'no' || responses.q2 === 'Non-Qualifying' || responses.q6 === 'more-5' || responses.q7 === 'no' || responses.q10 === 'yes') {
    eligible = false;
  }

  // Save the email and responses to Google Sheets
  saveToGoogleSheets(email, responses);

  // Display the result
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';

  if (eligible) {
    resultDiv.innerHTML = '<p style="color: lightgreen;">Congratulations! You are eligible for 0% corporate tax.</p>';
  } else {
    resultDiv.innerHTML = '<p style="color: red;">Unfortunately, your company does not qualify for the 0% corporate tax rate.</p>';
  }

  // Show WhatsApp button after displaying result
  document.getElementById('whatsappButton').style.display = 'inline-block';
}


