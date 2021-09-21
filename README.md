# instalar docker: Entre no site https://www.docker.com/get-started e baixe o Docker Desktop, se o seu sistema operacional for Windows, baixe o executável, next em todos os passos do instalador e provávelmente irá pedir para reiniciar o PC. Caso for no linux, selecione View Linus Engine e será redirecionado para outra página que você irá selecionar sua distro. Vocẽ será redirecionado novamente para outra página e lá irá clicar no último link da mesma, te levando para uma página com todas as instruções para instalar o docker, via terminal.

# Rode um docker -v no terminal e se mostrar a versão, é porque está pronto para uso.

# Uma pequena observação é que os comandos abaixo possuem a palavra sudo no começo, essa palavra é responsável por dar a permissão de root (administrador) para a instalação e a distro do Ubuntu que estou utilizando, só instala com a permissão. Se o seu SO não precisa, então ignore a palavra e rode o restante dos comandos no terminal. 

# Agora vamos baixar imagem do postgres, que é o banco de dados utilizado no projeto: "sudo docker pull postegres"

# criar container: "sudo docker run --name postgresApiChallenge -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres"

# startar container: "sudo docker start postgresApiChallenge"

# entrar no docker: "sudo docker exec -it postgresApiChallenge bash"

# logar no postgres: "psql -U root"

# criar o banco de dados com a primeira linha do schema.sql: "CREATE DATABASE apichallenge"

# conectar a base de dados: "\c apichallenge"

# copiar e colar código do schema.sql a partir de CREATE EXTESION

# após isso, iniciamos o projeto com "node src/index.js"

# Agora, em uma ferramente para testar APIs REST (no meu caso utilizei o insomnia), criamos uma request collection com o nome API Challenge. Dentro criamos uma nova pasta chamada Users, dentro de Users uma nova resquest Create User com o método POST e o body em JSON. Outra request Update User com o método PUT e o body em JSON. Outra request List Users com método GET. Outra request Get User com método GET e por fim, outra request Delete User com método DELETE.

# Para criamos uma nova pasta para as categorias, podemos apenas duplicar a pasta Users e ir alterando apenas o nome de cada request.

# O próximo passo é criar uma Base Environment, para colocarmos a porta no qual o servidor está rodando e não precisarmos repetir "http://localhost:3000" em todas as urls das rotas que criamos. Para isso, no insomnia logo abaixo do nome da Collection que estamos trabalhando está escrito No Environment, clicamos nele e clicamos em manage environment, dentro de Base Environment colocamos o código 
# {
#   "baseURL": "http://localhost:3000"
# }

# E agora para aplicar, colocamos baseURL na url das rotas e selecionamos a opção que provavelmente vai aparecer "baseURL", ficando azul a escrita.
# Na rota POST após a base url colocamos "/users" e dentro colocamos os dados do usuário, como nome, email e phone. Apertamos no botão send e se der um status code 200 é porque criamos o usuário.

# Na rota PUT colocamos baseURL/users/o id do usuário que queremos alterar e no body os dados que iremos alterar

# Na rota GET de List Users colocamos baseURL/users e damos um send, status code 200, vai mostrar os usuários existentes

# Na rota GET de Get User colocamos baseURL/users/o id do usuário que queremos listar os dados em especifico. Status code 200, vai mostrar o usuário com o id passado na url

# Na rota DELETE colocamos baseURL/users/o id do usuário que queremos deletar. Status code 204 No Content, usuário deletado.

# Agora fazemos os mesmos passos para Category, com baseURL/categories
# Em categories nós passamos apenas o nome no body, já que é a única coluna da tabela.

# Agora podemos associar uma category a um contato, basta fazer um update em algum contato, passando o category_id de alguma category e assim que listarmos os usuários, aquele que alteramos passará a ter um category_id e category_name.

# Uma observação é que não podemos na atual etapa da API, excluir uma category que já esteja associada a algum user. Quando tentarmos deleta-la, irá dar um status code 500 internal server error e no terminal do vscode irá acusar no detail que o id que iamos excluir ainda está referenciado na tabela de users. Então para excluirmos essa category, nós alteramos o usuário e tiramos o category_id dele e agora conseguiremos excluir a category no DELETE.

# API REST de um CRUD de usuários criado. O desafio pedia apenas um CRUD de usuários, mas optei por colocar mais um CRUD de categorias para demonstrar a relação de chave estrangeira no banco de dados.