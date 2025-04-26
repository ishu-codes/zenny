"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
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
import { getFormattedDateTime } from "@/lib/date";

type Event = {
  id: number;
  title: string;
  date: Date;
  description: string;
};

export function CalendarTab() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2024, 3, 25),
      description: "Monthly team sync with all departments",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: new Date(2024, 3, 28),
      description: "Final submission for Q1 project",
    },
    {
      id: 3,
      title: "Budget Review",
      date: new Date(2024, 3, 30),
      description: "Monthly budget review meeting",
    },
  ];

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
              <h3 className="text-xl font-semibold">Upcoming Events</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex justify-between items-center p-3 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {getFormattedDateTime(event.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="previous">
            <AccordionTrigger>Previous events</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
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
          <div className="space-y-4">
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
