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
			String sql = "SELECT j.id, j.nivel, j.experiencia, j.dinheiro, j.tipo FROM jogador j "
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
			String sql = "INSERT INTO jogador(usuario,senha,email,nivel,experiencia,dinheiro,tipo,quantidade_jogos,vitorias) "
					+ "VALUES(?,?,?,1,0,100,0,0,0)";
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
}
