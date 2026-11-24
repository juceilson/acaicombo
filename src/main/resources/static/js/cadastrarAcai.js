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

//----------------------- Mudar a imagem dinamicamente -------------------------------

const imgInput = document.getElementById("img_url");
const imgPreview = document.getElementById("img_preview");
const fallbackImg = "/img/acai-tradicional.png";

function trocarImagem() {
    imgPreview.src = imgInput.value.trim() || fallbackImg;
}

imgInput.addEventListener("change", trocarImagem);
imgPreview.addEventListener("error", () => {
    imgPreview.src = fallbackImg;
});