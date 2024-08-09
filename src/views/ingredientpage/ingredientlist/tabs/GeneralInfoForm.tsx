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
} from "@/components/ui";
import useFetch from "@/hooks/useFetch";
import { CategoriesIngredient, Response } from "@/models/responses";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const GeneralInfoForm: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const ingredientCategoryId = watch("ingredientCategoryId");
  const [imagePreview, setImagePreview] = useState<string | null>(watch("img"));

  const { data: categories } = useFetch<Response<CategoriesIngredient[]>>(
    "/api/ingredientcategories/get-all"
  );

  useEffect(() => {
    setImagePreview(watch("img")); // Initialize with existing image URL if any
  }, [watch("img")]);

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
      <div className="grid col-span-1 grid-rows-3 gap-4">
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
                    {categories?.data.map((category) => (
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
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleFileChange} />
              </FormControl>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="mt-2 max-h-40"
                />
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid col-span-2 grid-rows-6 gap-4">
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
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    {...register("price", { valueAsNumber: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* {!status && (
            <FormField
              name="status"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-3">Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={Boolean(watch("status"))}
                      onCheckedChange={(checked) =>
                        setValue("status", checked ? 1 : 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )} */}
        </div>
        <FormField
          name="unit"
          render={() => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Unit" {...register("unit")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input
                  type="text"
                  placeholder="Preservation Method"
                  {...register("preservationMethod")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          name="createdBy"
          render={() => (
            <FormItem>
              <FormLabel>Created By</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Created By"
                  {...register("createdBy")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </div>
  );
};

export default GeneralInfoForm;
