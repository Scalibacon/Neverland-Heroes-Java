package service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import dao.ColecaoDAO;
import dao.ColecaoDAOImpl;
import model.Carta;
import model.Jogador;

@WebServlet("/compraPacoteServlet")
public class CompraPacoteServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int pacote = Integer.parseInt(request.getParameter("pacote"));
		int preco = Integer.parseInt(request.getParameter("preco"));
		HttpSession session = request.getSession();
		ColecaoDAO cDao = new ColecaoDAOImpl();
		
		Jogador j = new Jogador();
		j.setId((int) session.getAttribute("id"));
		
		List<Carta> cartas = cDao.comprarPacote(j, pacote, preco);
		
		Gson gson = new Gson();
		String json = gson.toJson(cartas);
		
		PrintWriter out = response.getWriter();
		out.println(json);
		out.close();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		doPost(request, response);
	}

}
