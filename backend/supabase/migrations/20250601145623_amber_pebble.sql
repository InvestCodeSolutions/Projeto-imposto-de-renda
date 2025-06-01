-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('CLIENTE', 'CONTADOR')),
    ativo BOOLEAN DEFAULT TRUE,
    using2fa BOOLEAN DEFAULT FALSE,
    secret2fa VARCHAR(255)
);

-- Tabela de Bens
CREATE TABLE bens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    descricao TEXT,
    valor DECIMAL(15, 2) NOT NULL,
    data_aquisicao DATE NOT NULL,
    forma_aquisicao VARCHAR(100) NOT NULL,
    documento_path VARCHAR(255),
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
);

-- Tabela de Documentos Fiscais
CREATE TABLE documentos_fiscais (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    arquivo_path VARCHAR(255) NOT NULL,
    data_envio DATE NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
);

-- Tabela de Autorizações
CREATE TABLE autorizacoes (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES usuarios(id),
    contador_id INTEGER NOT NULL REFERENCES usuarios(id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('PENDENTE', 'APROVADO', 'REJEITADO')),
    data_solicitacao TIMESTAMP NOT NULL,
    data_resposta TIMESTAMP,
    UNIQUE (cliente_id, contador_id)
);

-- Índices para melhorar performance
CREATE INDEX idx_bens_usuario_id ON bens(usuario_id);
CREATE INDEX idx_documentos_usuario_id ON documentos_fiscais(usuario_id);
CREATE INDEX idx_autorizacoes_cliente_id ON autorizacoes(cliente_id);
CREATE INDEX idx_autorizacoes_contador_id ON autorizacoes(contador_id);