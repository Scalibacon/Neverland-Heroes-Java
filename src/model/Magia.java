package model;

public class Magia extends Carta{
	private TipoAfinidade afinidade;
	private int custo;
	private int tempo_recarga;
	
	public TipoAfinidade getAfinidade() {
		return afinidade;
	}
	public void setAfinidade(TipoAfinidade afinidade) {
		this.afinidade = afinidade;
	}
	public int getCusto() {
		return custo;
	}
	public void setCusto(int custo) {
		this.custo = custo;
	}
	public int getTempoRecarga() {
		return tempo_recarga;
	}
	public void setTempoRecarga(int tempo_recarga) {
		this.tempo_recarga = tempo_recarga;
	}
}
