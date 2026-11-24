document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch("/auth/login", { method: "POST", body: formData })
        .then(response => {
            if (!response.ok) throw new Error("Falha no login");
            return response.text();
        })
        .then(role => {
            if (role === "USER") {
                window.location.href = "/listarAcais.html";
            } else {
                window.location.href = "/";
            }
        })
        .catch(() => {
            alert("Usuário ou senha inválidos.");
        });
});