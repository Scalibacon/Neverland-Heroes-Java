package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.Jogador;
import model.TipoJogador;
import security.Md5;

public class JogadorDAOImpl implements JogadorDAO {

	@Override
	public Jogador buscaJogadorLogin(String usuario, String senha) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			Jogador jogador = new Jogador();
			String sql = "SELECT j.id, j.nivel, j.experiencia, j.dinheiro, j.tipo, j.partidas, j.vitorias,"
					+ "j.icone, j.conquistas FROM jogador j "
					+ "WHERE j.usuario = ? and j.senha = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setString(1, usuario);
			stm.setString(2, Md5.getMd5(senha));
			ResultSet rs = stm.executeQuery();

			if (rs.next()) {
				jogador.setId(rs.getInt("id"));
				jogador.setUsuario(usuario);
				jogador.setNivel(rs.getInt("nivel"));
				jogador.setExperiencia(rs.getInt("experiencia"));
				jogador.setDinheiro(rs.getInt("dinheiro"));
				jogador.setTipo(TipoJogador.buscaTipoJogador(rs.getInt("tipo")));
				jogador.setPartidas(rs.getInt("partidas"));
				jogador.setVitorias(rs.getInt("vitorias"));
				jogador.setDerrotas(jogador.getPartidas() - jogador.getVitorias());
				jogador.setIcone(rs.getInt("icone"));
				jogador.setConquistas(rs.getString("conquistas"));
				return jogador;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean cadastrarJogador(Jogador jogador) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			String sql = "INSERT INTO jogador(usuario,senha,email,nivel,experiencia,dinheiro,tipo,partidas,vitorias,icone) "
					+ "VALUES(?,?,?,1,0,100,0,0,0,0)";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setString(1, jogador.getUsuario());
			stm.setString(2, Md5.getMd5(jogador.getSenha()));
			stm.setString(3, jogador.getEmail());
			if(stm.executeUpdate() == 1) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return false;
	}
	
	@Override
	public Jogador buscarPerfil(Jogador jogador) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			String sql = "select * from v_busca_perfil where id = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, jogador.getId());
			ResultSet rs = stm.executeQuery();

			if (rs.next()) {
				jogador.setUsuario(rs.getString("usuario"));
				jogador.setEmail(rs.getString("email"));
				jogador.setNivel(rs.getInt("nivel"));
				jogador.setExperiencia(rs.getInt("experiencia"));
				jogador.setDinheiro(rs.getInt("dinheiro"));
				jogador.setTipo(TipoJogador.buscaTipoJogador(rs.getInt("tipo")));
				jogador.setPartidas(rs.getInt("partidas"));
				jogador.setVitorias(rs.getInt("vitorias"));
				jogador.setDerrotas(jogador.getPartidas() - jogador.getVitorias());
				jogador.setIcone(rs.getInt("icone"));
				jogador.setConquistas(rs.getString("conquistas"));
			}
			return jogador;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public boolean trocaIcone(Jogador jogador) {
		try (Connection con = DBConnection.getInstancia().conectar();) {
			String sql = "UPDATE jogador set icone = ? where id = ?";
			PreparedStatement stm = con.prepareStatement(sql);
			stm.setInt(1, jogador.getIcone());
			stm.setInt(2, jogador.getId());
			stm.executeUpdate();			
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
	}
}
