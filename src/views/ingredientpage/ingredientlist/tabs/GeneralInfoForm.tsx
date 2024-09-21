import {
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
  Textarea,
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { CategoriesIngredient, Response } from "@/models/responses";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const unitList = [
  { value: "kg", label: "Kilogram" },
  { value: "g", label: "Gram" },
  { value: "l", label: "Liter" },
  { value: "ml", label: "Mililiter" },
  { value: "tuber", label: "Tuber" },
  { value: "fruit", label: "Fruit" },
];

const GeneralInfoForm: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const ingredientCategoryId = watch("ingredientCategoryId");
  const [imagePreview, setImagePreview] = useState<string>(watch("img"));

  const { data: categories } = useFetch<Response<CategoriesIngredient[]>>(
    "/api/ingredientcategories/get-all"
  );

  useEffect(() => {
    setImagePreview(watch("img"));
  }, [watch]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setValue("img", file);
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="grid col-span-1 ">
        <div>
          <FormField
            name="ingredientCategoryId"
            render={() => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={ingredientCategoryId}
                    onValueChange={(value) => {
                      setValue("ingredientCategoryId", value);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="img"
            render={() => (
              <FormItem className="mt-4">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>
                <div className="relative w-full ">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Selected"
                      className="absolute object-cover w-full rounded-2xl h-60"
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid col-span-2 gap-4">
        <FormField
          name="name"
          render={() => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...register("name")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            name="price"
            render={() => (
              <FormItem>
                <FormLabel>Price (VNĐ)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    min={0}
                    {...register("price", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitList.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="packagingMethod"
          render={() => (
            <FormItem>
              <FormLabel>Packaging Method</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Packaging Method"
                  {...register("packagingMethod")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="preservationMethod"
          render={() => (
            <FormItem>
              <FormLabel>Preservation Method</FormLabel>
              <FormControl>
                <Textarea
                  className="h-32"
                  placeholder="Preservation Method"
                  {...register("preservationMethod")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GeneralInfoForm;
