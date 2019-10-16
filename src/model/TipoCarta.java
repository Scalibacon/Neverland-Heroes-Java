package model;

import java.util.HashMap;
import java.util.Map;

public enum TipoCarta {
	CONSUMIVEL(0), ARMA(1), POSTURA(2), MAGIA(3), HEROI(4);

	private static final Map<Integer, TipoCarta> map = new HashMap<Integer, TipoCarta>(values().length, 1);
	
	static {
		for (TipoCarta tc : values())
			map.put(tc.tipo_carta, tc);
	}
	
	public int tipo_carta;

	TipoCarta(int tc) {
		tipo_carta = tc;
	}

	public int getValor() {
		return tipo_carta;
	}
	
	public static TipoCarta buscaTipoCarta(int valor) {
		TipoCarta busca = map.get(valor);
		if (busca == null) {
			throw new IllegalArgumentException("Valor de TipoCarta inválido: " + valor);
		}
		return busca;
	}
}
