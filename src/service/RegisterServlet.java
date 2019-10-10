package service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.JogadorDAO;
import dao.JogadorDAOImpl;
import model.Jogador;

@WebServlet("/registerServlet")
public class RegisterServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		Jogador jogador = new Jogador();
		jogador.setUsuario(request.getParameter("usuario"));
		jogador.setSenha(request.getParameter("senha"));
		jogador.setEmail(request.getParameter("email"));
		
		JogadorDAO jDao = new JogadorDAOImpl();
		if(jDao.cadastrarJogador(jogador)) {
			response.sendRedirect(request.getContextPath() + "/loginServlet?usuario=" + jogador.getUsuario()
			+ "&senha=" + jogador.getSenha());
		} else {
			HttpSession session = request.getSession();
			session.setAttribute("dialog", "nao_registrou");
			response.sendRedirect("index.jsp");
		}		
	}

}
