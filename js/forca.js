
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;


const palavras = [
    palavra001={
        nome: "IRLANDA",
        categoria: "LUGAR"
    },
    palavra002={
        nome: "EQUADOR",
        categoria: "LUGAR"
    },
    palavra003={
        nome: "PIZZA",
        categoria: "COMIDA"
    },
    palavra004={
        nome: "SORVETE",
        categoria: "COMIDA"
    },
    palavra005={
        nome: "FACA",
        categoria: "OBJETO"
    },
    palavra006={
        nome: "GELADEIRA",
        categoria: "OBJETO"
    },
    palavra007={
        nome: "BORBOLETA",
        categoria: "ANIMAL"
    },
    palavra008={
        nome: "GOLFINHO",
        categoria: "ANIMAL"
    },
    palavra009={
        nome: "MARGARIDA",
        categoria: "FLOR"
    },
    palavra010={
        nome: "ROSA",
        categoria: "FLOR"
    },
]

criarPalavraSecreta();
function criarPalavraSecreta(){
    //gerar um numero aleatoriamente com o math random e multiplicar pelo total de elementos do objeto (palavras) e converter em numero inteiro
    const indexPalavra = parseInt(Math.random() * palavras.length); 
    

    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;

    console.log(indexPalavra, palavraSecretaCategoria, palavraSecretaSorteada);
}

montarPalavranaTela();
function montarPalavranaTela(){
    // alterra o elemento que está no html
    const categoria = document.getElementById("categoria"); //estou tirando o valor do texto que esta no html
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = ""; //e substituindo pelo valor que está na categoria, através de javascript

    //aqui estou criando o espaço vazio que a palavra sorteada deve ocupar.

    for(i = 0 ; i < palavraSecretaSorteada.length; i++){     //dentro do for, eu quero que o numero de espaços seja igual ao comprimento da palavra sorteada
        if(listaDinamica[i]==undefined){                    //ou seja, se a variavel lista estiver vazia (por padrao ela esta), eu quero que ela assuma um valor de "espaço" para cada letra da palavra sorteada. ou seja, "ovo" geraria 3 espaços
            listaDinamica[i] = "&nbsp;"
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        }
        else{
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        }
    }
}

//aqui eu vou passar o valor da letra clicada para dentro de uma funçõao que vai concatenar com o id da letra clicada
function verificaLetraEscolhida(letra){
   document.getElementById("tecla_" + letra).disabled = true;
   
    if(tentativas > 0)
    {   
        mudarStyleLetra("tecla_" + letra);
        comparaListas(letra);
        montarPalavranaTela();
    }
}

//aqui eu pego o id da letra clicada e jogo pro css mudando algumas características via javascript
function mudarStyleLetra(tecla){
        document.getElementById(tecla).style.background = "#c71585";
        document.getElementById(tecla).style.color = "white";
}

function comparaListas(letra){ 
    const pos = palavraSecretaSorteada.indexOf(letra)
    //toda palavra é uma string e toda string é um array, logo, toda letra tem um index dentro da palavra. o indexOf pega o valor sendo passado no argumento e verifica se existe na palavra que ele esta analisando e retorna o index da letra na palavra

    if(pos < 0){ //se nao existir a letra, ele perde uma tentativa e adicionamos a imagem da forca
        tentativas--;
       carregaImagemForca();
    }
        else{ //agora, se a letra existir
            for(i = 0; i < palavraSecretaSorteada.length; i++){ //eu vou novamente gerar os espaços em branco (dessa vez só o index)
                if(palavraSecretaSorteada[i] == letra){ //comparo se esse "espaço em branco" da palavra sorteada tem a letra que eu cliquei
                    listaDinamica[i] = letra;   //se tiver, ele assume o valor da letra
                }
            }
        }

    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){ 
        if(palavraSecretaSorteada[i] != listaDinamica[i]){  // se os indices das duas palavras foram diferentes, o valor da vitoria é falso
            vitoria = false;  
        }
    }
    if(vitoria == true){
        //mensagem na tela
        tentativas = 0;

    }
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("img").style.background = "url('../img/forca01.png')";
            break;
        case 4:
            document.getElementById("img").style.background = "url('../img/forca02.png')";
            break;    
        case 3:
            document.getElementById("img").style.background = "url('../img/forca03.png')";
            break;    
        case 2:
            document.getElementById("img").style.background = "url('../img/forca04.png')";
            break;    
        case 1:
            document.getElementById("img").style.background = "url('../img/forca05.png')";
                break;    
        case 0:
            document.getElementById("img").style.background = "url('../img/forca06.png')";
            break;   
        }
}