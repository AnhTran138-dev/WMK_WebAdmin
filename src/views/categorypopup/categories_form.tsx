import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  useToast,
} from "@/components/ui";
import { categorySchema } from "../../schemas";
import { CategoryRequest } from "../../models/requests";

interface CategoryFormProps {
  reFresh: () => void;
  category: CategoryRequest | null;
  onClose: () => void;
  createCategory: (category: CategoryRequest) => Promise<void>;
  updateCategory: (id: string, category: CategoryRequest) => Promise<void>;
  type: "recipe" | "ingredient";
}

const typeOptions = [
  { value: "Nation", label: "Nation" },
  { value: "Classify", label: "Classify" },
  { value: "Meal in day", label: "Meal in day" },
  { value: "Cooking Method", label: "Cooking Method" },
];

const CategoryForm: React.FC<CategoryFormProps> = ({
  reFresh,
  category,
  onClose,
  createCategory,
  updateCategory,
  type, // Access the new prop
}) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      type: category?.type || "",
      status: category?.status || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    const newCategory: CategoryRequest = {
      name: values.name,
      description: values.description,
      status: values.status,
      type: values.type,
    };

    try {
      if (category) {
        await updateCategory(category.id ?? "", newCategory);
      } else {
        await createCategory(values);
      }
      reFresh();
      onClose();
      toast({
        title: "Success",
        description: category ? "Category updated" : "Category created",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        duration: 5000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-bold text-center">
            {category ? "Edit Category" : "Create New Category"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="grid gap-5 mt-5">
            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === "recipe" && !category && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {typeOptions.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === "ingredient" && !category && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value === 0}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? 0 : 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-5">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit">{category ? "Update" : "Submit"}</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
};

export default CategoryForm;
