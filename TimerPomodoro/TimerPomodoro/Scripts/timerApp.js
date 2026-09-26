angular.module("timerApp", []).controller("CronometroController", [
    "$scope",
    "$interval",
    function ($scope, $interval) {
        const TemposPorFase = {
            'Foco': 25 * 60,
            'Pausa Curta': 5 * 60,
            'Pausa Longa': 15 * 60
        };
        var intervaloContagem = null;
        var momentoTerminoFase;

        $scope.segundosRestantes = TemposPorFase['Foco'];
        $scope.cronometroEmExecucao = false;
        $scope.tempoFormatado = "25:00";
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

        function atualizarProgressoCronometro() {
            var milissegundosRestantes = momentoTerminoFase - Date.now();
            if (milissegundosRestantes <= 0) {
                pararIntervaloContagem();
                $scope.segundosRestantes = 0;
                avancarFase();
                atualizarTempoExibido();
                return;
            }
            $scope.segundosRestantes = Math.ceil(milissegundosRestantes / 1000) ;
            atualizarTempoExibido();

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
