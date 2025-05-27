"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
// import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFormattedRelativeDateTime } from "@/lib/date";
import { EVENTS, COLORS, type Event } from "./data";

export function CalendarTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const currentDate = new Date();

  const upcomingEvents = EVENTS.filter(
    (event) =>
      new Date(event.date).setHours(0, 0, 0, 0) >=
      currentDate.setHours(0, 0, 0, 0)
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  const previousEvents = EVENTS.filter(
    (event) =>
      new Date(event.date).setHours(0, 0, 0, 0) <
      currentDate.setHours(0, 0, 0, 0)
  ).sort((a, b) => b.date.getTime() - a.date.getTime());

  const renderEventList = (events: Event[]) => (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex justify-between items-center p-3 hover:bg-muted rounded-lg cursor-pointer"
          onClick={() => setSelectedEvent(event)}
        >
          <div className={`border-l-4 pl-4 border-${COLORS[event.importance]}`}>
            <p className="font-medium">{event.title}</p>
            <p className="text-xs text-muted-foreground">
              {getFormattedRelativeDateTime(event.date)}
            </p>
          </div>
        </div>
      ))}
      {events.length === 0 && (
        <p className="text-sm text-muted-foreground p-3">
          No events to display
        </p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="calendar rounded-md"
      />

      <div className="">
        <Accordion type="single" defaultValue="upcoming" collapsible>
          <AccordionItem value="upcoming">
            <AccordionTrigger>
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderEventList(upcomingEvents)}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="previous">
            <AccordionTrigger>
              <h3 className="text-lg font-semibold">Previous Events</h3>
            </AccordionTrigger>
            <AccordionContent>
              {renderEventList(previousEvents)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>{selectedEvent?.description}</p>
            <p className="text-sm text-muted-foreground">
              Date: {selectedEvent?.date.toLocaleDateString()}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
