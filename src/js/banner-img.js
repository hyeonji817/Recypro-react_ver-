import mainImage1 from "../assets/main1_2.png";
import mainImage2 from "../assets/main2_2.png";
import cherryBlossom from "../assets/cherryblossom.png";

export function getBannerImage(bannerId) {
  switch (bannerId) {
    case 1:
      return mainImage1;
    case 2:
      return mainImage2;
    case 3:
      return cherryBlossom;
    default: 
      return null;
  }
}