package dao;

import model.Colecao;
import model.Jogador;

public interface ColecaoDAO {
	Colecao buscaColecao(Jogador j);
}
