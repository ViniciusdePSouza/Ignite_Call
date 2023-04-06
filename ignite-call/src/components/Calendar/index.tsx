import { getWeekDays } from "@/utils/get-week-day";
import dayjs from "dayjs";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo, useState } from "react";
import {
  CalendarActions,
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarBody,
  CalendarDay,
} from "./styles";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface CalendarWeek {
  week: number;
  days: Array<{
    date: dayjs.Dayjs;
    disabled: boolean;
  }>;
}

interface UnavailableDates {
  unavailableWeekdays: number[];
  unavailableDates: number[];
}

type CalendarWeeks = CalendarWeek[];

interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelected: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelected }: CalendarProps) {
  const shortWeekDays = getWeekDays({ short: true });

  const router = useRouter();
  const username = String(router.query.username);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set("date", 1);
  });

  const { data: unavailableDates } = useQuery<UnavailableDates>(
    ["unavailable-dates", currentDate.get("year"), currentDate.get("month")],
    async () => {
      const response = await api.get(`users/${username}/unavailable-dates`, {
        params: {
          year: currentDate.get("year"),
          month: currentDate.get("month"),
        },
      });

      return response.data;
    }
  );

  function handleNextMonth() {
    const nextMonth = currentDate.add(1, "month");

    setCurrentDate(nextMonth);
  }
  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, "month");

    setCurrentDate(previousMonth);
  }

  const currentMonth = currentDate.format("MMMM");
  const currentYear = currentDate.format("YYYY");

  const calendarWeeks = useMemo(() => {
    if(!unavailableDates){
      return []
    }

    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set("date", i + 1);
    });

    const firstWeekDay = currentDate.get("day");

    const lastDayInCurrentMonth = currentDate.set(
      "date",
      currentDate.daysInMonth()
    );
    const lastWeekDay = lastDayInCurrentMonth.get("day");

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, "day");
      })
      .reverse();

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, "day");
    });

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled:
            date.endOf("day").isBefore(new Date()) ||
            unavailableDates?.unavailableWeekdays.includes(date.get("days")) ||
            unavailableDates?.unavailableWeekdays.includes(date.get("date"))
        };
      }),
      ...nextMonthFillArray.map((date) => {
        return { date, disabled: true };
      }),
    ];

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const hasWeekStarted = i % 7 == 0;

        if (hasWeekStarted) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          });
        }

        return weeks;
      },
      []
    );

    return calendarWeeks;
  }, [currentDate, unavailableDates]);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>

        <CalendarActions>
          <button onClick={handlePreviousMonth} title="Mês Anterior">
            <CaretLeft />
          </button>
          <button onClick={handleNextMonth} title="Próximo Mês ">
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>

      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays &&
              shortWeekDays.map((weekDay) => {
                return <th key={weekDay}>{weekDay}.</th>;
              })}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }, index) => {
                  return (
                    <td key={index}>
                      <CalendarDay
                        onClick={() => onDateSelected(date.toDate())}
                        disabled={disabled}
                      >
                        {date.get("date")}
                      </CalendarDay>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
