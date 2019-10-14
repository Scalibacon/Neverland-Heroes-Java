<html>
<body>
	<%
		if (!request.isRequestedSessionIdValid() || session == null || session.getAttribute("usuario") == null) {
			session.setAttribute("dialog", "sessao_expirou");
	%>
			<script>window.location = "index.jsp";</script>
	<%
		}
	%>
</body>
</html>

