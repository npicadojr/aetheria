import { sql } from "@vercel/postgres";

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      message TEXT NOT NULL,
      accept_comms BOOLEAN NOT NULL DEFAULT true,
      ip_address TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function saveLead(data: {
  fullName: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
  acceptComms: boolean;
  ipAddress?: string;
}) {
  await initDb();
  await sql`
    INSERT INTO leads (full_name, email, company, phone, service, message, accept_comms, ip_address)
    VALUES (
      ${data.fullName},
      ${data.email},
      ${data.company},
      ${data.phone ?? null},
      ${data.service},
      ${data.message},
      ${data.acceptComms},
      ${data.ipAddress ?? null}
    )
  `;
}

export async function countRecentLeadsByIp(
  ipAddress: string,
  windowMs: number = 60 * 60 * 1000
): Promise<number> {
  await initDb();
  const result = await sql<{ count: string }>`
    SELECT COUNT(*) as count
    FROM leads
    WHERE ip_address = ${ipAddress}
      AND created_at > NOW() - INTERVAL '1 hour'
  `;
  return parseInt(result.rows[0]?.count ?? "0", 10);
}
