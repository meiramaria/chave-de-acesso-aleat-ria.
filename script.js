// Elementos da página
const campoSenha = document.getElementById("campo-senha");

const botoes = document.querySelectorAll(".parametro-senha__botao");
const tamanhoTexto = document.querySelector(".parametro-senha__texto");

const checkboxes = document.querySelectorAll("input[type='checkbox']");

const barra = document.querySelector(".barra-forca");
const barraForca = document.querySelector(".barra-forca");
const nivel = document.querySelector(".nivel");

// Caracteres disponíveis
const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()-_=+?";

// Tamanho inicial
let tamanhoSenha = 12;

// Atualiza número mostrado
tamanhoTexto.textContent = tamanhoSenha;

// ----------------------
// Gerar senha
// ----------------------

function gerarSenha() {

    let caracteres = "";

    if (checkboxes[0].checked) caracteres += maiusculas;
    if (checkboxes[1].checked) caracteres += minusculas;
    if (checkboxes[2].checked) caracteres += numeros;
    if (checkboxes[3].checked) caracteres += simbolos;

    if (caracteres === "") {
        campoSenha.value = "";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {

        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indice];

    }

    campoSenha.value = senha;

    verificarForca();

}

// ----------------------
// Força da senha
// ----------------------

function verificarForca() {

    let pontos = 0;

    if (tamanhoSenha >= 8) pontos++;
    if (tamanhoSenha >= 12) pontos++;

    let marcados = 0;

    checkboxes.forEach(c => {
        if (c.checked) marcados++;
    });

    pontos += marcados;

    if (pontos <= 3) {

        barraForca.style.width = "30%";
        barraForca.style.background = "red";
        nivel.textContent = "Fraca";

    }

    else if (pontos <= 5) {

        barraForca.style.width = "65%";
        barraForca.style.background = "orange";
        nivel.textContent = "Média";

    }

    else {

        barraForca.style.width = "100%";
        barraForca.style.background = "#00ff66";
        nivel.textContent = "Forte";

    }

}

// ----------------------
// Botões + e -
// ----------------------

botoes[0].addEventListener("click", () => {

    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }

});

botoes[1].addEventListener("click", () => {

    if (tamanhoSenha < 40) {
        tamanhoSenha++;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }

});

// ----------------------
// Atualiza ao marcar opções
// ----------------------

checkboxes.forEach(c => {

    c.addEventListener("change", gerarSenha);

});

// ----------------------
// Clicar na senha copia
// ----------------------

campoSenha.addEventListener("click", () => {

    navigator.clipboard.writeText(campoSenha.value);

    alert("Senha copiada!");

});

// Gera a primeira senha
gerarSenha();