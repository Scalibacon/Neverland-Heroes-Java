package model;

import com.google.gson.Gson;

public class Jogador {
	private int id;
	private String usuario;
	private String senha;
	private String email;
	private int nivel;
	private int experiencia;
	private int dinheiro;
	private TipoJogador tipo;
	private int partidas;
	private int vitorias;
	private int derrotas;	
	private Gson conquistas;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsuario() {
		return usuario;
	}
	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getNivel() {
		return nivel;
	}
	public void setNivel(int nivel) {
		this.nivel = nivel;
	}
	public int getExperiencia() {
		return experiencia;
	}
	public void setExperiencia(int experiencia) {
		this.experiencia = experiencia;
	}
	public int getDinheiro() {
		return dinheiro;
	}
	public void setDinheiro(int dinheiro) {
		this.dinheiro = dinheiro;
	}
	public TipoJogador getTipo() {
		return tipo;
	}
	public void setTipo(TipoJogador tipo) {
		this.tipo = tipo;
	}
	public int getPartidas() {
		return partidas;
	}
	public void setPartidas(int partidas) {
		this.partidas = partidas;
	}
	public int getVitorias() {
		return vitorias;
	}
	public void setVitorias(int vitorias) {
		this.vitorias = vitorias;
	}
	public int getDerrotas() {
		return derrotas;
	}
	public void setDerrotas(int derrotas) {
		this.derrotas = derrotas;
	}
	public Gson getConquistas() {
		return conquistas;
	}
	public void setConquistas(Gson conquistas) {
		this.conquistas = conquistas;
	}
	
}
