import { Card, CardContent, CardHeader, Label } from "@/components/ui";
import { Feedback } from "@/models/responses";
import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  UserIcon,
  PhoneIcon,
  StickyNoteIcon,
  MapPinIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  PackageIcon,
  Truck,
  MessageCircleMore,
} from "lucide-react";
import Show from "@/lib/show";

interface GeneralInfoDetailProps {
  data: {
    receiveName: string;
    receivePhone: string;
    note: string;
    address: string;
    img: string;
    shipDate: Date;
    orderDate: Date;
    totalPrice: number;
    status: string;
    weeklyPlan: string | null;
    feedBacks?: Feedback;
    message: string;
  };
}

const GeneralInfoDetail: React.FC<GeneralInfoDetailProps> = ({ data }) => {
  // Helper to render stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <AiFillStar key={i} className="text-yellow-500" />
        ) : (
          <AiOutlineStar key={i} className="text-yellow-500" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 gap-8 p-8 rounded-lg md:grid-cols-2">
      {/* Image Section */}
      <div className="flex items-center justify-center">
        <img
          src={data.img}
          alt="Order Image"
          className="object-cover w-full transition-transform duration-300 ease-in-out transform rounded-lg shadow-md hover:scale-105 h-96"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col space-y-6">
        <div className="text-2xl font-bold text-gray-800">Details</div>
        <div className="grid grid-cols-2 grid-rows-6 gap-4">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">{data.receiveName}</div>
          </div>

          <div className="flex items-center space-x-2">
            <PhoneIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">{data.receivePhone}</div>
          </div>

          <Show>
            <Show.When isTrue={data.note.length !== 0}>
              <div className="flex items-center col-span-2 row-start-5 space-x-2">
                <StickyNoteIcon className="w-5 h-5 text-gray-700" />
                <div className="font-normal text-gray-600">{data.note}</div>
              </div>
            </Show.When>
          </Show>

          <Show>
            <Show.When isTrue={data.message.length !== 0}>
              <div className="flex items-center col-span-2 row-start-6 space-x-2">
                <MessageCircleMore className="w-5 h-5 text-gray-700" />
                <div className="font-normal text-gray-600">{data.message}</div>
              </div>
            </Show.When>
          </Show>
          <div className="flex items-center col-span-2 row-start-4 space-x-2">
            <MapPinIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">{data.address}</div>
          </div>

          <div className="flex items-center space-x-2">
            <Truck className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">
              {new Date(data.shipDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">
              {new Date(data.orderDate).toLocaleDateString()}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSignIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">
              {data.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <PackageIcon className="w-5 h-5 text-gray-700" />
            <div className="font-normal text-gray-600">{data.status}</div>
          </div>

          {data.weeklyPlan && (
            <div className="flex items-center space-x-2">
              <FileTextIcon className="w-5 h-5 text-gray-700" />
              <div className="font-normal text-gray-600">{data.weeklyPlan}</div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="w-full">
        <Label className="text-2xl font-bold text-gray-800">Feedback</Label>
        {data.feedBacks ? (
          <Card className="mt-6 transition-shadow duration-300 rounded-lg shadow-lg hover:shadow-xl">
            <CardHeader>
              <div className="text-xl font-semibold text-gray-800">
                {data.feedBacks.createdBy}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="font-semibold text-gray-700">Rating:</div>
                <div className="flex">
                  {renderRatingStars(data.feedBacks.rating)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-gray-700">Comment:</div>
                <div className="italic font-normal text-gray-600">
                  "{data.feedBacks.description}"
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="font-semibold text-gray-700">Date:</div>
                <div className="font-normal text-gray-600">
                  {new Date(data.feedBacks.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4 italic font-normal text-gray-600">
            No feedback available
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralInfoDetail;
