// Part 1: JavaScript Event Handling and Interactive Elements

// 1. Click event: Show a message when the button is clicked
const clickButton = document.getElementById('clickButton');
const clickMessage = document.getElementById('clickMessage');

clickButton.addEventListener('click', () => {
  clickMessage.classList.remove('hidden');
});

// 2. Mouseover and mouseout events: Show/hide message when hovering over a box
const hoverBox = document.getElementById('hoverBox');
const hoverMessage = document.getElementById('hoverMessage');

hoverBox.addEventListener('mouseover', () => {
  hoverMessage.classList.remove('hidden');
});

hoverBox.addEventListener('mouseout', () => {
  hoverMessage.classList.add('hidden');
});

// 3. Keyboard input event: Greet the user as they type their name
const nameInput = document.getElementById('nameInput');
const greeting = document.getElementById('greeting');

nameInput.addEventListener('input', () => {
  const name = nameInput.value.trim();
  if (name.length > 0) {
    greeting.textContent = `Hello, ${name}! `;
    greeting.classList.remove('hidden');
  } else {
    greeting.textContent = '';
    greeting.classList.add('hidden');
  }
});

// Part 2: Building Interactive Elements

// 4. Light/Dark Mode Toggle
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    modeToggle.textContent = 'Switch to Light Mode';
  } else {
    modeToggle.textContent = 'Switch to Dark Mode';
  }
});

// 5. Collapsible FAQ Section
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    // Toggle the visibility of the answer
    answer.classList.toggle('hidden');
  });
});

// Part 3: Form Validation with JavaScript

const form = document.getElementById('signupForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const formSuccess = document.getElementById('formSuccess');

// Helper: Show error message for an input
function showError(input, message) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
  input.classList.add('error');
}

// Helper: Clear error message for an input
function clearError(input) {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector('.error-message');
  errorMsg.textContent = '';
  errorMsg.classList.add('hidden');
  input.classList.remove('error');
}

// Validate individual fields
function validateName() {
  const name = fullNameInput.value.trim();
  if (name === '') {
    showError(fullNameInput, 'Name is required.');
    return false;
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError(fullNameInput, 'Name can only contain letters and spaces.');
    return false;
  }
  clearError(fullNameInput);
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  if (email === '') {
    showError(emailInput, 'Email is required.');
    return false;
  }
  // Simple email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError(emailInput, 'Please enter a valid email address.');
    return false;
  }
  clearError(emailInput);
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  if (password === '') {
    showError(passwordInput, 'Password is required.');
    return false;
  }
  if (password.length < 6) {
    showError(passwordInput, 'Password must be at least 6 characters.');
    return false;
  }
  clearError(passwordInput);
  return true;
}

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  if (confirmPassword === '') {
    showError(confirmPasswordInput, 'Please confirm your password.');
    return false;
  }
  if (password !== confirmPassword) {
    showError(confirmPasswordInput, 'Passwords do not match.');
    return false;
  }
  clearError(confirmPasswordInput);
  return true;
}

// Validate all fields on submit
form.addEventListener('submit', e => {
  e.preventDefault(); // Prevent form submission by default
  formSuccess.textContent = ''; // Clear previous success message

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validateConfirmPassword();

  if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    formSuccess.textContent = 'Registration successful! 🎉';
    form.reset();

    // Also clear error states after reset
    [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(clearError);
  }
});

// Optional: Validate fields live while typing
fullNameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);
