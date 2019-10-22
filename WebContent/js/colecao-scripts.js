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
			document.getElementById("cards-colecao").innerHTML = "";
			for(var i = 0; i < colecao.cartas.length; i++){
				document.getElementById("cards-colecao").innerHTML += 
					'<div class="mini-card" id="' + colecao.cartas[i].carta.id + '" style="background:url(img/cards/' + colecao.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
					'<span class="carta-qtde">x' + colecao.cartas[i].quantidade + '</span></div>'
				;
			}
			invocaHover();
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
			//console.log(deck);
			document.getElementById("cards-deck").innerHTML = 
				'<div class="champion-card" id="' + deck.campeao.id + '" style="background:url(img/cards/' + deck.campeao.id + '.PNG) no-repeat;background-size:100%"></div>'
			;			
			for(var i = 0; i < deck.cartas.length; i++){
				document.getElementById("cards-deck").innerHTML += 
					'<div class="mini-card" id="' + deck.cartas[i].carta.id + '" style="background:url(img/cards/' + deck.cartas[i].carta.id + '.PNG) no-repeat;background-size:100%">' +
					'<span class="carta-qtde">x' + deck.cartas[i].quantidade + '</span></div>'
				;
			}
			invocaHover();
		},
		error : function() {
			alert('Erro ao pegar as cartas');
		}
	});
}
buscaBaralho();
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