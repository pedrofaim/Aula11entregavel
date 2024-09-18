// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verifica se o produto já está no carrinho
    const produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade; // Aumenta a quantidade se já existe
    } else {
        carrinho.push({ id, nome, valor, quantidade }); // Adiciona novo produto
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtra para remover o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const listaCarrinho = document.getElementById('carrinho');
    listaCarrinho.innerHTML = '';

    if (carrinho && carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${produto.valor.toFixed(2)}`;

            // Botão para remover o produto do carrinho
            const botaoRemover = document.createElement('button');
            botaoRemover.textContent = 'Remover';
            botaoRemover.onclick = () => removerProduto(produto.id);
            li.appendChild(botaoRemover);

            listaCarrinho.appendChild(li);
        });
    } else {
        listaCarrinho.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();