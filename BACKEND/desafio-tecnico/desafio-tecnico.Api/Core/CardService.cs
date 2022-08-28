using desafio_tecnico.Api.Abstractions.Entities;
using desafio_tecnico.Api.Abstractions.Repositories;
using desafio_tecnico.Api.Abstractions.Services;

namespace desafio_tecnico.Api.Core
{
    public class CardService : ICardService
    {
        private readonly ICardRepository _repository;

        public CardService(ICardRepository repository)
        {
            _repository = repository;
        }

        public Card Create(Card entity)
        {
            return _repository.Create(entity);
        }

        public bool Delete(Guid id)
        {
            return _repository.Delete(id);
        }

        public Card Find(Guid id)
        {
            return _repository.Find(id);
        }

        public IEnumerable<Card> Read()
        {
            return _repository.Read();
        }

        public Card Update(Card entity)
        {
            return _repository.Update(entity);
        }
    }
}
