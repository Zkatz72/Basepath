import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  host: "aws-1-us-west-2.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.kyhoqjuhxgyowqiuviaf",
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});