//-------- Atualiza exibição das cartas --------
function atualizaCartas(container, fonte){
	var tipoId;
	if(fonte != deck){
		tipoId = "colecao";
		document.getElementById(container).innerHTML = "";
	}else{
		tipoId = "deck"
		document.getElementById("cards-deck").innerHTML = 
			'<div class="champion-card" id="deck' + fonte.campeao.id + '" style="background:url(img/cards/' + fonte.campeao.id + '.PNG) no-repeat;background-size:100%"></div>'
		;
	}
	for(var i = 0; i < fonte.cartas.length; i++){		
		if(fonte == colecao){
			document.getElementById(container).innerHTML += 
				'<div class="mini-card" id="' + tipoId + fonte.cartas[i].carta.id + '" onclick=tryToDeck(' + fonte.cartas[i].carta.id + ') style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
				'<span class="carta-qtde">x' + fonte.cartas[i].quantidade + '</span></div>'
			;
		} else {
			document.getElementById(container).innerHTML += 
				'<div class="mini-card" id="' + tipoId + fonte.cartas[i].carta.id + '" style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
				'<span class="carta-qtde">x' + fonte.cartas[i].quantidade + '</span></div>'
			;
		}
		
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
		},
		error : function() {
			alert('Erro ao pegar as cartas');
		}
	});
}
buscaBaralho();

//adiciona uma carta da coleção ao baralho
function tryToDeck(id){
	var podeAdd = true;
	var quantidadeNoDeck = 0;
	var cartaPraAdd;
	
	if(deck.cartas.length >= 50){ //mudar caso a max qtde mude
		podeAdd = false;
		return;
	}	
	
	for(var i = 0; i < colecao.cartas.length; i++){
		if(colecao.cartas[i].carta.id == id){
			cartaPraAdd = colecao.cartas[i];
			break;
		}
	}	

	if(deck.campeao.id == id){
		quantidadeNoDeck++; //se limite for 1 setar pra false
		if(cartaPraAdd.quantidade == 1){
			podeAdd = false;
			return;
		}
	}
	
	if(podeAdd){
		for(var i = 0; i < deck.cartas.length; i++){
			if(deck.cartas[i].carta.id == id){
				quantidadeNoDeck += deck.cartas[i].quantidade;
				if(quantidadeNoDeck >= 3){ //tirar caso o limite seja 1
					return;
				} else //
				if(quantidadeNoDeck >= cartaPraAdd.quantidade){
					podeAdd = false;
					return;
				}else{
					deck.cartas[i].quantidade++;
					atualizaCartas("cards-deck", deck);
					return;
				}
				break;
			}
		}
		
		cartaPraAdd.quantidade = 1;
		deck.cartas.push(cartaPraAdd);
		atualizaCartas("cards-deck", deck);
	}
}

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
	            var idAsNumber = event.target.id.match(/\d+/)[0];
	            $('#carta-grandona').css({display:'block', left:x+'px',background:'url(img/cards/' + idAsNumber + '.PNG) no-repeat', 'background-size': '100%'});
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