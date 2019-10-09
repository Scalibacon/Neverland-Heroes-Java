//sweetalert2.github.io
function trocaForm(clicado, form) {

	$(".form").css({
		display : "none"
	});
	$(form).css({
		display : "block"
	});

	if (clicado == "#aba1") {
		$("#aba-index").css({
			left : 15
		});
		$("#cont-form").css({
			height : "250px"
		});
	} else {
		$("#aba-index").css({
			left : 215
		});
		$("#cont-form").css({
			height : "360px"
		});
	}
}

function loginSubmit(){
	var usuario = $("#usuario-login").val();
	var senha = $("#senha-login").val();
	if (usuario == "" || senha == "") {
		Swal.fire({
			type : 'error',
			title : 'Oops...',
			text : 'Não é possível logar se não preencher os campos adequadamente :(',
			footer : 'Preenche lá e bora jogar <3'
		});
	}else{
		$("#form-login").submit();
	}
}

function registroSubmit(){
	var usuario = $("#usuario-registro").val();
	var senha = $("#senha-registro").val();
	var email = $("#email-registro").val();
	
	if (usuario == "" || senha == "" || email == "") {
		Swal.fire({
			type : 'error',
			title : 'Oops...',
			text : 'Não é possível se registrar se não preencher os campos adequadamente :(',
			footer : 'Preenche lá e bora começar sua jornada <3'
		});
	//if usuarioDisponivel() && emailDisponivel()
	}else{
		$("#form-registro").submit();
	}
}
