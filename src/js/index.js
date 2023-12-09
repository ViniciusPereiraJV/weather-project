const chaveDaApi = "0333317e05974bc485c201708232311";

const botaoDeBusca = document.querySelector(".btn-busca")

document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('video-background');
    video.playbackRate = 0.7; // Ajuste o valor para a velocidade desejada
  });

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.querySelector("#input-busca").value;
    const dados = await buscaDadosDaCidade(cidade)
    console.log(dados);
    preencherDadosNaTela(dados, cidade);
    checkTemp(dados.current.temp_c);
 
});

function checkTemp(temperatura) {
    if(temperatura >= 30){
        console.log("muito quente");
    }if (temperatura <= 15) {
        console.log("muito frio");
    }
}

async function buscaDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;
   
    const resposta = await fetch(apiUrl);

    if(resposta.status !== 200){
        return
    }

    const dados = resposta.json();

    return dados
}
function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;
    
    
    

    document.getElementById("cidade").textContent = cidade;

    document.getElementById("temperatura").textContent = `${temperatura}°C`;

    document.getElementById("condicao").textContent = condicao;

    document.getElementById("humidade").textContent = `${humidade}%`;

    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
;}