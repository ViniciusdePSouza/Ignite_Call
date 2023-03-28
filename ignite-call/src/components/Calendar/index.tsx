import { getWeekDays } from "@/utils/get-week-day";
import { CaretLeft, CaretRight } from "phosphor-react";
import {
  CalendarActions,
  CalendarContainer,
  CalendarHeader,
  CalendarTitle,
  CalendarBody,
  CalendarDay,
} from "./styles";

export function Calendar() {
  const shortWeekDays = getWeekDays({ short: true });

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          Dezembro <span>2022</span>
        </CalendarTitle>

        <CalendarActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><CalendarDay>1</CalendarDay></td>
            <td><CalendarDay>2</CalendarDay></td>
            <td><CalendarDay>3</CalendarDay></td>
          </tr>
          <tr>
            <td><CalendarDay>4</CalendarDay></td>
            <td><CalendarDay>5</CalendarDay></td>
            <td><CalendarDay>6</CalendarDay></td>
            <td><CalendarDay>7</CalendarDay></td>
            <td><CalendarDay>8</CalendarDay></td>
            <td><CalendarDay>9</CalendarDay></td>
            <td><CalendarDay>10</CalendarDay></td>
          </tr>
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  );
}
