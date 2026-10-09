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
	}
}