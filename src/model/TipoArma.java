package model;

import java.util.HashMap;
import java.util.Map;

public enum TipoArma {
	ESPADA(0), LANCA(1), MACHADO(2), ADAGA(3), ARCO(4), ESCUDO(5), LIVRO(6), CAJADO(7);

	private static final Map<Integer, TipoArma> map = new HashMap<Integer, TipoArma>(values().length, 1);

	static {
		for (TipoArma ta : values())
			map.put(ta.tipo_arma, ta);
	}

	public int tipo_arma;

	TipoArma(int ta) {
		tipo_arma = ta;
	}

	public int getValor() {
		return tipo_arma;
	}

	public static TipoArma buscaTipoArma(int valor) {
		TipoArma busca = map.get(valor);
		if (busca == null) {
			throw new IllegalArgumentException("Valor de TipoArma inválido: " + valor);
		}
		return busca;
	}
}
