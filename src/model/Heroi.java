package model;

public class Heroi extends Carta{
	private int rank;
	private TipoAfinidade afinidade;
	private int hp;
	private int mana;
	private int forca;
	private int poder;
	private int defesa;
	private int resistencia;
	private TipoArma pericia;
	private int ganho_pericia;
	
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public TipoAfinidade getAfinidade() {
		return afinidade;
	}
	public void setAfinidade(TipoAfinidade afinidade) {
		this.afinidade = afinidade;
	}
	public int getHp() {
		return hp;
	}
	public void setHp(int hp) {
		this.hp = hp;
	}
	public int getMana() {
		return mana;
	}
	public void setMana(int mana) {
		this.mana = mana;
	}
	public int getForca() {
		return forca;
	}
	public void setForca(int forca) {
		this.forca = forca;
	}
	public int getPoder() {
		return poder;
	}
	public void setPoder(int poder) {
		this.poder = poder;
	}
	public int getDefesa() {
		return defesa;
	}
	public void setDefesa(int defesa) {
		this.defesa = defesa;
	}
	public int getResistencia() {
		return resistencia;
	}
	public void setResistencia(int resistencia) {
		this.resistencia = resistencia;
	}
	public TipoArma getPericia() {
		return pericia;
	}
	public void setPericia(TipoArma pericia) {
		this.pericia = pericia;
	}
	public int getGanhoPericia() {
		return ganho_pericia;
	}
	public void setGanhoPericia(int ganho_pericia) {
		this.ganho_pericia = ganho_pericia;
	}
}
