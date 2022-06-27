let lindonome
let nome = {
    name:lindonome
}
function Iniciar(){
    lindonome = document.querySelector('.TelaInicial input').value
    nome = {
        name:lindonome
    }
    EntrarSala()
}
function EntrarSala(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)
    promise.then(SucessoEntrar)
    promise.catch(ErroEntrar)
}
function ErroEntrar(elemento){
    if(elemento.response.status === 400){
        alert('erro 400, Nome inválido \n Digite novamente')
        document.querySelector('.TelaInicial input').classList.add('erro')
        document.querySelector('.TelaInicial input').value = ''
    }
}
function SucessoEntrar(elemento){
    document.querySelector('.TelaInicial').classList.add('sumir')
    document.querySelector('.TelaPrincipal').classList.remove('sumir')
    BuscarMensagens()
    setInterval(BuscarMensagens, 3000)
    setInterval(ManterConexao, 5000)
}
function BuscarMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(CarregarMensagens)
}
function CarregarMensagens(elementos){
    console.log('carregando msgs')
    document.querySelector('.chat').innerHTML = ''
    for( let i = elementos.data.length - 1 ; i > 0 ; i = i-1){
        if(elementos.data[i].type === 'status'){
            const MensagensTemplate =
            `<div class="DivMensagem status">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
        }
        if(elementos.data[i].type === 'message'){
            const MensagensTemplate =
            `<div class="DivMensagem ">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span>para</span>
                <span class="usuario">${elementos.data[i].to}: </span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
        }
        if(elementos.data[i].type === 'private_message'){
            if(lindonome === elementos.data[i].to || lindonome === elementos.data[i].from){
                const MensagensTemplate =
                `<div class="DivMensagem reservadas">
                    <span class="horario">(${elementos.data[i].time})</span>
                    <span class="usuario">${elementos.data[i].from}</span>
                    <span>reservadamente para</span>
                    <span class="usuario">${elementos.data[i].to}: </span>
                    <span class="mensagem">${elementos.data[i].text}</span>
                </div>`
                document.querySelector('.chat').innerHTML += MensagensTemplate
            }
        }
    }
    RolagemAutomatica()
}
function RolagemAutomatica(){
    const ultimoelemento = document.querySelector('.DivMensagem')
    if(ultimoelemento.parentNode.classList.contains('Scroll')){
        return
    }
    ultimoelemento.parentNode.classList.add('Scroll')
    ultimoelemento.scrollIntoView()
}
function ManterConexao(){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome)
    promessa.then()
}



