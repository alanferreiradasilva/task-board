using desafio_tecnico.Api.Abstractions.Entities;
using desafio_tecnico.Api.Abstractions.Services;
using desafio_tecnico.Api.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace desafio_tecnico.Api.Core
{
    public class TokenService : ITokenService
    {
        private readonly TokenSettings _settings;

        public TokenService(IOptions<TokenSettings> settings)
        {
            _settings = settings.Value;
        }

        public string Create(Token entity)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_settings.Key);
            var expires = DateTime.UtcNow.AddMinutes(_settings.ExpiredMinutes);

            var claims = new List<Claim>();

            claims.Add(new Claim("user", entity.User));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims.ToArray()),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
