
var jogador;
function startVsIa(){
	$.ajax({
		url : 'buscaBaralhoServlet',
		type : 'post',
		success : function(data) {
			jogador = JSON.parse(data);			
			jogo.jogador1 = jogador.jogador;			
			jogo.baralho1 = jogador.baralho;
			
			jogo.jogador2 = oponente;
			jogo.baralho2 = oponente.baralho;
			
			jogo.tipo = 0;
			carregaTelaInicial();
		},
		error : function() {
			alert('Erro ao pegar as suas cartas');
		}
	});	
}

function carregaTelaInicial(){
	var delay = 0;
	
	document.getElementById('container-choose-game').style.width = "0px";
	document.getElementById('container-choose-game').style.height = "580px";
	
	var createdDiv1= document.createElement("div");
	createdDiv1.setAttribute("class", "player-info");
	createdDiv1.setAttribute("id", "info1");
	createdDiv1.innerHTML = "<img src='img/icons/" + jogo.jogador1.icone + ".jpg' class='player-icon' id='icon1'>" +
	jogo.jogador1.usuario + "<br>" +
	"Lvl " + jogo.jogador1.nivel;
	document.getElementById('game-container').appendChild(createdDiv1);
	
	var createdDiv2= document.createElement("div");
	createdDiv2.setAttribute("class", "player-info");
	createdDiv2.setAttribute("id", "info2");
	if(jogo.tipo == 0){
		var txtBuscaIcon = "icons/" + jogo.jogador2.icone;
		if(jogo.jogador2.jogador == null || jogo.jogador2.jogador == undefined){
			txtBuscaIcon = "oponentes/oponente" + jogo.jogador2.id;
		}
		createdDiv2.innerHTML = "<img src='img/" + txtBuscaIcon + ".jpg' class='player-icon' id='icon2'>" +
		jogo.jogador2.nome + "<br>" +
		"Lvl " + jogo.jogador2.nivel;
	}
	document.getElementById('game-container').appendChild(createdDiv2);
	
	delay += 700;
	setTimeout(function(){
		document.getElementById('container-choose-game').style.display = "none";
		document.getElementById('game-container').style.opacity = "1";
		document.getElementById('game-container').style.width = "1200px";		
	},delay);
	
	delay += 800;
	setTimeout(function(){
		var createdImgVs= document.createElement("div");
		createdImgVs.setAttribute("id", "game-vs");
		document.getElementById('game-container').appendChild(createdImgVs);
	}, delay);
	
	delay += 2000;
	setTimeout(function(){
		$('.player-info').css({'opacity':'0'});
		document.getElementById('game-vs').style.top = "-170px";
	}, delay);
	
	delay += 500;
	setTimeout(function(){
		$('.player-info').css({'display':'none'});
		document.getElementById('game-vs').style.display = "none";
		mostraJogo();
	}, delay);
}

function mostraJogo(){
	desenhaLateralDireita();
	desenhaMaos();
	desenhaCampo();
}

function desenhaLateralDireita(){
	var createdChatContainer = document.createElement("div");
	createdChatContainer.setAttribute("id", "game-chat-container");
	
	//div com o profile de baixo
	var createdPerfil1 = document.createElement("div");
	createdPerfil1.setAttribute("class", "ingame-profile");
	createdPerfil1.setAttribute("id", "ingame-profile1");
	var createdIcon1 = document.createElement("img");
	createdIcon1.setAttribute("class", "ingame-profile-icon");
	if(jogo.jogador1 == jogador.jogador){ //se o player for o j1, ele fica embaixo
		createdIcon1.setAttribute("src", "img/icons/" + jogo.jogador1.icone + ".jpg");
		createdPerfil1.innerHTML += jogo.jogador1.usuario;
	} else {
		createdIcon1.setAttribute("src", "img/icons/" + jogo.jogador2.icone + ".jpg");
		createdPerfil1.innerHTML += jogo.jogador2.usuario;
	}
	createdPerfil1.appendChild(createdIcon1);
	createdChatContainer.appendChild(createdPerfil1);
	
	//div com o profile de cima
	var createdPerfil2 = document.createElement("div");
	createdPerfil2.setAttribute("class", "ingame-profile");
	createdPerfil2.setAttribute("id", "ingame-profile2");
	var createdIcon2 = document.createElement("img");
	createdIcon2.setAttribute("class", "ingame-profile-icon");	
	if(jogo.jogador2 == jogador.jogador){ //se o player for o j2, mostra ele embaixo e o outro em cima
		createdIcon2.setAttribute("src", "img/icons/" + jogo.jogador1.icone + ".jpg");
		createdPerfil2.innerHTML += jogo.jogador1.usuario;
	} else {
		if(jogo.jogador2.usuario == null || jogo.jogador2.usuario == undefined){
			createdIcon2.setAttribute("src", "img/oponentes/oponente" + jogo.jogador2.id + ".jpg");
			createdPerfil2.innerHTML += jogo.jogador2.nome;
		} else {
			createdIcon2.setAttribute("src", "img/icons/" + jogo.jogador2.icone + ".jpg");
			createdPerfil2.innerHTML += jogo.jogador2.usuario;
		}
	}
	createdPerfil2.appendChild(createdIcon2);
	createdChatContainer.appendChild(createdPerfil2);
	
	//textfield
	var createdTextField = document.createElement("input");
	createdTextField.setAttribute("id", "ingame-textfield");
	createdTextField.setAttribute("placeholder", "Digite sua mensagem...");
	createdChatContainer.appendChild(createdTextField);
	
	//chat
	var createdChat = document.createElement("div");
	createdChat.setAttribute("id", "ingame-chat");
	createdChatContainer.appendChild(createdChat);
	
	document.getElementById('game-container').appendChild(createdChatContainer);
}

function desenhaMaos(){
	var createdMao1 = document.createElement("div");
	createdMao1.setAttribute("class", "ingame-hand-container");
	createdMao1.setAttribute("id", "hand-jogador");
	document.getElementById('game-container').appendChild(createdMao1);
	
	var createdMao2 = document.createElement("div");
	createdMao2.setAttribute("class", "ingame-hand-container");
	createdMao2.setAttribute("id", "hand-oponente");
	document.getElementById('game-container').appendChild(createdMao2);
}

function desenhaCampo(){
	var createdBackLine1 = document.createElement("div");
	createdBackLine1.setAttribute("class", "ingame-line");
	createdBackLine1.setAttribute("id", "backline-jogador");
	document.getElementById('game-container').appendChild(createdBackLine1);
	
	var createdFrontLine1 = document.createElement("div");
	createdFrontLine1.setAttribute("class", "ingame-line");
	createdFrontLine1.setAttribute("id", "frontline-jogador");
	document.getElementById('game-container').appendChild(createdFrontLine1);
	
	var createdSlot1 = document.createElement("div");
	createdSlot1.setAttribute("class", "ingame-card-slot");
	
	createdFrontLine1.appendChild(createdSlot1);
}

//function desenhaCampo(){
//	desenhaMaos();
//	
//	var createdSlot1 = document.createElement("div");
//	createdSlot1.setAttribute("class", "ingame-card-slot");
//	
//	document.getElementById('game-container').appendChild(createdSlot1);
//}

var jogo = {
		tipo : 0,
		
		jogador1 : null,
		baralho1 : [],
		mao1 : [],
		campo1: {
			frente : [],
			tras : []
		},
		descarte1 : [],
		recarga1 : [],
		//--------------
		jogador2 : null,
		baralho2 : [],
		mao2 : [],
		campo2: {
			frente : [],
			tras : []
		},
		descarte2 : [],
		recarga2 : []
}