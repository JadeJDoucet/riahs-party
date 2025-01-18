CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    backstory TEXT,
    objective TEXT,
    secret TEXT,
    relationships TEXT,
    clue TEXT,
    clue_rank INTEGER,
    optional BOOLEAN DEFAULT false,
    is_cultist BOOLEAN DEFAULT false,
    clue_passcode VARCHAR(4),
    assignee VARCHAR(100) DEFAULT NULL,
    CONSTRAINT unique_assignee UNIQUE (assignee)
);

-- DROP TABLE IF EXISTS characters;