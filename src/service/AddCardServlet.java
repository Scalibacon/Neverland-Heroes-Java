package service;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Arma;
import model.Carta;
import model.Consumivel;
import model.Magia;
import model.Postura;
import model.TipoAfinidade;
import model.TipoArma;
import model.TipoCarta;
import model.TipoRaridade;

@WebServlet("/addCardServlet")
public class AddCardServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException{
		int tipo = Integer.parseInt(request.getParameter("tipo"));			
		Carta carta = new Carta();
		carta.setId(Integer.parseInt(request.getParameter("id")));
		carta.setNome((String) request.getParameter("nome"));
		carta.setRaridade(TipoRaridade.buscaTipoRaridade(Integer.parseInt(request.getParameter("raridade"))));
		carta.setDescricao((String) request.getParameter("descricao"));
		carta.setPrecoVenda(Integer.parseInt(request.getParameter("venda")));
		carta.setTipoCarta(TipoCarta.buscaTipoCarta(Integer.parseInt(request.getParameter("tipo"))));
		
		if(tipo == TipoCarta.CONSUMIVEL.getValor()) {
			Consumivel consumivel = new Consumivel();
			consumivel = (Consumivel) carta;			
		} else
		if(tipo == TipoCarta.ARMA.getValor()) {
			Arma arma = new Arma();
			arma = (Arma) carta;
			arma.setTipoArma(TipoArma.buscaTipoArma(Integer.parseInt(request.getParameter("pericia"))));
		} else
		if(tipo == TipoCarta.POSTURA.getValor()) {
			Postura postura = new Postura();
			postura = (Postura) carta;
			postura.setTipoArma(TipoArma.buscaTipoArma(Integer.parseInt(request.getParameter("pericia"))));
			postura.setTempoRecarga(Integer.parseInt(request.getParameter("recarga")));
		} else
		if(tipo == TipoCarta.MAGIA.getValor()) {
			Magia magia = new Magia();
			magia = (Magia) carta;
			magia.setAfinidade(TipoAfinidade.buscaTipoAfinidade(Integer.parseInt(request.getParameter("afinidade"))));
			magia.setTempoRecarga(Integer.parseInt(request.getParameter("recarga")));
		} else
		if(tipo == TipoCarta.HEROI.getValor()) {
			
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException{
		doPost(request, response);
	}
}
