<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="css/criador-cartas-style.css">
<script type='text/javascript' src='js/jquery-3.4.1.min.js'></script>
<script type="text/javascript" src="js/criador-cartas-scripts.js"></script>
<title>Criador de Cartas - Neverland Heroes</title>
</head>
<body>
	<jsp:include page="header.jsp" />
	
	<div id="big-container">
		<div class="bem-na-dividida" id="card-container">
		
		</div>
		<div class="bem-na-dividida" id="settings-container">
			<form action="" method="POST" id="form-cria-carta">
				<div class="container-settings">
					<span class="txt-auxiliar">ID:</span><input type="text" class="settings-input" name="id" disabled>
					<br>
					<span class="txt-auxiliar">Raridade:</span> <select name="raridade" class="combobox" id="raridade">
						<option value="0">Comum</option>
						<option value="1">Rara</option>
						<option value="2">Épica</option>
						<option value="3">Lendária</option>
					</select>
					<br>
					<span class="txt-auxiliar">Tipo:</span> <select name="tipo" class="combobox" id="tipo" onchange="atualizaSettingsValidos">
						<option value="0">Recurso</option>
						<option value="1">Consumível</option>
						<option value="2">Equipamento</option>
						<option value="3">Arma</option>
						<option value="4">Postura</option>
						<option value="5">Magia</option>
						<option value="6">Herói</option>				
					</select>
					<br>
					<span class="txt-auxiliar">Nome:</span><input type="text" class="settings-input" name="nome">
					<br>
					<span class="txt-auxiliar">Preço (V):</span><input type="number" class="settings-input" name="venda">
					<br>
					<span class="txt-auxiliar">Preço (C):</span><input type="number" class="settings-input" name="compra">
					<br>
					<span class="txt-auxiliar">Descrição:</span><textarea class="settings-area" name="descricao"></textarea>				
				</div>
				<div class="container-settings">
					<span class="txt-auxiliar">Afinidade:</span> <select name="afinidade" class="combobox" id="afinidade">
						<option value="0">Neutro</option>
						<option value="1">Luz</option>
						<option value="2">Trevas</option>
						<option value="3">Fogo</option>
						<option value="4">Água</option>
						<option value="5">Terra</option>
						<option value="6">Vento</option>				
					</select>
					<br>
					<span class="txt-auxiliar">Rank:</span> <select name="rank" class="combobox" id="rank">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>				
					</select>
					<br>
					<span class="txt-auxiliar">HP:</span><input type="number" class="settings-input" name="hp">
					<br>
					<span class="txt-auxiliar" id="txt-mana">Mana:</span><input type="number" class="settings-input" name="mana">
					<br>
					<span class="txt-auxiliar">Ataque:</span><input type="number" class="settings-input" name="ataque">
					<br>
					<span class="txt-auxiliar">Poder:</span><input type="number" class="settings-input" name="poder">
					<br>
					<span class="txt-auxiliar">Defesa:</span><input type="number" class="settings-input" name="defesa">
					<br>
					<span class="txt-auxiliar">Resistência:</span><input type="number" class="settings-input" name="resistencia">
					<br>
					<span class="txt-auxiliar">Perícia:</span> <select name="pericia" class="combobox" id="pericia">
						<option value="0">Espada</option>
						<option value="1">Lança</option>
						<option value="2">Machado</option>
						<option value="3">Adaga</option>
						<option value="4">Arco</option>	
						<option value="5">Escudo</option>	
						<option value="6">Livro</option>
						<option value="7">Cajado</option>					
					</select>
					<br>
					<span class="txt-auxiliar" id="txt-tipo-arma">Ganho P.:</span><input type="number" class="settings-input" name="ganho_per">
					<br>
					<span class="txt-auxiliar">Recarga:</span><input type="number" class="settings-input" name="ganho_per">
					<br>
				</div>				
			</form>
		</div>
	</div>
</body>
</html>