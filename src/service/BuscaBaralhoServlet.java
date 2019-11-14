package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.BaralhoDAO;
import dao.BaralhoDAOImpl;
import dao.JogadorDAO;
import dao.JogadorDAOImpl;
import model.Baralho;
import model.Jogador;

@WebServlet("/buscaBaralhoServlet")
public class BuscaBaralhoServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Baralho baralho;	
		BaralhoDAO bDao = new BaralhoDAOImpl();
		JogadorDAO jDao = new JogadorDAOImpl();
		Jogador j = new Jogador();
		j.setId((int) session.getAttribute("id"));
		j.setUsuario((String) session.getAttribute("usuario")); 
		jDao.buscarPerfil(j);			
		baralho = bDao.buscaBaralho(j);
		PrintWriter out = response.getWriter();
		String json = baralho.toJson();
		out.println(json);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}