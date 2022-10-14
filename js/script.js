var altura = 0;
var largura = 0;
const vidas = ['vida1', 'vida2', 'vida3', 'vida4', 'vida5']; //Array para controle das vidas
var i = 0; //Variável iterável para o indice
var tempo = 60; //Variável que define o tempo

var tempoCriaMosca = 1500; //Variavel de tempo

var nivel = window.location.search; //Pegar nivel recebido da página
nivel = nivel.replace('?', ''); //Substituindo caracter

/*A partir da dificuldade definir tempo*/
if(nivel === 'facil') {
    tempoCriaMosca = 3000; //Alterar o tempo de criacao da mosca
} else if(nivel === 'medio') {
    tempoCriaMosca = 1500; //Alterar o tempo de criacao da mosca
} else if(nivel === 'dificil') {
    tempoCriaMosca = 1000; //Alterar o tempo de criacao da mosca
} else if(nivel === 'expert') {
    tempoCriaMosca = 750; //Alterar o tempo de criacao da mosca
}

//Para que mostre o tempo logo quando começar a contar
document.getElementById('cronometro').innerHTML = tempo;

//Ajustar o tamanho do cenário dinamicamente
function ajustaTamanhoCenario() {
    altura = window.innerHeight; //Definir altura da página
    largura = window.innerWidth; //Definir largura da página
}

ajustaTamanhoCenario() //Sempre chamar a função

//Controlar o tempo
var cronometro = setInterval(function() {
    tempo -= 1; //Para reduzir o tempo conforme corre o cronometro
     
    if(tempo < 0) { //Se o tempo acabou
        clearInterval(cronometro) //Interromper o tempo
        clearInterval(criaMosca) //Interromper a criação
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('cronometro').innerHTML = tempo; //Colocar o cronometro entre às tags
    }

}, 1000); // a cada 1 segundo, ou 1000 milisegundos


//Criar posições randômicas
function posicaoRandom() {

    //Para que não apareça mais de uma mosca simultaneamente 
    if (document.getElementById('mosca')) { //Se encontrar uma mosca é verdadeiro
        document.getElementById('mosca').remove(); //Remover a mosca 

        if(i >= 4) { //Se às vidas acabarem interromper
            window.location.href = 'fim_de_jogo.html' //Ir para a página de fim de jogo
        } else { //Caso não, continuar
            //Remover o coração pois a mosca foi removida automaticamente
            document.getElementById(vidas[i]).src = 'img/coracao_vazio.png';
            i+= 1; //Alterar o indice
        }
    }

    //-90 para que o tamanho seja menor que o limite e não ultrapasse a tela
    var posicaoX = Math.floor(Math.random() * largura) - 125;
    var posicaoY = Math.floor(Math.random() * altura) - 125;

    //Para corrigir erro da imagem ficar fora da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY; 
    
    var mosca = document.createElement('img'); //Criar elemento HTML
    mosca.src = 'img/mosca.png'; //Manipulando o atributo do elemento
    mosca.className = tamanhoRandom() + ' ' + ladoRandom(); //Atribuir duas classes a esse elemento vinda da função

    //Aplicar coordenadas
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';

    //O elemento precisa ter posição absoluta  
    mosca.style.position = 'absolute';

    //Adicionanod um identificador único
    mosca.id = 'mosca';

    //Remover o elemento ao clicar
    mosca.onclick = function() {
        this.remove();
    }

    document.body.appendChild(mosca); //Adicionar na página o elemento
}

//Tamanhos randômicos para a mosca
function tamanhoRandom() {
    //Multiplicar por 3 e fazer arredondamento garante os tamanhos de 0, 1 e 2
    var classe = Math.floor(Math.random() * 3); 

    //Retornar uma string com a classe
    switch(classe) {
        case 0:
            return 'mosca1';
        case 1:
            return 'mosca2';
        case 2:
            return 'mosca3';
    }
}

//Para colocar a mosca de lados aleatórios aleatórias 
function ladoRandom() {
    //Multiplicar por 2 garante os tamanhos de 0 e 1
    var classe = Math.floor(Math.random() * 2); 

    //Retornar uma string com a classe
    switch(classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
}
}