using System;
using System.Web.Mvc;
using TimerPomodoro.Data;
using TimerPomodoro.Models;

namespace TimerPomodoro.Controllers
{
	public class FasesController : Controller
	{
		[HttpPost]
		public ActionResult SalvarFase (Fase fase){
			try
			{
				using (var db = new PomodoroContext())
				{	
					fase.DataRegistro = DateTime.Now;
					db.Fases.Add(fase);
					db.SaveChanges();
				}
				return Json(new { sucesso = true });
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao registrar sessão no banco." });
			}
		}
	}
}