package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Arma;
import model.Baralho;
import model.CartaColecao;
import model.Consumivel;
import model.Heroi;
import model.Jogador;
import model.Magia;
import model.Postura;
import model.TipoAfinidade;
import model.TipoArma;
import model.TipoCarta;
import model.TipoRaridade;

public class BaralhoDAOImpl implements BaralhoDAO {

	@Override
	public Baralho buscaBaralho(Jogador j) {	
		Baralho baralho = new Baralho();
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		
		baralho.setCampeao(buscaCampeao(j));
		cartas.addAll(buscaHerois(j));
		cartas.addAll(buscaArmas(j));
		cartas.addAll(buscaMagias(j));
		cartas.addAll(buscaPosturas(j));
		cartas.addAll(buscaConsumiveis(j));
		
		baralho.setJogador(j);
		baralho.setCartas(cartas);
		return baralho;		
	}
	
	@Override
	public Heroi buscaCampeao(Jogador j) {
		try (Connection con = DBConnection.getInstancia().conectar();){			
			Heroi campeao = new Heroi();
			String sql = "select c.id, c.nome, c.tipo, c.raridade, c.preco_venda, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia, "
					+ "h.afinidade, h.pericia, h.ganho_pericia from carta c " + 
					"inner join baralho b " + 
					"on b.id_campeao = c.id " + 
					"inner join heroi h " + 
					"on h.id = c.id " + 
					"where b.id_jogador = ? and b.nome_baralho = 'Padrão'";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			Baralho baralho = new Baralho();
			if(rs.next()) {
				campeao = new Heroi();
				campeao.setId(rs.getInt("id"));
				campeao.setNome(rs.getString("nome"));
				campeao.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				campeao.setRaridade(TipoRaridade.buscaTipoRaridade(rs.getInt("raridade")));
				campeao.setPrecoVenda(rs.getInt("preco_venda"));
				campeao.setRank(rs.getInt("rank_"));
				campeao.setHp(rs.getInt("hp"));
				campeao.setMana(rs.getInt("mana"));
				campeao.setForca(rs.getInt("forca"));
				campeao.setPoder(rs.getInt("poder"));
				campeao.setDefesa(rs.getInt("defesa"));
				campeao.setResistencia(rs.getInt("resistencia"));
				campeao.setAfinidade(TipoAfinidade.buscaTipoAfinidade(rs.getInt("afinidade")));
				campeao.setPericia(TipoArma.buscaTipoArma(rs.getInt("pericia")));
				campeao.setGanhoPericia(rs.getInt("ganho_pericia"));
				baralho.setCampeao(campeao);
			}
			return campeao;	
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaHerois(Jogador j){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT c.id, c.nome, c.tipo, c.raridade, c.preco_venda, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia, "
					+ "h.afinidade, h.pericia, h.ganho_pericia, bc.quantidade FROM baralho_carta bc " + 
					"INNER JOIN carta c " + 
					"ON c.id = bc.id_carta " + 
					"inner join heroi h " + 
					"on h.id = c.id " + 
					"INNER JOIN baralho b " + 
					"ON b.id_jogador = bc.id_jogador " + 
					"WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' " + 
					"ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Heroi c = new Heroi();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setRaridade(TipoRaridade.buscaTipoRaridade(rs.getInt("raridade")));
				c.setPrecoVenda(rs.getInt("preco_venda"));
				c.setRank(rs.getInt("rank_"));
				c.setHp(rs.getInt("hp"));
				c.setMana(rs.getInt("mana"));
				c.setForca(rs.getInt("forca"));
				c.setPoder(rs.getInt("poder"));
				c.setDefesa(rs.getInt("defesa"));
				c.setResistencia(rs.getInt("resistencia"));
				c.setAfinidade(TipoAfinidade.buscaTipoAfinidade(rs.getInt("afinidade")));
				c.setPericia(TipoArma.buscaTipoArma(rs.getInt("pericia")));
				c.setGanhoPericia(rs.getInt("ganho_pericia"));
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(rs.getInt("quantidade"));
				cartas.add(cc);
			}
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaArmas(Jogador j){
		try {
			Connection con = DBConnection.getInstancia().conectar();
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT c.id, c.nome, c.tipo, a.tipo as tipo_arma, bc.quantidade FROM baralho_carta bc " + 
					"INNER JOIN carta c " + 
					"ON c.id = bc.id_carta " + 
					"inner join arma a " + 
					"on a.id = c.id " + 
					"INNER JOIN baralho b " + 
					"ON b.id_jogador = bc.id_jogador " + 
					"WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' " + 
					"ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Arma c = new Arma();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setTipoArma(TipoArma.buscaTipoArma(rs.getInt("tipo_arma")));
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(rs.getInt("quantidade"));
				cartas.add(cc);
			}
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaMagias(Jogador j){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT c.id, c.nome, c.tipo, m.afinidade, m.custo, bc.quantidade FROM baralho_carta bc " + 
					"inner join carta c " + 
					"on c.id = bc.id_carta " +
					"INNER JOIN magia m " + 
					"ON m.id = bc.id_carta " + 				 
					"INNER JOIN baralho b " + 
					"ON b.id_jogador = bc.id_jogador " + 
					"WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' " + 
					"ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Magia c = new Magia();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setAfinidade(TipoAfinidade.buscaTipoAfinidade(rs.getInt("afinidade")));
				c.setCusto(rs.getInt("custo"));
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(rs.getInt("quantidade"));
				cartas.add(cc);
			}
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaPosturas(Jogador j){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT c.id, c.nome, c.tipo, p.tipo_arma, p.custo, bc.quantidade FROM baralho_carta bc " + 
					"INNER JOIN carta c " + 
					"ON c.id = bc.id_carta " + 
					"inner join postura p " + 
					"on p.id = c.id " + 
					"INNER JOIN baralho b " + 
					"ON b.id_jogador = bc.id_jogador " + 
					"WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' " + 
					"ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Postura c = new Postura();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setTipoArma(TipoArma.buscaTipoArma(rs.getInt("tipo_arma")));
				c.setCusto(rs.getInt("custo"));
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(rs.getInt("quantidade"));
				cartas.add(cc);
			}
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaConsumiveis(Jogador j){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "SELECT c.id, c.nome, c.tipo, bc.quantidade FROM baralho_carta bc " + 
					"INNER JOIN carta c " + 
					"ON c.id = bc.id_carta " + 
					"inner join consumivel con " + 
					"on con.id = c.id " + 
					"INNER JOIN baralho b " + 
					"ON b.id_jogador = bc.id_jogador " + 
					"WHERE bc.id_jogador = ? AND bc.nome_baralho = 'Padrão' " + 
					"ORDER BY c.tipo desc, c.nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Consumivel c = new Consumivel();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				CartaColecao cc = new CartaColecao();
				cc.setCarta(c);
				cc.setQuantidade(rs.getInt("quantidade"));
				cartas.add(cc);
			}
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
}
