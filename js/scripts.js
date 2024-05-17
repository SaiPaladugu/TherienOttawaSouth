document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('submitSuccessMessage');
    const errorMessage = document.getElementById('submitErrorMessage');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitButton.disabled = true;
  
      // Validate the form
      let isValid = true;
      const fullName = document.getElementById('fullName');
      const emailAddress = document.getElementById('emailAddress');
      const phoneNumber = document.getElementById('phoneNumber');
  
      if (!fullName.value) {
        fullName.classList.add('is-invalid');
        isValid = false;
      } else {
        fullName.classList.remove('is-invalid');
      }
  
      if (!emailAddress.value || !validateEmail(emailAddress.value)) {
        emailAddress.classList.add('is-invalid');
        isValid = false;
      } else {
        emailAddress.classList.remove('is-invalid');
      }
  
      if (!phoneNumber.value) {
        phoneNumber.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneNumber.classList.remove('is-invalid');
      }
  
      if (!isValid) {
        submitButton.disabled = false;
        return;
      }
  
      // Send the form data using EmailJS
      const templateParams = {
        name: fullName.value,
        email: emailAddress.value,
        phone: phoneNumber.value
      };
  
      const serviceID = "service_8rmdhrg"; // Replace with your EmailJS Service ID
      const templateID = "template_29r7ot7"; // Replace with your EmailJS Template ID
  
      emailjs.send(serviceID, templateID, templateParams)
        .then(function (response) {
          console.log('SUCCESS!', response.status, response.text);
          successMessage.classList.remove('d-none');
          errorMessage.classList.add('d-none');
          form.reset();
        }, function (error) {
          console.error('FAILED...', error);
          successMessage.classList.add('d-none');
          errorMessage.classList.remove('d-none');
          errorMessage.textContent = 'Error sending message: ' + error.text;
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    // Navbar shrink function
    var navbarShrink = function () {
      const navbarCollapsible = document.body.querySelector('#mainNav');
      if (!navbarCollapsible) {
        return;
      }
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };
  
    // Shrink the navbar
    navbarShrink();
  
    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
  
    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -40%'
      });
    }
  
    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  });
  