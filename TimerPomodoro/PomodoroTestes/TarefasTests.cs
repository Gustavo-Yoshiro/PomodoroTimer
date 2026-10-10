using Microsoft.VisualStudio.TestTools.UnitTesting;
using TimerPomodoro.Models;

namespace TimerPomodoro.Tests.Models
{
	[TestClass]
	public class TarefaTests
	{
		[TestMethod]
		public void CriarTarefaComNomeValido()
		{
			var novaTarefa = new Tarefa
			{
				Nome = "Revisar código da MOVERE",
				Ativa = true
			};

			Assert.IsNotNull(novaTarefa.Nome);
			Assert.IsTrue(novaTarefa.Ativa);
		}

		[TestMethod]
		public void ValidarNomeVazio()
		{
			var tarefaVazia = new Tarefa
			{
				Nome = string.Empty,
				Ativa = false
			};

			var possuiNome = !string.IsNullOrEmpty(tarefaVazia.Nome);

			Assert.IsFalse(possuiNome);
		}
	}
}