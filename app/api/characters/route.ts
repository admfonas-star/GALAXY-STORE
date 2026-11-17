import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    const characters = await db.collection("characters")
      .find({ status: { $ne: "Vendido" } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    return NextResponse.json(characters.map(({ _id, ...item }) => ({ id: String(_id), ...item })));
  } catch {
    return NextResponse.json({ error: "Não foi possível consultar os personagens." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const vocation = typeof body.vocation === "string" ? body.vocation : "";
    const world = typeof body.world === "string" ? body.world.trim() : "";
    const level = Number(body.level);
    const price = Number(body.price);
    const allowed = ["Elite Knight", "Royal Paladin", "Elder Druid", "Master Sorcerer"];
    if (!name || name.length > 60 || !allowed.includes(vocation) || !world || world.length > 60 ||
        !Number.isInteger(level) || level < 1 || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Confira nome, vocação, mundo, level e preço." }, { status: 400 });
    }
    const doc = {
      name, vocation, world, level, price,
      pvp: typeof body.pvp === "string" ? body.pvp.slice(0, 40) : "Não informado",
      magic: Math.max(0, Number(body.magic) || 0),
      skill: Math.max(0, Number(body.skill) || 0),
      charms: Math.max(0, Number(body.charms) || 0),
      outfits: Math.max(0, Number(body.outfits) || 0),
      mounts: Math.max(0, Number(body.mounts) || 0),
      description: typeof body.description === "string" ? body.description.slice(0, 2000) : "",
      bazaarUrl: typeof body.bazaarUrl === "string" ? body.bazaarUrl.slice(0, 500) : null,
      source: body.source === "bazaar" ? "bazaar" : "manual",
      status: "Disponível",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const db = await getDatabase();
    const result = await db.collection("characters").insertOne(doc);
    return NextResponse.json({ id: result.insertedId.toString(), ...doc }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Não foi possível salvar o personagem." }, { status: 503 });
  }
}
