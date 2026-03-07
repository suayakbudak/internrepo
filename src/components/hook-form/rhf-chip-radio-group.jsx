import { useFormContext, Controller } from "react-hook-form";
import { FormControl, FormLabel, Stack, Chip, FormHelperText, styled } from "@mui/material";

const StyledChip = styled(Chip)(({ theme, selected }) => ({
  borderRadius: theme.shape.borderRadius,
  fontWeight: theme.typography.fontWeightMedium,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.main : theme.palette.action.hover,
  },
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
}));

/**
 * Radio group component that displays options as chips in a flex row
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label
 * @param {Array<{value: string, label: string}>} props.options - Radio options
 * @param {string} [props.helperText] - Helper text
 * @param {Object} [props.sx] - Style overrides
 * @param {Object} [props.slotProps] - Props for inner components
 */
export function RHFChipRadioGroup({
  name,
  label,
  options,
  helperText,
  sx,
  slotProps = {},
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} {...slotProps?.wrapper}>
          {label && (
            <FormLabel
              sx={[
                {
                  mb: 1,
                  typography: "body2",
                },
                [slotProps.formLabel?.sx],
              ]}
              {...slotProps.formLabel}
            >
              {label}
            </FormLabel>
          )}

          <Stack
            direction="row"
            spacing={1}
            sx={[{ flexWrap: "wrap", gap: 1 }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...other}
          >
            {options.map((option) => (
              <StyledChip
                key={option.value}
                label={option.label}
                onClick={() => field.onChange(option.value)}
                selected={field.value === option.value}
                variant={field.value === option.value ? "filled" : "outlined"}
                {...slotProps?.chip}
              />
            ))}
          </Stack>

          {(error || helperText) && (
            <FormHelperText error={!!error} {...slotProps?.helperText}>
              {error?.message || helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
