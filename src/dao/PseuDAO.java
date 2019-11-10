package dao;

import java.util.ArrayList;
import java.util.List;

import model.Baralho;
import model.Carta;
import model.CartaColecao;
import model.Colecao;
import model.Heroi;
import model.Jogador;
import model.TipoJogador;

public class PseuDAO {
	public static Jogador pseudoLogin() {
		Jogador j = new Jogador();
		j.setId(1);
		j.setUsuario("Scalibacon");
		j.setTipo(TipoJogador.buscaTipoJogador(2));
		j.setPartidas(40);
		j.setVitorias(25);
		j.setDerrotas(15);
		j.setNivel(27);
		j.setExperiencia(889);
		j.setDinheiro(2350);
		j.setTipo(TipoJogador.ADMINISTRADOR);
		j.setIcone(12);
		j.setConquistas("{1:true, 2:false, 3:true, 4:true, 5:false, 6:false, 7:false}");
		return j;
	}

	public static Colecao pseudoColecao() {
		Colecao col = new Colecao();
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		for (int i = 1; i <= 21; i++) {
			if (i >= 1 && i <= 6 ) {
				Heroi c = new Heroi();
				c.setId(i);
				c.setRank(1);
				c.setHp((int) Math.random() * 5 + 1);
				c.setForca(2);
				c.setPoder((int) Math.random() * 5 + 1);
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(5);
				cartas.add(cc);
			}else {
				Carta c = new Carta();
				c.setId(i);
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(2);
				cartas.add(cc);
			}
		}
		col.setCartas(cartas);
		return col;
	}

	public static Baralho pseudoBaralho() {
		Baralho bar = new Baralho();
		CartaColecao c_cam = new CartaColecao();
		Heroi cam = new Heroi();
		cam.setId(2);
		cam.setRank(1);
		cam.setForca(2);
		cam.setPoder(1);
		bar.setCampeao(c_cam);
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		for (int i = 3; i <= 21; i++) {
			if (i >= 2 && i <= 6 ) {
				Heroi c = new Heroi();
				c.setId(i);
				c.setRank(1);
				c.setHp((int) Math.random() * 5 + 1);
				c.setForca(2);
				c.setPoder((int) Math.random() * 5 + 1);
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(1);
				cartas.add(cc);
			} else {
				Carta c = new Carta();
				c.setId(i);
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(1);
				cartas.add(cc);
			}			
		}
		bar.setCartas(cartas);
		return bar;
	}
}
