
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";

export default function ResumeSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Resume & Experience</h2>
              <p className="text-muted-foreground mt-2">
                My professional journey in mobile application development
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Download Resume (PDF)
            </Button>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Skills column */}
          <AnimatedSection delay={100}>
            <div className="bg-card rounded-xl p-6 border border-border h-full">
              <h3 className="text-xl font-bold mb-4">Technical Skills</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    MOBILE DEVELOPMENT
                  </h4>
                  <div className="space-y-2">
                    {['React Native', 'Flutter', 'Swift', 'Kotlin', 'SwiftUI', 'Jetpack Compose'].map((skill) => (
                      <div key={skill} className="flex justify-between">
                        <span>{skill}</span>
                        <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.floor(70 + Math.random() * 30)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    BACKEND & APIS
                  </h4>
                  <div className="space-y-2">
                    {['RESTful APIs', 'GraphQL', 'Firebase', 'Node.js', 'Serverless'].map((skill) => (
                      <div key={skill} className="flex justify-between">
                        <span>{skill}</span>
                        <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.floor(70 + Math.random() * 30)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                    TOOLS & PRACTICES
                  </h4>
                  <div className="space-y-2">
                    {['Git', 'CI/CD', 'Testing', 'Agile', 'App Store & Play Store'].map((skill) => (
                      <div key={skill} className="flex justify-between">
                        <span>{skill}</span>
                        <div className="w-16 h-2 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${Math.floor(70 + Math.random() * 30)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Experience column */}
          <AnimatedSection delay={200} className="md:col-span-2">
            <div className="space-y-8">
              {[
                {
                  title: "Senior Mobile Developer",
                  company: "TechApp Inc.",
                  period: "2022 - Present",
                  description: "Lead mobile developer for a health tech startup, building cross-platform applications with React Native and integrating with health data APIs. Managed a team of 3 developers and implemented CI/CD pipelines.",
                  achievements: [
                    "Reduced app load time by 40% through codebase optimization",
                    "Implemented offline-first architecture with data synchronization",
                    "Released 6 major app versions with 4.8+ star ratings"
                  ]
                },
                {
                  title: "Mobile Application Developer",
                  company: "MobileFirst Solutions",
                  period: "2020 - 2022",
                  description: "Developed native iOS applications in Swift and SwiftUI for clients in fintech and e-commerce sectors. Collaborated with design teams to implement pixel-perfect UIs and animations.",
                  achievements: [
                    "Created a custom animation framework for improved UX",
                    "Integrated secure payment gateways with biometric authentication",
                    "Optimized app performance for older iOS devices"
                  ]
                },
                {
                  title: "Junior Developer",
                  company: "AppWorks Studio",
                  period: "2018 - 2020",
                  description: "Worked on cross-platform mobile applications using Flutter and Firebase. Participated in full product lifecycle from concept to deployment for startups.",
                  achievements: [
                    "Developed 4 full-featured mobile apps from concept to launch",
                    "Implemented real-time synchronization with Firebase",
                    "Created reusable component library for faster development"
                  ]
                }
              ].map((job, index) => (
                <div key={index} className="border-l-2 border-border pl-5 py-1 relative hover:border-primary transition-colors">
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[7px] top-7"></div>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                  <h3 className="text-xl font-bold mt-1">{job.title}</h3>
                  <p className="text-primary font-medium mt-0.5 mb-3">{job.company}</p>
                  <p className="text-muted-foreground mb-3">{job.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
