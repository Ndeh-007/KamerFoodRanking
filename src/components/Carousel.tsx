import { IonImg, IonSlide, IonSlides } from "@ionic/react";
import React from "react";
import localImages from "../images/images";
import "../styles/Carousel.css";
import ExploreContainer from "./ExploreContainer";
import animations from "../animations/slides.js";

const Carousel: React.FC = () => {
  var sliderOptions = {
    autoplay: false,
    initialSlide: 0,
    speed: 3000,
    // ...animations.coverflow,
  };

  var carouselInfo = [
    {
      image: localImages.eru,
      title: "See Cameroon's Rich Meal Set",
      description:
        "Cameroon has been blessed with rich dishes. Go through the list of dishes and marvel. Dishes added to the list are done by the population",
    },
    {
      image: localImages.meat,
      title: "Rate Dish to Your Taste",
      description:
        "For those indigenous to Cameroon, join the pool and rate a dish to your taste. \n Accurately rate a dish to make other want to taste and know the wonders of the meal",
    },
    {
      image: localImages.achu,
      title: "Add a Meal You Love",
      description:
        "Add a meal to the pool and see how many people share your views.",
    },
  ];

  return (
    <>
      <div className="sub-hero ion-hide-sm-up">
        <ExploreContainer
          description={carouselInfo[0].description}
          title={carouselInfo[0].title}
          carousel={false}
        ></ExploreContainer>
      </div>
      <IonSlides pager={true} options={sliderOptions} className="slides ion-hide-lg-down">
        {carouselInfo.map((data, index) => {
          return (
            <IonSlide key={index}>
              <div className="slide-hero">
                <IonImg src={data.image}></IonImg>
                <ExploreContainer
                  carousel 
                  description={data.description}
                  title={data.title}
                ></ExploreContainer>
              </div>
            </IonSlide>
          );
        })}
      </IonSlides>
    </>
  );
};
export default Carousel;
