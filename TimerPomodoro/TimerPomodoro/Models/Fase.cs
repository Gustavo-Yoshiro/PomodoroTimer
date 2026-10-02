using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimerPomodoro.Models
{
	public class Fase
	{
		public int IdFase { get; set; }

		public string Tipo { get; set; }

		public string Status { get; set; }

		public int DuracaoReal { get; set; }

		public DateTime DataRegistro { get; set; }

		public int? IdTarefa { get; set; }

		public virtual Tarefa Tarefa { get; set; }

	}
}