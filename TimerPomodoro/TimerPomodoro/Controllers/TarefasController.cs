using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimerPomodoro.Data;
using TimerPomodoro.Models;

namespace TimerPomodoro.Controllers
{
	public class TarefasController : Controller
	{
		[HttpPost]
		public ActionResult SalvarTarefa(Tarefa tarefa)
		{
			try
			{
				using (var db = new PomodoroContext())
				{
					tarefa.DataCriacao = DateTime.Now;
					db.Tarefas.Add(tarefa);
					db.SaveChanges();
				}
				return Json(new { sucesso = true });
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao registrar tarefa no banco." });
			}
		}

		[HttpPost]
		public ActionResult BuscarTarefa(int id)
		{
			try
			{
				using (var db = new PomodoroContext())
				{
					var tarefa = db.Tarefas.Find(id);

					if (tarefa == null)
					{
						Response.StatusCode = 404;
						return Json(new { sucesso = false, mensagem = "Tarefa não encontrada." });
					}
					return Json(new { sucesso = true, dados = tarefa });
				}
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao buscar tarefa no banco." });
			}
		}

		[HttpPost]
		public ActionResult AtualizarTarefa(Tarefa tarefa)
		{
			try
			{
				using (var db = new PomodoroContext())
				{
					db.Tarefas.AddOrUpdate(tarefa);
					db.SaveChanges();
				}
				return Json(new { sucesso = true });
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao atualizar tarefa no banco." });
			}
		}

		[HttpPost]
		public ActionResult RemoverTarefa(Tarefa tarefa)
		{
			try
			{
				using (var db = new PomodoroContext())
				{
					db.Tarefas.Remove(tarefa);
				}
				return Json(new { sucesso = true });
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao remover tarefa no banco." });
			}
		}

	}
}