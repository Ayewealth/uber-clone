import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_URL}`);

    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (err) {
    console.log(err);
    return Response.json({ error: err });
  }
}
