using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace TimerPomodoro.Models
{
	[Table("Tarefas")]
	public class Tarefa
	{
		public int Id { get; set; }

		public string Nome { get; set; }

		public bool Ativa { get; set; }

		public DateTime DataCriacao { get; set; }
	}
}