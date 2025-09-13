-- Script opcional: criação da tabela Metas (caso não use sequelize.sync())
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Metas')
BEGIN
  CREATE TABLE Metas (
    id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    nomeMeta NVARCHAR(100) NOT NULL,
    valorTotal FLOAT NOT NULL,
    valorInicial FLOAT NOT NULL,
    createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    updatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
  );
END;
