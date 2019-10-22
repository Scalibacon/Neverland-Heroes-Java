package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Baralho;
import model.Carta;
import model.CartaColecao;
import model.Jogador;
import model.TipoCarta;

public class BaralhoDAOImpl implements BaralhoDAO {

	@Override
	public Baralho buscaBaralho(Jogador j) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT bc.id_carta, c.nome, c.tipo, bc.quantidade, b.id_campeao FROM baralho_carta bc "
					+ "INNER JOIN carta c " + "ON c.id = bc.id_carta " + "INNER JOIN baralho b "
					+ "ON b.id_jogador = bc.id_jogador " + "WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' "
					+ "ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			Baralho baralho = new Baralho();
			while(rs.next()) {
				Carta campeao = new Carta();
				campeao.setId(rs.getInt("id_campeao"));
				baralho.setCampeao(campeao);
				
				Carta carta = new Carta();
				carta.setId(rs.getInt("id_carta"));
				carta.setNome(rs.getString("nome"));
				carta.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				CartaColecao carta_colecao = new CartaColecao();
				carta_colecao.setCarta(carta);
				carta_colecao.setQuantidade(rs.getInt("quantidade"));
				cartas.add(carta_colecao);
			}			
			baralho.setJogador(j);
			baralho.setCartas(cartas);
			return baralho;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
}
