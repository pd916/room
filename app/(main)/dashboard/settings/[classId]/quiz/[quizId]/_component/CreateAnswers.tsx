"use client";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CreateAnswersProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>; // for correct answer
  label: string;
  placeholder?: string;
  type?: "text";
}

const CreateAnswers = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type,
}: CreateAnswersProps<T>) => {
  return (
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      className="input"
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your correct answer.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
  );
};

export default CreateAnswers;
