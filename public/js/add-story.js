
document.getElementById('add-story-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/api/validate-story', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            document.getElementById('story-preview').innerHTML = `
                <h2>Предварительный просмотр</h2>
                <p>Заголовок: ${data.preview.title}</p>
                <p>Содержание: ${data.preview.content}</p>
            `;
        } else {
            alert('Ошибка: ' + data.message);
        }
    });
});
