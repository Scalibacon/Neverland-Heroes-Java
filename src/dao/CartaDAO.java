package dao;

import model.Arma;
import model.Carta;
import model.Consumivel;
import model.Heroi;
import model.Magia;
import model.Postura;

public interface CartaDAO {
	int ultimoId();
	boolean adicionarCartaBase(Carta carta);
	boolean adicionarConsumivel(Consumivel carta);
	boolean adicionarArma(Arma carta);
	boolean adicionarPostura(Postura carta);
	boolean adicionarMagia(Magia carta);
	boolean adicionarHeroi(Heroi carta);
}
