using api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
   
        public class SqlGroupRepository<T> : IGroupRepository<T> where T : class
        {
            private readonly IMSDbContext _Context;
            public SqlGroupRepository(IMSDbContext dMSDbContext)
            {
                this._Context = dMSDbContext;
            }
            public Task<T> Add(T entity)
            {
                throw new NotImplementedException();
            }

            public Task<T> Delete(int id)
            {
                throw new NotImplementedException();
            }

            public Task<T> Get(int id)
            {
                throw new NotImplementedException();
            }

            public async Task<List<T>> GetAll()
            {

                // return await _Context.Set<T>().ToListAsync();
                return await _Context.Set<T>().FromSqlRaw<T>("sp_GetGroupList").ToListAsync();
            }

            public Task<T> SaveAsync(T entity)
            {
                throw new NotImplementedException();
            }

            public Task<T> Update(T entity)
            {
                throw new NotImplementedException();
            }
        }
    }

