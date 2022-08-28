namespace desafio_tecnico.Api.Abstractions.Entities
{
    public class Token
    {
        public string User { get; set; }

        public Token(string user)
        {
            User = user;
        }
    }
}
