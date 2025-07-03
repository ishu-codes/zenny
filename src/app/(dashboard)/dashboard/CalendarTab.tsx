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
import { EVENTS, EventInterface, EVENT_IMPORTANCE } from "./data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { titleCase } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { AlarmClockPlus, CheckCheck } from "lucide-react";

export function CalendarTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventInterface | null>(
    null
  );
  const [eventDialogVisible, setEventDialogVisible] = useState<boolean>(false);

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

  const handleEventDialog = (transaction: EventInterface | null) => {
    if (transaction == null) {
      setEventDialogVisible(false);
      setTimeout(setSelectedEvent, 300);
    } else {
      setSelectedEvent(transaction);
      setEventDialogVisible(true);
    }
  };

  const renderEventList = (events: EventInterface[]) => (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex justify-between items-center p-3 hover:bg-muted rounded-lg cursor-pointer"
          onClick={() => handleEventDialog(event)}
        >
          <div
            className={`border-l-4 pl-4 border-${
              EVENT_IMPORTANCE[event.importance].color
            }`}
          >
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
        open={eventDialogVisible}
        onOpenChange={() => handleEventDialog(null)}
      >
        <DialogContent className="flex flex-col gap-4">
          <DialogHeader className="h-0">
            <DialogTitle className="sr-only">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-3 -mt-4">
            <Badge
              variant={"default"}
              className="bg-primary/10 dark:bg-emerald-900 text-foreground"
            >
              {selectedEvent?.importance} PRIORITY
            </Badge>
          </div>
          <div className="flex gap-2">
            <div className="p-4 rounded-full bg-primary/10">
              {EVENT_IMPORTANCE[selectedEvent?.importance || "LOW"].icon}
            </div>
            <div className="flex-1 flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold">
                  {selectedEvent?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedEvent?.date.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          {selectedEvent?.desc && (
            <p className="text-muted-foreground">{selectedEvent?.desc}</p>
          )}

          <div className="flex justify-between mt-4">
            <Button variant={"outline"}>
              <AlarmClockPlus /> Notify me
            </Button>
            <Button>
              <CheckCheck /> Mark as done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
