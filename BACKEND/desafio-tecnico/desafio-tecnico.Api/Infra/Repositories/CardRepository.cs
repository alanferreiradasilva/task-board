using desafio_tecnico.Api.Abstractions.Entities;
using desafio_tecnico.Api.Abstractions.Repositories;
using desafio_tecnico.Api.Infra.DbContexts;

namespace desafio_tecnico.Api.Infra.Repositories
{
    public class CardRepository : ICardRepository
    {
        private readonly AppDbContext _context;

        public CardRepository(AppDbContext context)
        {
            _context = context;
        }

        public Card Create(Card entity)
        {
            _context.Add(entity);
            _context.SaveChanges();
            return entity;
        }

        public bool Delete(Guid id)
        {
            var entity = _context.Cards.Find(id);

            if (entity == null) return false;

            _context.Remove(entity);
            _context.SaveChanges();
            return true;
        }

        public Card Find(Guid id)
        {
            return _context.Cards.Find(id);
        }

        public IEnumerable<Card> Read()
        {
            return _context.Cards.ToList();
        }

        public Card Update(Card entity)
        {
            //_context.Update(entity, ).Update(entity);
            _context.SaveChanges();
            return entity;
        }
    }
}
