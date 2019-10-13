function atualizaSettingsValidos() {
	var combo_tipo = document.getElementById("tipo");
	var tipo = combo_tipo.options[combo_tipo.selectedIndex].value;

	document.getElementById("afinidade").disabled = true;
	document.getElementById("rank").disabled = true;
	document.getElementById("hp").disabled = true;
	document.getElementById("mana").disabled = true;
	document.getElementById("ataque").disabled = true;
	document.getElementById("poder").disabled = true;
	document.getElementById("defesa").disabled = true;
	document.getElementById("resistencia").disabled = true;
	document.getElementById("pericia").disabled = true;
	document.getElementById("ganho").disabled = true;
	document.getElementById("recarga").disabled = true;
	document.getElementById("txt-mana").innerHTML = "Mana:";
	document.getElementById("txt-tipo-arma").innerHTML = "Tipo Arma";

	if (tipo == 3) {
		document.getElementById("pericia").disabled = false;
	} else if (tipo == 4) {
		document.getElementById("pericia").disabled = false;
		document.getElementById("txt-mana").innerHTML = "Custo:";
		document.getElementById("mana").disabled = false;
		document.getElementById("recarga").disabled = false;
	} else if (tipo == 5) {
		document.getElementById("afinidade").disabled = false;
		document.getElementById("txt-mana").innerHTML = "Custo:";
		document.getElementById("mana").disabled = false;
		document.getElementById("recarga").disabled = false;
	} else if (tipo == 6) {
		document.getElementById("rank").disabled = false;
		document.getElementById("afinidade").disabled = false;
		document.getElementById("hp").disabled = false;
		document.getElementById("mana").disabled = false;
		document.getElementById("ataque").disabled = false;
		document.getElementById("poder").disabled = false;
		document.getElementById("defesa").disabled = false;
		document.getElementById("resistencia").disabled = false;
		document.getElementById("pericia").disabled = false;
		document.getElementById("ganho").disabled = false;
	}
}

function atualizaBordaRaridade(){
	var combo_raridade = document.getElementById("raridade");
	var raridade = combo_raridade.options[combo_raridade.selectedIndex].value;
	
	if(raridade == 0){		
		$("#card-base").css({border:'solid 15px rgb(75,75,75,1)'});
		$("#card-text").css({border:'solid 3px rgb(75,75,75,1)'});
		$("#card-image").css({border:'solid 3px rgb(75,75,75,1)'});
	} else
	if(raridade == 1){
		$("#card-base").css({border:'solid 15px rgb(0,112,221,1)'});
		$("#card-text").css({border:'solid 3px rgb(0,112,221,1)'});
		$("#card-image").css({border:'solid 3px rgb(0,112,221,1)'});
	} else
	if(raridade == 2){
		$("#card-base").css({border:'solid 15px rgb(163,53,238,1)'});
		$("#card-text").css({border:'solid 3px rgb(163,53,238,1)'});
		$("#card-image").css({border:'solid 3px rgb(163,53,238,1)'});
	} else {
		$("#card-base").css({border:'solid 15px rgb(255,128,0,1)'});
		$("#card-text").css({border:'solid 3px rgb(255,128,0,1)'});
		$("#card-image").css({border:'solid 3px rgb(255,128,0,1)'});
	}
}

function atualizaRank(){
	var combo_rank = document.getElementById("rank");
	var rank = combo_rank.options[combo_rank.selectedIndex].value;
	var ranks_html = "";
	var margin = 155 - ((rank - 1) * 21.25);
	
	for(var i = 1; i <= rank; i++){
		ranks_html += "<img src='img/rank.png' class='card-rank'> "
	}
	document.getElementById("card-rank-container").innerHTML = ranks_html;
	$("#card-rank-container").css({left:margin+"px"});
}

function atualizaArma(){
	var combo_pericia = document.getElementById("pericia");
	var pericia = combo_pericia.options[combo_pericia.selectedIndex].value;
	
	switch (pericia){
		case 0:
			$("#card-pericia").css({width:"72px", height:"71px"});
			break;
		case 1:
			$("#card-pericia").css({width:"50px", height:"52px"});
			break;
		case 2:
			$("#card-pericia").css({width:"67px", height:"65px"});
			break;
		case 3:
			$("#card-pericia").css({width:"62px", height:"63px"});
			break;
		case 4:
			$("#card-pericia").css({width:"50px", height:"52px"});
			break;
		case 5:
			$("#card-pericia").css({width:"55px", height:"61px"});
			break;
		case 6:
			$("#card-pericia").css({width:"72px", height:"73px"});
			break;
		case 7:
			$("#card-pericia").css({width:"62px", height:"63px"});
			break;
	}
	
	$("#card-pericia").css({background:'url(img/arma'+ pericia +'.png) no-repeat','background-size': '100%'})
}

function atualizaAfinidade(){
	var combo_afinidade = document.getElementById("afinidade");
	var afinidade = combo_afinidade.options[combo_afinidade.selectedIndex].value;
	$("#card-afinidade").css({background: 'url(img/afinidade' + afinidade + '.png) no-repeat','background-size': '100%'});
}

function atualizaTexto(origem, destino){
	var reader = new FileReader();
	var texto = document.getElementById(origem).value;
	if(origem == "ganho"){
		document.getElementById(destino).innerHTML = "+" + texto;
	} else {
		document.getElementById(destino).innerHTML = texto;
	}
}

function atualizaImagem(input){
	var reader = new FileReader();

    reader.onload = function (e) {
        alert(e.target.result);
            .attr('src', e.target.result)
            .width(150)
            .height(200);
    };

    reader.readAsDataURL(input.files[0]);
}