document.write("<script type='text/javascript' src='js/sweetalert2.all.min.js'></script>");

//-------- Atualiza exibição das cartas --------
function atualizaCartas(fonte){
	var tipoId;
	var container;
	if(fonte == colecao){
		container = "cards-colecao";
		tipoId = "colecao";
		document.getElementById(container).innerHTML = "";
	}else{
		container = "cards-deck";
		tipoId = "deck";
		document.getElementById("cards-deck").innerHTML = 
			'<div class="champion-card" id="deck' + fonte.campeao.carta.id + '" style="background:url(img/cards/' + fonte.campeao.carta.id + '.jpg) no-repeat;background-size:100%"></div>'
		;
	}
	for(var i = 0; i < fonte.cartas.length; i++){		
		if(fonte == colecao){
			document.getElementById(container).innerHTML += 
				'<div class="mini-card" id="' + tipoId + fonte.cartas[i].carta.id + '" onclick=tryToDeck(' + fonte.cartas[i].carta.id + ') style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.jpg) no-repeat;background-size:100%">' +
				'<span class="carta-qtde">x' + fonte.cartas[i].quantidade + '</span></div>'
			;
		} else {
			document.getElementById(container).innerHTML += 
				'<div class="mini-card" id="' + tipoId + fonte.cartas[i].carta.id + '" onclick=tirarDoDeck(' + fonte.cartas[i].carta.id + ') oncontextmenu=adicionarCampeao(' + fonte.cartas[i].carta.id + ') style="background:url(img/cards/' + fonte.cartas[i].carta.id + '.jpg) no-repeat;background-size:100%">' +
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
		success : function(data) {
			colecao = JSON.parse(data);
			//console.log(colecao);
			atualizaCartas(colecao);
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
		success : function(data) {
			deck = JSON.parse(data);
			//console.log(data);//
			//console.log(deck);//					
			atualizaCartas(deck);				
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
	
	for(var i = 0; i < colecao.cartas.length; i++){
		if(colecao.cartas[i].carta.id == id){
			cartaPraAdd = colecao.cartas[i];
			break;
		}
	}	

	if(deck.campeao.carta.id == id){
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
					atualizaCartas(deck);
					return;
				}
				break;
			}
		}
		
		var cartaProntaPraAdd = JSON.parse(JSON.stringify(cartaPraAdd));
		cartaProntaPraAdd.quantidade = 1;
		deck.cartas.push(cartaProntaPraAdd);
		atualizaCartas(deck);
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
	atualizaCartas(deck);
	$('#carta-grandona').css({display:'none'});	
}

//adiciona um campeão e joga o anterior pro baralho
function adicionarCampeao(id){	
	for(var i = 0; i < deck.cartas.length; i++){
		if(deck.cartas[i].carta.id == id){
			if(isNaN(deck.cartas[i].carta.rank) || deck.cartas[i].carta.id == deck.campeao.carta.id){
				return;
			} else {
				var exCampeao = JSON.parse(JSON.stringify(deck.campeao));
				deck.campeao = deck.cartas[i];
				deck.campeao.quantidade = 1;
				tryToDeck(exCampeao.carta.id);
				if(deck.cartas[i].quantidade > 1){
					deck.cartas[i].quantidade--;
				} else {
					deck.cartas.splice(i, 1);
				}
				atualizaCartas(deck);
				$('#carta-grandona').css({display:'none'});
				return;
			}
		}
	}
}

// ------- Atualiza as informações sobre o deck -------
var allowSave = true;
function atualizaDeckInfo(){
	var somaRank =  deck.campeao.carta.rank;
	var qtdeHerois = 1;
	var somaForca =  deck.campeao.carta.forca;
	var somaPoder =  deck.campeao.carta.poder;
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
	if(somaRank > 20){
		allowSave = false;
		document.getElementById("info-rank").style.color = "rgba(231,68,68,1)";
	}else{
		document.getElementById("info-rank").style.color = "black";
	}
	
	document.getElementById("info-herois").innerHTML = qtdeHerois;
	if(qtdeHerois > 10){
		allowSave = false;
		document.getElementById("info-herois").style.color = "rgba(231,68,68,1)";		
	}else{
		document.getElementById("info-herois").style.color = "black";
	}
	
	document.getElementById("info-qtde").innerHTML = qtdeCartas;
	if(qtdeCartas > 60 || qtdeCartas < 20){
		allowSave = false;
		document.getElementById("info-qtde").style.color = "rgba(231,68,68,1)";
	}else{
		document.getElementById("info-qtde").style.color = "black";
	}	
	
	document.getElementById("info-forca").innerHTML = somaForca;
	document.getElementById("info-poder").innerHTML = somaPoder;
	
	if((qtdeCartas <= 60 && qtdeCartas >= 20) && qtdeHerois <= 10 && somaRank <= 20){
		allowSave = true;
	}
	
	if(!allowSave){
		document.getElementById("btn-salvar").style.filter = "grayscale(100%)";
	}else{
		document.getElementById("btn-salvar").style.filter = "grayscale(0%)";
	}
}

//--------- Salva o deck ---------
function saveDeck(){
	if(allowSave){
		var deckJSON = JSON.stringify(deck);
		$.ajax({
			url : 'saveDeckServlet',
			data : {
				deck : deckJSON
			},
			type : 'post',
			cache : false,
			success : function(data) {
				Swal.fire({
				  title: 'Deck gravado com sucesso! :)',
				  text: "Seu deck foi gravado com êxito em nosso sistema",
				  type: 'success'
				});			
			},
			error : function(e) {			
				Swal.fire({
				  title: 'Erro ao gravar o deck! :(',
				  text: "Ocorreu um erro inesperado e talcez suas alterações não tenham sido salvas",
				  type: 'error'
				});			
			}
		});
	}else{
		Swal.fire({
		  title: 'Seu deck não é válido :(',
		  text: "Certifique-se que seu deck está dentro das regras do jogo",
		  type: 'error'
		});	
	}
}

//Ordena o deck (Heroi --> Consumivel)
function sortDeck(){
	var tipos = ["CONSUMIVEL", "POSTURA", "MAGIA", "ARMA", "HEROI"];
	
	for(var j = 0; j < 5; j++){
		for(var i = 0; i < deck.cartas.length; i++){
			if(deck.cartas[i].carta.tipo_carta == tipos[j]){				
				var aux = deck.cartas[i];				
				deck.cartas.splice(i, 1);
				deck.cartas.unshift(aux);
			}
		}
	}
	atualizaCartas(deck);	
}

//--------- Reinvoca os events ---------
var timeoutId;
function invocaHover(){
	//mostra grandona no hover
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
	            var idAsNumber = event.target.id.match(/\d+/)[0];
	            $('#carta-grandona').css({display:'block', left:x+'px',background:'url(img/cards/' + idAsNumber + '.jpg) no-repeat', 'background-size': '100%'});
            }, 500);
	    }
	},
	//some com a grandona no leave
	function () {
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
