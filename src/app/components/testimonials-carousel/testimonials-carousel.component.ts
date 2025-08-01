import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './testimonials-carousel.component.html',
  styleUrl: './testimonials-carousel.component.css'
})
export class TestimonialsCarouselComponent {
  currentIndex = signal(0);

  testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "Outstanding user experience and powerful features. Our team productivity has increased by 40% since implementing this solution.",
      name: "Michael Chen",
      title: "Product Manager, InnovateLab",
      avatar: "MC"
    },
    {
      id: 2,
      quote: "This platform has completely transformed how we manage our business operations. The analytics and insights have been invaluable.",
      name: "Sarah Johnson",
      title: "CEO, TechCorp",
      avatar: "SJ"
    },
    {
      id: 3,
      quote: "The customer support is exceptional and the platform is incredibly intuitive. It has streamlined our entire workflow process.",
      name: "Emily Rodriguez",
      title: "Marketing Director, GrowthCo",
      avatar: "ER"
    },
    {
      id: 4,
      quote: "Robust, scalable, and reliable. This is exactly what we needed to take our operations to the next level. Highly recommended.",
      name: "David Thompson",
      title: "CTO, DataFlow Systems",
      avatar: "DT"
    },
    {
      id: 5,
      quote: "The automation features have saved us countless hours. The ROI has been incredible and the results speak for themselves.",
      name: "Lisa Wang",
      title: "Operations Manager, Efficiency Plus",
      avatar: "LW"
    }
  ];

  currentTestimonial = computed(() => {
    return this.testimonials[this.currentIndex()];
  });

  nextTestimonial() {
    const newIndex = (this.currentIndex() + 1) % this.testimonials.length;
    console.log('Next: moving from', this.currentIndex(), 'to', newIndex);
    this.currentIndex.set(newIndex);
  }

  previousTestimonial() {
    const newIndex = this.currentIndex() === 0
      ? this.testimonials.length - 1
      : this.currentIndex() - 1;
    console.log('Previous: moving from', this.currentIndex(), 'to', newIndex);
    this.currentIndex.set(newIndex);
  }

  goToTestimonial(index: number) {
    console.log('Going to testimonial:', index);
    this.currentIndex.set(index);
  }

  get dots() {
    return Array.from({ length: this.testimonials.length }, (_, i) => i);
  }

  isActiveDot(index: number): boolean {
    return index === this.currentIndex();
  }
}
