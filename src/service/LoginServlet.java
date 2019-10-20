package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.JogadorDAO;
import dao.JogadorDAOImpl;
import model.Jogador;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String usuario = request.getParameter("usuario");
		String senha = request.getParameter("senha");
		HttpSession session = request.getSession();
		/* depois tirar daqui... */
		if (usuario.equals("Scalibacon") && senha.equals("senha")) {
			session.setAttribute("id", 1);
			session.setAttribute("usuario", "Scalibacon");
			session.setAttribute("tipo", 2);
			PrintWriter out = response.getWriter();
			out.println("<html>");
			out.println("<head>");
			out.println("<meta http-equiv='refresh' content='3;URL=novidades.jsp'></head>");//redirects after 3 seconds
			out.println("</head>");
			out.println("<body>");
			out.println("<p style='color:red;'>Testando o redirect em 3s :)</p>");
			out.println("</body>");
			out.println("</html>");
		} else { /* ... até aqui */
			JogadorDAO jDao = new JogadorDAOImpl();
			Jogador jogador = jDao.buscaJogadorLogin(usuario, senha);
			if (jogador == null) {
				session.setAttribute("dialog", "nao_logou");
				response.sendRedirect("index.jsp");
			} else {
				session.setAttribute("id", jogador.getId());
				session.setAttribute("usuario", jogador.getUsuario());
				session.setAttribute("tipo", jogador.getTipo().getValor());
				response.sendRedirect("novidades.jsp");
			}
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}

}
