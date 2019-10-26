package dao;

import java.util.List;

import model.CartaColecao;
import model.Colecao;
import model.Jogador;

public interface ColecaoDAO {
	Colecao buscaColecao(Jogador j);
	
	List<CartaColecao> buscaHerois(Jogador j);
	
	List<CartaColecao> buscaArmas(Jogador j);
	
	List<CartaColecao> buscaMagias(Jogador j);
	
	List<CartaColecao> buscaPosturas(Jogador j);
	
	List<CartaColecao> buscaConsumiveis(Jogador j);
}
