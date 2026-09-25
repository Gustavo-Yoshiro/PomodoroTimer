angular.module("timerApp", []).controller("CronometroController", [
    "$scope",
    "$interval",
    function ($scope, $interval) {
        var duracaoPadraoSegundos = 25 * 60;
        var intervaloContagem = null;

        $scope.segundosRestantes = duracaoPadraoSegundos;
        $scope.cronometroEmExecucao = false;
        $scope.tempoFormatado = "25:00";

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

        function reduzirUmSegundo() {
            if ($scope.segundosRestantes <= 0) {
                pararIntervaloContagem();
                atualizarTempoExibido();
                return;
            }

            $scope.segundosRestantes -= 1;
            atualizarTempoExibido();

            if ($scope.segundosRestantes <= 0) {
                pararIntervaloContagem();
            }
        }

        $scope.iniciarCronometro = function iniciarCronometro() {
            if ($scope.cronometroEmExecucao) {
                return;
            }

            if ($scope.segundosRestantes <= 0) {
                $scope.segundosRestantes = duracaoPadraoSegundos;
                atualizarTempoExibido();
            }

            $scope.cronometroEmExecucao = true;
            intervaloContagem = $interval(reduzirUmSegundo, 1000);
        };

        $scope.pausarCronometro = function pausarCronometro() {
            pararIntervaloContagem();
        };

        $scope.resetarCronometro = function resetarCronometro() {
            pararIntervaloContagem();
            $scope.segundosRestantes = duracaoPadraoSegundos;
            atualizarTempoExibido();
        };

        $scope.$on("$destroy", function () {
            pararIntervaloContagem();
        });

        atualizarTempoExibido();
    }
]);
