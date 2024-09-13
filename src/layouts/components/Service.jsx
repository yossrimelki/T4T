// src/components/Service.jsx
import React, { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Image } from "astro:assets";
import VideoComponent from "@/layouts/function-components/VideoComponent";

const Service = ({ homepage_tab, our_service }) => {
  const [translatedService, setTranslatedService] = useState(our_service);

  useEffect(() => {
    const selectedLanguage = localStorage.getItem("language") || "en";
    fetch(`/locales/${selectedLanguage}.json`)
      .then((response) => response.json())
      .then((data) => {
        setTranslatedService(data.service.our_service);
      })
      .catch((error) => console.error("Error fetching translation:", error));
  }, [our_service]);

  return (
    <section class="section services">
      <div class="container">
        {/* You can include the HomepageTab component here if necessary */}
        {translatedService.map((item, index) => (
          <div class="gx-5 row mt-12 items-center lg:mt-0" key={index}>
            <div class={`lg:col-7 ${index % 2 === 0 ? "order-0" : "order-1"}`}>
              {item.image && (
                <div class="relative">
                  <Image
                    class="w-full object-contain"
                    alt="service"
                    width={667}
                    height={498}
                    src={item.image}
                  />
                  <Image
                    class="absolute bottom-6 left-1/2 -z-[1] -translate-x-1/2"
                    src="/images/shape-2.png"
                    alt=""
                    height={147}
                    width={151}
                  />
                </div>
              )}
              {item.video && (
                <VideoComponent
                  client:load
                  src={item.video.thumbnail}
                  height={370}
                  width={700}
                  title={item.title}
                  video_id={item.video.video_id}
                  video_width="w-[700px]"
                  video_height="h-[370px]"
                />
              )}
            </div>
            <div class={`mt-6 lg:col-5 lg:mt-0 ${index % 2 === 0 ? "order-1" : "order-0"}`}>
              <div class="text-container">
                <h2 class="lg:text-4xl">{item.title}</h2>
                <p class="mt-4">{item.description}</p>
                {item.button && item.button.enable && (
                  <a class="btn btn-white mt-6" href={item.button.link}>
                    {item.button.label}
                  </a>
                )}
                <ul class="mt-6 text-dark lg:-ml-4">
                  {item.list &&
                    item.list.map((list, idx) => (
                      <li class="mb-2 flex items-center rounded px-4" key={idx}>
                        <AiFillCheckCircle className="mr-3 fill-primary text-white" />
                        {list}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
