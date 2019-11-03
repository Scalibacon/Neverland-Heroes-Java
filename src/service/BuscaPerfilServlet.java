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

@WebServlet("/buscaPerfilServlet")
public class BuscaPerfilServlet extends HttpServlet{
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		JogadorDAO jDao = new JogadorDAOImpl();
		Jogador jogador = new Jogador(); 
		jogador.setId((int) session.getAttribute("id"));
		jogador = jDao.buscarPerfil(jogador);
		
		String json = jogador.toJson();
		PrintWriter out = response.getWriter();
		out.println(json);
		out.close();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}

}
