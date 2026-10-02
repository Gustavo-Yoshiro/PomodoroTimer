using System.Data.Entity;
using TimerPomodoro.Models;

namespace TimerPomodoro.Data
{
	public class PomodoroContext : DbContext
	{
		public PomodoroContext() : base("name=PomodoroConnection") { }

		public DbSet<Tarefa> Tarefas { get; set; }
		public DbSet<Fase> Fases { get; set; }
		public DbSet<ConfiguracaoPomodoro> Configuracoes { get; set; }
	}
}