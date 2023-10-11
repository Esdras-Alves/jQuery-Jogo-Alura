var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    reiniciaJogo();
    inicializaMarcadores();
});

function atualizaTamanhoFrase() {
    var numPalavras = $(".frase").text().split(" ").length;
    $("#tamanho-frase").text(numPalavras);
}


function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(conteudo.length);
    })
}

function inicializaCronometro() {
    campo.focus(function () {
        $("#botao-reiniciar").attr("disabled", true);
        var tempoRestante = $("#tempo-digitacao").text();
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    })
}

function finalizaJogo(tempoRestante, cronometroID) {
    campo.attr("disabled", true);
    $("#botao-reiniciar").attr("disabled", false);
    campo.addClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    $("#botao-reiniciar").click(function () {
        campo.attr("disabled", false);
        campo.val("");
        $("#contador-palavras").text("0");
        $("#contador-caracteres").text("0");
        $("#tempo-digitacao").text(tempoInicial);
        inicializaCronometro();
        campo.removeClass("campo-desativado");
        campo.removeClass("borda-verde");
        campo.removeClass("borda-verde");
    })
}

function inicializaMarcadores() {
    campo.on("input", function () {
        var frase = $(".frase").text();
        var digitado = campo.val();
        var comparavel = frase.substring(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    })
}