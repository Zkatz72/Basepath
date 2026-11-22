import { pool } from "../db/pool.js";

export async function findAll(filters = {}) {
  const values = [];
  const conditions = [];

  if (filters.search) {
    values.push(`%${filters.search}%`);

    conditions.push(`
      (
        first_name ILIKE $${values.length}
        OR last_name ILIKE $${values.length}
      )
    `);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  const query = `
    SELECT
      id,
      reg_id,
      first_name,
      last_name,
      suffix,
      start_year,
      end_year
    FROM player
    ${whereClause}
    ORDER BY last_name, first_name
    LIMIT 100
  `;

  const { rows } = await pool.query(query, values);

  return rows;
}

export async function findById(id) {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM player
    WHERE id = $1
    `,
    [id]
  );

  return rows[0];
}
export async function areTeammates(player1Id, player2Id) {
  const { rows } = await pool.query(
    `
    SELECT EXISTS (
      SELECT 1
      FROM stint s1
      JOIN stint s2
        ON s1.team_id = s2.team_id
      WHERE
        s1.player_id = $1
        AND s2.player_id = $2

        -- overlap
        AND s1.start_date <= s2.end_date
        AND s2.start_date <= s1.end_date
    ) AS teammates
    `,
    [player1Id, player2Id]
  );

  return rows[0].teammates;
}

export async function getSharedTeams(player1Id, player2Id) {
  const { rows } = await pool.query(
    `
    SELECT
      t.id,
      t.full_name,

      GREATEST(s1.start_date, s2.start_date) AS overlap_start,
      LEAST(s1.end_date, s2.end_date) AS overlap_end

    FROM stint s1
    JOIN stint s2
      ON s1.team_id = s2.team_id
    JOIN team t
      ON t.id = s1.team_id

    WHERE
      s1.player_id = $1
      AND s2.player_id = $2

      -- stints overlap
      AND s1.start_date <= s2.end_date
      AND s2.start_date <= s1.end_date

    ORDER BY overlap_start
    `,
    [player1Id, player2Id]
  );

  return rows;
}


export async function findByRegId(regId) {
  const { rows } = await pool.query(
    `
    SELECT
      id,
      reg_id,
      first_name,
      last_name,
      suffix,
      start_year,
      end_year,
      games_batted,
      games_pitched
    FROM player
    WHERE reg_id = $1
    `,
    [regId]
  );

  return rows[0] ?? null;
}