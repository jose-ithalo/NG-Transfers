# NG-Transfers
> Este projeto se trata de uma API que possibilita aos usuários cadastrados da NG realizarem <br>transferências internas entre si e visualizarem seu saldo.

## Como rodar a aplicação:
1. No editor de código-fonte, acesse pelo console a pasta onde se encontra o projeto.
2. Execute o comando npm install ou yarn add para que todos pacotes necessários que estão no package.json funcionem.
3. Por fim, digite o comando npm run dev e aguarde a mensagem: 'Server on working...'. 

## Tecnologias usadas

<table>
  <tr>
    <td>Node.js</td>
    <td>Express.js</td>
    <td>Nodemon</td>
    <td>PostgresSQL</td>
  </tr> 
  <tr>
    <td>v16.14.0</td>
    <td>v4.18.1</td>
    <td>v2.0.20</td>
    <td>v14.3</td>
  </tr>
</table>

## Endpoints
#### `POST` `/resgister`
> Endpoint utilizado para cadastrar novos usuários. Recebe nome e a senha do usuário através 
de um objeto JSON no corpo da requisição como no exemplo abaixo.

```json=
{
	"username": "Victor99",
	"password": "teste"
}
```
+ O id e o número da conta do usuário são gerados automaticamente.

#### `POST` `/login`
> Este é o endpoint onde o usuário realizará o login para ter acesso às outras funcionalidades da API.
Também recebe nome e a senha do usuário através de um objeto JSON no corpo da requisição. 
Veja o exemplo abaixo.

```json=
{
	"username": "Victor99",
	"password": "teste"
}
```

#### `GET` `/balance`
> Já neste endpoint, não recebe informações no corpo da requisição.
Sua finalidade é a de apresentar o balance/saldo do usuário que está logado.

#### `POST` `/transfer`
> Aqui é onde o usuário logado poderá realizar uma transação/tranferência de sua conta para
a de outro usuário que também esteja cadastrado na NG-Transfers, passando o valor e o nome 
do destinatário/beneficiário pelo corpo da requisição.
Veja no exemplo abaixo.

```json=
{
	"value":100.00,
	"recipient": "Carlos"
}
```

#### `Get` `/transactions`
> Este último endpoint tem a função de apresentar todas as informações das transações que o usuário logado teve 
participação, sejam elas cash-out ou cash-in, possibilitando fazer uma filtragem através dessas duas opções ou até mesmo 
pela data daquela transação. Também recebe os dados no corpo da requisão.

```json=
{
	"date": "29/11/2022",
	"cashOut": false,
	"cashIn":true
}
```
### Observações:

+ O campo date deve ser preenchido em formato de data do tipo string.
+ Os campos cashOut e cashIn devem receber valores booleanos somente.
+ Se acaso a requisição for realizada com todos os campos vazios ou o cashOut e cashIn com o valor false,
todas as transações serão mostradas.
