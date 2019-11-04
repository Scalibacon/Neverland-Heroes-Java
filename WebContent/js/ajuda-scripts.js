var topicos = [false,false,false,false,false,false,false];

function alternaTopico(ajuda){
	
	if(!topicos[ajuda-1]){
		document.getElementById("ajuda" + ajuda).style.height = "400px";
	} else {
		document.getElementById("ajuda" + ajuda).style.height = "0px";
	}
	
	topicos[ajuda-1] = !topicos[ajuda-1];
}