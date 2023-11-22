import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Store } from "@/entities/store";
import { twMerge } from "tailwind-merge";

type Props = {
  store: Store;
  onSubmit?: () => void;
};

const CustomFieldForm = ({ store, onSubmit = () => {} }: Props) => {
  const form = useFormContext();
  const formItemCN = "w-full mb-[20px] last:mb-[0px]";

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-full">
        {store.customField?.map((fieldItem, idx) => {
          return (
            <FormField
              key={idx}
              control={form.control}
              name={fieldItem.name}
              rules={{
                required: fieldItem.isRequired
                  ? "Field is Required"
                  : undefined,
              }}
              render={({ field, fieldState }) => {
                const invalid = fieldState.invalid;
                const placeholder = `${fieldItem.placeholder}${
                  fieldItem.isRequired ? "*" : ""
                }`;
                const className = twMerge(
                  invalid ? "border border-red-800 focus:border-red-800" : ""
                );
                return (
                  <FormItem className={formItemCN}>
                    <FormControl>
                      <Input
                        className={className}
                        placeholder={placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px]" />
                  </FormItem>
                );
              }}
            />
          );
        })}
      </form>
    </Form>
  );
};

export default CustomFieldForm;
