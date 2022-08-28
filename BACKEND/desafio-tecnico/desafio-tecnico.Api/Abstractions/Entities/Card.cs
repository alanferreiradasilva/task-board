using System.ComponentModel.DataAnnotations;

namespace desafio_tecnico.Api.Abstractions.Entities
{
    public class Card
    {
        [Key]
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public string Lista { get; set; }
    }
}
