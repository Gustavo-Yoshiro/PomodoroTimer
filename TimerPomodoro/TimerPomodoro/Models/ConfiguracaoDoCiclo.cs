using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TimerPomodoro.Models
{
	[Table("ConfiguracaoDoCiclo")]
	public class ConfiguracaoDoCiclo
	{
		public int Id { get; set; }

		public int TempoFoco { get; set; }

		public int TempoPausaCurta { get; set; }

		public int TempoPausaLonga { get; set; }

		public int CiclosAtePausaLonga { get; set; }

		public bool ConfiguracoesSaoValidas()
		{
			if ((TempoFoco <= 0) || (TempoFoco > 120))
				return false;

			if ((TempoPausaCurta <= 0) || (TempoPausaCurta > 30))
				return false;

			if ((TempoPausaLonga <= 0) || (TempoPausaLonga > 60))
				return false;

			if ((CiclosAtePausaLonga <= 0) || (CiclosAtePausaLonga > 10))
				return false;

			return true;
		}
	}
}