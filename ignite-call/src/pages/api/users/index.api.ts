import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const {name, username } = req.body

  const checkUserExistense = await prisma.user.findUnique({
    where: {
        username
    }
  })

  if(checkUserExistense) {
    return res.status(400).json({
        message: ' this username is already been used'
    })
  }

  const user = await prisma.user.create({
    data: {
        name,
        username
    }
  })

  return res.status(201).json(user);
}
