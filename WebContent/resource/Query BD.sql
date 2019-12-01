
create database cardgame
go
use cardgame

create table carta(
id int not null,
nome varchar(100) not null unique,
raridade int not null,
preco_venda int not null,
tipo int not null,
descricao varchar(max),
primary key (id)
)

create table consumivel(
id int not null,
foreign key (id) references carta(id) on delete cascade,
primary key (id)
)

create table arma(
id int not null,
tipo int not null,
foreign key (id) references carta(id) on delete cascade,
primary key (id)
)

create table postura(
id int not null,
tipo_arma int not null,
custo int not null,
tempo_recarga int not null,
foreign key (id) references carta(id) on delete cascade,
primary key (id)
)

create table magia(
id int not null,
afinidade int not null,
custo int not null,
tempo_recarga int not null,
foreign key (id) references carta(id) on delete cascade,
primary key (id)
)

create table heroi(
id int not null,
rank_ int not null,
afinidade int not null,
hp int not null,
mana int not null,
forca int not null,
poder int not null,
defesa int not null,
resistencia int not null,
pericia int not null,
ganho_pericia int,
foreign key (id) references carta(id) on delete cascade,
primary key (id)
)
--update heroi set hp = 8 where id = 42
create table jogador(
id int identity(1,1) not null,
usuario varchar(100) not null unique,
senha varchar(max) not null,
email varchar(max) not null,
nivel int not null,
experiencia int not null,
dinheiro int not null,
tipo int not null,
partidas int not null,
vitorias int not null,
icone int not null,
conquistas varchar(max) default(''),
data_desban datetime,
primary key (id)
)

create table colecao_carta(
id_jogador int not null,
id_carta int not null,
quantidade int not null,
primary key (id_jogador, id_carta),
foreign key (id_jogador) references jogador(id),
foreign key (id_carta) references carta(id)
)
--insert into colecao_carta values(2,103,99)
--update colecao_carta set quantidade = 99 where id_jogador = 2
create table baralho(
id_jogador int not null,
nome_baralho varchar(100) not null,
id_campeao int not null,
primary key(id_jogador, nome_baralho),
foreign key(id_jogador) references jogador(id)
)

create table baralho_carta(
id_jogador int not null,
nome_baralho varchar(100) not null,
id_carta int not null,
quantidade int not null,
primary key(id_jogador, nome_baralho, id_carta),
foreign key(id_jogador, nome_baralho) references baralho(id_jogador, nome_baralho),
foreign key(id_carta) references carta(id)
)

create table oponente(
id int not null,
nome varchar(100) not null,
nivel int not null,
descricao varchar(max) not null,
campeao int not null,
primary key (id),
foreign key (campeao) references carta(id)
)

create table carta_oponente(
id_oponente int not null,
id_carta int not null,
quantidade int not null,
primary key (id_oponente, id_carta),
foreign key (id_oponente) references oponente(id),
foreign key (id_carta) references carta(id)
)

create table novidade(
id int identity(1,1) not null,
titulo varchar(max) not null,
texto varchar(max),
id_autor int not null,
data_postagem datetime not null,
primary key (id),
foreign key (id_autor) references jogador(id)
)

create table partida(
id1 int not null,
id2 int not null,
data_partida datetime not null,
vencedor int,
primary key (id1, id2, data_partida),
foreign key (id1) references jogador(id),
foreign key (id2) references jogador(id),
)

INSERT INTO jogador(usuario,senha,email,nivel,experiencia,dinheiro,tipo,partidas,vitorias,icone, conquistas)
	VALUES('Scalibacon','e8d95a51f3af4a3b134bf6bb680a213a','scalibacon@gmail.com',18,300,99999,2,33,25,12, '1-2-3-4-5-6-7-')
--UPDATE jogador set dinheiro = 99999999 where id = 2

select * from carta where descricao like '%AGI%'
--update carta set descricao = '(1) O usuário causa 1 DANO verdadeiro a todos os heróis inimigos e reduz -2 ESQ deles.' where id = 91
select * from heroi
select * from arma
select * from magia
select * from postura
select * from consumivel
select * from jogador
select * from colecao_carta
select * from baralho
select * from baralho_carta
select * from oponente
select * from carta_oponente
-- ******************************** VIEWS *********************************** --
------------------------- GERAL ------------------------------
go
create view v_busca_perfil
as
	select id, usuario, email, nivel, experiencia, dinheiro, tipo, partidas, vitorias, icone, conquistas, data_desban
	from jogador

--------------------------------------------------------------
go
CREATE VIEW v_porcentagem_aleatoria
AS
SELECT RAND()*(100-1+1)+1 AS porcentagem

--------------------------------------------------------------
go
CREATE VIEW v_carta_comum_aleatoria
AS
	SELECT TOP 1 id FROM carta where raridade = 0 ORDER BY NEWID()

--------------------------------------------------------------
go
CREATE VIEW v_carta_rara_aleatoria
AS
	SELECT TOP 1 id FROM carta where raridade = 1 ORDER BY NEWID()

--------------------------------------------------------------
go
CREATE VIEW v_carta_epica_aleatoria
AS
	SELECT TOP 1 id FROM carta where raridade = 2 ORDER BY NEWID()

--------------------------------------------------------------
go
CREATE VIEW v_carta_lendaria_aleatoria
AS
	SELECT TOP 1 id FROM carta where raridade = 3 ORDER BY NEWID()


----------------------- OPONENTE ------------------------------
go
create view v_oponente_campeao
as
	select o.id as id_oponente, c.id, c.preco_venda, c.nome, c.tipo, c.raridade, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia,
	h.afinidade, h.pericia, h.ganho_pericia from carta c
	inner join oponente o 
	on o.campeao = c.id 
	inner join heroi h 
	on h.id = c.id
---------------------------------------------------
go
create view v_oponente_herois
as
	SELECT o.id as id_oponente, c.id, c.nome, c.preco_venda, c.tipo, c.raridade, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia, 
	h.afinidade, h.pericia, h.ganho_pericia, oc.quantidade FROM carta_oponente oc
	INNER JOIN carta c
	ON c.id = oc.id_carta 
	inner join heroi h 
	on h.id = c.id
	INNER JOIN oponente o
	ON o.id = oc.id_oponente
---------------------------------------------------
go
create view v_oponente_armas
as
	SELECT o.id as id_oponente, c.id, c.nome, c.preco_venda, c.tipo, a.tipo as tipo_arma, oc.quantidade FROM carta_oponente oc
	INNER JOIN carta c
	ON c.id = oc.id_carta 
	inner join arma a 
	on a.id = c.id 
	INNER JOIN oponente o 
	ON o.id = oc.id_oponente
---------------------------------------------------
go
create view v_oponente_magias
as
	SELECT o.id as id_oponente, c.id, c.nome, c.preco_venda, c.tipo, m.afinidade, m.custo, m.tempo_recarga, oc.quantidade FROM carta_oponente oc
	inner join carta c
	on c.id = oc.id_carta
	INNER JOIN magia m 
	ON m.id = oc.id_carta 				 
	INNER JOIN oponente o 
	ON o.id = oc.id_oponente
---------------------------------------------------
go
create view v_oponente_posturas
as
	SELECT o.id as id_oponente, c.id, c.nome, c.preco_venda, c.tipo, p.tipo_arma, p.custo, p.tempo_recarga, oc.quantidade FROM carta_oponente oc 
	INNER JOIN carta c
	ON c.id = oc.id_carta
	inner join postura p 
	on p.id = c.id
	INNER JOIN oponente o 
	ON o.id = oc.id_oponente
---------------------------------------------------
go
create view v_oponente_consumiveis
as
	SELECT o.id as id_oponente, c.id, c.nome, c.preco_venda, c.tipo, oc.quantidade FROM carta_oponente oc
	INNER JOIN carta c
	ON c.id = oc.id_carta 
	inner join consumivel con 
	on con.id = c.id 
	INNER JOIN oponente o 
	ON o.id = oc.id_oponente

----------------------- BARALHO ------------------------------
go
create view v_busca_baralho_campeao
as
	select b.id_jogador, b.nome_baralho, c.id, c.preco_venda, c.nome, c.tipo, c.raridade, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia,
	h.afinidade, h.pericia, h.ganho_pericia from carta c
	inner join baralho b 
	on b.id_campeao = c.id 
	inner join heroi h 
	on h.id = c.id
---------------------------------------------------
go
create view v_busca_baralho_herois
as
	SELECT b.id_jogador, b.nome_baralho, c.id, c.nome, c.preco_venda, c.tipo, c.raridade, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia, 
	h.afinidade, h.pericia, h.ganho_pericia, bc.quantidade FROM baralho_carta bc
	INNER JOIN carta c
	ON c.id = bc.id_carta 
	inner join heroi h 
	on h.id = c.id
	INNER JOIN baralho b 
	ON b.id_jogador = bc.id_jogador 
---------------------------------------------------
go
create view v_busca_baralho_armas
as
	SELECT b.id_jogador, b.nome_baralho, c.id, c.nome, c.preco_venda, c.tipo, a.tipo as tipo_arma, bc.quantidade FROM baralho_carta bc
	INNER JOIN carta c
	ON c.id = bc.id_carta 
	inner join arma a 
	on a.id = c.id 
	INNER JOIN baralho b 
	ON b.id_jogador = bc.id_jogador
---------------------------------------------------
go
create view v_busca_baralho_magias
as
	SELECT b.id_jogador, b.nome_baralho, c.id, c.nome, c.preco_venda, c.tipo, m.afinidade, m.custo, m.tempo_recarga, bc.quantidade FROM baralho_carta bc
	inner join carta c
	on c.id = bc.id_carta
	INNER JOIN magia m 
	ON m.id = bc.id_carta 				 
	INNER JOIN baralho b 
	ON b.id_jogador = bc.id_jogador 
---------------------------------------------------
go
create view v_busca_baralho_posturas
as
	SELECT b.id_jogador, b.nome_baralho, c.id, c.nome, c.preco_venda, c.tipo, p.tipo_arma, p.custo, p.tempo_recarga, bc.quantidade FROM baralho_carta bc 
	INNER JOIN carta c
	ON c.id = bc.id_carta
	inner join postura p 
	on p.id = c.id
	INNER JOIN baralho b 
	ON b.id_jogador = bc.id_jogador
---------------------------------------------------
go
create view v_busca_baralho_consumiveis
as
	SELECT b.id_jogador, b.nome_baralho, c.id, c.nome, c.preco_venda, c.tipo, bc.quantidade FROM baralho_carta bc
	INNER JOIN carta c
	ON c.id = bc.id_carta 
	inner join consumivel con 
	on con.id = c.id 
	INNER JOIN baralho b 
	ON b.id_jogador = bc.id_jogador 

----------------------- COLEÇÃO ------------------------------
go
create view v_busca_colecao_herois
as
	select cc.id_jogador, c.id, c.nome, c.tipo, c.raridade, c.preco_venda, h.rank_, h.hp, h.mana, h.forca, h.poder, h.defesa, h.resistencia,
	h.afinidade, h.pericia, h.ganho_pericia, cc.quantidade from colecao_carta cc
	inner join carta c
	on c.id = cc.id_carta 
	inner join heroi h 
	on h.id = c.id
---------------------------------------------------
go
create view v_busca_colecao_armas
as
	select cc.id_jogador, c.id, c.nome, c.preco_venda, c.tipo, a.tipo as tipo_arma, cc.quantidade from colecao_carta cc
	inner join carta c
	on c.id = cc.id_carta 
	inner join arma a 
	on a.id = c.id 
---------------------------------------------------
go
create view v_busca_colecao_magias
as
	select cc.id_jogador, c.id, c.nome, c.preco_venda, c.tipo, m.afinidade, m.custo, m.tempo_recarga, cc.quantidade from colecao_carta cc
	inner join carta c
	on c.id = cc.id_carta 
	inner join magia m 
	on m.id = c.id 
---------------------------------------------------
go
create view v_busca_colecao_posturas
as
	select cc.id_jogador, c.id, c.nome, c.preco_venda, c.tipo, p.tipo_arma, p.custo, p.tempo_recarga, cc.quantidade from colecao_carta cc 
	inner join carta c 
	on c.id = cc.id_carta 
	inner join postura p
	on p.id = c.id 
---------------------------------------------------
go
create view v_busca_colecao_consumiveis
as
	select cc.id_jogador, c.id, c.nome, c.preco_venda, c.tipo, cc.quantidade from colecao_carta cc
	inner join carta c
	on c.id = cc.id_carta 
	inner join consumivel con 
	on con.id = c.id 


-- ************************************* FUNCTIONS *************************************** --


-- ************************************* PROCEDURE *************************************** --
--drop procedure proc_compra_carta
--exec proc_compra_carta 4, 200, 2
-- 1 - comum; 2 - raro; 3 - épico; 4 - lendário --
go
create procedure proc_compra_carta(@tipo int, @preco int, @id_jogador int)
as
begin
	DECLARE @id_carta int, @chanceC int, @chanceR int, @chanceE int, @chanceL int, @aleatorio int, @num_cartas int, @possui_carta int,
	@dinheiro int
	declare @tabela table(id_carta int)

	set @dinheiro = (select dinheiro from jogador where id = @id_jogador)
	if(@dinheiro >= @preco)
		begin
			update jogador set dinheiro = dinheiro - @preco where id = @id_jogador
			set @num_cartas = 3
			if(@tipo = 1)
				begin
					set @chanceC = 74
					set @chanceR = 20
					set @chanceE = 5
					set @chanceL = 1
				end
			if(@tipo = 2)
				begin
					set @chanceC = 30
					set @chanceR = 64
					set @chanceE = 5
					set @chanceL = 1
				end
			if(@tipo = 3)
				begin
					set @chanceC = 10
					set @chanceR = 20
					set @chanceE = 65
					set @chanceL = 5
				end
			if(@tipo = 4)
				begin
					set @chanceC = 5
					set @chanceR = 15
					set @chanceE = 30
					set @chanceL = 50
				end

			while(@num_cartas > 0)
			begin
				set @aleatorio = (SELECT porcentagem from v_porcentagem_aleatoria);
	
				if(@aleatorio <= @chanceL)
					begin
						set @id_carta = (select id from v_carta_lendaria_aleatoria)				
					end
				else 
				begin
					if(@aleatorio <= (@chanceL + @chanceE))
						begin
							set @id_carta = (select id from v_carta_epica_aleatoria)
						end
					else 
					begin
						if(@aleatorio <= (@chanceL + @chanceE + @chanceR))
							begin
								set @id_carta = (select id from v_carta_rara_aleatoria)
							end
						else 
							begin
								set @id_carta = (select id from v_carta_comum_aleatoria)
							end
					end
				end
				
				insert into @tabela values(@id_carta)

				set @possui_carta = (select count(id_carta) from colecao_carta where id_jogador = @id_jogador and id_carta = @id_carta)
				if(@possui_carta > 0)
					begin
						update colecao_carta set quantidade = quantidade + 1 where id_jogador = @id_jogador and id_carta = @id_carta
					end
				else
					begin
						insert into colecao_carta values(@id_jogador, @id_carta, 1)
					end

				set @num_cartas = @num_cartas - 1
			end
			select * from @tabela
		end		
end

-- ************************************* TRIGGERS *************************************** --

-- Dá as cartas padrões pro jogador depois que for cadastrado --
go
create trigger t_cartas_padrao
on jogador
after insert
as
	declare @cont int,
			@id int
	set @cont = 2
	set @id = (select id from inserted)
	insert into baralho values(@id, 'Padrão', 2)
	while(@cont <= 21)
	begin
		insert into colecao_carta values(@id, @cont, 1)
		if(@cont != 2)
		begin
			insert into baralho_carta values(@id, 'Padrão', @cont, 1)
		end
		set @cont = @cont + 1
	end	


-- ***************** Inserts chumbados se foda ***************** --

insert into oponente values(1, 'Johnny', 1, '', 3)
go
insert into carta_oponente values(1,2,1),
								 (1,4,1),
								 (1,5,1),
								 (1,6,1),
								 (1,7,2),
								 (1,8,1),
								 (1,9,2),
								 (1,11,1),
								 (1,12,1),
								 (1,13,2),
								 (1,14,1),
								 (1,15,1),
								 (1,16,2),
								 (1,17,1),
								 (1,18,1),
								 (1,20,2),
								 (1,21,2)

insert into oponente values(2, 'Tyler', 5, '', 3)
insert into carta_oponente values(2,2,3),
								 (2,3,2),
								 (2,4,3),
								 (2,5,3),
								 (2,6,3),
								 (2,21,3),
								 (2,23,1),
								 (2,7,1)


select * from oponente
select * from carta_oponente
/* ponente
id int identity(1,1) not null,
nome varchar(100) not null,
nivel int not null,
descricao varchar(max) not null,
campeao int not null

carta_oponente
id_oponente int not null,
id_carta int not null,
quantidade int not null,
*/

-- ***************** Querys de teste ***************** --
select * from colecao_carta where id_jogador = 1
select * from baralho_carta where id_jogador = 1
select id_campeao from baralho where id_jogador = 1
select * from jogador
select * from carta
select * from postura
select * from magia
select * from heroi
select * from arma
select * from baralho

-- retorna todas as armas na coleção do jogador
select c.id, c.nome, c.tipo, cc.quantidade, a.tipo as tipo_arma from colecao_carta cc
inner join carta c
on c.id = cc.id_carta
inner join arma a
on a.id = c.id
where cc.id_jogador = 1

-- Sintaxe do backup
BACKUP DATABASE cardgame
TO DISK = 'E:\Teste\cardgameDB.bak';

-- Retorna jogador baseado no usuario/senha --
SELECT j.id, j.nivel, j.experiencia, j.dinheiro FROM jogador j
WHERE j.usuario = 'Scalibacon' and j.senha = 'senha'

-- Retorna a coleção do jogador --
SELECT cc.id_carta, c.nome, c.tipo, cc.quantidade FROM carta c
INNER JOIN colecao_carta cc
ON cc.id_carta = c.id
WHERE cc.id_jogador = 1
order by c.nome

select c.id, c.nome, c.tipo, h.rank_, h.hp, h.forca, h.poder from carta c
inner join baralho b
on b.id_campeao = c.id
inner join heroi h
on h.id = c.id
where b.id_jogador = 1 and b.nome_baralho = 'Padrão'

-- Retorna o baralho --
SELECT c.id, c.nome, c.tipo, h.rank_, h.forca, h.poder, bc.quantidade FROM baralho_carta bc
INNER JOIN carta c
ON c.id = bc.id_carta
inner join heroi h
on h.id = c.id
INNER JOIN baralho b
ON b.id_jogador = bc.id_jogador
WHERE bc.id_jogador = 1 AND bc.nome_baralho = 'Padrão'
ORDER BY c.tipo desc, c.nome asc

-- Retorna o campeão do baralho
SELECT b.id_campeao, c.nome FROM carta c
INNER JOIN baralho b
ON b.id_campeao = c.id
WHERE b.id_jogador = 1 AND b.nome_baralho = 'Padrão'

-- Retorna o último ID de card cadastrado --
SELECT MAX(id) AS id FROM carta

-- Salva o deck --
delete from baralho_carta where id_jogador = 1 and nome_baralho = 'Padrão' --apaga as cartas antigas
update baralho set id_campeao = 1 where id_jogador = 1 and nome_baralho = 'Padrão' --atualiza o campeão
insert into baralho_carta values (1, 'Padrão', 1, 1) --laço que insere as cartas
/*
.
.
.
id_jogador int not null,
nome_baralho varchar(100) not null,
id_carta int not null,
quantidade int not null,
*/