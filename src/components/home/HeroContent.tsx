import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CycleWords from './CycleWords';

export default function HeroContent() {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left md:flex-1"
        >
          {/* Dev badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-3 py-1 rounded-full border border-primary/40 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            <span className="text-primary/90">Mobile App Developer</span>
          </motion.div> */}

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Mahendran G{' '}
            {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              Exceptional
            </span>{' '}
            Mobile Experiences */}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-8"
          >
            Transforming ideas into high-performance, user-centric mobile
            applications with the latest mobile development technologies.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8 md:mb-0"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity"
            >
              <Link to="/blog" className="group">
                Explore Tech Blog.
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Developer Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative md:flex-1 flex justify-center"
        >
          <div className="relative">
            <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-primary/20 shadow-xl">
              <AvatarImage
                src="https://media.licdn.com/dms/image/v2/D5603AQFOQ6Nyy6i4cA/profile-displayphoto-shrink_800_800/B56ZZZUHzFGcAg-/0/1745255171267?e=1750896000&v=beta&t=2qr9wsOKKilDCrZrTDJZc_DRExReR2GP5wp3ToSf360"
                alt="Mobile Developer"
                className="object-cover"
              />
              <AvatarFallback>mahendran profile</AvatarFallback>
            </Avatar>

            {/* Decorative elements */}
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-primary/30 to-purple-600/30 rounded-full -z-10"></div>
            <div className="absolute -top-3 -left-3 w-full h-full border-2 border-dashed border-primary/40 rounded-full -z-10"></div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-12 items-center justify-items-center max-w-4xl mx-auto"
      >
        {['Android', 'Flutter', 'Dart', 'Firebase', 'GetX', 'REST APIs'].map(
          (tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <p className="font-medium text-lg group-hover:text-primary transition-colors">
                {tech}
              </p>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
}
