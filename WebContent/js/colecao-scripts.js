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
					'<div class="mini-card" id="' + colecao.cartas[i].carta.id + '">' +
					'<span class="carta-qtde">x' + colecao.cartas[i].quantidade + '</span></div>'
				;
				$('#'+colecao.cartas[i].carta.id).css({background:'url(img/cards/' + colecao.cartas[i].carta.id + '.PNG) no-repeat', 'background-size': '100%'});
			}
			invocaHover();
		},
		error : function() {
			alert('Erro ao pegar as cartas');
		}
	});
}
buscaCartas();
//--------- Mostrar carta grandona no hover ---------
var timeoutId;
function invocaHover(){
	$(".mini-card").hover(function(event) {
	    if (!timeoutId) {
	        timeoutId = window.setTimeout(function() {
	        	var x = event.clientX + 40;
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