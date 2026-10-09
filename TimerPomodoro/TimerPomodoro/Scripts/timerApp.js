var app = angular.module("timerApp",[])


app.controller("CronometroController", [
    "$scope",
    "$interval",
    "$http",
    function ($scope, $interval, $http) {
        const TemposPorFase = {
            'Foco': 3 * 1,
            'Pausa Curta': 5 * 1,
            'Pausa Longa': 7 * 1
        };
        var intervaloContagem = null;
        var momentoTerminoFase;

        $scope.segundosRestantes = TemposPorFase['Foco'];
        $scope.cronometroEmExecucao = false;
        $scope.faseAtual = 'Foco';
        $scope.numeroCiclos = 1;
        $scope.perimetroCirculo = 691;
        $scope.deslocamentoCirculo = 0;

        function formatarTempo(totalSegundos) {
            var minutosRestantes = Math.floor(totalSegundos / 60);
            var segundosDoMinuto = totalSegundos % 60;
            var minutosExibidos = minutosRestantes < 10 ? "0" + minutosRestantes : String(minutosRestantes);
            var segundosExibidos = segundosDoMinuto < 10 ? "0" + segundosDoMinuto : String(segundosDoMinuto);
            return minutosExibidos + ":" + segundosExibidos;
        }

        function atualizarTempoExibido() {
            $scope.tempoFormatado = formatarTempo($scope.segundosRestantes);
        }

        function pararIntervaloContagem() {
            if (intervaloContagem !== null) {
                $interval.cancel(intervaloContagem);
                intervaloContagem = null;
            }
            $scope.cronometroEmExecucao = false;
        }

        function avancarFase() {
            if ($scope.faseAtual === 'Foco') {
                $scope.numeroCiclos++;
                if (($scope.numeroCiclos % 4) === 0) {
                    $scope.alterarFase('Pausa Longa');
                    return; 
                }
                $scope.alterarFase('Pausa Curta');
                return; 
            }
            $scope.alterarFase('Foco');
        }

        function iniciarCronometro() {
            if ($scope.cronometroEmExecucao) {
                return;
            }

            if ($scope.segundosRestantes <= 0) {
                $scope.segundosRestantes = TemposPorFase['Foco'];
                atualizarTempoExibido();
            }
            $scope.cronometroEmExecucao = true;
            calcularTerminoDaFase();
            intervaloContagem = $interval(atualizarProgressoCronometro, 1000);
            

        };

        function calcularTerminoDaFase() {
            var tempoRestanteEmMilissegundos = $scope.segundosRestantes * 1000;
            momentoTerminoFase = Date.now() + tempoRestanteEmMilissegundos;
        }

        function atualizarProgressoCronometro() {
            var milissegundosRestantes = momentoTerminoFase - Date.now();

            if (milissegundosRestantes <= 0) {
                pararIntervaloContagem();
                salvarFase();
                $scope.segundosRestantes = 0;
                $scope.deslocamentoCirculo = 0;
                avancarFase();
                atualizarTempoExibido();
                return;
            }

            $scope.segundosRestantes = Math.ceil(milissegundosRestantes / 1000);

            var segundosTotaisDaFase = TemposPorFase[$scope.faseAtual];
            var fracaoDoTempo = $scope.segundosRestantes / segundosTotaisDaFase;
            $scope.deslocamentoCirculo = $scope.perimetroCirculo - ($scope.perimetroCirculo * fracaoDoTempo);

            atualizarTempoExibido();
        }

        function salvarFase() {
            var dadosDaFase = {
                IdTarefa: null,
                Tipo: $scope.faseAtual, 
                Status: "Concluida",
                DuracaoReal: TemposPorFase[$scope.faseAtual] 
            };
            $http.post('/Fases/SalvarFase', dadosDaFase)
                .then(function (response) {
                    if (response.data.sucesso) {
                        console.log("Sessão salva com sucesso!");
                    } else {
                        console.error(response.data.mensagem);
                    }
                })
                .catch(function (error) {
                    alert("Erro ao salvar sessão. A contagem continua normalmente.");
                    console.error("Erro na requisição:", error);
                });

        }

        $scope.obterClasseTema = function obterClasseTema() {
            if ($scope.faseAtual === 'Foco') {
                return 'tema-foco';
            }

            if ($scope.faseAtual === 'Pausa Curta') {
                return 'tema-pausa-curta';
            }
            return 'tema-pausa-longa';
        };
        $scope.resetarCronometro = function resetarCronometro() {
            pararIntervaloContagem();
            $scope.segundosRestantes = TemposPorFase[$scope.faseAtual];
            atualizarTempoExibido();
            $scope.deslocamentoCirculo = 0;
        };

        $scope.$on("$destroy", function () {
            pararIntervaloContagem();
        });

        $scope.alternarCronometro = function () {
            if ($scope.cronometroEmExecucao) {
                pararIntervaloContagem();
                $scope.cronometroEmExecucao = false;
                $scope.deslocamentoCirculo = 0;
            } else {
                iniciarCronometro();
                $scope.cronometroEmExecucao = true;
            }
        };

        $scope.alterarFase = function alterarFase(novaFase) {
            pararIntervaloContagem();
            $scope.faseAtual = novaFase;
            $scope.segundosRestantes = TemposPorFase[novaFase];
            atualizarTempoExibido();
            $scope.deslocamentoCirculo = 0;
        };

        atualizarTempoExibido();
    }
]);








app.controller("TarefasController", [
    "$scope",
    "$http",
    function ($scope, $http) {
        $scope.tarefas = [];

        $scope.listarTarefas = function () {
            $http.get('/Tarefas/ListarTarefas')
                .then(function (resposta) {
                    if (resposta.data.sucesso) {
                        $scope.tarefas = resposta.data.dados;
                    }
                })
                .catch(function (erro) {
                    console.error("Falha ao listar tarefas.", erro);
                });
        };

        $scope.abrirModalNovaTarefa = function () {
            var nomeDaTarefa = prompt("Digite o nome da sua nova tarefa:");

            if (!nomeDaTarefa) return;

            var novaTarefa = { Nome: nomeDaTarefa, Ativa: true };
            $scope.salvarTarefa(novaTarefa);
        };

        $scope.salvarTarefa = function (tarefa) {
            $http.post('/Tarefas/SalvarTarefa', tarefa)
                .then(function (resposta) {
                    if (resposta.data.sucesso) {
                        $scope.listarTarefas();
                    }
                })
                .catch(function (erro) {
                    console.error("Falha ao salvar tarefa.", erro);
                });
        };

        $scope.atualizarTarefa = function (tarefa) {
            tarefa.Ativa = !tarefa.Ativa;

            $http.post('/Tarefas/AtualizarTarefa', tarefa)
                .then(function (resposta) {
                    if (resposta.data.sucesso) return;

                    tarefa.Ativa = !tarefa.Ativa;
                })
                .catch(function (erro) {
                    tarefa.Ativa = !tarefa.Ativa;
                    console.error("Falha ao atualizar tarefa.", erro);
                });
        };

        $scope.removerTarefa = function (tarefa) {
            if (!confirm("Deseja realmente remover esta tarefa?")) return;

            $http.post('/Tarefas/RemoverTarefa', tarefa)
                .then(function (resposta) {
                    if (resposta.data.sucesso) {
                        $scope.listarTarefas();
                    }
                })
                .catch(function (erro) {
                    console.error("Falha ao remover tarefa.", erro);
                });
        };

        $scope.listarTarefas();
    }
]);