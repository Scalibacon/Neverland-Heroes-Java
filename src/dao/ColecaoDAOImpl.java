package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Carta;
import model.CartaColecao;
import model.Colecao;
import model.Jogador;

public class ColecaoDAOImpl implements ColecaoDAO{

	@Override
	public Colecao buscaColecao(Jogador j) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT cc.id_carta, c.nome, cc.quantidade FROM carta c " + 
					"INNER JOIN colecao_carta cc " + 
					"ON cc.id_carta = c.id " + 
					"WHERE cc.id_jogador = ? " + 
					"ORDER BY c.nome";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Carta carta = new Carta();
				carta.setId(rs.getInt("id_carta"));
				CartaColecao carta_colecao = new CartaColecao();
				carta_colecao.setCarta(carta);
				carta_colecao.setQuantidade(rs.getInt("quantidade"));
				cartas.add(carta_colecao);
			}
			Colecao colecao = new Colecao();
			colecao.setJogador(j);
			colecao.setCartas(cartas);
			return colecao;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

}
