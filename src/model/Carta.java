package model;

public class Carta {
	private int id;
	private String nome;
	private TipoRaridade raridade;
	private String descricao;
	private int preco_venda;
	private TipoCarta tipo_carta;
	
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
	public TipoRaridade getRaridade() {
		return raridade;
	}
	public void setRaridade(TipoRaridade raridade) {
		this.raridade = raridade;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public int getPrecoVenda() {
		return preco_venda;
	}
	public void setPrecoVenda(int preco_venda) {
		this.preco_venda = preco_venda;
	}
	public TipoCarta getTipoCarta() {
		return tipo_carta;
	}
	public void setTipoCarta(TipoCarta tipo_carta) {
		this.tipo_carta = tipo_carta;
	}	
}
