
document.getElementById('add-media-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const progressElement = document.getElementById('upload-progress');
    fetch('/api/upload-media', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('media-preview').innerHTML = `<p>Загружено: ${data.fileName}</p>`;
        } else {
            alert('Ошибка: ' + data.message);
        }
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload-media', true);
    xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progressElement.textContent = `Загрузка: ${percentComplete.toFixed(2)}%`;
        }
    };
    xhr.send(formData);
});
