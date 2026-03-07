import { AboutHero } from "./components/about-hero";
import { AboutWhat } from "./components/about-what";
import { AboutVision } from "./components/about-vision";
import { AboutTestimonials } from "./components/about-testimonials";

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      {/* <AboutTeam /> */}

      <AboutTestimonials />
    </>
  );
}
