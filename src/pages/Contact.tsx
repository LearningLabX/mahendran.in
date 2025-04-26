import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/contact/ContactForm';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-muted-foreground">
              Have a project in mind or want to chat about mobile app
              development? I'm always open to discussing new opportunities and
              ideas.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedSection delay={100}>
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:g.mahendran2000@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      g.mahendran2000@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Linkedin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/mahendran-g-329464220/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      linkedin.com/in/mahendran-g-329464220
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">GitHub</h3>
                    <a
                      href="https://github.com/mahe2000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      github.com/mahe2000
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Twitter className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Twitter</h3>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      @devportfolio
                    </a>
                  </div>
                </div> */}
              </div>

              {/* <div className="mt-10">
                <h3 className="text-xl font-bold mb-3">Availability</h3>
                <p className="text-muted-foreground">
                  I'm currently available for freelance projects and consulting
                  work. My usual response time is within 24-48 hours.
                </p>
              </div> */}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;
