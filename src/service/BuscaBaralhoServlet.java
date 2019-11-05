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
import dao.PseuDAO;
import model.Baralho;
import model.Jogador;

@WebServlet("/buscaBaralhoServlet")
public class BuscaBaralhoServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Baralho baralho;			
		if(true) { /* depois tirar daqui... */
			baralho = PseuDAO.pseudoBaralho();
		} else { /* até aqui */
			BaralhoDAO bDao = new BaralhoDAOImpl();
			Jogador j = new Jogador();
			j.setId((int) session.getAttribute("id"));
			baralho = bDao.buscaBaralho(j);
		} //aqui tb
		PrintWriter out = response.getWriter();
		String json = baralho.toJson();
		out.println(json);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}