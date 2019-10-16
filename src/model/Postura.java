package model;

public class Postura extends Carta{
	private TipoArma tipo_arma;
	private int custo;
	private int tempo_recarga;
	
	public TipoArma getTipoArma() {
		return tipo_arma;
	}
	public void setTipoArma(TipoArma tipo_arma) {
		this.tipo_arma = tipo_arma;
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
