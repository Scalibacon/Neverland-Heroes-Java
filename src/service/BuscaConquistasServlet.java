package service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/buscaConquistasServlet")
public class BuscaConquistasServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		
		ClassLoader classLoader = getClass().getClassLoader();		
		URL resource = classLoader.getResource("conquistas.json");		 
		File file = new File(resource.getFile());
		
		BufferedReader reader = new BufferedReader(new FileReader(file));		
		
		StringBuilder futuroJsonTxt = new StringBuilder();
		String line = null;
		
		while ((line = reader.readLine()) != null) {
			futuroJsonTxt.append(line);
		}		
		reader.close();
		
		String jsonTxt = futuroJsonTxt.toString().trim();
		PrintWriter out = response.getWriter();
		out.println(jsonTxt);
		out.close();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
}