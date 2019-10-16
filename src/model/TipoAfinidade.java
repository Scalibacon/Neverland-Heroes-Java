package model;

import java.util.HashMap;
import java.util.Map;

public enum TipoAfinidade {
	NEUTRO(0), LUZ(1), TREVAS(2), FOGO(3), AGUA(4), TERRA(5), VENTO(6);

	private static final Map<Integer, TipoAfinidade> map = new HashMap<Integer, TipoAfinidade>(values().length, 1);

	static {
		for (TipoAfinidade ta : values())
			map.put(ta.tipo_afinidade, ta);
	}

	public int tipo_afinidade;

	TipoAfinidade(int ta) {
		tipo_afinidade = ta;
	}

	public int getValor() {
		return tipo_afinidade;
	}

	public static TipoAfinidade buscaTipoAfinidade(int valor) {
		TipoAfinidade busca = map.get(valor);
		if (busca == null) {
			throw new IllegalArgumentException("Valor de TipoAfinidade inválido: " + valor);
		}
		return busca;
	}
}
