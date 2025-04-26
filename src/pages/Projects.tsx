
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectCard, { Project } from "@/components/projects/ProjectCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Sample projects data
const allProjects: Project[] = [
  {
    id: "health-tracker",
    title: "Health Tracker App",
    description: "A comprehensive health tracking application with personalized insights and analytics.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    technologies: ["React Native", "Firebase", "HealthKit"],
    demoUrl: "#",
    githubUrl: "#",
    featured: true
  },
  {
    id: "fitness-coach",
    title: "Fitness Coach",
    description: "AI-powered personal trainer app with custom workout plans and progress tracking.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    technologies: ["Flutter", "TensorFlow", "Firebase"],
    demoUrl: "#",
    featured: true
  },
  {
    id: "meal-planner",
    title: "Meal Planner",
    description: "Recipe and nutrition tracking app with shopping list integration and meal scheduling.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    technologies: ["Swift", "Core Data", "REST API"],
    githubUrl: "#",
    featured: true
  },
  {
    id: "travel-companion",
    title: "Travel Companion",
    description: "Travel planning and itinerary app with local recommendations and offline maps.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    technologies: ["Kotlin", "Jetpack Compose", "Google Maps API"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: "budget-tracker",
    title: "Budget Tracker",
    description: "Personal finance management app with expense categorization and budget planning features.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    technologies: ["React Native", "Redux", "Firebase"],
    demoUrl: "#"
  },
  {
    id: "plant-care",
    title: "Plant Care Assistant",
    description: "Plant identification and care app with watering reminders and growth tracking.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    technologies: ["Flutter", "ML Kit", "SQLite"],
    githubUrl: "#"
  }
];

// Filter categories based on technologies used in projects
const filterCategories = Array.from(
  new Set(allProjects.flatMap(project => project.technologies))
).sort();

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  
  const filteredProjects = selectedFilter
    ? allProjects.filter(project => 
        project.technologies.includes(selectedFilter)
      )
    : allProjects;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">My Projects</h1>
            <p className="text-muted-foreground">
              A showcase of my mobile application development work,
              featuring projects from concept to launch across various platforms.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedFilter === null ? "default" : "outline"}
              onClick={() => setSelectedFilter(null)}
              className="rounded-full"
              size="sm"
            >
              All
            </Button>
            
            {filterCategories.map((category) => (
              <Button
                key={category}
                variant={selectedFilter === category ? "default" : "outline"}
                onClick={() => setSelectedFilter(category)}
                className="rounded-full"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No projects matching the selected filter.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedFilter(null)}
                className="mt-4"
              >
                View All Projects
              </Button>
            </div>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
