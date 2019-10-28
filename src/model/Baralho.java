package model;

import java.util.List;

import com.google.gson.Gson;

public class Baralho {
	private Jogador jogador;
	private String nome;
	private Heroi campeao;
	private List<CartaColecao> cartas;
	
	public Jogador getJogador() {
		return jogador;
	}
	public void setJogador(Jogador jogador) {
		this.jogador = jogador;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Heroi getCampeao() {
		return campeao;
	}
	public void setCampeao(Heroi campeao) {
		this.campeao = campeao;
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
