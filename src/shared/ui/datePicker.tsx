"use client";

import * as React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DatePickerProps = React.ComponentProps<typeof ReactDatePicker>;

export function DatePicker({ ...props }: DatePickerProps) {
  return (
    <ReactDatePicker
      {...props}
      className="bg-white rounded-md border border-input radius focus:tw-ring-color ring-ring:focus focus-visible:tw-ring-color  block  py-1 px-3 tw-ring-color h-9 text-sm w-full"
    />
  );
}
