# Super Smash Bros

![super-samsh-bros](https://variety.com/wp-content/uploads/2018/06/super-smash-ridley-twitter.png)

## Introdução

Super Smash Bros é uma série de jogos de luta crossover da Nintendo, lançada pela primeira vez em 1999. Os jogos apresentam personagens famosos da Nintendo e de outras empresas de jogos, como Mario, Pikachu e Sonic. O objetivo é derrotar os oponentes, lançando-os para fora da tela. Com uma jogabilidade única que combina luta e plataforma, a série tornou-se popular por sua diversão acessível e também por sua profundidade estratégica.

## Fighters

Nosso projeto fornece a funcionalidade de registrar, capturar, pesquisar por nome, editar e deletar cada um dos lutadores.

`Estrutura dos Fighters`

```
    {
        "name": "nome_do_fighter",
        "power": "poder_do_fighter",
        "level": nivel_do_fighter (de preferencia de 1 a 10),
        "hp": vida_do_fighter
    }
```
## Battles

Nosso projeto fornece a funcionalidade de realizar batalhas entre fighters registrados, capturar e pesquisar batalhas por vencedores.

`Estrutura de Battles`

```
    {
        "fighter1_id": fighter1_id,
        "fighter2_id": fighter2_id
    }
```

O sistema de batalhas é realizado através de sua rota Post, passando os IDs dos fighters via parâmetro.

```
    http://localhost:4000/battles/fighter1_id/fighter2_id
```

## Incialização do Projeto

Certifique-se de ter o Node.js e o PostgreSQL instalados em sua máquina.

- Clone o repositório:
```
    git clone https://github.com/pablo-boop/super-smash-bros.git
```

- Navegue até o projeto:
```
    code super-smash-bros
```

- Faça a instalação da node_modules e incie o projeto:
```
    npm install
    npm run dev
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

The project is licensed under the [MIT](https://opensource.org/license/mit)