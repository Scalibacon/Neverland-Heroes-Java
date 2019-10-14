package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.CartaDAO;
import dao.CartaDAOImpl;

@WebServlet("/lastCardServlet")
public class LastCardServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CartaDAO cDao = new CartaDAOImpl();
		int id = cDao.ultimoId();
		PrintWriter out = response.getWriter();
		out.println(id);
	}
}
