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
import model.Baralho;
import model.Jogador;

@WebServlet("/buscaBaralhoServlet")
public class BuscaBaralhoServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		BaralhoDAO bDao = new BaralhoDAOImpl();
		Jogador j = new Jogador();
		j.setId((int) session.getAttribute("id"));
		Baralho baralho = bDao.buscaBaralho(j);
		PrintWriter out = response.getWriter();
		String gson = baralho.toJson();
		out.println(gson);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}
