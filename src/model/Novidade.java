package model;

import java.util.Calendar;

public class Novidade {
	private int id;
	private String titulo;
	private String texto;
	private Jogador autor;
	private Calendar data;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public Jogador getAutor() {
		return autor;
	}
	public void setAutor(Jogador autor) {
		this.autor = autor;
	}
	public Calendar getData() {
		return data;
	}
	public void setData(Calendar data) {
		this.data = data;
	}
	
	
}
