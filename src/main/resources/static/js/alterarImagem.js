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