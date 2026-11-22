import dotenv from "dotenv";
import pg from "pg";
import fs from "fs";

const { Client } = pg;

dotenv.config({ path: "../.env" });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});


function loadJSON(path) {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}


async function seedTeams() {
  const teams = loadJSON("./data/teams.json");

  console.log(`Seeding ${teams.length} teams...`);

  for (const team of teams) {
    await client.query(
      `
      INSERT INTO team (
        full_name
      )
      VALUES ($1)
      ON CONFLICT (full_name) DO NOTHING
      `,
      [team]
    );
  }

  console.log("Teams complete");
}


async function getTeamMap() {
  const result = await client.query(
    `
    SELECT id, full_name
    FROM team
    `
  );

  const teamMap = new Map();

  for (const row of result.rows) {
    teamMap.set(row.full_name, row.id);
  }

  return teamMap;
}


async function seedPlayers() {
  const players = loadJSON("./data/player-data.json");

  console.log(`Seeding ${players.length} players...`);

  const teamMap = await getTeamMap();

  const allStints = [];


  for (let i = 0; i < players.length; i++) {

    const player = players[i];


    const playerResult = await client.query(
      `
      INSERT INTO player (
        reg_id,
        last_name,
        first_name,
        suffix,
        start_year,
        end_year,
        games_batted,
        games_pitched
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (reg_id)
      DO UPDATE SET reg_id = EXCLUDED.reg_id
      RETURNING id
      `,
      [
        player.reg_id,
        player.lastName,
        player.firstName,
        player.suffix,
        player.start_year,
        player.end_year,
        player.batted ?? 0,
        player.pitched ?? 0,
      ]
    );


    const playerId = playerResult.rows[0].id;


    collectStints(
      player,
      playerId,
      teamMap,
      allStints
    );


    if (i % 1000 === 0) {
      console.log(`Processed ${i} players`);
    }
  }


  console.log(`Collected ${allStints.length} stints`);


  await insertStintsBatch(allStints);

  console.log("Players complete");
}


function collectStints(
  player,
  playerId,
  teamMap,
  allStints
) {

  for (const key of Object.keys(player)) {

    // only process year keys
    if (!/^\d{4}$/.test(key)) {
      continue;
    }


    for (const [teamName, dates] of Object.entries(player[key])) {

      const teamId = teamMap.get(teamName);


      if (!teamId) {
        console.log(`Missing team: ${teamName}`);
        continue;
      }


      for (const [startDate, endDate] of dates) {

        allStints.push([
          playerId,
          teamId,
          startDate,
          endDate
        ]);

      }
    }
  }
}


async function insertStintsBatch(stints) {

  const BATCH_SIZE = 1000;


  for (
    let i = 0;
    i < stints.length;
    i += BATCH_SIZE
  ) {

    const batch = stints.slice(
      i,
      i + BATCH_SIZE
    );


    const values = [];
    const placeholders = [];


    batch.forEach((stint, index) => {

      const offset = index * 4;

      placeholders.push(
        `($${offset + 1},$${offset + 2},$${offset + 3},$${offset + 4})`
      );


      values.push(...stint);

    });


    await client.query(
      `
      INSERT INTO stint (
        player_id,
        team_id,
        start_date,
        end_date
      )
      VALUES ${placeholders.join(",")}
      ON CONFLICT DO NOTHING
      `,
      values
    );


    console.log(
      `Inserted stints ${i} - ${i + batch.length}`
    );
  }
}


async function main() {

  await client.connect();

  const args = process.argv.slice(2);


  try {

    await client.query("BEGIN");


    if (args.includes("--teams")) {
      await seedTeams();
    }


    if (args.includes("--players")) {
      await seedPlayers();
    }


    if (args.includes("--all")) {
      await seedTeams();
      await seedPlayers();
    }


    await client.query("COMMIT");

    console.log("Seed complete!");

  } catch (err) {

    await client.query("ROLLBACK");

    console.error("Seeding failed:", err);

  } finally {

    await client.end();

  }
}


main();