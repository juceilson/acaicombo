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
