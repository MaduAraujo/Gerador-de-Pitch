<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Gerador de Pitch com IA

## Demonstração

https://github.com/user-attachments/assets/8d4d82cc-fe01-472d-aed5-ec31850b2c43

## Sobre o Projeto

O **Gerador de Pitch** é uma aplicação que utiliza o poder da Inteligência Artificial para transformar uma simples ideia de negócio em um roteiro de pitch 
completo e profissional. Além do script, a ferramenta também gera uma imagem de logo ou produto para dar vida à sua apresentação.
Este projeto foi desenvolvido para auxiliar empreendedores, estudantes e criativos a estruturarem suas ideias de forma rápida, coesa e persuasiva.

## Funcionalidades Principais

  - **Geração de Roteiro de Pitch:** Insira sua ideia de negócio e a IA criará um script detalhado, cobrindo os pontos essenciais de uma apresentação de sucesso.
  - **Criação de Imagem:** A aplicação gera uma imagem para sua logo ou produto, adicionando um forte apelo visual ao seu pitch.
  - **Interface Simples:** Uma interface limpa e intuitiva que permite gerar seu conteúdo com poucos cliques.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias:

  - **TypeScript:** Para um desenvolvimento JavaScript mais robusto e escalável.
  - **Node.js:** Como ambiente de execução para o backend.
  - **HTML:** Para a estruturação da interface web.
  - **Gemini API:** Como motor de Inteligência Artificial para a geração de texto e imagem.

## Instalação e Configuração

### Pré-requisitos

  - [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).
  - Uma chave de API da plataforma **Gemini (Google AI)**. Você pode obter a sua no [Google AI Studio](https://aistudio.google.com/app/apikey).

### Passos para Instalação

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/MaduAraujo/Gerador-de-Pitch.git
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd Gerador-de-Pitch
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

      - Crie um arquivo chamado `.env.local` na raiz do projeto.
      - Adicione a sua chave da API do Gemini a este arquivo, como no exemplo abaixo:
        ```env
        GEMINI_API_KEY=SUA_CHAVE_API_AQUI
        ```

## Como Executar

```bash
npm run dev
```

* A aplicação estará disponível no seu navegador em `http://localhost:3000` (ou na porta indicada no terminal).
