using System.ComponentModel.DataAnnotations;

namespace desafio_tecnico.Api.Models.Login
{
    public class LoginRequestModel
    {
        [Required]
        public string? Login { get; set; }
        
        [Required]
        public string? Senha { get; set; }
    }
}
