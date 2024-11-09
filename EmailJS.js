import emailjs from 'emailjs-com';

const sendEmail = (formData) => {
  emailjs.init('YOUR_PUBLIC_KEY'); // Update with your Public Key

  emailjs.send('service_udwt00c', 'YOUR_TEMPLATE_ID', {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  })
  .then((response) => {
    console.log('Email sent successfully!', response);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
};
