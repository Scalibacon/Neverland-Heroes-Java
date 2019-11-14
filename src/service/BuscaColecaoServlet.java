package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import dao.ColecaoDAO;
import dao.ColecaoDAOImpl;
import model.Colecao;
import model.Jogador;

@WebServlet("/buscaColecaoServlet")
public class BuscaColecaoServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session = request.getSession();
		Colecao colecao;	
		ColecaoDAO cDao = new ColecaoDAOImpl();
		Jogador j = new Jogador();
		j.setId((int) session.getAttribute("id"));
		colecao = cDao.buscaColecao(j);
		PrintWriter out = response.getWriter();
		String json = colecao.toJson();
		out.println(json);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}
