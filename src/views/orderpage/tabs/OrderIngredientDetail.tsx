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
import Show from "../../../lib/show";

interface OrderIngredientDetailProps {
  orderDetail: OrderDetailElement[];
}

const OrderIngredientDetail: React.FC<OrderIngredientDetailProps> = ({
  orderDetail,
}) => {
  return (
    <ScrollArea className="p-2 h-96">
      <Accordion type="single" collapsible className="w-full">
        {orderDetail.map((order) => (
          <div key={order.id}>
            {order.recipeIngredientOrderDetails.map((ingredient) => (
              <Show key={ingredient.id}>
                <Show.When isTrue={ingredient.recipeId === order.recipeId}>
                  <AccordionItem
                    value={ingredient.id}
                    className="mb-4 border border-gray-200 rounded-lg"
                  >
                    <AccordionTrigger className="items-start transition-colors duration-300 hover:bg-gray-100 hover:no-underline">
                      <div className="flex items-start justify-start h-full px-4">
                        <img
                          src={ingredient.ingredient.img}
                          alt={ingredient.ingredient.name}
                          className="object-cover w-20 h-20 mr-4 rounded-md"
                        />
                        <div className="flex flex-col items-start justify-start flex-1 ml-4">
                          <h3 className="text-xl font-bold text-primary">
                            {ingredient.ingredient.name} -{" "}
                            {ingredient.ingredientPrice.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}{" "}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {formatFromISOString(
                              ingredient.ingredient.createdAt,
                              FormatType.DATE
                            )}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 space-y-2 border-t border-gray-200 bg-gray-50">
                      <div>
                        Price:{" "}
                        {ingredient.ingredient.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div>
                        Amount: {ingredient.amount} {ingredient.ingredient.unit}
                      </div>
                      <div>
                        Prevervation: {ingredient.ingredient.preservationMethod}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Show.When>
                <Show.Else>
                  <div className="flex items-center justify-center h-full text-lg text-primary">
                    No ingredient in this order
                  </div>
                </Show.Else>
              </Show>
            ))}
          </div>
        ))}
      </Accordion>
    </ScrollArea>
  );
};

export default OrderIngredientDetail;
