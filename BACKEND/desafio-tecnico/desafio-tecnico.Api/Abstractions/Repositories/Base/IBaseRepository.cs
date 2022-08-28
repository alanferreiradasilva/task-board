namespace desafio_tecnico.Api.Abstractions.Repositories.Base
{
    public interface IBaseRepository<T> where T : class
    {
        T Create(T enity);
        T Update(T enity);
        bool Delete(Guid id);

        IEnumerable<T> Read();
        T Find(Guid id);
    }
}
