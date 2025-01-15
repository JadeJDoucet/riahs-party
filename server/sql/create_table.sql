CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    backstory TEXT,
    objectives TEXT,
    secrets TEXT,
    relationships TEXT,
    clues TEXT,
    assignee VARCHAR(100) DEFAULT NULL,
    CONSTRAINT unique_assignee UNIQUE (assignee)
);