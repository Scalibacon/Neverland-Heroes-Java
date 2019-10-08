create database cardgame
go
use cardgame

create table carta(
id int not null,
nome varchar(100) not null,
raridade int not null,
imagem varchar(max) not null,
preco_venda int not null,
preco_compra int,
tipo int not null,
primary key (id)
)

create table recurso(
id int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table consumivel(
id int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table equipamento(
id int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table arma(
id int not null,
tipo int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table postura(
id int not null,
tipo_arma int not null,
custo int not null,
tempo_recarga int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table magia(
id int not null,
afinidade int not null,
custo int not null,
tempo_recarga int not null,
permite_atacar boolean not null,
foreign key (id) references carta(id),
primary key (id)
)

create table heroi(
id int not null,
rank_ int not null,
afinidade int not null,
hp int not null,
energia int not null,
ataque int not null,
poder_magico int not null,
resistencia int not null,
agilidade int not null,
precisao int not null,
foreign key (id) references carta(id),
primary key (id)
)

create table carta_material(
id_carta int not null,
id_material int not null,
quantidade int not null,
primary key (id_carta, id_material),
foreign key (id_carta) references carta(id),
foreign key (id_material) references carta(id)
)

create table jogador(
id int not null,
usuario varchar(100) not null,
senha varchar(max) not null,
email varchar(max) not null,
nivel int not null,
experiencia int not null,
dinheiro int not null,
primary key (id)
)

create table jogador_amigo(
id_jogador1 int not null,
id_jogador2 int not null,
primary key (id_jogador1, id_jogador2),
foreign key (id_jogador1) references jogador(id),
foreign key (id_jogador2) references jogador(id),
)

create table colecao_carta(
id_jogador int not null,
id_carta int not null,
quantidade int not null,
primary key (id_jogador, id_carta),
foreign key (id_jogador) references jogador(id),
foreign key (id_carta) references carta(id)
)

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
id int identity(1,1) not null,
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

create table drop_oponente(
id_oponente int not null,
id_drop int not null,
chance decimal(3,2) not null,
primary key (id_oponente, id_drop),
foreign key (id_oponente) references oponente(id),
foreign key (id_drop) references carta(id)
)


-- Retorna a coleção do jogador --
SELECT c.id, c.nome FROM carta c
INNER JOIN colecao_carta cc
ON cc.id_carta = c.id
WHERE cc.id_jogador = 1

-- Retorna o baralho --
SELECT c.id, c.nome, bc.quantidade FROM baralho_carta bc
INNER JOIN carta c
ON c.id = bc.id_carta
WHERE bc.id_jogador = 1 AND bc.nome_baralho = 'Default'

-- Retorna o campeão do baralho
SELECT b.id_campeao, c.nome FROM carta c
INNER JOIN baralho b
ON b.id_campeao = c.id
WHERE b.id_jogador = 1 AND b.nome_baralho = 'Default'

-- Retorna as cartas a venda --
SELECT c.id, c.nome FROM carta c
WHERE c.preco_compra > 0

-- Retorna as cartas forjáveis --
SELECT c.id, c.nome FROM carta c
INNER JOIN carta_material cm
on cm.id_carta = c.id

-- Retorna os materiais da carta forjável --
SELECT c.id, c.nome, cm.quantidade FROM carta c
INNER JOIN carta_material cm
on cm.id_material = c.id
WHERE cm.id_carta = 1