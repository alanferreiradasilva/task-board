using desafio_tecnico.Api.Abstractions.Entities;
using desafio_tecnico.Api.Abstractions.Services;
using desafio_tecnico.Api.Models.Cards;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace desafio_tecnico.Api.Controllers
{
    [ApiController]
    [Authorize("Bearer")]
    [Route("[controller]")]
    public class CardsController : ControllerBase
    {
        private readonly ICardService _service;
        private readonly List<string> _states;

        public CardsController(ICardService service)
        {
            _service = service;
            _states = new List<string> { "To Do", "Doing", "Done" };
        }

        [HttpGet]
        public IActionResult Get()
        {
            var entities = _service.Read();
            return Ok(entities.Adapt<List<CardModel>>());
        }

        [HttpGet("{id:Guid}")]
        public IActionResult GetById(Guid id)
        {
            var entity = _service.Find(id);
            return Ok(entity.Adapt<CardModel>());
        }

        [HttpPost]
        public IActionResult Post([FromBody]CardModel model)
        {
            var entity = model.Adapt<Card>();
            entity = _service.Create(entity);
            return Ok(entity.Adapt<CardModel>());
        }

        [HttpPut("{id:Guid}")]
        public IActionResult Put(Guid id, [FromBody] CardModel model)
        {
            var entity = _service.Find(id);

            if (entity == null) return null;

            if (!StateExists(model)) return BadRequest("Estado não exite");

            entity = model.Adapt(entity);
            entity = _service.Update(entity);
            return Ok(entity.Adapt<CardModel>());
        }

        [HttpDelete("{id:Guid}")]
        public IActionResult Delete(Guid id)
        {
            var entity = _service.Find(id);

            if (entity == null) return Ok(false);

            return Ok(_service.Delete(id));
        }

        private bool StateExists(CardModel model) => _states.Contains(model.Lista);
    }
}
