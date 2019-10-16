package model;

import java.util.HashMap;
import java.util.Map;

public enum TipoRaridade {
	COMUM(0), RARA(1), EPICA(2), LANDARIA(3);

	private static final Map<Integer, TipoRaridade> map = new HashMap<Integer, TipoRaridade>(values().length, 1);

	static {
		for (TipoRaridade tr : values())
			map.put(tr.tipo_raridade, tr);
	}

	public int tipo_raridade;

	TipoRaridade(int tr) {
		tipo_raridade = tr;
	}

	public int getValor() {
		return tipo_raridade;
	}

	public static TipoRaridade buscaTipoRaridade(int valor) {
		TipoRaridade busca = map.get(valor);
		if (busca == null) {
			throw new IllegalArgumentException("Valor de TipoRaridade inválido: " + valor);
		}
		return busca;
	}
}
