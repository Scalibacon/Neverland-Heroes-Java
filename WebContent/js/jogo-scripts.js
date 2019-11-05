function trocaOption(opcao){
	if(opcao == "inside-option-offline") {
		document.getElementById('option-underline').style.left = "50px";
	} else {
		document.getElementById('option-underline').style.left = "400px";
	}
	
	$(".inside-option").css({display:"none"});
	document.getElementById(opcao).style.display = "block";
}