function carregaIcones(){
	document.getElementById("container-icons");
	
	for(var i = 1; i <= 12; i++){
		document.getElementById("container-icons").innerHTML += 
			"<img src='img/icons/" + i + ".jpg' id='icon" + i + "' class='profile-icon' onclick='trocaIcone(" +i+")'>";
	}
}
carregaIcones();

function abreTelaIcones(){
	document.getElementById("background-veil").style.display = "block";
}
function fechaTelaIcones(){
	document.getElementById("background-veil").style.display = "none";
}

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
	
}