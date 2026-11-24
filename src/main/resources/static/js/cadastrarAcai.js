async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const acai = {
        nome: form.nome.value,
        descricao: form.descricao.value,
        preco: parseFloat(form.preco.value),
        volume: form.volume.value,
        img_url: form.img_url.value,
    };
    const res = await fetch('acais/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(acai)
    });
    if (res.ok) {
        alert('acai cadastrado');
        window.location.href = '/listarAcais.html';
    } else {
        alert('Erro ao cadastrar acai');
    }
}
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('acaiForm').addEventListener('submit', onSubmit);
});