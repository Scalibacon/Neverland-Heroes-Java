package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Arma;
import model.Carta;
import model.Consumivel;
import model.Heroi;
import model.Magia;
import model.Postura;

public class CartaDAOImpl implements CartaDAO{

	@Override
	public int ultimoId() {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			int id = 0;
			String sql = "SELECT MAX(id) AS id FROM carta";
			PreparedStatement stm = con.prepareStatement(sql);
			ResultSet rs = stm.executeQuery();
			
			if(rs.next()) {
				id = rs.getInt("id");
			}
			return id;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public boolean adicionarCartaBase(Carta carta) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			String sql = "INSERT INTO carta VALUES(?,?,?,?,?)";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, carta.getId());
			stm.setString(2, carta.getNome());
			stm.setInt(3, carta.getRaridade().getValor());
			stm.setInt(4, carta.getPrecoVenda());
			stm.setInt(5, carta.getTipoCarta().getValor());
			stm.executeUpdate();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean adicionarConsumivel(Consumivel carta) {
		if(adicionarCartaBase(carta)) {
			try (Connection con = DBConnection.getInstancia().conectar();) {
				String sql = "INSERT INTO consumivel VALUES(?)";
				PreparedStatement stm = con.prepareStatement(sql);
				stm.setInt(1, carta.getId());
				stm.executeUpdate();
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	@Override
	public boolean adicionarArma(Arma carta) {
		if(adicionarCartaBase(carta)) {
			try (Connection con = DBConnection.getInstancia().conectar();) {
				String sql = "INSERT INTO arma VALUES(?,?)";
				PreparedStatement stm = con.prepareStatement(sql);
				stm.setInt(1, carta.getId());
				stm.setInt(2, carta.getTipoArma().getValor());
				stm.executeUpdate();
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	@Override
	public boolean adicionarPostura(Postura carta) {
		if(adicionarCartaBase(carta)) {
			try (Connection con = DBConnection.getInstancia().conectar();) {
				String sql = "INSERT INTO postura VALUES(?,?,?,?)";
				PreparedStatement stm = con.prepareStatement(sql);
				stm.setInt(1, carta.getId());
				stm.setInt(2, carta.getTipoArma().getValor());
				stm.setInt(3, carta.getCusto());
				stm.setInt(4, carta.getTempoRecarga());
				stm.executeUpdate();
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	@Override
	public boolean adicionarMagia(Magia carta) {
		if(adicionarCartaBase(carta)) {
			try (Connection con = DBConnection.getInstancia().conectar();) {
				String sql = "INSERT INTO magia VALUES(?,?,?,?)";
				PreparedStatement stm = con.prepareStatement(sql);
				stm.setInt(1, carta.getId());
				stm.setInt(2, carta.getAfinidade().getValor());
				stm.setInt(3, carta.getCusto());
				stm.setInt(4, carta.getTempoRecarga());
				stm.executeUpdate();
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}

	@Override
	public boolean adicionarHeroi(Heroi carta) {
		if(adicionarCartaBase(carta)) {
			try (Connection con = DBConnection.getInstancia().conectar();) {
				String sql = "INSERT INTO heroi VALUES(?,?,?,?,?,?,?,?,?,?,?)";
				PreparedStatement stm = con.prepareStatement(sql);
				stm.setInt(1, carta.getId());
				stm.setInt(2, carta.getRank());
				stm.setInt(3, carta.getAfinidade().getValor());
				stm.setInt(4, carta.getHp());
				stm.setInt(5, carta.getMana());
				stm.setInt(6, carta.getForca());
				stm.setInt(7, carta.getPoder());
				stm.setInt(8, carta.getDefesa());
				stm.setInt(9, carta.getResistencia());
				stm.setInt(10, carta.getPericia().getValor());
				stm.setInt(11, carta.getGanhoPericia());
				stm.executeUpdate();
				return true;
			} catch (SQLException e) {
				e.printStackTrace();
				return false;
			}
		}
		return false;
	}	
}
