using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IDatingRepository
    {
        //Add y Delete son sincronos porque añaden y borran en el contexto el cual está en memoria
        //SaveAll, GetUsers y GetUser son asincronos ya que estos si interactuan con la BD
         void Add<T>(T entity) where T:class; // Metodos genericos que aceptan cualquier tipo de clase como parametro
         void Delete<T>(T entity) where T:class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
    }
}