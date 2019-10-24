//-------- Atualiza exibição das cartas --------
function atualizaCartas(container, fonte){
	if(fonte != deck){
		document.getElementById(container).innerHTML = "";
	}else{
		document.getElementById("cards-deck").innerHTML = 
			'<div class="champion-card" id="' + deck.campeao.id + '" style="background:url(img/cards/' + deck.campeao.id + '.PNG) no-repeat;background-size:100%"></div>'
		;
	}
	for(var i = 0; i < fonte.cartas.length; i++){
		document.getElementById(container).innerHTML += 
			'<div class="mini-card" id="' + fonte.cartas[i].carta.id + '" style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
			'<span class="carta-qtde">x' + fonte.cartas[i].quantidade + '</span></div>'
		;
	}
	invocaHover();
}

//-------- Atualiza coleção --------
var colecao;
function buscaCartas(){
	$.ajax({
		url : 'buscaColecaoServlet',
		data : {
			teste : 'vazio'
		},
		type : 'post',
		cache : false,
		success : function(data) {
			colecao = JSON.parse(data);
			//console.log(colecao);
			atualizaCartas("cards-colecao", colecao);
		},
		error : function(e) {
			alert('Erro ao pegar as cartas: ' + e);
		}
	});
}
buscaCartas();

//--------- Atualiza o baralho ---------
var deck;
function buscaBaralho(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		data : {
			teste : 'vazio'
		},
		type : 'post',
		cache : false,
		success : function(data) {
			deck = JSON.parse(data);
			console.log(deck);//					
			atualizaCartas("cards-deck", deck);
			atualizaDeckInfo();
			invocaHover();
		},
		error : function() {
			alert('Erro ao pegar as cartas');
		}
	});
}
buscaBaralho();


// ------- Atualiza as informações sobre o deck -------
function atualizaDeckInfo(){
	var somaRank =  deck.campeao.rank;
	var qtdeHerois = 1;
	var somaForca =  deck.campeao.forca;
	var somaPoder =  deck.campeao.poder;
	var qtdeCartas = 1 + deck.cartas.length;
	
	for(var i = 0; i < deck.cartas.length; i++){
		if(!isNaN(deck.cartas[i].carta.rank)){
			somaRank += deck.cartas[i].carta.rank;
			qtdeHerois++;
			somaForca += deck.cartas[i].carta.forca;
			somaPoder += deck.cartas[i].carta.poder;
		}
	}
	document.getElementById("info-rank").innerHTML = somaRank;
	document.getElementById("info-herois").innerHTML = qtdeHerois;
	document.getElementById("info-qtde").innerHTML = qtdeCartas;
	document.getElementById("info-forca").innerHTML = somaForca;
	document.getElementById("info-poder").innerHTML = somaPoder;
}

//--------- Mostrar carta grandona no hover ---------
var timeoutId;
function invocaHover(){
	$(".mini-card, .champion-card").hover(function(event) {
	    if (!timeoutId) {
	        timeoutId = window.setTimeout(function() {
	        	//console.log(event.target.parentElement.id);
	        	if(event.target.parentElement.id == "cards-colecao"){
	        		var x = event.clientX + 40;
	        	}else{
	        		var x = event.clientX - 300;
	        	}
	        	var y = event.clientY; 
	            timeoutId = null;
	            $('#carta-grandona').css({display:'block', left:x+'px',background:'url(img/cards/' + event.target.id + '.PNG) no-repeat', 'background-size': '100%'});
	       }, 500);
	    }
	},
	function () { //oumouseleave
	    if (timeoutId) { //impede que a função delayzada rode
	        window.clearTimeout(timeoutId);
	        timeoutId = null;
	    }
	    else { //roda quando a delayzada não tá no aguardo
	    	 $('#carta-grandona').css({display:'none'});
	    }
	});
}
invocaHover();


function addToDeck(id){
	console.log(id);
}