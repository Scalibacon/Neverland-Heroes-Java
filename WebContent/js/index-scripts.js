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

function loginSubmit() {
	var usuario = $("#usuario-login").val();
	var senha = $("#senha-login").val();
	if (usuario == "" || senha == "") {
		Swal
				.fire({
					type : 'error',
					title : 'Oops...',
					text : 'Não é possível logar se não preencher os campos adequadamente :(',
					footer : 'Preenche lá e bora jogar <3'
				});
	} else {
		$("#form-login").submit();
	}
}

function registroSubmit() {
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
		// if usuarioDisponivel() && emailDisponivel()
	} else if (!document.getElementById('termos-registro').checked) {
		Swal.fire({
			type : 'error',
			title : 'Oops...',
			text : 'Pra se registrar precisamos que aceite nossos termos de uso ^^',
			footer : 'Dê uma lida (ou não) e marque a caixinha :)'
		});
	} else {
		$("#form-registro").submit();
	}
}

function chamaErroAutenticacao(titulo, texto, footer) {
	Swal.fire({
		type : 'error',
		title : titulo,
		text : texto,
		footer : footer
	});
}

$(document).ready(function() {
	criaKeyupsForms();
});

function criaKeyupsForms() {
	var input_login_senha = document.getElementById("senha-login");
	input_login_senha.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			document.getElementById("submit-login").click();
		}
	});

	var input_registro_senha = document.getElementById("senha-registro");
	input_registro_senha.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			document.getElementById("submit-registro").click();
		}
	});
}