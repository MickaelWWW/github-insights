export class GitHubApiError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
  }
}

const erros404 = {
  USER: {
    message: "Usuário não encontrado.",
    type: "USER_NOT_FOUND",
  },

  REPOSITORIES: {
    message: "Repositórios não encontrados.",
    type: "REPOSITORIES_NOT_FOUND",
  },
};

async function handleGitHubResponse(resposta, resourceType) {
  // TRATAMENTO DE ERROS
  if (!resposta.ok) {
    switch (resposta.status) {
      case 404: {
        const erro = erros404[resourceType] || {
          message: "Recurso não encontrado.",
          type: "NOT_FOUND",
        };

        throw new GitHubApiError(erro.message, erro.type);
      }
      case 403:
        throw new GitHubApiError(
          "Limite de acesso à API atingido.",
          "RATE_LIMIT",
        );

      default:
        if (resposta.status >= 500 && resposta.status < 600) {
          throw new GitHubApiError(
            "O servidor do GitHub apresentou um erro.",
            "SERVER_ERROR",
          );
        }

        throw new GitHubApiError(
          "A API do GitHub retornou um erro desconhecido.",
          "UNKNOWN_ERROR",
        );
    }
  }

  const dados = await resposta.json();

  return dados;
}

export async function getGitHubUser(username) {
  const resposta = await fetch(`https://api.github.com/users/${username}`);

  return handleGitHubResponse(resposta, "USER");
}

export async function getUserRepositories(username) {
  const resposta = await fetch(
    `https://api.github.com/users/${username}/repos`,
  );

  return handleGitHubResponse(resposta, "REPOSITORIES");
}
