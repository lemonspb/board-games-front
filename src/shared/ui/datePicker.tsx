"use client";

import * as React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DatePickerProps = React.ComponentProps<typeof ReactDatePicker>;

export function DatePicker({ ...props }: DatePickerProps) {
  return <ReactDatePicker {...props} />;
}
