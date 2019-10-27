//-------- Atualiza exibição das cartas --------
function atualizaCartas(container, fonte){
	var tipoId;
	if(fonte == colecao){
		tipoId = "colecao";
		document.getElementById(container).innerHTML = "";
	}else{
		tipoId = "deck";
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
				'<div class="mini-card" id="' + tipoId + fonte.cartas[i].carta.id + '" onclick=tirarDoDeck(' + fonte.cartas[i].carta.id + ') oncontextmenu=adicionarCampeao(' + fonte.cartas[i].carta.id + ') style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
				'<span class="carta-qtde">x' + fonte.cartas[i].quantidade + '</span></div>'
			;
		}		
	}
	
	if(fonte == deck){
		atualizaDeckInfo();
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
			console.log(colecao);
			atualizaCartas("cards-colecao", colecao);
			buscaBaralho();
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
		},
		error : function() {
			alert('Erro ao pegar as cartas');
		}
	});
}

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
					//console.log("Mais que 3");
					podeAdd = false;
					return;
				} else //
				if(quantidadeNoDeck >= cartaPraAdd.quantidade){
					//console.log("Mais que você tem - " + cartaPraAdd.quantidade);
					podeAdd = false;
					return;
				}else{
					//console.log("Já tem no deck, mas pode add");
					deck.cartas[i].quantidade++;
					atualizaCartas("cards-deck", deck);
					return;
				}
				break;
			}
		}
		
		var cartaProntaPraAdd = JSON.parse(JSON.stringify(cartaPraAdd));
		cartaProntaPraAdd.quantidade = 1;
		deck.cartas.push(cartaProntaPraAdd);
		atualizaCartas("cards-deck", deck);
	}
}

function tirarDoDeck(id){
	for(var i = 0; i < deck.cartas.length; i++){
		if(deck.cartas[i].carta.id == id){
			if(deck.cartas[i].quantidade > 1){
				deck.cartas[i].quantidade--;
			}else{
				deck.cartas.splice(i, 1);
			}
			break;
		}
	}
	atualizaCartas("cards-deck", deck);
	$('#carta-grandona').css({display:'none'});	
}

function adicionarCampeao(id){	
	for(var i = 0; i < deck.cartas.length; i++){
		if(deck.cartas[i].carta.id == id){
			if(isNaN(deck.cartas[i].carta.rank) || deck.cartas[i].carta.id == deck.campeao.id){
				return;
			} else {
				var exCampeao = JSON.parse(JSON.stringify(deck.campeao));
				deck.campeao = deck.cartas[i].carta;
				tryToDeck(exCampeao.id);
				if(deck.cartas[i].quantidade > 1){
					deck.cartas[i].quantidade--;
				} else {
					deck.cartas.splice(i, 1);
				}
				atualizaCartas("cards-deck", deck);
				$('#carta-grandona').css({display:'none'});
				return;
			}
		}
	}
}

// ------- Atualiza as informações sobre o deck -------
function atualizaDeckInfo(){
	var somaRank =  deck.campeao.rank;
	var qtdeHerois = 1;
	var somaForca =  deck.campeao.forca;
	var somaPoder =  deck.campeao.poder;
	var qtdeCartas = 1;
	
	for(var i = 0; i < deck.cartas.length; i++){
		if(!isNaN(deck.cartas[i].carta.rank)){
			somaRank += (deck.cartas[i].carta.rank * deck.cartas[i].quantidade);
			qtdeHerois += 1 * deck.cartas[i].quantidade;
			somaForca += (deck.cartas[i].carta.forca * deck.cartas[i].quantidade);
			somaPoder += (deck.cartas[i].carta.poder * deck.cartas[i].quantidade);
		}
		qtdeCartas += (1 * deck.cartas[i].quantidade);
	}
	document.getElementById("info-rank").innerHTML = somaRank;
	document.getElementById("info-herois").innerHTML = qtdeHerois;
	document.getElementById("info-qtde").innerHTML = qtdeCartas;
	document.getElementById("info-forca").innerHTML = somaForca;
	document.getElementById("info-poder").innerHTML = somaPoder;
}

//--------- Salva o deck ---------
function saveDeck(){
	console.log('foi');
}

//--------- Mostrar carta grandona no hover ---------
var timeoutId;
function invocaHover(){
	$(".mini-card, .champion-card").hover(function(event) {
	    if (!timeoutId) {
	        timeoutId = window.setTimeout(function() {
	        	if(event.target.parentElement != null && event.target.parentElement.id == "cards-colecao"){
	        		var x = event.clientX + 40;
	        	}else{
	        		var x = event.clientX - 300;
	        	}
	        	var y = event.clientY; 
	            timeoutId = null;	
	            if(event.target != null){
	            	var idAsNumber = event.target.id.match(/\d+/)[0];
	            	$('#carta-grandona').css({display:'block', left:x+'px',background:'url(img/cards/' + idAsNumber + '.PNG) no-repeat', 'background-size': '100%'});
	            }
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
	//impede de abrir o menu no right click
	$(".mini-card").contextmenu(function(e){
		e.preventDefault();
	});
}
invocaHover();
