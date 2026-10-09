using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimerPomodoro.Models
{
	[Table("Fases")]
	public class Fase
	{
		public int Id { get; set; }

		public int? IdTarefa { get; set; }

		public string Tipo { get; set; }

		public string Status { get; set; }

		public int DuracaoReal { get; set; }

		public DateTime DataRegistro { get; set; }


	}
}