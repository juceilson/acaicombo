async  function deleteUser(username){
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    const res = await fetch(`users/delete/${username}`, {method:'DELETE'});
    if (res.ok) {loadUsers()}
}
async function loadUsers() {
    try {
        const res = await fetch('users/list');
        const list = await res.json();
        const tbody = document.getElementById('userBody');
        tbody.innerHTML = '';
        list.forEach(u => {
            const row = `<tr>
                    <td>${u.username}</td>
                    <td>${u.role}</td>
                    <td>
                        <button onclick="deleteUser('${u.username}')" class="btn btn-outline-danger">Excluir</button>
                    </td>
                </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
    } catch (e) {
        console.error(e);
    }
}
window.addEventListener('DOMContentLoaded', loadUsers);
