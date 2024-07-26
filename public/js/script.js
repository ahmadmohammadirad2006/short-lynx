// ELEMENTs
const shortenUrlBtnEl = document.getElementById('shortenUrlBtn');
const longUrlInputEl = document.getElementById('longUrlInput');
const shortUrlTextareaEl = document.getElementById('shortUrlTextarea');
const longUrlPlaceholderEl = document.getElementById('longUrlPlaceholder');
const copysShortUrlBtnEl = document.getElementById('copysShortUrlBtn');
const alertEl = document.getElementById('alert');

// FUNCTIONs
const hideElement = function (el) {
  el.classList.add('hidden');
};
let showAlertTimeout;
const showAlert = function (type, message) {
  clearTimeout(showAlertTimeout);
  alertEl.textContent = '';
  alertEl.classList.remove(`alert-success`);
  alertEl.classList.remove(`alert-error`);

  alertEl.classList.remove('hidden');

  alertEl.classList.add(`alert-${type}`);
  alertEl.textContent = message;

  showAlertTimeout = setTimeout(function () {
    hideElement(alertEl);
  }, 2000);
};
const clearInput = function (inp) {
  inp.value = '';
};

// Click on shortUrl button
shortenUrlBtnEl.addEventListener('click', async function (e) {
  try {
    if (longUrlInputEl.value.trim().length === 0)
      throw new Error('URL cannot be empty. Please provide a URL.');
    shortenUrlBtnEl.textContent = 'Processing...';
    const res = await axios({
      method: 'POST',
      url: '/api/v1/urls',
      data: {
        address: longUrlInputEl.value,
      },
    });
    shortenUrlBtnEl.textContent = 'Shorten URL';
    clearInput(longUrlInputEl);
    shortUrlTextareaEl.value = res.data.data.newUrl.shortUrl;
    longUrlPlaceholderEl.textContent = longUrlPlaceholderEl.href =
      res.data.data.newUrl.address;
  } catch (err) {
    shortenUrlBtnEl.textContent = 'Shorten URL';
    if (err?.response?.data?.message)
      showAlert('error', err.response.data.message);
    else if (err?.response?.data) showAlert('error', err.response.data);
    else showAlert('error', err.message);
  }
});

// Click on copy button
copysShortUrlBtnEl.addEventListener('click', function () {
  showAlert('success', 'Copied!', 800);
  navigator.clipboard.writeText(shortUrlTextareaEl.value);
});
