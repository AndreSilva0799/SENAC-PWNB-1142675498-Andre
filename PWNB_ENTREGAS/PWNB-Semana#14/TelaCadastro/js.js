// Meu array de clientes
let clientes = JSON.parse(localStorage.getItem('lista')) || [];
// Variável global para armazenar o cliente que está sendo alterado
let clienteParaAlterar;

function main() {
  // para fazer algo após o clique "Incluir"
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

      // Valida se o ID do cliente já existe
  const clienteExistente = clientes.find(cliente => cliente.idCliente === idCliente);
  if (clienteExistente) {
    alert('ID Cliente já cadastrado. Escolha um ID único.');
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

    localStorage.setItem('lista', JSON.stringify(clientes));
  });

  // Listar cliente
  document.querySelector('#botaoListarCliente').addEventListener('click', function (event) {
    event.preventDefault();

    localStorage.setItem('lista', JSON.stringify(clientes));

    // Redirecione para a página de lista de clientes
    const vetorComoString = JSON.stringify(clientes);

    window.location.href = 'listaClientes.html?idCliente=' + encodeURIComponent(vetorComoString);
  });

  // Consultar CEP
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
}

function alterarCliente(cliente) {
  // Armazene o cliente que está sendo alterado
  clienteParaAlterar = cliente;

  // Preencha os campos do formulário com os dados do cliente
  document.getElementById('nome').value = cliente.nome;
  document.getElementById('tipoCliente').value = cliente.tipoCliente;
  document.getElementById('sobrenome').value = cliente.sobrenome;
  document.getElementById('data-nascimento').value = cliente.dataNascimento;
  document.getElementById('cidade').value = cliente.cidade;
  document.getElementById('cep').value = cliente.cep;
  document.getElementById('endereco').value = cliente.endereco;
  document.getElementById('idCliente').value = cliente.idCliente;
}

function excluirCliente(cliente) {
  // Confirmação com o usuário antes de excluir
  const confirmacao = confirm(`Deseja realmente excluir o cliente com ID ${cliente.idCliente}?`);

  if (confirmacao) {
    // Encontrar o índice do cliente no array
    const indiceClienteExcluir = clientes.findIndex(c => c.idCliente === cliente.idCliente);

    if (indiceClienteExcluir !== -1) {
      // Remove o cliente do array
      clientes.splice(indiceClienteExcluir, 1);

      // Atualiza a tabela e o localStorage
      atualizarTabelaClientes2(clientes);
      atualizarLocalStorage(clientes);
    }
  }
}

function listaClientes() {
  // Função para obter parâmetros da URL
  function obterParametrosDaURL() {
    const parametros = new URLSearchParams(window.location.search);
    return Object.fromEntries(parametros.entries());
  }

  // Obter parâmetros da URL
  const parametros = obterParametrosDaURL();

  // Carregar dados do localStorage se disponíveis
  const dadosLocalStorage = JSON.parse(localStorage.getItem('lista')) || [];

  // Usar dados do localStorage se disponíveis, senão, usar dados da URL
  const clientes = dadosLocalStorage.length > 0 ? dadosLocalStorage : JSON.parse(parametros.idCliente);


  // Agora você tem o vetor na página de destino
  console.log(clientes);

  document.getElementById('botaoVoltar').addEventListener('click', function () {
    // Redirecione de volta para a tela de Cadastro
    window.location.href = 'index.html';
  });

  // Função para alterar um cliente
  function alterarCliente(cliente) {
    // Armazene o cliente que está sendo alterado
    clienteParaAlterar = cliente;

    // Preencha os campos do formulário com os dados do cliente
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('tipoCliente').value = cliente.tipoCliente;
    document.getElementById('sobrenome').value = cliente.sobrenome;
    document.getElementById('data-nascimento').value = cliente.dataNascimento;
    document.getElementById('cidade').value = cliente.cidade;
    document.getElementById('cep').value = cliente.cep;
    document.getElementById('endereco').value = cliente.endereco;
    document.getElementById('idCliente').value = cliente.idCliente;
}

  // Botão "Salvar" no formulário (já existente no HTML)
  // Botão "Salvar" no formulário (já existente no HTML)
  document.getElementById('botaoSalvarAlteracao').addEventListener('click', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipoCliente = document.getElementById('tipoCliente').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const cidade = document.getElementById('cidade').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;

    if (clienteParaAlterar) {
      clienteParaAlterar.nome = nome;
      clienteParaAlterar.tipoCliente = tipoCliente;
      clienteParaAlterar.sobrenome = sobrenome;
      clienteParaAlterar.dataNascimento = dataNascimento;
      clienteParaAlterar.cidade = cidade;
      clienteParaAlterar.cep = cep;
      clienteParaAlterar.endereco = endereco;

      document.getElementById('nome').value = '';
      document.getElementById('tipoCliente').value = 'bronze';
      document.getElementById('sobrenome').value = '';
      document.getElementById('data-nascimento').value = '';
      document.getElementById('cidade').value = '';
      document.getElementById('cep').value = '';
      document.getElementById('endereco').value = '';

      atualizarTabelaClientes2(clientes);
      clienteParaAlterar = null; // Limpe a variável após a edição
      atualizarLocalStorage(clientes); // Atualize o localStorage após a alteração
      console.log(clientes);
    } else {
      alert('Nenhum cliente para alterar. Selecione um cliente para alterar antes de clicar em "Salvar".');
    }
  });
 
  atualizarTabelaClientes2(clientes);
}

function atualizarTabelaClientes2(_clientes) {
  const tabela = document.getElementById('tabelaClientes').getElementsByTagName('tbody')[0];
  tabela.innerHTML = ''; // Limpa a tabela

  for (let i = 0; i < _clientes.length; i++) {
    const cliente = _clientes[i];

    const linha = tabela.insertRow();

    const _idCliente = linha.insertCell(0);
    _idCliente.textContent = cliente.idCliente;

    const _tipoCliente = linha.insertCell(1);
    _tipoCliente.textContent = cliente.tipoCliente;

    const _nome = linha.insertCell(2);
    _nome.textContent = cliente.nome;

    const _sobrenome = linha.insertCell(3);
    _sobrenome.textContent = cliente.sobrenome;

    const _dataNascimento = linha.insertCell(4);
    _dataNascimento.textContent = cliente.dataNascimento;

    const _cidade = linha.insertCell(5);
    _cidade.textContent = cliente.cidade;

    const _cep = linha.insertCell(6);
    _cep.textContent = cliente.cep;

    const _endereco = linha.insertCell(7);
    _endereco.textContent = cliente.endereco;

    // Adiciona um botão "Alterar" em cada linha
    const _alterar = linha.insertCell(8);
    const botaoAlterar = document.createElement('button');
    botaoAlterar.textContent = 'Alterar';
    botaoAlterar.classList.add('btn', 'btn-warning');

    botaoAlterar.addEventListener('click', function () {
      // Chama a função alterarCliente com o cliente atual
      alterarCliente(cliente);
    });

    _alterar.appendChild(botaoAlterar);

    // Adiciona um botão "Excluir" em cada linha
    const _excluir = linha.insertCell(9);
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.classList.add('btn', 'btn-danger');

    botaoExcluir.addEventListener('click', function () {
      // Chama a função excluirCliente com o cliente atual
      excluirCliente(cliente);
    });

    _excluir.appendChild(botaoExcluir);
  }
}

// Função para atualizar o localStorage com a lista de clientes
function atualizarLocalStorage(clientes) {
  localStorage.setItem('lista', JSON.stringify(clientes));
}