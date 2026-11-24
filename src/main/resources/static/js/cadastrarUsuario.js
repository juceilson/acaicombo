async function onSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const user = {
        username: form.username.value,
        password: form.password.value,
        role: form.role.value
    };
    const res = await fetch('users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    if (res.ok) {
        alert('Usuário cadastrado com sucesso');
        window.location.href = 'listarUsuarios.html';
    } else {
        alert('Erro ao cadastrar usuário');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userForm').addEventListener('submit', onSubmit);
});
async function baixarRelatorioPDF(event) {
    event.preventDefault();
    try {
        const response = await fetch('/relatorio/pdf');

        if (!response.ok) {
            throw new Error('Erro ao gerar relatório');
        }

        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');
    } catch (e) {
        console.error(e);
        alert('Não foi possível carregar o relatório PDF.');
    }
}