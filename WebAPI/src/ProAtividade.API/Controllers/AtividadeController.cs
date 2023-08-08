using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAtividade.API.Models;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        [HttpGet]
        public Atividade Get()
        {
            return new Atividade();
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "Meu Primeiro método Get";
        }

        [HttpPost]
        public Atividade Post(Atividade atividade)
        {
            return atividade;
        }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            atividade.Id = atividade.Id + 1;
            return atividade;
        }

        [HttpDelete("{id}")]
        public string DeletHttpDelete(int id)
        {
            return "Meu Primeiro método DeletHttpDelete";
        }
    }
}