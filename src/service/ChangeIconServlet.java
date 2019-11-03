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

@WebServlet("/changeIconServlet")
public class ChangeIconServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		JogadorDAO jDao = new JogadorDAOImpl();
		Jogador jogador = new Jogador();
		jogador.setId((int) session.getAttribute("id"));
		jogador.setIcone(Integer.parseInt(request.getParameter("icone")));
		jDao.trocaIcone(jogador);
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}
}
