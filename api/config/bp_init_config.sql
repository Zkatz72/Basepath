-- ============================================
-- Players
-- ============================================

CREATE TABLE player (
    id BIGSERIAL PRIMARY KEY,

    reg_id TEXT NOT NULL UNIQUE,

    last_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    suffix TEXT,

    start_year INTEGER,
    end_year INTEGER,

    games_batted INTEGER NOT NULL DEFAULT 0,
    games_pitched INTEGER NOT NULL DEFAULT 0
);


-- Search by first + last
CREATE INDEX idx_player_name
    ON player (last_name, first_name);



-- ============================================
-- Teams
-- ============================================

CREATE TABLE team (
    id BIGSERIAL PRIMARY KEY,
    abbreviation TEXT,
    location TEXT,
    name TEXT,
    full_name TEXT NOT NULL
);


-- ============================================
-- Stints
-- ============================================

CREATE TABLE stint (
    player_id BIGINT NOT NULL,
    team_id BIGINT NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE,

    PRIMARY KEY (player_id, team_id, start_date),

    FOREIGN KEY (player_id)
        REFERENCES player(id)
        ON DELETE CASCADE,

    FOREIGN KEY (team_id)
        REFERENCES team(id)
        ON DELETE CASCADE,

    CHECK (end_date IS NULL OR end_date >= start_date)
);


-- Find a player's stints ordered chronologically
CREATE INDEX idx_stint_player_start
    ON stint (player_id, start_date);