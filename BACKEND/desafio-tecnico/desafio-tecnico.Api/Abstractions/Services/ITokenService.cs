using desafio_tecnico.Api.Abstractions.Entities;

namespace desafio_tecnico.Api.Abstractions.Services
{
    public interface ITokenService
    {
        string Create(Token entity);
    }
}
