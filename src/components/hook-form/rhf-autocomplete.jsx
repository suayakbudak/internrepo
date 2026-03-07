import { Controller, useFormContext } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

// ----------------------------------------------------------------------

export function RHFAutocomplete({ name, label, slotProps, helperText, placeholder, ...other }) {
  const { control, setValue } = useFormContext();

  const { textfield, ...otherSlotProps } = slotProps ?? {};

  const handleKeyDown = (event, inputValue, options) => {
    if (event.key === "Enter" && inputValue && !options.includes(inputValue)) {
      const newValue = [...options, inputValue];
      setValue(name, inputValue, { shouldValidate: true });
      if (other.options) {
        other.options = newValue;
      }
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          id={`rhf-autocomplete-${name}`}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          onKeyDown={(event) => handleKeyDown(event, field.value, other.options || [])}
          getOptionLabel={(option) => (typeof option === "string" ? option : option.label)}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              {...textfield}
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error?.message ?? helperText}
              slotProps={{
                ...textfield?.slotProps,
                htmlInput: {
                  ...params.inputProps,
                  ...textfield?.slotProps?.htmlInput,
                },
              }}
            />
          )}
          {...other}
          {...otherSlotProps}
        />
      )}
    />
  );
}
