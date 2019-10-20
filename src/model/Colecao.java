package model;

import java.util.List;

import com.google.gson.Gson;

public class Colecao {
	private Jogador jogador;
	private List<CartaColecao> cartas;
	
	public Jogador getJogador() {
		return jogador;
	}
	public void setJogador(Jogador jogador) {
		this.jogador = jogador;
	}
	public List<CartaColecao> getCartas() {
		return cartas;
	}
	public void setCartas(List<CartaColecao> cartas) {
		this.cartas = cartas;
	}	
	public String toJson() {
		Gson gson = new Gson();
		String json = gson.toJson(this);
		return json;
	}
	
}
