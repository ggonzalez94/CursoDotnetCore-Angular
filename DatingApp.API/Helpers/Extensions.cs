using System;
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

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today){
                age = age -1;
            }
            return age;
        }
    }
}