package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Arma;
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
			String sql = "select c.id, c.nome, c.tipo, cc.quantidade, h.rank_,  h.forca, h.poder, h.hp from colecao_carta cc " + 
					"inner join carta c " + 
					"on c.id = cc.id_carta " + 
					"inner join heroi h " + 
					"on h.id = c.id " + 
					"where cc.id_jogador = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, j.getId());
			ResultSet rs = stm.executeQuery();
			while(rs.next()) {
				Heroi c = new Heroi();
				c.setId(rs.getInt("id"));
				c.setNome(rs.getString("nome"));
				c.setTipoCarta(TipoCarta.buscaTipoCarta(rs.getInt("tipo")));
				c.setRank(rs.getInt("rank_"));
				c.setHp(rs.getInt("hp"));
				c.setForca(rs.getInt("forca"));
				c.setPoder(rs.getInt("poder"));
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
			String sql = "select c.id, c.nome, c.tipo, cc.quantidade, a.tipo as tipo_arma from colecao_carta cc " + 
					"inner join carta c " + 
					"on c.id = cc.id_carta " + 
					"inner join arma a " + 
					"on a.id = c.id " + 
					"where cc.id_jogador = ?";
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
			String sql = "select c.id, c.nome, c.tipo, cc.quantidade, m.afinidade, m.custo from colecao_carta cc " + 
					"inner join carta c " + 
					"on c.id = cc.id_carta " + 
					"inner join magia m " + 
					"on m.id = c.id " + 
					"where cc.id_jogador = ?";
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
			String sql = "select c.id, c.nome, c.tipo, cc.quantidade, p.tipo_arma, p.custo from colecao_carta cc " + 
					"inner join carta c " + 
					"on c.id = cc.id_carta " + 
					"inner join postura p " + 
					"on p.id = c.id " + 
					"where cc.id_jogador = ?";
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
			String sql = "select c.id, c.nome, c.tipo, cc.quantidade from colecao_carta cc " + 
					"inner join carta c " + 
					"on c.id = cc.id_carta " + 
					"inner join consumivel con " + 
					"on con.id = c.id " + 
					"where cc.id_jogador = ?";
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
