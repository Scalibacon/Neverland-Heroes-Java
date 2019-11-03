package dao;

import model.Jogador;

public interface JogadorDAO {
	Jogador buscaJogadorLogin(String usuario, String senha);
	boolean cadastrarJogador(Jogador jogador);
	Jogador buscarPerfil(Jogador jogador);
	boolean trocaIcone(Jogador j);
}
