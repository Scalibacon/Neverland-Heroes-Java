function mostraNovasCartas(cartas){
	document.getElementById("background-veil").style.display = "block";
	document.getElementById("new-cards-container").style.display = "block";
	document.getElementById("new-cards-container").innerHTML = "";
	
	for(var i = 0; i < cartas.length; i++){
		var createImg = document.createElement("img");
		createImg.setAttribute("src", "img/cards/" + cartas[i].id + ".jpg");
		createImg.setAttribute("class", "new-card");
		createImg.setAttribute("id", "carta" + i);
		document.getElementById("new-cards-container").appendChild(createImg);
		opacidadeCarta(createImg, (i + 1) * 700);
	}
}

function opacidadeCarta(elemento, delay){
	setTimeout(function(){
		elemento.style.opacity = "1";
	}, delay);
}

function escondeNovasCartas(){
	document.getElementById("background-veil").style.display = "none";
	document.getElementById("new-cards-container").style.display = "none";
}

function tentaComprarPacote(pacote){
	Swal.fire({
		  title: 'Tem certeza que deseja comprar esse pacote?',
		  text: "Você vai gastar uma graninha com isso",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Comprar',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.value) {
			 comprarPacote(pacote);
		  }
	});
}

function comprarPacote(pacote){
	var preco, dinheiro;
	if(pacote == 1){
		preco = 300;
	} else
	if(pacote == 2){
		preco = 500;
	} else
	if(pacote == 3){
		preco = 1000;
	} else
	if(pacote == 4){
		preco = 2000;
	}
	
	$.ajax({
		url : 'buscaPerfilServlet',
		type : 'post',
		success : function(data) {
			perfil = JSON.parse(data);
			dinheiro = perfil.dinheiro;
			if(dinheiro < preco){
				Swal.fire({
				  title: 'Você não possui dinheiro o suficiente',
				  text: "Vá jogar e ganhar dinheiro, seu pobretão u.u",
				  type: 'error'
				});
			} else {
				$.ajax({
					url : 'compraPacoteServlet',
					data : {
						pacote : pacote,
						preco : preco
					},
					type : 'post',
					success : function(data) {
						var cartas = JSON.parse(data);
						//console.log(cartas);
						mostraNovasCartas(cartas);
					},
					error : function(e) {
						alert('Erro ao comprar o pacote!');
					}
				});
			}
		},
		error : function(e) {
			alert('Erro ao buscar a grana!');
		}
	});
}


function mostraPacoteInfo(comum, rara, epica, lendaria){
	event.clientX
	document.getElementById("pacote-info").style.display = "block";
	document.getElementById("pacote-info").style.marginLeft = (event.clientX + 10) + "px";
	document.getElementById("pacote-info").style.marginTop = (event.clientY + 10) + "px";
	document.getElementById("pacote-info").innerHTML = 
		"Comum: " + comum + "%<br>" +
		"Rara: " + rara + "%<br>" +
		"Épica: " + epica + "%<br>" +
		"Lendária: " + lendaria + "%";
}

function escondePacoteInfo(){
	document.getElementById("pacote-info").style.display = "none";
}