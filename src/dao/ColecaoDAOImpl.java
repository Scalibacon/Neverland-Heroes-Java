package dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Arma;
import model.Carta;
import model.CartaColecao;
import model.Colecao;
import model.Consumivel;
import model.Heroi;
import model.Jogador;
import model.Magia;
import model.Postura;
import model.TipoAfinidade;
import model.TipoArma;
import model.TipoCarta;
import model.TipoRaridade;

public class ColecaoDAOImpl implements ColecaoDAO{

	@Override
	public Colecao buscaColecao(Jogador j) {
		Colecao colecao = new Colecao();
		List<CartaColecao> cartas = new ArrayList<CartaColecao>();
		
		cartas.addAll(buscaHerois(j));
		cartas.addAll(buscaArmas(j));
		cartas.addAll(buscaMagias(j));
		cartas.addAll(buscaPosturas(j));
		cartas.addAll(buscaConsumiveis(j));		
		
		colecao.setJogador(j);
		colecao.setCartas(cartas);
		return colecao;
	}
	
	@Override
	public List<CartaColecao> buscaHerois(Jogador j){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_busca_colecao_herois " + 
						 "where id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Heroi c = new Heroi();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setPrecoVenda(rs.getInt("preco_venda"));
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
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_busca_colecao_armas " + 
						 "where id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Arma c = new Arma();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setPrecoVenda(rs.getInt("preco_venda"));
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
			String sql = "select * from v_busca_colecao_magias " + 
					"where id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Magia c = new Magia();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setPrecoVenda(rs.getInt("preco_venda"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setAfinidade(TipoAfinidade.buscaTipoAfinidade(rs.getInt("afinidade")));
				c.setCusto(rs.getInt("custo"));
				c.setTempoRecarga(rs.getInt("tempo_recarga"));
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
			String sql = "select * from v_busca_colecao_posturas " + 
						 "where id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Postura c = new Postura();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setPrecoVenda(rs.getInt("preco_venda"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setTipoArma(TipoArma.buscaTipoArma(rs.getInt("tipo_arma")));
				c.setCusto(rs.getInt("custo"));
				c.setTempoRecarga(rs.getInt("tempo_recarga"));
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
			String sql = "select * from v_busca_colecao_consumiveis " + 
					"where id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Consumivel c = new Consumivel();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setPrecoVenda(rs.getInt("preco_venda"));
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
	
	@Override
	public List<Carta> comprarPacote(Jogador j, int pacote, int preco) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<Carta> cartas = new ArrayList<Carta>();
			String sql = "{CALL proc_compra_carta(?, ?, ?)}";
			CallableStatement cs = con.prepareCall(sql);
			cs.setInt(1, pacote);
			cs.setInt(2, preco);
			cs.setInt(3, j.getId());
			ResultSet rs = cs.executeQuery();
			while(rs.next()) {
				Carta c = new Carta();
				c.setId(rs.getInt("id_carta"));
				cartas.add(c);
			}
			cs.close();
			return cartas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

}
