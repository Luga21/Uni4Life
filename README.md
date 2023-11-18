# Uni4Life
Uma plataforma social de conteúdo digital focada no público universitário para gerenciar e potencializar a jornada da comunidade acadêmica.

# Equipe:
- Bernardo Ludwig Weiss
- Eduardo Monaco
- Jackson Pandolfo
- Luiz Gabriel da Silva Dias
- Matheus Menezes Zacher

# Documentação do projeto

- Diagrama de classes: https://drive.google.com/file/d/1XhTQu55-ZwzxTN-pVf8EAmAS5ORCBptV/view?usp=sharing
- Diagrama de Sequência: https://drive.google.com/file/d/14hqxtdcPxKqUESflCSGCsCI_HuhBiAJd/view?usp=sharing
- Projeto de Design Figma: https://www.figma.com/file/0wCJa2TgkLhDuPBNWMqSjX/Projeto-U4L?type=design&node-id=0-1&mode=design
- ProfilePics para utilizar nos dados de teste em: https://randomuser.me/photos

# Dicas para projeto
- Criar arquivo no de ambiente para as variaveis de conexão com o banco
- Utilizar o comando 'npm install' para instalar todas as dependencias
- Manter o node_modules no arquivo .gitignore para não subir ao versionamento

# Começando agora?
- git clone <url>
- git checkout -f <branch>
- git add <arquivos>
- git commit -m "menssagem"
- git push

## Ambientes e Infraestrutura
- MySQL 8.0
```
  CREATE SCHEMA `social` DEFAULT CHARACTER SET utf8 ;
```
- Tabela Usuário
```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL,
  `coverPic` varchar(100) DEFAULT NULL,
  `profilePic` varchar(100) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

```
- Tabela Postagens
```
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `userid` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

```
- Tabela comentários
```
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(200) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `userId` int NOT NULL,
  `postId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `postId_idx` (`postId`),
  KEY `commentUserId` (`userId`),
  CONSTRAINT `commentUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

```
- Tabela curtidas
```
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `postid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `likeUserId_idx` (`userid`),
  KEY `likePostId_idx` (`postid`),
  CONSTRAINT `likePostId` FOREIGN KEY (`postid`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeUserId` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

```
- Tabela stories
```
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img` varchar(200) NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `storyUserId_idx` (`userid`),
  CONSTRAINT `storyUserId` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

```
- Tabela relações
```
CREATE TABLE `relationships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `followerUserId` int NOT NULL,
  `followedUserId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `followerUserId_idx` (`followerUserId`),
  KEY `followedUser_idx` (`followedUserId`),
  CONSTRAINT `followedUser` FOREIGN KEY (`followedUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followerUser` FOREIGN KEY (`followerUserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

