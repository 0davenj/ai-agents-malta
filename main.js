document.addEventListener('DOMContentLoaded', function() {
  // Country codes with Malta at the top
  const countryCodes = [
    { code: '+356', country: 'Malta' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+351', country: 'Portugal' },
    { code: '+30', country: 'Greece' },
    { code: '+353', country: 'Ireland' },
    { code: '+32', country: 'Belgium' },
    { code: '+31', country: 'Netherlands' },
    { code: '+45', country: 'Denmark' },
    { code: '+46', country: 'Sweden' },
    { code: '+47', country: 'Norway' },
    { code: '+358', country: 'Finland' },
    { code: '+48', country: 'Poland' },
    { code: '+420', country: 'Czech Republic' },
    { code: '+36', country: 'Hungary' },
    { code: '+43', country: 'Austria' },
    { code: '+41', country: 'Switzerland' },
    { code: '+7', country: 'Russia' },
    { code: '+86', country: 'China' },
    { code: '+91', country: 'India' },
    { code: '+81', country: 'Japan' },
    { code: '+82', country: 'South Korea' },
    { code: '+61', country: 'Australia' },
    { code: '+64', country: 'New Zealand' },
    { code: '+27', country: 'South Africa' },
    { code: '+971', country: 'United Arab Emirates' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+20', country: 'Egypt' },
    { code: '+55', country: 'Brazil' },
    { code: '+52', country: 'Mexico' },
    { code: '+54', country: 'Argentina' },
    { code: '+56', country: 'Chile' },
    { code: '+57', country: 'Colombia' },
    { code: '+58', country: 'Venezuela' },
    { code: '+60', country: 'Malaysia' },
    { code: '+65', country: 'Singapore' },
    { code: '+66', country: 'Thailand' },
    { code: '+62', country: 'Indonesia' },
    { code: '+63', country: 'Philippines' },
    { code: '+84', country: 'Vietnam' },
    { code: '+90', country: 'Turkey' },
    { code: '+972', country: 'Israel' },
    { code: '+961', country: 'Lebanon' },
    { code: '+962', country: 'Jordan' },
    { code: '+964', country: 'Iraq' },
    { code: '+968', country: 'Oman' }
  ];

  // Populate country dropdown
  const countryList = document.getElementById('countryList');
  const countryCodeSelector = document.getElementById('countryCodeSelector');
  const countryDropdown = document.getElementById('countryDropdown');
  const selectedCode = document.getElementById('selectedCode');
  const countrySearch = document.getElementById('countrySearch');

  // Populate country list
  function populateCountryList(countries) {
    countryList.innerHTML = '';
    countries.forEach(country => {
      const countryItem = document.createElement('div');
      countryItem.classList.add('country-item');
      if (country.code === selectedCode.textContent) {
        countryItem.classList.add('active');
      }
      countryItem.textContent = `${country.country} ${country.code}`;
      countryItem.dataset.code = country.code;
      countryItem.addEventListener('click', () => {
        selectedCode.textContent = country.code;
        countryDropdown.style.display = 'none';
        validatePhoneNumber();
      });
      countryList.appendChild(countryItem);
    });
  }

  populateCountryList(countryCodes);

  // Toggle country dropdown
  countryCodeSelector.addEventListener('click', () => {
    const isVisible = countryDropdown.style.display === 'block';
    countryDropdown.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
      countrySearch.focus();
      countrySearch.value = '';
      populateCountryList(countryCodes);
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!countryCodeSelector.contains(e.target) && !countryDropdown.contains(e.target)) {
      countryDropdown.style.display = 'none';
    }
  });

  // Search functionality
  countrySearch.addEventListener('input', () => {
    const searchTerm = countrySearch.value.toLowerCase();
    const filteredCountries = countryCodes.filter(country => 
      country.country.toLowerCase().includes(searchTerm) || 
      country.code.includes(searchTerm)
    );
    populateCountryList(filteredCountries);
  });

  // Character counter for message
  const messageField = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  messageField.addEventListener('input', () => {
    const count = messageField.value.length;
    charCount.textContent = count;
    
    if (count >= 256) {
      charCount.style.color = 'var(--error-color)';
    } else {
      charCount.style.color = 'var(--text-gray)';
    }
  });

  // Form validation
  const form = document.getElementById('signupForm');
  const formSuccess = document.getElementById('formSuccess');
  
  // Validation functions
  function validateName(field, errorId) {
    const value = field.value.trim();
    const errorElement = document.getElementById(errorId);
    
    if (value === '') {
      errorElement.textContent = 'This field is required';
      field.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      field.classList.remove('error');
      return true;
    }
  }

  function validateEmail() {
    const email = document.getElementById('email');
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value.trim() === '') {
      errorElement.textContent = 'Email is required';
      email.classList.add('error');
      return false;
    } else if (!emailRegex.test(email.value)) {
      errorElement.textContent = 'Please enter a valid email address';
      email.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      email.classList.remove('error');
      return true;
    }
  }

  function validatePhoneNumber() {
    const phoneNumber = document.getElementById('phoneNumber');
    const errorElement = document.getElementById('phoneNumberError');
    const phoneRegex = /^\d{6,15}$/;
    
    if (phoneNumber.value.trim() === '') {
      errorElement.textContent = 'Phone number is required';
      phoneNumber.classList.add('error');
      return false;
    } else if (!phoneRegex.test(phoneNumber.value)) {
      errorElement.textContent = 'Please enter a valid phone number (digits only)';
      phoneNumber.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      phoneNumber.classList.remove('error');
      return true;
    }
  }

  function validateInterest() {
    const interest = document.getElementById('interest');
    const errorElement = document.getElementById('interestError');
    
    if (interest.value === '') {
      errorElement.textContent = 'Please select an area of interest';
      interest.classList.add('error');
      return false;
    } else {
      errorElement.textContent = '';
      interest.classList.remove('error');
      return true;
    }
  }

  // Add input event listeners for real-time validation
  document.getElementById('firstName').addEventListener('input', function() {
    validateName(this, 'firstNameError');
  });
  
  document.getElementById('lastName').addEventListener('input', function() {
    validateName(this, 'lastNameError');
  });
  
  document.getElementById('companyName').addEventListener('input', function() {
    validateName(this, 'companyNameError');
  });
  
  document.getElementById('position').addEventListener('input', function() {
    validateName(this, 'positionError');
  });
  
  document.getElementById('email').addEventListener('input', validateEmail);
  document.getElementById('phoneNumber').addEventListener('input', validatePhoneNumber);
  document.getElementById('interest').addEventListener('change', validateInterest);

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isFirstNameValid = validateName(document.getElementById('firstName'), 'firstNameError');
    const isLastNameValid = validateName(document.getElementById('lastName'), 'lastNameError');
    const isCompanyNameValid = validateName(document.getElementById('companyName'), 'companyNameError');
    const isPositionValid = validateName(document.getElementById('position'), 'positionError');
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhoneNumber();
    const isInterestValid = validateInterest();
    
    if (isFirstNameValid && isLastNameValid && isCompanyNameValid && isPositionValid && 
        isEmailValid && isPhoneValid && isInterestValid) {
      
      // Show loading state
      const submitBtn = document.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const spinner = submitBtn.querySelector('.spinner');
      
      btnText.style.opacity = '0';
      spinner.style.display = 'block';
      submitBtn.disabled = true;
      
      // Prepare form data
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        companyName: document.getElementById('companyName').value,
        position: document.getElementById('position').value,
        phoneCountry: document.getElementById('selectedCode').textContent,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
      };
      
      // Simulate API call (replace with actual webhook URL)
      setTimeout(() => {
        // In a real implementation, you would use fetch to post to your webhook
        // fetch('https://your-webhook-url.com', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },<boltAction type="file" filePath="main.js">
        //   body: JSON.stringify(formData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //   // Show success message
        //   form.style.display = 'none';
        //   formSuccess.style.display = 'block';
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        //   alert('There was an error submitting the form. Please try again.');
        // })
        // .finally(() => {
        //   btnText.style.opacity = '1';
        //   spinner.style.display = 'none';
        //   submitBtn.disabled = false;
        // });
        
        // For demo purposes, just show success message
        console.log('Form data:', formData);
        form.style.display = 'none';
        formSuccess.style.display = 'block';
        
        btnText.style.opacity = '1';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
      }, 1500);
    }
  });
});
