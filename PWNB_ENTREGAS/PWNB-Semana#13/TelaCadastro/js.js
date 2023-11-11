// meu array de clientes
let clientes = [];
// localStorage.removeItem('lista') apaga storage
let clienteParaAlterar;  // Declarei a variável no escopo global

// para fazer algo após o click "Incluir"
document.querySelector('#botaoIncluir').addEventListener('click', function (event) {
    // Evita que o formulário seja enviado (a página seja recarregada)
    event.preventDefault();

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const tipoCliente = document.getElementById('tipoCliente').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const idCliente = document.getElementById('idCliente').value;

    // Aqui estou fazendo algumas validações de segurança
    
    if (nome === '') {
        alert('O campo "Nome" não pode estar vazio. Preencha-o antes de incluir o cliente.');
        return; // Proíbe a inclusão se o campo estiver vazio
    }

    if (idCliente === '') {
        alert('O campo "ID Cliente" não pode estar vazio. Preencha-o antes de incluir o cliente.');
        return; // Proíbe a inclusão se o campo estiver vazio
    }

    if (!/^\d+$/.test(idCliente)) {
        alert('O campo "ID Cliente" deve conter apenas números.');
        return; // Só permite incluir no array se o campo id for um número
    }
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        alert('O campo "CEP" deve estar no formato nnnnn-ccc, onde nnnnn é o número do CEP e ccc é o complemento (todos numéricos).');
        return;
    }
    // Crie um objeto cliente com os dados
    const novoCliente = {
        nome,
        tipoCliente,
        sobrenome,
        dataNascimento,
        cidade,
        cep,
        endereco,
        idCliente,
    };

    // Adiciona o novo cliente ao array
    clientes.push(novoCliente);

    // Limpo os campos após incluir no array
    document.getElementById('nome').value = '';
    document.getElementById('tipoCliente').value = 'bronze'; // ou outro valor padrão
    document.getElementById('sobrenome').value = '';
    document.getElementById('data-nascimento').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('idCliente').value = '';

    localStorage.setItem('lista',JSON.stringify(clientes))
});

// Listar cliente
document.querySelector('#botaoListarCliente').addEventListener('click', function (event) {

    event.preventDefault();

    // Seletor da tabela
    const tabelaClientes = document.getElementById('tabelaClientes').querySelector('tbody');

    // Limpe o conteúdo anterior da tabela
    tabelaClientes.innerHTML = '';

    // Percorra o array de clientes e adicione linhas à tabela
    clientes.forEach(function (cliente) {
        const row = tabelaClientes.insertRow();
        const idClienteCelula = row.insertCell(0);
        const tipoCelula = row.insertCell(1);
        const nomeCelula = row.insertCell(2);
        const sobrenomeCelula = row.insertCell(3);
        const dataNascimentoCelula = row.insertCell(4);
        const cidadeCelula = row.insertCell(5);
        const cepCelula = row.insertCell(6);
        const enderecoCelula = row.insertCell(7);

        // Preencha as células com os dados do cliente
        idClienteCelula.innerText = cliente.idCliente;
        tipoCelula.innerText = cliente.tipoCliente;
        nomeCelula.innerText = cliente.nome;
        sobrenomeCelula.innerText = cliente.sobrenome;
        dataNascimentoCelula.innerText = cliente.dataNascimento;
        cidadeCelula.innerText = cliente.cidade;
        cepCelula.innerText = cliente.cep;
        enderecoCelula.innerText = cliente.endereco;
    });
});

// Alterar cliente
document.querySelector('#botaoAlterarCliente').addEventListener('click', function (event) {
    // Evita que o formulário seja enviado (a página seja recarregada)
    event.preventDefault();

    // Coleta o ID do cliente a ser alterado
    const idCliente = document.getElementById('idCliente').value;

    // Valide se o ID do cliente está preenchido
    if (idCliente === '') {
        alert('O campo "ID Cliente" não pode estar vazio. Preencha-o antes de alterar o cliente.');
        return;
    }

    // Valide se o ID do cliente é um número
    if (!/^\d+$/.test(idCliente)) {
        alert('O campo "ID Cliente" deve conter apenas números.');
        return;
    }

    // Busque o cliente com o ID especificado no array
    clienteParaAlterar = clientes.find(cliente => cliente.idCliente === idCliente);

    // Verifique se o cliente foi encontrado
    if (clienteParaAlterar) {
        // Preencha os campos do formulário com os dados do cliente encontrado
        document.getElementById('nome').value = clienteParaAlterar.nome;
        document.getElementById('tipoCliente').value = clienteParaAlterar.tipoCliente;
        document.getElementById('sobrenome').value = clienteParaAlterar.sobrenome;
        document.getElementById('data-nascimento').value = clienteParaAlterar.dataNascimento;
        document.getElementById('cidade').value = clienteParaAlterar.cidade;
        document.getElementById('cep').value = clienteParaAlterar.cep;
        document.getElementById('endereco').value = clienteParaAlterar.endereco;
    } else {
        alert('Cliente com o ID especificado não encontrado.');
    }
});

// Botão "Salvar" no formulário (já existente no HTML)
const botaoSalvar = document.querySelector('#botaoSalvarAlteracao');

// Associe o evento de clique ao botão "Salvar"
botaoSalvar.addEventListener('click', function (event) {
    event.preventDefault();

    // Coleta os dados do formulário após a edição
    const nome = document.getElementById('nome').value;
    const tipoCliente = document.getElementById('tipoCliente').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;

    // Verifique se a variável clienteParaAlterar está definida
    if (clienteParaAlterar) {
        // Atualize o cliente no array com os dados editados
        clienteParaAlterar.nome = nome;
        clienteParaAlterar.tipoCliente = tipoCliente;
        clienteParaAlterar.sobrenome = sobrenome;
        clienteParaAlterar.dataNascimento = dataNascimento;
        clienteParaAlterar.cidade = cidade;
        clienteParaAlterar.cep = cep;
        clienteParaAlterar.endereco = endereco;

        // Limpe os campos do formulário
        document.getElementById('nome').value = '';
        document.getElementById('tipoCliente').value = 'bronze'; // ou outro valor padrão
        document.getElementById('sobrenome').value = '';
        document.getElementById('data-nascimento').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('cep').value = '';
        document.getElementById('endereco').value = '';
        document.getElementById('idCliente').value = '';

        // Confirme a edição no array
        console.log(clientes);

        // Chame a função para atualizar a tabela
        atualizarTabelaClientes();
    } else {
        alert('Nenhum cliente para alterar. Selecione um cliente para alterar antes de clicar em "Salvar".');
    }
});

// Função de atualizar tabela
function atualizarTabelaClientes() {
    const tabelaClientes = document.getElementById('tabelaClientes').querySelector('tbody');
    tabelaClientes.innerHTML = ''; // Limpa a tabela

    clientes.forEach(function (cliente) {
        const row = tabelaClientes.insertRow();
        const idClienteCelula = row.insertCell(0);
        const tipoCelula = row.insertCell(1);
        const nomeCelula = row.insertCell(2);
        const sobrenomeCelula = row.insertCell(3);
        const dataNascimentoCelula = row.insertCell(4);
        const cidadeCelula = row.insertCell(5);
        const cepCelula = row.insertCell(6);
        const enderecoCelula = row.insertCell(7);

        idClienteCelula.innerText = cliente.idCliente;
        tipoCelula.innerText = cliente.tipoCliente;
        nomeCelula.innerText = cliente.nome;
        sobrenomeCelula.innerText = cliente.sobrenome;
        dataNascimentoCelula.innerText = cliente.dataNascimento;
        cidadeCelula.innerText = cliente.cidade;
        cepCelula.innerText = cliente.cep;
        enderecoCelula.innerText = cliente.endereco;
    });
}


document.querySelector('#excluirCliente').addEventListener('click', function (event) {
    event.preventDefault();

    // Coleta o ID do cliente a ser excluído
    const idCliente = document.getElementById('idCliente').value;

    // Valide se o ID do cliente está preenchido
    if (idCliente === '') {
        alert('O campo "ID Cliente" não pode estar vazio. Preencha-o antes de excluir o cliente.');
        return;
    }

    // Valide se o ID do cliente é um número
    if (!/^\d+$/.test(idCliente)) {
        alert('O campo "ID Cliente" deve conter apenas números.');
        return;
    }

    // Busque o índice do cliente com o ID especificado no array
    const indiceClienteExcluir = clientes.findIndex(cliente => cliente.idCliente === idCliente);

    // Verifique se o cliente foi encontrado
    if (indiceClienteExcluir !== -1) {
        // Remove o cliente do array usando o índice
        clientes.splice(indiceClienteExcluir, 1);

        // Limpe o campo do ID do cliente
        document.getElementById('idCliente').value = '';

        // Mostra um alerta informando que o cliente foi excluído com sucesso
        alert('Cliente excluído com sucesso.');

        // Chame a função para atualizar a tabela de clientes
        atualizarTabelaClientes();
    } else {
        // Mostra um alerta informando que o cliente não foi encontrado
        alert('Cliente com o ID especificado não encontrado.');
    }
});

document.querySelector('#botaoConsultarCEP').addEventListener('click', function (event) {
    event.preventDefault();

    // Coleta o valor do CEP
    const cep = document.getElementById('cep').value;

    // Valida o formato do CEP (nnnnn-nnn)
    if (!/^\d{5}-\d{3}$/.test(cep)) {
        alert('O campo "CEP" deve estar no formato nnnnn-nnn, onde nnnnn é o número do CEP e nnn são dígitos adicionais.');
        return;
    }

    // Faz a consulta à API ViaCEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado. Verifique o CEP informado.');
            } else {
                // Preenche os campos de endereço e cidade com os dados obtidos
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
            }
        })
        .catch(error => {
            alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
            console.error(error);
        });
});
