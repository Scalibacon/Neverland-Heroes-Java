<%
	String dialog = (String) session.getAttribute("dialog");
	if(dialog != null){
		if(dialog.equals("nao_logou")){
%>
	<script>
		chamaErroAutenticacao("Usuário ou Senha incorreto", "Não encontramos esses dados em nosso sistema :(", "Verifique se digitou tudo certinho e tente novamente");
	</script>
<%					
		} else if(dialog.equals("nao_registrou")){
%>
	<script>
		chamaErroAutenticacao("Erro ao Cadastrar", "Não foi possível te cadastrar com esses dados :(", "Verifique se digitou tudo certinho e tente novamente");
	</script>
<%			
		} else if(dialog.equals("sessao_expirou")){			
%>
	<script>
		chamaErroAutenticacao("Sua sessão expirou", "Você ficou muito tempo ocioso e tivemos que te pôr pra fora :P", "Faça login novamente e volte pra ação");
	</script>
<%	
		}
		session.removeAttribute("dialog");
	}
%>