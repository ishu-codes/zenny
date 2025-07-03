"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SMART_TIPS } from "./chartsData";

export default function SmartTips() {
  const [index, setIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const indexRef = useRef(0);
  const handlePrevTip = () => {
    const newIndex = index > 0 ? index - 1 : SMART_TIPS.length - 1;
    swiperInstance?.slideTo(newIndex);
  };
  const handleNextTip = () => {
    const newIndex = (index + 1) % SMART_TIPS.length;
    swiperInstance?.slideTo(newIndex);
  };
  const moveTo = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  useEffect(() => {
    if (!swiperInstance) return;

    const autoSlide = setInterval(() => {
      const newIndex = (indexRef.current + 1) % SMART_TIPS.length;
      indexRef.current = newIndex;
      swiperInstance.slideTo(newIndex);
    }, 5000);

    return () => clearInterval(autoSlide);
  }, [swiperInstance]);

  return (
    <Card className="overflow-x-hidden">
      <CardHeader>
        <CardTitle>Smart Tips</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 min-h-20 relative px-0">
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="w-full flex gap-4 transition-transform duration-300 ease-in-out">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              onSwiper={setSwiperInstance}
              onSlideChange={(swiper) => {
                setIndex(swiper.activeIndex);
                indexRef.current = swiper.activeIndex;
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              {SMART_TIPS?.map((tip, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    key={idx}
                    className="w-full shrink-0 relative text-white overflow-hidden"
                  >
                    <div className="flex flex-col gap-2 whitespace-normal px-6">
                      <h3 className="text-md text-foreground">{tip?.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {tip?.desc}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center md:justify-between">
        <Button
          className="hidden md:block"
          variant={"outline"}
          onClick={handlePrevTip}
        >
          Previous
        </Button>

        {/* Tip Indicators */}
        <div className="flex justify-center gap-2">
          {Array.from(
            { length: Math.min(SMART_TIPS.length, 5) },
            (_, i) => i
          ).map((idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                idx === index ? "w-10 bg-primary" : "w-2 bg-primary/20"
              }`}
              onClick={() => moveTo(idx)}
            />
          ))}
        </div>
        <Button className="hidden md:block" onClick={handleNextTip}>
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
