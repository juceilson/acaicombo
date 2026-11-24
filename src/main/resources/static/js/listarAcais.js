async  function deleteAçaí(id){
    if (!confirm('Deseja realmente excluir este acai?')) return;
    const res = await fetch(`acais/delete/${id}`, {method:'DELETE'});
    if (res.ok) {loadAcais()}
}

async function loadAcais() {
    try {

        const res = await fetch('acais/list');
        const list = await res.json();
        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';

        list.forEach(a => {
            const card = `
                <div class="d-flex align-items-center bg-white" style="width: 400px">
                    <div class="flex-shrink-0">
                        <img src="${a.img_url}" class="alt=${a.nome}" width="128">
                    </div>
                    <div class="flex-grow-1 m-3">
                        <h4 class="card-title mt-2">${a.nome}</h4>
                        <p class="card-text b">${a.volume} - R$${a.preco}</p>
                        <p class="card-text">${a.descricao}</p>
                        <div class="d-flex gap-3 d-none" data-role="ADMIN">
                            <button class="btn btn-success"
                                onClick="window.location.href='/editarAcai.html?id=${a.id}'">Editar</button>
                            <button class="btn btn-outline-danger"
                                onClick="deleteAcai(${a.id})" >Excluir</button>
                        </div>
                    </div>
                </div> 
            `;
            cardContainer.insertAdjacentHTML('beforeend', card);
        });
        await verificarPermissao()
    } catch (e) {
        console.error(e);
    }
}

async function verificarPermissao() {
    try {
        const response = await fetch('/auth/me');
        if (!response.ok) {
            window.location.href = '/login.html';
            return null;
        }
        const user = await response.json();

        document.querySelectorAll('[data-role]').forEach(element => {
            if (element.dataset.role === user.role) {
                element.classList.remove('d-none');
                element.classList.add('d-block');
            }
        });

        // insere o relatorio.js apenas se for ADMIN
        if (user.role === 'ADMIN') {
            const scriptRelatorio = document.createElement("script");
            scriptRelatorio.src = "/js/relatorio.js";
            document.body.appendChild(scriptRelatorio);
        }
        
        return user;
    } catch (error) {
        console.error('Erro ao verificar permissões:', error);
        return null;
    }
}

window.addEventListener('DOMContentLoaded', loadAcais);