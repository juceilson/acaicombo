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
