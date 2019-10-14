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
	
	$(".card-gem").css({display:'none'});
	$("#card-rank-container").css({display:'none'});
	$("#card-cd").css({display:'none'});
	$("#card-afinidade").css({display:'none'});
	$("#card-pericia").css({display:'none', top:'45px'});
	$("#card-pericia-number").css({display:'none'});

	if (tipo == 3) {
		document.getElementById("pericia").disabled = false;
		
		$("#card-pericia").css({display:'block', top:'-7px'});
	} else if (tipo == 4) {
		document.getElementById("pericia").disabled = false;
		document.getElementById("txt-mana").innerHTML = "Custo:";
		document.getElementById("mana").disabled = false;
		document.getElementById("recarga").disabled = false;		
		document.getElementById("pericia").disabled = false;
		;
		$("#card-pericia").css({display:'block', top:'-7px'});
		$("#card-cd").css({display:'block'});
		$("#card-mana").css({display:'block', top:"-7px"});
	} else if (tipo == 5) {
		document.getElementById("afinidade").disabled = false;
		document.getElementById("txt-mana").innerHTML = "Custo:";
		document.getElementById("mana").disabled = false;
		document.getElementById("recarga").disabled = false;
		
		$("#card-cd").css({display:'block'});
		$("#card-mana").css({display:'block', top:"-7px"});
		$("#card-afinidade").css({display:'block'});
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
		
		$(".card-gem").css({display:'block'});
		$("#card-mana").css({display:'block', top:"37px"});
		$("#card-cd").css({display:'none'});
		$("#card-rank-container").css({display:'block'});
		$("#card-afinidade").css({display:'block'});
		$("#card-pericia").css({display:'block'});
		$("#card-pericia-number").css({display:'block'});
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
		case '0':
			$("#card-pericia").css({width:"calc(72px/1.5)", height:"calc(71px/1.5)"});
			break;
		case '1':
			$("#card-pericia").css({width:"calc(50px/1.2)", height:"calc(52px/1.2)"});
			break;
		case '2':
			$("#card-pericia").css({width:"calc(67px/1.5)", height:"calc(65px/1.5)"});
			break;
		case '3':
			$("#card-pericia").css({width:"calc(62px/1.5)", height:"calc(63px/1.5)"});
			break;
		case '4':
			$("#card-pericia").css({width:"calc(50px/1.2)", height:"calc(52px/1.2)"});
			break;
		case '5':
			$("#card-pericia").css({width:"calc(55px/1.3)", height:"calc(61px/1.3)"});
			break;
		case '6':
			$("#card-pericia").css({width:"calc(72px/1.5)", height:"calc(73px/1.5)"});
			break;
		case '7':
			$("#card-pericia").css({width:"calc(62px/1.5)", height:"calc(63px/1.5)"});
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
    	console.log('aqui');
        alert(e.target.result);
    };

    //reader.readAsDataURL(input.files[0]);
}

function trocaImagem(evt) {
    var files = evt.target.files; //FileList de quem chamou a função
    var f = files[0]; //Pega a primeira ocorrência, já que não tá multiple

	// Apenas processa imagens
    if (!f.type.match('image.*')) {
    	return;
	}
	
	var reader = new FileReader();
	
	//IIFE para capturar as informações do arquivo.
	reader.onload = (function(theFile) {
		return function(e) {
			//Joga a imagem pro src
			document.getElementById("true-image").src = e.target.result;
		};
	})(f);

	// Lê a imagem como uma URL de dados
	reader.readAsDataURL(f);
}
document.getElementById('upload-imagem').addEventListener('change', trocaImagem, false);

function testandoAjax(){
	$.ajax({
        url:'lastCardServlet',
        data:{teste:'vazio'},
        type:'post',
        cache:false,
        success:function(data){
        	var id = parseInt(data) + 1;
        	document.getElementById("id").value = id;
        },
        error:function(){
          alert('error');
        }
     });
}

testandoAjax();