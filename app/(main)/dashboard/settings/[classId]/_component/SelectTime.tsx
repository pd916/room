"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Class } from "@prisma/client";

interface FormDataProps {
  initialData: Class;
  classId: string;
}

const formSchema = z.object({
  startTime: z.date({
    required_error: "Date is required"
  }),
});

const SelectTime = ({ initialData, classId }: FormDataProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: initialData.startTime ? new Date(initialData.startTime) : undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    if (initialData.startTime) {
      const existing = new Date(initialData.startTime);
      const hours = existing.getHours();
      const minutes = existing.getMinutes();
      let period = hours >= 12 ? "PM" : "AM";
      let hour12 = hours % 12 || 12;
      const timeStr = `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
      setSelectedTimeSlot(timeStr);
    }
  }, [initialData.startTime]);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i}:00 AM` });
      timeList.push({ time: `${i}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timeList);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "val")
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    const selectedDate = new Date(values.startTime);
    const [time, period] = selectedTimeSlot.split(" ");
    const [hoursStr, minutesStr] = time.split(":");

    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    selectedDate.setHours(hours, minutes, 0, 0);

    try {
      await axios.patch(`/api/class/${classId}`, {
        startTime: selectedDate.toISOString(),
      });

      toast.success("Date Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-900 text-white rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Select Date & Time
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="h-4 w-4 mt-2" />
              Edit title
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm mt-2">
          {initialData.title || "No time selected"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[320px] p-0" align="start">
                        <div className="mt-3 md:mt-0">
                          <h2 className="flex gap-2 items-center mb-3">
                            <Clock className="text-primary h-5 w-5" />
                            Select Time Slot
                          </h2>
                          <div className="flex overflow-x-auto gap-3 border rounded-lg p-5">
                            {timeSlot.map((item, index) => (
                              <h2
                                key={index}
                                onClick={() => setSelectedTimeSlot(item.time)}
                                className={cn(
                                  "p-2 border cursor-pointer rounded-full text-center hover:bg-primary hover:text-white",
                                  item.time === selectedTimeSlot && "bg-primary text-white"
                                )}
                              >
                                {item.time}
                              </h2>
                            ))}
                          </div>
                        </div>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || !selectedTimeSlot || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default SelectTime;
