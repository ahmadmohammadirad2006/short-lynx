// ELEMENTs
const shortenUrlBtnEl = document.getElementById('shortenUrlBtn');
const longUrlInputEl = document.getElementById('longUrlInput');
const shortUrlTextareaEl = document.getElementById('shortUrlTextarea');
const copysShortUrlBtnEl = document.getElementById('copysShortUrlBtn');
const alertEl = document.getElementById('alert');

// FUNCTIONs
const hideElement = function (el) {
  el.classList.add('hidden');
};

const showAlert = function (type, message, durationMs) {
  alertEl.classList.remove('hidden');
  alertEl.classList.add(`alert-${type}`);
  alertEl.textContent = message;
  setTimeout(function () {
    hideElement(alertEl);
  }, durationMs);
};

const clearInput = function (inp) {
  inp.value = '';
};

// Click on shortUrl button
shortenUrlBtnEl.addEventListener('click', async function (e) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/urls',
      data: {
        address: longUrlInputEl.value,
      },
    });
    clearInput(longUrlInputEl);
    shortUrlTextareaEl.value = res.data.data.newUrl.shortUrl;
  } catch (err) {
    showAlert('error', err.response.data.message, 1500);
    console.log(err);
  }
});

// Click on copy button
copysShortUrlBtnEl.addEventListener('click', function () {
  showAlert('success', 'Copied!', 800);
  navigator.clipboard.writeText(shortUrlTextareaEl.value);
});
