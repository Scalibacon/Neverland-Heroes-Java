package dao;

import model.Jogador;

public interface JogadorDAO {
	Jogador buscaJogadorLogin(String usuario, String senha);
}
