'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";

// Testimonial interface
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  testimonial: string;
  date: string;
  linkedin?: string;
  facebook?: string;
  xTwitter?: string;
  instagram?: string;
  telegram?: string;
  photo?: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  if (testimonials.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">Поки що немає відгуків</p>
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
            <div className="p-1">
              <Card className="border-border shadow-elegant hover:shadow-strong transition-smooth">
                <CardContent className="p-8">
                  {/* Header with avatar and name */}
                  <div className="flex items-start gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={testimonial.photo}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {testimonial.title}
                      </p>
                      {/* Social links */}
                      <div className="flex gap-3">
                        {testimonial.linkedin && (
                          <a
                            href={testimonial.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                            aria-label="LinkedIn"
                          >
                            <Icon name="linkedin" size="lg" />
                          </a>
                        )}
                        {testimonial.facebook && (
                          <a
                            href={testimonial.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                            aria-label="Facebook"
                          >
                            <Icon name="facebook" size="lg" />
                          </a>
                        )}
                        {testimonial.xTwitter && (
                          <a
                            href={testimonial.xTwitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                            aria-label="X (Twitter)"
                          >
                            <Icon name="xTwitter" size="lg" />
                          </a>
                        )}
                        {testimonial.instagram && (
                          <a
                            href={testimonial.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                            aria-label="Instagram"
                          >
                            <Icon name="instagram" size="lg" />
                          </a>
                        )}
                        {testimonial.telegram && (
                          <a
                            href={testimonial.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-smooth"
                            aria-label="Telegram"
                          >
                            <Icon name="telegram" size="lg" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial text */}
                  <p className="text-muted-foreground leading-relaxed line-clamp-7">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Date */}
                  <time
                    className="text-sm text-muted-foreground mt-4 block"
                    dateTime={testimonial.date}
                  >
                    {new Date(testimonial.date).toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}
