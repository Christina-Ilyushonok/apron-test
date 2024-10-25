import { Input } from "antd";
import { Controller } from "react-hook-form";

type TControlledInput = {
  name: string,
  className?: string,
  type?: string
}

export const ControlledInput = ({name, className, type} : TControlledInput) => (
  <Controller
    name={name}
    render={({ field, fieldState }) => (
      <Input
        {...field}
        className = {className}
        type={type}
      />
    )}
  />
)
