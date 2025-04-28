const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const displayedImage = document.getElementById('displayedImage');

uploadBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      displayedImage.src = data.url + '?t=' + new Date().getTime();
    } else {
      alert('Failed to upload image.');
    }
  }
});