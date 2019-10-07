package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
	private static DBConnection instancia;
	private Connection con;
	private String host = "localhost:1433";
	private String database = "cardgame";
	private String url = "jdbc:sqlserver://" + host + ";databaseName=" + database;
	private String user = "cardgame_adm";
	private String senha = "senha";

	private DBConnection() {
		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static DBConnection getInstancia() {
		if (instancia == null) {
			instancia = new DBConnection();
		}
		return instancia;
	}

	public Connection conectar() throws SQLException {
		if (con == null || con.isClosed()) {
			con = DriverManager.getConnection(url, user, senha);
		}
		return con;
	}

	public void desconectar() throws SQLException {
		if (!con.isClosed()) {
			this.con.close();
		}
	}
}
