import React from "react";
import { OrderDetailElement } from "../../../models/responses";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ScrollArea,
} from "../../../components/ui";
import { formatFromISOString, FormatType } from "../../../lib";

interface OrderRecipeInfoDetailProps {
  data: OrderDetailElement[];
}

const OrderRecipeInfoDetail: React.FC<OrderRecipeInfoDetailProps> = ({
  data,
}) => {
  return (
    <ScrollArea className="p-2 h-96">
      <Accordion type="single" collapsible className="w-full">
        {data.map((orderDetail, index) => (
          <AccordionItem
            key={index}
            value={orderDetail.id}
            className="mb-4 border border-gray-200 rounded-lg"
          >
            <AccordionTrigger className="items-start transition-colors duration-300 hover:bg-gray-100 hover:no-underline">
              <div className="flex items-start justify-start h-full px-4">
                <img
                  src={orderDetail.recipe.img}
                  alt={orderDetail.recipe.name}
                  className="object-cover w-20 h-20 mr-4 rounded-md"
                />
                <div className="flex flex-col items-start justify-start flex-1 ml-4">
                  <h3 className="text-xl font-bold text-primary">
                    {orderDetail.recipe.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatFromISOString(
                      orderDetail.recipe.createdAt,
                      FormatType.DATE
                    )}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="mb-2 text-sm text-gray-600">
                Price:{" "}
                {orderDetail.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
              <div className="mb-2 text-sm text-gray-500">
                Difficulty: {orderDetail.recipe.difficulty}
              </div>
              <p className="text-sm text-gray-700">
                {orderDetail.recipe.description || "No description available."}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default OrderRecipeInfoDetail;
