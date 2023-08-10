using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proatividade.Domain.Interfaces.Services;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        public IAtividadeService _atividadeService;
        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                if(atividades == null)
                    return NoContent();

                return Ok(atividades);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar recuperar Atividades. Erro:{ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if(atividade == null)
                    return NoContent();

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar recuperar Atividade id: ${id}. Erro:{ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade atividade)
        {
            try
            {
                var atividadeCadastrada = await _atividadeService.AdicionarAtividade(atividade);
                if(atividadeCadastrada == null)
                    return NotFound("Erro ao tentar cadastrar atividade.");

                return Ok(atividade);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar cadastrar atividade. Erro:{ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade atividade)
        {
            try
            {
                if(atividade.Id != id)
                    return this.StatusCode(StatusCodes.Status409Conflict, 
                    "Você está tentando atualizar a atividade errada");

                var atividadeAtualizada = await _atividadeService.AtualizarAtividade(atividade);

                if(atividadeAtualizada == null)
                    return NotFound();

                return Ok(atividadeAtualizada);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar atualizar atividade de id: ${id}. Erro:{ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletHttpDelete(int id)
        {
            try
            {       
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                
                if(atividade == null)
                    return this.StatusCode(StatusCodes.Status409Conflict, 
                    "Você está tentando deletar a atividade que não existe");

                if(await _atividadeService.DeletarAtividade(id))
                {
                    return Ok(new { message = "Deletado"});
                }
                else
                {
                    return BadRequest("Ocorreu um erro ao tentar deletar a atividade.");
                }

            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao tentar deletar atividade de id: ${id}. Erro:{ex.Message}");
            }
        }
    }
}