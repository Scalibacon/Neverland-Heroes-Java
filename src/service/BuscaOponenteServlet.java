package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.OponenteDAO;
import dao.OponenteDAOImpl;
import model.Oponente;

@WebServlet("/buscaOponenteServlet")
public class BuscaOponenteServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		OponenteDAO oDao = new OponenteDAOImpl();
		Oponente oponente = oDao.buscaOponente(Integer.parseInt(request.getParameter("id")));
		String json = oponente.toJson();
		PrintWriter out = response.getWriter();
		out.println(json);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}
