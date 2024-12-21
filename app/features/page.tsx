import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Square, 
  Pencil, 
  Type, 
  Layers, 
  Users, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

interface FeatureSection {
  title: string;
  description: string;
  icon: React.ElementType;
  imageUrl: string;
  benefits: string[];
  reverse?: boolean;
}

const features: FeatureSection[] = [
  {
    title: "Shape Tools",
    description: "Create perfect shapes with our intuitive tools. Drag to resize, hold shift for perfect proportions, and easily adjust properties like fill, stroke, and opacity.",
    icon: Square,
    imageUrl: "/features/shapes-demo.gif",
    benefits: [
      "Perfect rectangles, ellipses, and polygons",
      "Smart snapping and alignment",
      "Customizable styles and properties",
      "Copy and paste with preserved attributes"
    ]
  },
  {
    title: "Freehand Drawing",
    description: "Express your ideas naturally with our responsive drawing tools. Multiple brush types, pressure sensitivity, and smoothing controls give you the perfect drawing experience.",
    icon: Pencil,
    imageUrl: "/features/drawing-demo.gif",
    benefits: [
      "Pressure-sensitive brushes",
      "Customizable stroke smoothing",
      "Multiple brush types and sizes",
      "Quick color selection and opacity control"
    ],
    reverse: true
  },
  {
    title: "Text & Notes",
    description: "Add context to your designs with rich text editing and sticky notes. Format text, create lists, and organize information effectively.",
    icon: Type,
    imageUrl: "/features/text-demo.gif",
    benefits: [
      "Rich text formatting",
      "Multiple font styles",
      "Sticky notes and callouts",
      "Auto-resizing text boxes"
    ]
  },
  {
    title: "Layer Management",
    description: "Keep your work organized with powerful layer controls. Group elements, adjust opacity, and manage complex designs with ease.",
    icon: Layers,
    imageUrl: "/features/layers-demo.gif",
    benefits: [
      "Unlimited layers and groups",
      "Drag and drop reorganization",
      "Lock and hide layers",
      "Layer effects and blending modes"
    ],
    reverse: true
  },
  {
    title: "Team Collaboration",
    description: "Work together in real-time with your team. See cursors, changes, and updates instantly as team members contribute to the board.",
    icon: Users,
    imageUrl: "/features/collaboration-demo.gif",
    benefits: [
      "Real-time cursor presence",
      "Live changes and updates",
      "Team member avatars",
      "Collaborative selection and editing"
    ]
  },
  {
    title: "Real-time Updates",
    description: "Experience seamless synchronization across all users. Changes are instantly reflected for all team members, ensuring everyone stays in sync.",
    icon: Zap,
    imageUrl: "/features/sync-demo.gif",
    benefits: [
      "Instant synchronization",
      "Conflict resolution",
      "Offline support",
      "Change history and undo/redo"
    ],
    reverse: true
  }
];

const DotGrid = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Bottom fade gradient only */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="#3e3e3e" opacity="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
);

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar />
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-neutral-100 flex flex-col justify-center h-screen">
        <DotGrid />
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">
            Powerful <span className='text-blue-600'>Features</span> for Teams
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to bring your ideas to life and collaborate effectively with your team.
          </p>
        </div>
        <div className="flex items-center justify-between mt-12">
            <Image src={"/features.png"} alt='Features' width={600} height={420} className='relative bottom-0 right-0'/>
            <Image src={"/features2.png"} alt='Features' width={600} height={420} className='relative bottom-0 right-0'/>
        </div>
      </section>

      {/* Features Sections */}
      <div className="py-12">
        {features.map((feature, index) => (
          <section
            key={feature.title}
            className={`py-16 ${index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="container mx-auto px-4">
              <div className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold">{feature.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-4">
                    Learn More
                  </Button>
                </div>

                {/* Image/Demo Content */}
                <div className="flex-1">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                    {/* Replace with actual image/gif */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
        {/* CTA Section */}
        <section className="py-20 pt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-blue-600 text-white rounded-2xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-8">Create teams and boards, invite your friends, and collaborate in real-time with BoardScape.</p>
            <Button size="lg" variant="secondary" asChild>
              <Link href={"/dashboard"}>
                create your first board
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}