
/* ========================================
   ALEX MT BARBER
   CADASTRO DOS PRODUTOS
======================================== */

/*
   Para adicionar produtos:
   1. Coloque a imagem dentro da pasta img.
   2. Acrescente um objeto nesta lista.
   3. Informe o nome e o arquivo da imagem.

   Exemplo:
   {
       nome: "Camiseta Preta",
       imagem: "camiseta-preta.jpg"
   }
*/

const produtos = [
    {
        nome: "CORTE DE CABELO",
        imagem: "produto-01.png"
    },
    {
        nome: "CAMISETAS",
        imagem: "produto-02.png"
    },
    {
        nome: "SANDALIAS",
        imagem: "produto-03.png"
    },

    {
        nome: "BERMUDAS",
        imagem: "produto-04.jfif"
    }
];

/* ========================================
   CONFIGURAÇÕES
======================================== */

const pastaImagens = "img/";
const telefoneWhatsApp = "5562981047284";

function criarLinkWhatsApp(produto) {
    const mensagem = `Olá! Tenho interesse em ${produto}. Poderia me passar mais informações?`;

    return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
}

/* ========================================
   CRIAR CARTÃO DE PRODUTO
======================================== */

function criarCartaoProduto(produto) {
    const cartao = document.createElement("a");

    cartao.className = "cartao-produto";
    cartao.href = criarLinkWhatsApp(produto.nome);
    cartao.target = "_blank";
    cartao.rel = "noopener noreferrer";
    cartao.setAttribute(
        "aria-label",
        `Tenho interesse no produto ${produto.nome}. Consultar pelo WhatsApp.`
    );

    const imagem = document.createElement("img");

    imagem.className = "imagem-produto";
    imagem.src = pastaImagens + produto.imagem;
    imagem.alt = produto.nome;
    imagem.loading = "lazy";
    imagem.decoding = "async";

    imagem.addEventListener("error", () => {
        imagem.remove();
        console.warn(`Imagem não encontrada: ${produto.imagem}`);
    }, { once: true });

    const nome = document.createElement("p");

    nome.className = "nome-produto";
    nome.textContent = produto.nome;

    cartao.append(imagem, nome);

    return cartao;
}

/* ========================================
   CARTÃO FINAL: WHATSAPP
======================================== */

function criarCartaoWhatsApp() {
    const cartao = document.createElement("div");
    cartao.className = "cartao-mais";

    const botao = document.createElement("a");

    botao.className = "botao-mais";
    botao.href = criarLinkWhatsApp("os produtos da barbearia");
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
    botao.setAttribute(
        "aria-label",
        "Quero saber mais sobre os produtos pelo WhatsApp"
    );

    const icone = document.createElement("span");
    icone.className = "icone-mais";
    icone.setAttribute("aria-hidden", "true");

    icone.innerHTML = `
        <svg viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#25D366"/>
            <path fill="#FFFFFF" d="M24 8.5a15 15 0 0 0-12.8 22.8L9 39l8-2.1A15 15 0 1 0 24 8.5Zm0 27.2c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5A12.2 12.2 0 1 1 24 35.7Zm6.7-9.1c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.3 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.3 0-.5 0-.7-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.4 1.4-1.4 3.3s1.4 3.8 1.6 4c.2.3 2.8 4.3 6.8 6 .9.4 1.7.7 2.3.8 1 .3 1.9.3 2.6.2.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5Z"/>
        </svg>
    `;

    const texto = document.createElement("span");
    texto.className = "texto-mais";
    texto.textContent = "Quero saber mais";

    botao.append(icone, texto);
    cartao.appendChild(botao);

    return cartao;
}

/* ========================================
   CARREGAR A VITRINE
======================================== */

function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");

    if (!lista) {
        console.error('Área de produtos não encontrada.');
        return;
    }

    lista.replaceChildren();

    produtos.forEach((produto) => {
        if (!produto.nome || !produto.imagem) {
            console.warn("Produto sem nome ou imagem:", produto);
            return;
        }

        lista.appendChild(criarCartaoProduto(produto));
    });

    // O botão de contato fica sempre por último.
    lista.appendChild(criarCartaoWhatsApp());
}

/* ========================================
   INICIALIZAÇÃO
======================================== */

function iniciarSite() {
    carregarProdutos();

    const ano = document.getElementById("ano-atual");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
}

iniciarSite();
