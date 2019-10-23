package dao;

import java.util.ArrayList;
import java.util.List;

import model.Baralho;
import model.Carta;
import model.CartaColecao;
import model.Colecao;
import model.Jogador;
import model.TipoJogador;

public class PseuDAO {
	public static Jogador pseudoLogin() {
		Jogador j = new Jogador();
		j.setId(1);
		j.setUsuario("Scalibacon");
		j.setTipo(TipoJogador.buscaTipoJogador(2));
		return j;
	}
	
	public static Colecao pseudoColecao() {
		Colecao col = new Colecao();
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		for(int i = 2; i <= 21; i++) {
			Carta c = new Carta();
			c.setId(i);
			CartaColecao cc = new CartaColecao();
			cc.setCarta(c);
			cc.setQuantidade(1);
			cartas.add(cc);
		}
		col.setCartas(cartas);
		return col;
	}
	
	public static Baralho pseudoBaralho() {
		Baralho bar = new Baralho();
		Carta cam = new Carta();
		cam.setId(2);
		bar.setCampeao(cam);
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		for(int i = 3; i <= 21; i++) {
			Carta c = new Carta();
			c.setId(i);
			CartaColecao cc = new CartaColecao();
			cc.setCarta(c);
			cc.setQuantidade(1);
			cartas.add(cc);
		}
		bar.setCartas(cartas);
		return bar;
	}
}
