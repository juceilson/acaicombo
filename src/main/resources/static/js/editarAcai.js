let acaiId;

async function onLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    acaiId = urlParams.get('id');

    if (!acaiId) {
        alert("Nenhum acai foi selecionado para edição.");
        window.location.href = "/listarAcais.html";
        return;
    }

    document.getElementById('acai-id').value = acaiId;

    try {
        const response = await fetch(`acais/${acaiId}`);

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do acai.");
        }

        const acai = await response.json();

        document.getElementById('nome').value = acai.nome;
        document.getElementById('descricao').value = acai.descricao;
        document.getElementById('preco').value = acai.preco;
        document.getElementById('volume').value = acai.volume;
        document.getElementById('img_url').value = acai.img_url;

    } catch (error) {
        console.error(error);
        alert("Erro ao carregar os dados do acai.");
    }
}

async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const acai = {
        id: Number(acaiId),
        nome: form.nome.value,
        descricao: form.descricao.value,
        preco: parseFloat(form.preco.value),
        volume: form.volume.value,
        img_url: form.img_url.value,
    };

    const res = await fetch(`acais/update/${acaiId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(acai)
    });

    if (res.ok) {
        alert('Açaí atualizado com sucesso!');
        window.location.href = 'listarAcais.html';
    } else {
        alert('Erro ao atualizar o acai.');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    await onLoad();
    document.getElementById('acaiForm').addEventListener('submit', onSubmit);
});