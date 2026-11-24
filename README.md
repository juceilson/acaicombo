# Definição do cenário da Empresa Fictícia

A açaiteria “AçaíCombo” gostaria de um sistema que montasse o cardápio com açaís personalizados que os usuários costumam pedir. Para isso, esse projeto foi desenvolvido com a intenção de suprir essa necessidade e também gerar relatórios sobres esses combos de pedidos. 
A Aplicação foi implementada com a linguagem e o framework Spring-Boot utilizando a
arquitetura em três camadas MVC.

## Estrutura do Projeto

### Camada de Aplicação
É a camada responsável pela exibição e navegação entre as páginas.
- Páginas em HTML para login, cadastro, listagem dos dados.
- Arquivos JavaScript para chamar as rotas da API e manipular as páginas.
- Arquivos CSS e Bootstrap para estilização das páginas.

### Camada de Negócios
É a camada da lógica de aplicação, responsável pelas regras da manipulação dos dados.
- `AuthService` Faz a autenticação de usuários e criptografia de senha.
- `ReportService` gera os relatórios em PDF usando a biblioteca JasperReports.

### Camada de Persistência
É responsável pela comunicação com o banco de dados.
- Entidades JPA: `Acai`, `User`.
- Repositórios: `AcaiRepository`, `UserRepository`.
- Banco de dados utilizado: MariaDB.
- Configuração de conexão em `application.properties`.

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


