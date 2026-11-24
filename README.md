# Açaí Combo

Aplicação web para gestão de cardápio de Açaí e geração de relatório.

### 1. Requisitos para execução do projeto

- Maven

- MariaDB

- Java 21 ou superior

### 2. Configuração do banco local MariaDB
 
- (Windows) No terminal em modo Administrador, faça login no seu banco de dados MariaDB

```shell
mysql -u root -p
```
- Crie a base de dados:

```shell
create database acaicombo;
```

- (Em desenvolvimento) Crie um usuário para acesso ao MariaDB com os valores abaixo.
- (Em produção) Altere o usuário e senha do arquivo`application.propeties` juntamente com o comando abaixo 

```shell
CREATE USER 'acaicombo-app'@'localhost' IDENTIFIED BY 'senha-app';
```

- Conceda todos os privilégios do usuário acaicombo-app ao banco acaicombo

```shell
GRANT ALL PRIVILEGES ON acaicombo.* TO 'acaicombo-app'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Construa um JAR e Execute, conforme a [Documentação](https://spring.io/guides/gs/rest-service)

- (Windows) entre no diretório do projeto e execute o comando para compilar o projeto:
```shell
.\mvnw.cmd clean package
```

- Execute o arquivo jar gerado pela compilação
```shell
java -jar target\acaicombo-0.0.1-SNAPSHOT.jar
```

### 4. Acesse a aplicação no Navegador

http://localhost:8080/

A aplicação web cria um usuário administrador padrão no primeiro deploy (que pode ser alterada ao acessar o sistema), conforme as variáveis configuradas no `application.properties`:

- username: `admin`
- password: `passadmin`


