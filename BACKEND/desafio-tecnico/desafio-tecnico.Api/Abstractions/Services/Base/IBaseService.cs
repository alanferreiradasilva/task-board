namespace desafio_tecnico.Api.Abstractions.Services.Base
{
    public interface IBaseService<T> where T :class
    {
        T Create(T entity);
        T Update(T entity);
        bool Delete(Guid id);

        IEnumerable<T> Read();
        T Find(Guid id);
    }
}
