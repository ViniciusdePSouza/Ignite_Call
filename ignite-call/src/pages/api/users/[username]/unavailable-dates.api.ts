import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const username = String(req.query.username);
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ message: "Year or Month not provided" });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  });

  const unavailableWeekdays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay
    );
  });

  const unavailableDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT 
      strftime('%d', S.date) AS date,
      COUNT(S.date) AS amount,
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = strftime('%w', DATE(S.date, '+1 day'))

    WHERE S.user_id = ${user.id} 
    AND strftime('%Y-%m', S.date) = ${`${year}-${month}`}

    GROUP BY strftime('%d', S.date), size

    HAVING amount >= size
  `;

  const unavailableDates = unavailableDatesRaw.map((item) => item.date);

  return res.json({ unavailableWeekdays, unavailableDates });
}
