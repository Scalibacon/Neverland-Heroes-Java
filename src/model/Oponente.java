package model;

import com.google.gson.Gson;

public class Oponente {
	private int id;
	private String nome;
	private int nivel;
	private String descricao;
	private Baralho baralho;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public int getNivel() {
		return nivel;
	}
	public void setNivel(int nivel) {
		this.nivel = nivel;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Baralho getBaralho() {
		return baralho;
	}
	public void setBaralho(Baralho baralho) {
		this.baralho = baralho;
	}	
	
	public String toJson() {
		Gson gson = new Gson();
		String json = gson.toJson(this);
		return json;
	}	
}
