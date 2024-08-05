// import React, { useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { recipeSchema } from "@/schemas/recipe";
// import { z } from "zod";
// import {
//   FormField,
//   FormLabel,
//   FormControl,
//   Input,
//   FormItem,
//   Label,
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
//   FormMessage,
// } from "@/components/ui";
// import useFetch from "@/hooks/useFetch";
// import { CategoriesRecipe, Response } from "@/models/responses";

// const GeneralInfoForm: React.FC = () => {
//   const { register, setValue, getValues, watch } =
//     useFormContext<z.infer<typeof recipeSchema>>();
//   const [imagePreview, setImagePreview] = useState<string | null>(watch("img"));
//   const recipeCategoryIDs = watch("categoryIds");

//   const { data: categories } = useFetch<Response<CategoriesRecipe[]>>(
//     "/api/categories/get-all"
//   );

//   useEffect(() => {
//     setImagePreview(watch("img"));
//   }, [watch("img")]);

//   const categoryTypes = [
//     { id: 1, name: "Nation", type: "Nation" },
//     { id: 2, name: "Classify", type: "Classify" },
//     { id: 3, name: "Meal in day", type: "Meal in day" },
//     { id: 4, name: "Cooking Method", type: "Cooking Method" },
//   ];

//   const categoryTypesSet = new Set(categoryTypes.map((ct) => ct.type));

//   const handleSelectChange = (type: string, value: string) => {
//     const currentCategories = getValues("categoryIds") || [];

//     const updatedCategories = currentCategories.filter(
//       (item) =>
//         !categories?.data.some((cat) => cat.id === item && cat.type === type)
//     );
//     setValue("categoryIds", [...updatedCategories, value]);
//   };

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           setValue("img", reader.result as string);
//           setImagePreview(reader.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
//       {/* Category Row */}
//       <div className="col-span-full">
//         <Label className="block mb-2">Category</Label>
//         <div className="flex flex-wrap gap-4">
//           {categoryTypes.map((category) => {
//             return (
//               <FormField
//                 key={category.id}
//                 name="categoryIds"
//                 render={() => (
//                   <FormItem>
//                     <FormControl>
//                       <Select
//                         defaultValue={categories?.data
//                           .filter(
//                             (item) =>
//                               categoryTypesSet.has(item.type) &&
//                               recipeCategoryIDs.includes(item.id)
//                           )
//                           .map((item) => item.id)}
//                         onValueChange={(value) => {
//                           handleSelectChange(category.type, value);
//                         }}
//                         {...register("categoryIds")}
//                       >
//                         <SelectTrigger className="w-[180px]">
//                           <SelectValue placeholder={category.type} />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectGroup>
//                             <SelectLabel>{category.type}</SelectLabel>
//                             {categories?.data
//                               .filter((item) => item.type === category.type)
//                               .map((item) => (
//                                 <SelectItem key={item.id} value={item.id}>
//                                   {item.name}
//                                 </SelectItem>
//                               ))}
//                           </SelectGroup>
//                         </SelectContent>
//                       </Select>
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* Image and Fields */}
//       <div className="md:col-span-1 md:row-span-3">
//         <FormField
//           name="img"
//           render={() => (
//             <FormItem>
//               <FormLabel>Image</FormLabel>
//               <FormControl>
//                 <Input type="file" onChange={handleFileChange} />
//               </FormControl>
//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="Selected"
//                   className="object-cover mt-2 max-h-40"
//                 />
//               )}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="md:col-span-1">
//         <FormField
//           name="name"
//           render={() => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input
//                   id="name"
//                   placeholder="Recipe Name"
//                   {...register("name")}
//                   className="w-full"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="md:col-span-1">
//         <FormField
//           name="servingSize"
//           render={() => (
//             <FormItem>
//               <FormLabel>Serving Size</FormLabel>
//               <FormControl>
//                 <Input
//                   id="servingSize"
//                   type="number"
//                   placeholder="Serving Size"
//                   {...register("servingSize", { valueAsNumber: true })}
//                   className="w-full"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="md:col-span-1">
//         <FormField
//           name="cookingTime"
//           render={() => (
//             <FormItem>
//               <FormLabel>Cooking Time</FormLabel>
//               <FormControl>
//                 <Input
//                   id="cookingTime"
//                   type="number"
//                   placeholder="Cooking Time"
//                   {...register("cookingTime", { valueAsNumber: true })}
//                   className="w-full"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="md:col-span-1">
//         <FormField
//           name="difficulty"
//           render={() => (
//             <FormItem>
//               <FormLabel>Difficulty</FormLabel>
//               <FormControl>
//                 <Input
//                   id="difficulty"
//                   type="number"
//                   placeholder="Difficulty"
//                   {...register("difficulty", { valueAsNumber: true })}
//                   className="w-full"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="md:col-span-1">
//         <FormField
//           name="createdBy"
//           render={() => (
//             <FormItem>
//               <FormLabel>Created By</FormLabel>
//               <FormControl>
//                 <Input
//                   id="createdBy"
//                   placeholder="Created By"
//                   {...register("createdBy")}
//                   className="w-full"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>

//       {/* Description */}
//       <div className="col-span-full">
//         <FormField
//           name="description"
//           render={() => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <textarea
//                   id="description"
//                   placeholder="Description"
//                   {...register("description")}
//                   className="w-full h-40 p-2 border border-gray-300 rounded-md"
//                 />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default GeneralInfoForm;
