using Microsoft.VisualStudio.TestTools.UnitTesting;
using TimerPomodoro.Models;

namespace TimerPomodoro.Tests.Models
{
	[TestClass]
	public class ConfiguracaoDoCicloTests 
	{
		const int FocoPadrao = 25;
		const int PausaCurtaPadrao = 5;
		const int PausaLongaPadrao = 15;
		const int CiclosPadrao = 4;

		[TestMethod]
		public void ValidarConfiguracaoCorreta() 
		{
			var configuracao = new ConfiguracaoDoCiclo
			{
				TempoFoco = FocoPadrao,
				TempoPausaCurta = PausaCurtaPadrao,
				TempoPausaLonga = PausaLongaPadrao,
				CiclosAtePausaLonga = CiclosPadrao
			};

			var configuracaoValida = configuracao.ConfiguracoesSaoValidas();

			Assert.IsTrue(configuracaoValida);
		}

		[TestMethod]
		public void RejeitarTempoFocoZeroOuNegativo()
		{
			var configuracao = new ConfiguracaoDoCiclo
			{
				TempoFoco = -5, 
				TempoPausaCurta = PausaCurtaPadrao,
				TempoPausaLonga = PausaLongaPadrao,
				CiclosAtePausaLonga = CiclosPadrao
			};

			var configuracaoValida = configuracao.ConfiguracoesSaoValidas();

			Assert.IsFalse(configuracaoValida);
		}

		[TestMethod]
		public void RejeitarTempoFocoAbsurdo()
		{
			var configuracao = new ConfiguracaoDoCiclo
			{
				TempoFoco = 150, 
				TempoPausaCurta = PausaCurtaPadrao,
				TempoPausaLonga = PausaLongaPadrao,
				CiclosAtePausaLonga = CiclosPadrao
			};

			var configuracaoValida = configuracao.ConfiguracoesSaoValidas();

			Assert.IsFalse(configuracaoValida);
		}
	}
}