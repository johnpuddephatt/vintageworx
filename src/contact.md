---
layout: layouts/page.njk
title: Contact
header:
  title: Contact us
  description: |
    We’re always looking for new ideas, potential partners or people who just want to get in touch.

    Use the form below to start talking to us, or email [enquiries@vintageworx.org.uk](mailto:enquiries@vintageworx.org.uk)
  image: /assets/images/contact-header.jpg
---
<section class="section section--page-events">
<div class="container">
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<form method="POST" action="https://form.letsdance.agency/A4nlvMWO" class="contact-form">
  <h2 class="form-title">Contact us</h2>
  <input type="text" name="_honey" value="" style="display: none;">
  <input type="hidden" name="_subject" value="New message received from VintageWorx.org.uk" >
  <input type="email" name="_replyto" placeholder="Your email" required="">
  <input type="text" name="name" placeholder="Your name" required="">
  <textarea rows="7" name="message" placeholder="Your message" required=""></textarea>
  <div class="g-recaptcha" data-sitekey="6LdNn1AUAAAAAA-VLy7CCzufqQi7EhPyoWQwcHIM"></div>
  <input type="submit" value="Send">
</form>


<script>
  if (document.forms[0] && window.FormData) {

  	var message = new Object();
  	message.loading = 'Loading...';
  	message.success = 'Thank you. Message received!';
  	message.failure = 'Whoops! There was a problem sending your message.';

  	var form = document.forms[0];
    var formAction = form.getAttribute("action");
  	var statusMessage = document.createElement('div');
  	statusMessage.classList.add('status');
    statusMessage.classList.add('padded-box');

  	// Set up the AJAX request
  	var request = new XMLHttpRequest();
  	request.open('POST', formAction, true);
  	request.setRequestHeader('accept', 'application/json');

  	// Listen for the form being submitted
  	form.addEventListener('submit', function(evt) {

	    evt.preventDefault();
      form.insertAdjacentElement('beforeend', statusMessage);

	    // Create a new FormData object passing in the form's key value pairs (that was easy!)
	    var formData = new FormData(form);

	    // Send the formData
	    request.send(formData);

	    // Watch for changes to request.readyState and update the statusMessage accordingly
	    request.onreadystatechange = function () {

        // <4 =  waiting on response from server
        if (request.readyState < 4)
            statusMessage.innerHTML = message.loading;

        // 4 = Response from server has been completely loaded.
        else if (request.readyState === 4) {

            // 200 - 299 = successful
            if (request.status == 200 && request.status < 300)
                statusMessage.innerHTML = message.success;
            else
              statusMessage.innerHTML = message.failure;
        }
	    }
  	});

  }
</script>
</div>
</section>
