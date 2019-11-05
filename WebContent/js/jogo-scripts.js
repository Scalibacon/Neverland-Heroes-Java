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

function escolherOponente(oponente){
	document.getElementById('oponente-img').style.background = "url(img/oponentes/oponente" + oponente + ".jpg) no-repeat";
	document.getElementById('oponente-img').style.backgroundSize = "100%";
};