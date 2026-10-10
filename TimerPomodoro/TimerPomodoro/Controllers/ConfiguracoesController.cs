using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TimerPomodoro.Data;
using TimerPomodoro.Models;

namespace TimerPomodoro.Controllers
{
	public class ConfiguracoesController : Controller
	{
		public ActionResult Index()
		{
			return PartialView();
		}

		[HttpGet]
		public ActionResult BuscarConfiguracao()
		{
			try
			{
				using (var db = new PomodoroContext())
				{
					var config = db.Configuracoes.FirstOrDefault();

					if (config == null)
					{
						config = new ConfiguracaoDoCiclo
						{
							TempoFoco = 25,
							TempoPausaCurta = 5,
							TempoPausaLonga = 15,
							CiclosAtePausaLonga = 4
						};
					}

					return Json(new { sucesso = true, dados = config }, JsonRequestBehavior.AllowGet);
				}
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao buscar configurações: " + ex.Message }, JsonRequestBehavior.AllowGet);
			}
		}

		[HttpPost]
		public ActionResult SalvarConfiguracao(ConfiguracaoDoCiclo config)
		{
			try
			{
				if (!config.ConfiguracoesSaoValidas())
				{
					Response.StatusCode = 400;
					return Json(new { sucesso = false, mensagem = "Valores de configuração inválidos." });
				}

				using (var db = new PomodoroContext())
				{
					var existente = db.Configuracoes.FirstOrDefault();

					if (existente == null)
					{
						db.Configuracoes.Add(config);
					}
					else
					{
						existente.TempoFoco = config.TempoFoco;
						existente.TempoPausaCurta = config.TempoPausaCurta;
						existente.TempoPausaLonga = config.TempoPausaLonga;
						existente.CiclosAtePausaLonga = config.CiclosAtePausaLonga;
					}

					db.SaveChanges();
				}
				return Json(new { sucesso = true });
			}
			catch (Exception ex)
			{
				Response.StatusCode = 500;
				return Json(new { sucesso = false, mensagem = "Falha ao salvar configurações no banco." });
			}
		}
	}
}