using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Proatividade.Domain.Interfaces.Repositories;
using ProAtividade.Data.Context;

namespace Proatividade.Data.Repositories
{
    public class GeralRepo : IGeralRepo
    {
        private readonly DataContext _context;

        public GeralRepo(DataContext context)
        {
            _context = context;
        }
        
        public void Adicionar<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Atualizar<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Deletar<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public void DeletarVarias<T>(T[] entitys) where T : class
        {
            _context.RemoveRange(entitys);
        }

        public async Task<bool> SalvarMudancasAsync()
        {
           return (await _context.SaveChangesAsync()) > 0;
        }
    }
}