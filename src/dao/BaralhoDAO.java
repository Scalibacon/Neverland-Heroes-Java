package dao;

import java.util.List;

import model.Baralho;
import model.CartaColecao;
import model.Jogador;

public interface BaralhoDAO {
	Baralho buscaBaralho(Jogador j);

	List<CartaColecao> buscaConsumiveis(Jogador j);

	List<CartaColecao> buscaPosturas(Jogador j);

	List<CartaColecao> buscaMagias(Jogador j);

	List<CartaColecao> buscaArmas(Jogador j);

	List<CartaColecao> buscaHerois(Jogador j);

	CartaColecao buscaCampeao(Jogador j);
	
	boolean salvaDeck(Baralho deck);
}
