package model;

import java.util.HashMap;
import java.util.Map;

public enum TipoJogador {
	JOGADOR(0), MODERADOR(1), ADMINISTRADOR(2);

	private static final Map<Integer, TipoJogador> map = new HashMap<Integer, TipoJogador>(values().length, 1);
	
	static {
		for (TipoJogador tj : values())
			map.put(tj.tipo_jogador, tj);
	}
	
	public int tipo_jogador;

	TipoJogador(int tj) {
		tipo_jogador = tj;
	}

	public int getValor() {
		return tipo_jogador;
	}
	
	public static TipoJogador buscaTipoJogador(int valor) {
		TipoJogador busca = map.get(valor);
		if (busca == null) {
			throw new IllegalArgumentException("Valor de TipoJogador inválido: " + valor);
		}
		return busca;
	}
}
