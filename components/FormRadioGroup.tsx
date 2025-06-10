import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface FormRadioGroupProps<T extends FieldValues> {
    control: Control<T>
    name: Path<T>
    label: string
    options: { label: string; value: string }[]
  }

const FormRadioGroup = <T extends FieldValues>({
    control,
    name,
    label,
    options,
  }: FormRadioGroupProps<T>) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-4"
              >
                {options.map((option) => (
                  <FormItem key={option.value} className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription>Select your role</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
  
  export default FormRadioGroup