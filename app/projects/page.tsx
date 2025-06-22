import { projects } from "@/data/projects";
import Projects from "@/components/Projects";
import LottieAnimation from "@/components/LottieAnimation";

export default function ProjectsPage() {
  const openSourceProjects = projects.filter(p => p.category === 'open-source');
  const personalProjects = projects.filter(p => p.category === 'personal');

  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Projects</h1>
          <p className="text-muted-foreground leading-relaxed">
            A collection of my work, from open-source contributions to personal projects. 
            Each project represents a unique challenge and learning opportunity in my journey 
            as a software engineer.
          </p>
        </div>
        <LottieAnimation animationPath="/animations/coding-animation-hands.json" />
      </div>
      
      {openSourceProjects.length > 0 && (
        <section className="mb-16">
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl font-medium mb-4">Open Source</h2>
            <p className="text-muted-foreground leading-relaxed">
              Contributing to open source is more than just writing code—it's about building 
              communities, sharing knowledge, and creating tools that empower others. These 
              projects reflect my commitment to the open-source ecosystem and the developer 
              community.
            </p>
          </div>
          <Projects projects={openSourceProjects} />
        </section>
      )}

      {personalProjects.length > 0 && (
        <section>
          <div className="max-w-2xl mb-8">
            <h2 className="text-xl font-medium mb-4">Personal Projects</h2>
            <p className="text-muted-foreground leading-relaxed">
              These projects are born from curiosity, experimentation, and the desire to solve 
              real-world problems. Each one represents a unique learning journey and an 
              opportunity to explore new technologies and ideas.
            </p>
          </div>
          <Projects projects={personalProjects} />
        </section>
      )}
    </div>
  );
} 