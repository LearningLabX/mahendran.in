
import AnimatedSection from "@/components/ui/AnimatedSection";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimatedSection className="order-2 md:order-1">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-primary/20 to-secondary rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                  alt="Developer working on mobile app"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200} className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">
              Crafting Mobile Experiences with Precision & Passion
            </h2>
            <p className="text-muted-foreground mb-4">
              I specialize in building cross-platform mobile applications that combine
              beautiful design with performant, clean code. With over 5 years of
              experience, I've helped startups and established companies bring their
              product visions to life.
            </p>
            <p className="text-muted-foreground mb-6">
              My approach focuses on creating intuitive user interfaces while
              ensuring robust architecture that scales with your business needs.
              Whether you're launching a new product or enhancing an existing app,
              I'm committed to delivering exceptional quality.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "React Native",
                "Flutter",
                "Swift",
                "Kotlin",
                "Firebase",
                "REST APIs",
                "GraphQL",
                "CI/CD",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-secondary text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            <Button asChild variant="outline" className="group">
              <Link to="/resume">
                View Full Resume
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
