<html>
<body>
	<%
		if (session == null || session.getAttribute("usuario") == null || !request.isRequestedSessionIdValid()) {
			session.setAttribute("dialog", "sessao_expirou");
	%>
			<script>window.location = "index.jsp";</script>
	<%
		}
	%>
</body>
</html>

