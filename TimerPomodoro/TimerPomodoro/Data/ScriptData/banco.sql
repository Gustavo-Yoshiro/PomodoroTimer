CREATE TABLE Tarefas (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(200) NOT NULL,
    Ativa BIT NOT NULL DEFAULT 1,
    DataCriacao DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE ConfiguracaoDoCiclo (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TempoFoco INT NOT NULL,
    TempoPausaCurta INT NOT NULL,
    TempoPausaLonga INT NOT NULL,
    CiclosAtePausaLonga INT NOT NULL
);

CREATE TABLE Fases (
    Id INT PRIMARY KEY IDENTITY(1,1),
    IdTarefa INT NULL,
    Tipo NVARCHAR(20) NOT NULL,       
    Status NVARCHAR(20) NOT NULL,    
    DuracaoReal INT NOT NULL,         
    DataRegistro DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (IdTarefa) REFERENCES Tarefas(Id)
);

