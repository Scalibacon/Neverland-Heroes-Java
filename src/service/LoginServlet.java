package service;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.JogadorDAO;
import dao.JogadorDAOImpl;
import model.Jogador;
import model.TipoJogador;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String usuario = request.getParameter("usuario");
		String senha = request.getParameter("senha");
//		Jogador jogador = new Jogador();
//		jogador.setUsuario(usuario);
//		jogador.setId(2);
//		jogador.setTipo(TipoJogador.ADMINISTRADOR);
		HttpSession session = request.getSession();
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

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}

}
