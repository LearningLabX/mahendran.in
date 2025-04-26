import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Resume = () => {
  // Education data
  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      period: '2016 - 2018',
      description:
        'Specialized in Mobile Computing and Human-Computer Interaction. Thesis on optimizing cross-platform mobile application performance.',
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'University of Washington',
      period: '2012 - 2016',
      description:
        'Graduated with honors. Participated in the mobile app development club and won the annual hackathon for an innovative accessibility app.',
    },
  ];

  // Certifications data
  const certifications = [
    {
      name: 'Google Associate Android Developer',
      issuer: 'Google',
      date: '2022',
      link: '#',
    },
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2021',
      link: '#',
    },
    {
      name: 'Professional Scrum Master I (PSM I)',
      issuer: 'Scrum.org',
      date: '2020',
      link: '#',
    },
    {
      name: 'iOS App Development with Swift',
      issuer: 'Apple Developer Academy',
      date: '2019',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Resume</h1>
              <p className="text-muted-foreground max-w-2xl">
                A detailed overview of my professional experience, education,
                and technical skills in mobile app development.
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Download size={16} />
              Download Full Resume
            </Button>
          </div>
        </AnimatedSection>

        {/* Work Experience Section */}
        <AnimatedSection delay={100}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Work Experience
            </h2>
            <div className="space-y-10">
              {[
                {
                  title: 'Senior Mobile Developer',
                  company: 'TechApp Inc.',
                  period: '2022 - Present',
                  description:
                    'Lead mobile developer for a health tech startup, building cross-platform applications with React Native and integrating with health data APIs. Managed a team of 3 developers and implemented CI/CD pipelines.',
                  achievements: [
                    'Reduced app load time by 40% through codebase optimization',
                    'Implemented offline-first architecture with data synchronization',
                    'Released 6 major app versions with 4.8+ star ratings',
                    'Mentored junior developers and established team coding standards',
                    'Collaborated with UX team to implement improved onboarding flow, increasing user retention by 25%',
                  ],
                },
                {
                  title: 'Mobile Application Developer',
                  company: 'MobileFirst Solutions',
                  period: '2020 - 2022',
                  description:
                    'Developed native iOS applications in Swift and SwiftUI for clients in fintech and e-commerce sectors. Collaborated with design teams to implement pixel-perfect UIs and animations.',
                  achievements: [
                    'Created a custom animation framework for improved UX',
                    'Integrated secure payment gateways with biometric authentication',
                    'Optimized app performance for older iOS devices',
                    'Implemented analytics and crash reporting systems',
                    'Set up A/B testing for feature experiments and UI improvements',
                  ],
                },
                {
                  title: 'Junior Developer',
                  company: 'AppWorks Studio',
                  period: '2018 - 2020',
                  description:
                    'Worked on cross-platform mobile applications using Flutter and Firebase. Participated in full product lifecycle from concept to deployment for startups.',
                  achievements: [
                    'Developed 4 full-featured mobile apps from concept to launch',
                    'Implemented real-time synchronization with Firebase',
                    'Created reusable component library for faster development',
                    'Participated in client meetings and requirements gathering',
                    'Configured automated testing and continuous delivery pipelines',
                  ],
                },
              ].map((job, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <p className="text-muted-foreground font-medium">
                      {job.period}
                    </p>
                    <h3 className="text-xl font-bold mt-1">{job.title}</h3>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>
                    <h4 className="font-medium mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-outside pl-5 space-y-1">
                      {job.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection delay={200}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Technical Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mobile Development */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Mobile Development
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: 'React Native', level: 95 },
                    { skill: 'Swift & SwiftUI', level: 90 },
                    { skill: 'Flutter & Dart', level: 85 },
                    { skill: 'Kotlin & Jetpack Compose', level: 80 },
                    { skill: 'Mobile UI/UX Implementation', level: 90 },
                    { skill: 'App Performance Optimization', level: 85 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.skill}</span>
                        <span className="text-muted-foreground text-sm">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend & APIs */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Backend & Data</h3>
                <div className="space-y-3">
                  {[
                    { skill: 'Firebase & Firestore', level: 90 },
                    { skill: 'RESTful API Integration', level: 95 },
                    { skill: 'GraphQL', level: 80 },
                    { skill: 'Node.js & Express', level: 75 },
                    { skill: 'SQL & NoSQL Databases', level: 85 },
                    { skill: 'AWS Services', level: 70 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.skill}</span>
                        <span className="text-muted-foreground text-sm">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Practices */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Tools & Practices
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: 'Git & GitHub', level: 95 },
                    { skill: 'CI/CD Pipelines', level: 85 },
                    { skill: 'Agile/Scrum Methodologies', level: 90 },
                    { skill: 'App Store & Play Store Publishing', level: 95 },
                    { skill: 'Unit & Integration Testing', level: 85 },
                    { skill: 'UX/UI Prototyping', level: 80 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{item.skill}</span>
                        <span className="text-muted-foreground text-sm">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection delay={300}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Education</h2>
            <div className="space-y-8">
              {education.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <p className="text-muted-foreground font-medium">
                      {item.period}
                    </p>
                    <h3 className="text-xl font-bold mt-1">{item.degree}</h3>
                    <p className="text-primary font-medium">{item.school}</p>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Certifications Section */}
        <AnimatedSection delay={400}>
          <div>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
              Certifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-5 flex justify-between hover:border-primary/50 transition-colors"
                >
                  <div>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                  <a
                    href={cert.link}
                    className="text-primary text-sm hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Resume;
