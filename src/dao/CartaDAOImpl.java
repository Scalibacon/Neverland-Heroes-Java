package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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

}
