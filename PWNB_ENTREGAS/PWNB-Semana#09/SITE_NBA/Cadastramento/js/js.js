document.addEventListener("DOMContentLoaded", function () {
    // Seletor para o botão de login
    const loginButton = document.getElementById("login");

    // Adicionar um evento de clique ao botão de login
    loginButton.addEventListener("click", function (e) {
        e.preventDefault(); // Evitar o comportamento padrão do formulário

        // Obter os valores dos campos de email e senha
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        // Verificar se o email e a senha correspondem aos valores desejados
        if (email === "andrevictor2102@hotmail.com" && password === "210215") {
            // Redirecionar o usuário para outra página (por exemplo, "outraTela.html")
            window.location.href ="../Home/index.html";
        } else {
            // Exibir uma mensagem de erro se as credenciais estiverem incorretas
            alert("Credenciais incorretas. Tente novamente.");
        }
    });
});
