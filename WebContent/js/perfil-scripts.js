var perfil;
function carregaPerfil(){
	$.ajax({
		url : 'buscaPerfilServlet',
		type : 'post',
		success : function(data) {
			perfil = JSON.parse(data);
			//console.log(perfil);//
			document.getElementById("perfil-usuario").innerHTML = perfil.usuario + "  #" + perfil.id;
			document.getElementById("perfil-level-text").innerHTML = "lvl " + perfil.nivel;
			document.getElementById("perfil-info-grana").innerHTML = "$" + perfil.dinheiro;
			document.getElementById("partida-total").innerHTML = "Partidas: " + perfil.partidas;
			document.getElementById("partida-vitoria").innerHTML = "Vitorias: " + perfil.vitorias;
			document.getElementById("partida-derrota").innerHTML = "Derrotas: " + perfil.derrotas;
			carregaBarraExp();
			verificaRank();
			verificaConquistas();
			$('#perfil-icone').css({background:'url(img/icons/' + perfil.icone + '.jpg) no-repeat',
								   'background-size': '100%'});
		},
		error : function(e) {
			alert('Erro ao buscar o perfil: ' + e);
		}
	});
}
carregaPerfil();

//verifica as conquistas do jogador
function verificaConquistas(){
	var conquistas;
	$.ajax({
	   url: 'js/json/conquistas.json',
	   dataType: 'json',
	   contentType:"application/x-javascript; charset:UTF-8",
	   success: function(data) {
		   	conquistas_json = data;
		 	//console.log(conquistas_json);
		   	var arr_conquistas = perfil.conquistas.split("-");
		 	for(var i = 0; i < arr_conquistas.length; i++){
		 		for(var j = 0; j < conquistas_json.conquistas.length; j++){
		 			if(arr_conquistas[i] == conquistas_json.conquistas[j].conquista.id){
		 				document.getElementById("conquista-container").innerHTML +=
		 					"<div class='conquista' id='conquista" + (i+1) + "'>" +
		 					"<img src='img/conquista" + conquistas_json.conquistas[j].conquista.tipo + ".png' class='conquista-img'>" +
		 					"<div class='conquista-titulo'>" + conquistas_json.conquistas[j].conquista.titulo + "</div>" +
		 					"<div class='conquista-texto'>" + conquistas_json.conquistas[j].conquista.texto + "</div>" +
		 					"</div>";
		 				break;
		 			}
		 		}
		 	}
	   }
	});
}

//verifica o rank do jogador
function verificaRank(){
	var rank = 1;
	
	if(perfil.partidas >= 100){ //rank2 100+ partidas
		rank++;
		if(perfil.vitorias > perfil.derrotas){ //rank3 win + lose
			rank++;
			if(perfil.partidas >= 500){ //rank4 500 +partidas
				rank++;
				if(perfil.vitorias >= (perfil.derrotas * 1.5)){ //rank5 win 50% maior lose
					rank++;
				}
			}
		}		
	}
	carregaRank(rank);
}

//carrega a barra de exp
function carregaBarraExp(){
	var porcentagem = (perfil.experiencia / (perfil.nivel * 100)) * 100;
	document.getElementById("perfil-xp-bar").style.width = porcentagem + "%";
}

//carrega a div com os ícones
function carregaIcones(){
	document.getElementById("container-icons");
	
	for(var i = 1; i <= 12; i++){
		document.getElementById("container-icons").innerHTML += 
			"<img src='img/icons/" + i + ".jpg' id='icon" + i + "' class='profile-icon' onclick='trocaIcone(" +i+")'>";
	}
}
carregaIcones();

//gerencia a tela com icones
function abreTelaIcones(){
	document.getElementById("background-veil").style.display = "block";
	document.getElementById("container-icons").style.display = "block";
}
function fechaTelaIcones(){
	document.getElementById("background-veil").style.display = "none";
	document.getElementById("container-icons").style.display = "none";
}

//atualiza a exibição das estrelas de rank
function carregaRank(rank){
	var margin = 150 - ((rank - 1) * 22.5);
	var ranks_html = "";
	
	for(var i = 1; i <= rank; i++){
		ranks_html += "<img src='img/rank.png' class='perfil-rank'> "
	}
	document.getElementById("perfil-rank-container").innerHTML = ranks_html;
	$("#perfil-rank-container").css({'margin-left':margin+"px"});
}

function trocaIcone(icone){
	$.ajax({
		url : 'changeIconServlet',
		data : {
			icone : icone
		},
		type : 'post',
		success : function(data) {
			$('#perfil-icone').css({background:'url(img/icons/' + icone + '.jpg) no-repeat',
				   'background-size': '100%'});
			fechaTelaIcones();
		},
		error : function(e) {
			alert('Erro ao atualizar o ícone: ' + e);
		}
	});
}