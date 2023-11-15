const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const botao = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica'); // acessar o ID
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const imagemIniciarOuPausar = document.querySelector('.app__card-primary-butto-icon');
const musica = new Audio('/sons/luna-rise-part-one.mp3'); //isso é um objeto
const musicaFim = new Audio ('/sons/beep.mp3');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaInicio = new Audio('./sons/play.wav');



let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaInput.addEventListener('change', () => {
        //.paused é uma propriedade do objeto audio. objeto nativo do JS
    if(musica.paused){
        //.play ou .pause são metodos do .paused
        musica.play();
    }else{
        musica.pause();
    }
})

// () => arrow function (é uma funçao anonima!).
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    botao.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    switch (contexto) {
        case "foco":
            texto.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`;        
            break;
        case "descanso-curto":
            texto.innerHTML=` Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo": 
            texto.innerHTML =` Hora de voltar à superfície.<br> <strong class="app__title-strong">Faça uma pausa longa.</strong>`;  
            break;
        default:
            break;
    
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegundos <= 0){
        //musicaFim.play();
        alert('Tempo Finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1 //-= decrementa
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        musicaPause.play();
        zerar();
        return
    }
    musicaInicio.play();
    //setInterval espera sempre 2 parametros o 1 o metodo que vc espera que seja executado e o 2 o tempo que execuçao recebe sempre o valor em milisegundos
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemIniciarOuPausar.setAttribute('src', '/imagens/pause.png');
}

function zerar() {  
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar'
    imagemIniciarOuPausar.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})//metodo nativo do obj date; minute e second -> propriedades
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()