using desafio_tecnico.Api.Abstractions.Entities;
using desafio_tecnico.Api.Abstractions.Services;
using desafio_tecnico.Api.Models.Login;
using desafio_tecnico.Api.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.ComponentModel.DataAnnotations;

namespace desafio_tecnico.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly AuthSettings _settings;

        public LoginController(ITokenService tokenService, IOptions<AuthSettings> settings)
        {
            _tokenService = tokenService;
            _settings = settings.Value;
        }

        [HttpPost]
        public IActionResult Get([FromBody, Required] LoginRequestModel model)
        {
            if (model.Login == _settings.Login && model.Senha == _settings.Senha)
            {
                var token = new Token(model.Login);

                string responseToken = _tokenService.Create(token);

                //Request.Headers.Remove("Content-Type");
                //Request.Headers.Add("Content-Type", "application/json");
                return Ok(responseToken);
            }

            return BadRequest();
        }
    }
}
