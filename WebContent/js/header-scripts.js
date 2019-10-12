document.write("<script type='text/javascript' src='js/sweetalert2.all.min.js'></script>");

function logout(){
	Swal.fire({
		  title: 'Tem certeza que deseja sair?',
		  text: "Pode ser que dados sejam perdidos :O",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Sair',
		  cancelButtonText: 'Cancelar'
		}).then((result) => {
		  if (result.value) {
			  window.location = "logoutServlet"
		  }
		})
}