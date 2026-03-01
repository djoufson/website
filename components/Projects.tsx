"use client"

import { Project } from "@/types/Project"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { useState } from "react"
import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { ExternalLink, Github, Users, Star, GitFork, Download, Calendar, Award, Lightbulb, Target, Handshake, Paperclip, ArrowRight } from "lucide-react"

interface ProjectsProps {
  projects: Project[]
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
          onClick={() => setSelectedProject(project)}
        >
          <div className="relative w-full sm:w-16 h-32 sm:h-16 rounded-md overflow-hidden flex-shrink-0">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-xs">No image</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{project.title}</h3>
                <Badge
                  variant={
                    project.status === "active" ? "default" : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <Badge
                  variant={
                    selectedProject.status === "active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {selectedProject.status}
                </Badge>
              </div>
              <DialogDescription>
                {selectedProject.description}
              </DialogDescription>
            </DialogHeader>

            <div>
              {selectedProject.imageUrl ? (
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="object-cover aspect-video rounded-lg"
                />
              ) : (
                <div></div>
              )}
            </div>

            <div className="space-y-6">
              {selectedProject.impact && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Impact
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.impact}
                  </p>
                </div>
              )}

              {selectedProject.role && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Role
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.role}
                  </p>
                </div>
              )}

              {selectedProject.metrics && (
                <div>
                  <h4 className="font-medium mb-2">Metrics</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {selectedProject.metrics.stars && (
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedProject.metrics.stars} stars
                        </span>
                      </div>
                    )}
                    {selectedProject.metrics.forks && (
                      <div className="flex items-center gap-2">
                        <GitFork className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedProject.metrics.forks} forks
                        </span>
                      </div>
                    )}
                    {selectedProject.metrics.downloads && (
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedProject.metrics.downloads} downloads
                        </span>
                      </div>
                    )}

                    {selectedProject.metrics.contributors && (
                      <div className="flex items-center gap-2">
                        <Handshake className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedProject.metrics.contributors} contributors
                        </span>
                      </div>
                    )}
                    {selectedProject.metrics.users && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {selectedProject.metrics.users} users
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedProject.highlights &&
                selectedProject.highlights.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Features
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedProject.challenges &&
                selectedProject.challenges.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Challenges & Solutions
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedProject.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedProject.lessons &&
                selectedProject.lessons.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Key Learnings
                    </h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {selectedProject.lessons.map((lesson, index) => (
                        <li key={index}>{lesson}</li>
                      ))}
                    </ul>
                  </div>
                )}

              {selectedProject.collaborators &&
                selectedProject.collaborators.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Collaborators
                    </h4>
                    <div className="space-y-2">
                      {selectedProject.collaborators.map(
                        (collaborator, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm">{collaborator.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({collaborator.role})
                            </span>
                            {collaborator.githubUrl && (
                              <a
                                href={collaborator.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {selectedProject.downloads && selectedProject.downloads.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Downloads
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.downloads.map((download, index) => (
                      <a
                        key={index}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-md border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          {download.type === 'pdf' && (
                            <Paperclip className="w-4 h-4" />
                          )}
                          {download.type === 'doc' && (
                            <Paperclip className="w-4 h-4" />
                          )}
                          {download.type === 'ppt' && (
                            <Paperclip className="w-4 h-4" />
                          )}
                          {download.type === 'zip' && (
                            <Paperclip className="w-4 h-4" />
                          )}
                          {download.type === 'other' && (
                            <Paperclip className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{download.name}</div>
                          {download.description && (
                            <div className="text-xs text-muted-foreground">{download.description}</div>
                          )}
                        </div>
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/projects/${selectedProject.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  View details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
} 