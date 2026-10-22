// Contact Form Submission Controller - InvenTech
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mainContactForm');
    const statusAlert = document.getElementById('formStatusAlert');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending Message...</span>';
            }

            if (statusAlert) {
                statusAlert.style.display = 'none';
                statusAlert.className = 'form-status-alert';
            }

            const formData = new FormData(form);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(async response => {
                const res = await response.json();
                if (response.status === 200) {
                    if (statusAlert) {
                        statusAlert.className = 'form-status-alert success';
                        statusAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Thank you! Your inquiry has been sent successfully. Our solutions team will get back to you within 24 hours.</span>';
                        statusAlert.style.display = 'flex';
                    }
                    form.reset();
                } else {
                    throw new Error(res.message || 'Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                if (statusAlert) {
                    statusAlert.className = 'form-status-alert error';
                    statusAlert.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> <span>' + (error.message || 'Unable to send message right now. Please reach out directly on WhatsApp (+92 339 6500012) or Email.') + '</span>';
                    statusAlert.style.display = 'flex';
                }
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
            });
        });
    }
});
