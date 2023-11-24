const chaveDaApi = "97702dfd1ef94deda9c03810232411";

const botaoDeBusca = document.querySelector(".btn-busca");


botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if(dados) preencherDadosNaTela(dados, cidade);  
});


async function buscarDadosDaCidade(cidade){
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    const resposta = await fetch(apiUrl);

    if(resposta.status !== 200) return;

    const dados = resposta.json();

    return dados; 
}

function preencherDadosNaTela(dados, cidade){
    const temperatura = dados.current.temp_c;
    const nomeCidade = dados.location.name;
    const nomeEstado = dados.location.region;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;
    const diaHora = dados.location.localtime;
    
    
    document.getElementById("cidade").textContent = nomeCidade;
    document.getElementById("estado").textContent = nomeEstado;

    document.getElementById("temperatura").textContent = `${temperatura} °C`;

    document.getElementById("condicao").textContent = condicao;
    document.getElementById("horario-local").textContent = diaHora;

    document.getElementById("humidade").textContent = `${humidade} %`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento} Km/h`;

    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao )

}