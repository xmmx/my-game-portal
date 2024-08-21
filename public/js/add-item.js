
document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/api/validate-item', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            document.getElementById('preview').innerHTML = `
                <h2>Предварительный просмотр</h2>
                <p>Заголовок: ${data.preview.title}</p>
                <p>Описание: ${data.preview.description}</p>
            `;
        } else {
            alert('Ошибка: ' + data.message);
        }
    });
});
