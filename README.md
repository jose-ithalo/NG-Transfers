# NG-Transfers
> Este projeto se trata de uma API que possibilita aos usuários cadastrados da NG realizarem <br>transferências internas entre si e visualizarem seu saldo.

## Como rodar a aplicação:
1. No editor de código-fonte, acesse pelo console a pasta onde se encontra o projeto.
2. Execute o comando npm install ou yarn add para que todos pacotes necessários que estão no package.json funcionem.
3. Por fim, digite o comando npm run dev e aguarde a mensagem: 'Server on working...'. 

## Endpoints
#### `POST` `/resgister`
Endpoint utilizado para cadastrar novos usuários. Recebe nome e a senha do usuário através 
de um objeto JSON no corpo da requisição como no exemplo abaixo.

```json=
{
	"username": "Victor99",
	"password": "teste"
}
```
+ O id e o número da conta do usuário são gerados automaticamente.

#### `POST` `/login`
Este é o endpoint onde o usuário realizará o login para ter acesso às outras funcionalidades da API.
Também recebe nome e a senha do usuário através de um objeto JSON no corpo da requisição. 
Veja o exemplo abaixo.

```json=
{
	"username": "Victor99",
	"password": "teste"
}
```

## Tecnologias usadas

<table>
  <tr>
    <td>Node.js</td>
    <td>Express.js</td>
    <td>PostgresSQL</td>
  </tr> 
  <tr>
    <td>v16.14.0</td>
    <td>v4.18.1</td>
    <td>v14.3</td>
  </tr>
</table>
