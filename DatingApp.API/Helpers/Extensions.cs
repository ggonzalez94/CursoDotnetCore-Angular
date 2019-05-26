using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message){
            response.Headers.Add("Application-Error",message); //Agregar el msj de error como cabecera
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error"); //Exponer la cabecera de error
            response.Headers.Add("Access-Control-Allow-Origin","*"); //Permitir cualquier origen
        }
    }
}