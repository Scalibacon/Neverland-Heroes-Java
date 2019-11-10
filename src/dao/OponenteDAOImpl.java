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
import model.Magia;
import model.Oponente;
import model.Postura;
import model.TipoAfinidade;
import model.TipoArma;
import model.TipoCarta;
import model.TipoRaridade;

public class OponenteDAOImpl implements OponenteDAO{
	
	@Override
	public Oponente buscaOponente(int id) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			Oponente oponente = new Oponente();
			Baralho baralho = new Baralho();
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from oponente where id = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, id);
			ResultSet rs = stm.executeQuery();
			if(rs.next()) {
				oponente.setId(rs.getInt("id"));
				oponente.setNome(rs.getString("nome"));
				oponente.setNivel(rs.getInt("nivel"));
				oponente.setDescricao(rs.getString("descricao"));
			}
			baralho.setCampeao(buscaCampeao(oponente));
			cartas.addAll(buscaHerois(oponente));
			cartas.addAll(buscaArmas(oponente));
			cartas.addAll(buscaMagias(oponente));
			cartas.addAll(buscaPosturas(oponente));
			cartas.addAll(buscaConsumiveis(oponente));
			
			baralho.setCartas(cartas);
			oponente.setBaralho(baralho);
			
			return oponente;
		}catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public CartaColecao buscaCampeao(Oponente o) {
		try (Connection con = DBConnection.getInstancia().conectar();){	
			CartaColecao c_campeao = new CartaColecao();
			String sql = "select * from v_oponente_campeao " + 
						 "where id_oponente = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
			ResultSet rs = stm.executeQuery();
			if(rs.next()) {
				Heroi campeao = new Heroi();
				campeao = new Heroi();
				campeao.setId(rs.getInt("id"));
				campeao.setNome(rs.getString("nome"));
				campeao.setPrecoVenda(rs.getInt("preco_venda"));
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
				c_campeao.setCarta(campeao);
				c_campeao.setQuantidade(1);
			}
			return c_campeao;	
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<CartaColecao> buscaHerois(Oponente o){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_oponente_herois " + 
						 "WHERE id_oponente = ? " + 
						 "ORDER BY tipo desc, nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Heroi c = new Heroi();
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
	public List<CartaColecao> buscaArmas(Oponente o){
		try {
			Connection con = DBConnection.getInstancia().conectar();
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_oponente_armas " + 
						 "WHERE id_oponente = ? " + 
						 "ORDER BY tipo desc, nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
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
	public List<CartaColecao> buscaMagias(Oponente o){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_oponente_magias " + 
					"WHERE id_oponente = ? " + 
					"ORDER BY tipo desc, nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
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
	public List<CartaColecao> buscaPosturas(Oponente o){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_oponente_posturas " + 
					"WHERE id_oponente = ? " + 
					"ORDER BY tipo desc, nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
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
	public List<CartaColecao> buscaConsumiveis(Oponente o){
		try (Connection con = DBConnection.getInstancia().conectar();) {
			List<CartaColecao> cartas = new ArrayList<CartaColecao>();
			String sql = "select * from v_oponente_consumiveis " + 
					"WHERE id_oponente = ? " + 
					"ORDER BY tipo desc, nome asc";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, o.getId());
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
}
