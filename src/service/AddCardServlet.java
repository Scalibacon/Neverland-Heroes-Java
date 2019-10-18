package service;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.CartaDAO;
import dao.CartaDAOImpl;
import model.Arma;
import model.Carta;
import model.Consumivel;
import model.Heroi;
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
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		request.setCharacterEncoding("UTF-8");
		CartaDAO cDao = new CartaDAOImpl();
		int tipo = Integer.parseInt(request.getParameter("tipo"));
		String retorno = "Falha ao adicionar a carta :(";
		
		if(tipo == TipoCarta.CONSUMIVEL.getValor()) {
			Consumivel consumivel = new Consumivel();
			consumivel = (Consumivel) setBaseCarta(request, response, consumivel);
			if(cDao.adicionarConsumivel(consumivel)) {
				retorno = "Sucesso ao adicionar o consumível ID " + consumivel.getId() + " ao sistema :D";
			}
		} else
		if(tipo == TipoCarta.ARMA.getValor()) {
			Arma arma = new Arma();
			arma = (Arma) setBaseCarta(request, response, arma);
			arma.setTipoArma(TipoArma.buscaTipoArma(Integer.parseInt(request.getParameter("pericia"))));
			if(cDao.adicionarArma(arma)) {
				retorno = "Sucesso ao adicionar a arma ID " + arma.getId() + " ao sistema :D";
			}
		} else
		if(tipo == TipoCarta.POSTURA.getValor()) {
			Postura postura = new Postura();
			postura = (Postura) setBaseCarta(request, response, postura);
			postura.setTipoArma(TipoArma.buscaTipoArma(Integer.parseInt(request.getParameter("pericia"))));
			postura.setCusto(Integer.parseInt(request.getParameter("mana")));
			postura.setTempoRecarga(Integer.parseInt(request.getParameter("recarga")));
			if(cDao.adicionarPostura(postura)) {
				retorno = "Sucesso ao adicionar a postura ID " + postura.getId() + " ao sistema :D";
			}
		} else
		if(tipo == TipoCarta.MAGIA.getValor()) {
			Magia magia = new Magia();
			magia = (Magia) setBaseCarta(request, response, magia);
			magia.setAfinidade(TipoAfinidade.buscaTipoAfinidade(Integer.parseInt(request.getParameter("afinidade"))));
			magia.setCusto(Integer.parseInt(request.getParameter("mana")));
			magia.setTempoRecarga(Integer.parseInt(request.getParameter("recarga")));
			if(cDao.adicionarMagia(magia)) {
				retorno = "Sucesso ao adicionar a magia ID " + magia.getId() + " ao sistema :D";
			}
		} else
		if(tipo == TipoCarta.HEROI.getValor()) {
			Heroi heroi = new Heroi();
			heroi = (Heroi) setBaseCarta(request, response, heroi);
			heroi.setRank(Integer.parseInt(request.getParameter("rank")));
			heroi.setAfinidade(TipoAfinidade.buscaTipoAfinidade(Integer.parseInt(request.getParameter("afinidade"))));
			heroi.setHp(Integer.parseInt(request.getParameter("hp")));
			heroi.setMana(Integer.parseInt(request.getParameter("mana")));
			heroi.setForca(Integer.parseInt(request.getParameter("forca")));
			heroi.setPoder(Integer.parseInt(request.getParameter("poder")));
			heroi.setDefesa(Integer.parseInt(request.getParameter("defesa")));
			heroi.setResistencia(Integer.parseInt(request.getParameter("resistencia")));
			heroi.setPericia(TipoArma.buscaTipoArma(Integer.parseInt(request.getParameter("pericia"))));
			heroi.setGanhoPericia(Integer.parseInt(request.getParameter("ganho_pericia")));
			if(cDao.adicionarHeroi(heroi)) {
				retorno = "Sucesso ao adicionar o herói ID " + heroi.getId() + " ao sistema :D";
			}
		}
		System.out.println(retorno);
		response.sendRedirect("criador-cartas.jsp");
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		doPost(request, response);
	}
	
	protected Object setBaseCarta(HttpServletRequest request, HttpServletResponse response, Carta carta) {
		carta.setId(Integer.parseInt(request.getParameter("id")));
		carta.setNome((String) request.getParameter("nome"));
		carta.setRaridade(TipoRaridade.buscaTipoRaridade(Integer.parseInt(request.getParameter("raridade"))));
		carta.setDescricao((String) request.getParameter("descricao"));
		carta.setPrecoVenda(Integer.parseInt(request.getParameter("venda")));
		carta.setTipoCarta(TipoCarta.buscaTipoCarta(Integer.parseInt(request.getParameter("tipo"))));
		return carta;
	}
	
}
