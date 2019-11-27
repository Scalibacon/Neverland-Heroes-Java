var topicos = [false,false,false,false,false,false,false];

function alternaTopico(ajuda, tamanho){
	
	if(!topicos[ajuda-1]){
		document.getElementById("ajuda" + ajuda).style.height = tamanho + "px";
	} else {
		document.getElementById("ajuda" + ajuda).style.height = "0px";
	}
	
	topicos[ajuda-1] = !topicos[ajuda-1];
}

//********************************************************************

function carregaCartas(){
	var qtde = 104;
//	$.ajax({
//        url:'lastCardServlet',
//        type:'post',
//        success:function(data){
//        	qtde = parseInt(data);
//        }
//     });
	
	for(var i = 1; i <= qtde; i++){
		(function(j){
			var carta_div = document.createElement("div");
			carta_div.setAttribute("class", "carta-help");
			carta_div.setAttribute("id", "carta-help" + i);
			carta_div.addEventListener("click", function(){ mostrarCartona(j); }); 
			
			carta_div.style.background = "url(img/cards/" + j + ".jpg) no-repeat";
			carta_div.style.backgroundSize = "100%";
			
			document.getElementById('cardlist-container').appendChild(carta_div);
		}(i));
	}	
}
carregaCartas();

function mostrarCartona(id_carta){
	document.getElementById('background-veil').style.display = "block";
	var cartona = document.getElementById('help-cartona');
	cartona.style.background = "url(img/cards/" + id_carta + ".jpg) no-repeat";
	cartona.style.backgroundSize = "100%";	
}
function escondeCartona(){
	document.getElementById('background-veil').style.display = "none";
}
