function trocaOption(opcao){
	if(opcao == "inside-option-offline") {
		document.getElementById('option-underline').style.left = "50px";
	} else {
		document.getElementById('option-underline').style.left = "400px";
	}
	
	$(".inside-option").css({display:"none"});
	document.getElementById(opcao).style.display = "block";
}

function carregaMiniOponentes(){
	for(var i = 1; i <= 21; i++){
		var createImg = document.createElement("img");
		createImg.setAttribute("src", "img/oponentes/oponente" + i + ".jpg");
		createImg.setAttribute("class", "mini-oponente");
		createImg.setAttribute("id", "oponente" + i);
		createImg.setAttribute("onclick", "escolherOponente(" + i + ")");
		document.getElementById("container-mini-oponentes").appendChild(createImg);
	}
}
carregaMiniOponentes();

var oponente;
function escolherOponente(oponente){
	document.getElementById('oponente-img').style.background = "url(img/oponentes/oponente" + oponente + ".jpg) no-repeat";
	document.getElementById('oponente-img').style.backgroundSize = "100%";
	
	$.ajax({
		url : 'buscaOponenteServlet',
		data : {id : oponente},
		type : 'post',
		success : function(data) {
			oponente = JSON.parse(data);
			
			document.getElementById('oponente-nome').innerHTML = oponente.nome;
			document.getElementById('oponente-nome').style.backgroundColor = 'transparent';
			document.getElementById('oponente-nome').style.border = 'none';
			
			document.getElementById('oponente-nivel').innerHTML = "Nível " + oponente.nivel;
			document.getElementById('oponente-nivel').style.backgroundColor = 'transparent';
			document.getElementById('oponente-nivel').style.border = 'none';
			
			document.getElementById('oponente-dificuldade').innerHTML = "Dificuldade: fácil";
			document.getElementById('oponente-dificuldade').style.backgroundColor = 'transparent';
			document.getElementById('oponente-dificuldade').style.border = 'none';
			
			document.getElementById('oponente-recompensa').innerHTML = "Recompensa: $15";
			document.getElementById('oponente-recompensa').style.backgroundColor = 'transparent';
			document.getElementById('oponente-recompensa').style.border = 'none';
			
			document.getElementById('btn-desafiar').style.display = 'block';
		},
		error : function(e) {
			alert('Erro ao buscar o oponente');
		}
	});
};

function iniciarContraOponente(){
	
}