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

<form name="contact" data-netlify="true" method="POST" class="contact-form">
  <h2 class="form-title">Contact us</h2>
  <input type="text" name="_honey" value="" style="display: none;">
  <input type="hidden" name="_subject" value="New message received from VintageWorx.org.uk" >
  <input type="email" name="_replyto" placeholder="Your email" required="">
  <input type="text" name="name" placeholder="Your name" required="">
  <textarea rows="7" name="message" placeholder="Your message" required=""></textarea>
  <input type="submit" value="Send">
</form>

</div>
</section>
