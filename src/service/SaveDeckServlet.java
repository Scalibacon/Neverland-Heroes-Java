package service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import dao.BaralhoDAO;
import dao.BaralhoDAOImpl;
import model.Baralho;

@WebServlet("/saveDeckServlet")
public class SaveDeckServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
		request.setCharacterEncoding("UTF-8");
		Gson gson = new Gson();
		Baralho deck = gson.fromJson(request.getParameter("deck"), Baralho.class);
		BaralhoDAO bDao = new BaralhoDAOImpl();
		PrintWriter out = response.getWriter();
		if(bDao.salvaDeck(deck)) {			
			out.println("success");			
		} else {
			out.println("fail");
		}
		out.close();
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
		doPost(request, response);
	}
}
