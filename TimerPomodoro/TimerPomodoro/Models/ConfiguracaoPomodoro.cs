using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TimerPomodoro.Models
{
	public class ConfiguracaoPomodoro
	{
	public int IdConfiguracao { get; set; }

	public int TempoFoco { get; set; }

	public int TempoPausaCurta { get; set; }

	public int TempoPausaLonga { get; set; }

	public int CiclosAtePausaLonga { get; set; }
	}
}