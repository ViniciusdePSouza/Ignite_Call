import { Calendar } from "@/components/Calendar";
import { useState } from "react";
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface AvailabilityProps {
  possibleHours: number[];
  availableHours: number[];
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDateSelected = !!selectedDate;
  const router = useRouter();

  const username = String(router.query.username);

  const weekDay = selectedDate ? dayjs(selectedDate).format("dddd") : null;
  const describedDay = isDateSelected
    ? dayjs(selectedDate).format("DD[ de ]MMMM")
    : null;

  const selectedDateWithNoTime = selectedDate
    ? dayjs(selectedDate).format("YYYY-MM-DD")
    : null;

  const { data: availability } = useQuery<AvailabilityProps>(["availability", selectedDateWithNoTime], async () => {
    const response = await api.get(`users/${username}/availability`, {
      params: {
        date: selectedDateWithNoTime,
      },
    });

    return response.data
  }, 
  {
    enabled: !!selectedDate
  });

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{describedDay}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleHours.map((hour) => {
              const formattedHour = hour.toString().padStart(2, "0");
              const isItBooked = !availability.availableHours.includes(hour);

              return (
                <TimePickerItem key={hour} disabled={isItBooked}>
                  {formattedHour}:00
                </TimePickerItem>
              );
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  );
}
