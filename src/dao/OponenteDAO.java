package dao;

import java.util.List;

import model.CartaColecao;
import model.Oponente;

public interface OponenteDAO {

	Oponente buscaOponente(int id);

	CartaColecao buscaCampeao(Oponente o);

	List<CartaColecao> buscaHerois(Oponente o);

	List<CartaColecao> buscaArmas(Oponente o);

	List<CartaColecao> buscaMagias(Oponente o);

	List<CartaColecao> buscaPosturas(Oponente o);

	List<CartaColecao> buscaConsumiveis(Oponente o);

}
