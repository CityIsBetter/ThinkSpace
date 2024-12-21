import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Pencil, 
  Square,
  Type, 
  Layers, 
  Zap,
  LucideIcon
} from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Modified Dot Grid with Fade Effect
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

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
    <CardContent className="p-6 space-y-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

// Features data
const features = [
  {
    icon: Square,
    title: "Shape Tools",
    description: "Create perfect shapes with our rectangle and ellipse tools. Easily resize and adjust to fit your needs."
  },
  {
    icon: Pencil,
    title: "Freehand Drawing",
    description: "Express your ideas naturally with our smooth pencil tool for sketching and annotation."
  },
  {
    icon: Type,
    title: "Text & Notes",
    description: "Add text and sticky notes to communicate ideas clearly with your team members."
  },
  {
    icon: Layers,
    title: "Layer Management",
    description: "Organize your work with powerful layer controls. Arrange, group, and manage elements effortlessly."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Create organizations and invite team members to collaborate in real-time on shared whiteboards."
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "See changes instantly as team members contribute, with seamless synchronization across all users."
  }
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Dot Grid */}
      <section className="pt-32 pb-20 relative">
        <DotGrid />
        <div className="container mx-auto px-4 text-center relative z-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Real-Time <span className="text-blue-600">Collabrative</span> whiteboards
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            BoardScape brings your team's ideas to life with real-time collaboration tools, infinite canvas space, and powerful features for visual communication.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href={"/dashboard"}>Start for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={"https://youtube.com/"} target='_blank'>Watch Demo</Link>
            </Button>
          </div>
          
          <div className="mt-16 rounded-lg shadow-2xl overflow-hidden mx-auto max-w-5xl">
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 relative">
              {/* <div className="absolute inset-0 bg-white/40" /> */}
                <Image src={"/demo.gif"} alt='Demo' fill/>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to bring your ideas to life and collaborate with your team in real-time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="teams" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Built for Teams</h2>
            <p className="text-xl text-gray-600 mb-12">
              Create boards, invite team members, and collaborate in real-time. Perfect for design reviews, brainstorming, and project planning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "Organizations",
                  description: "Create and manage multiple teams with dedicated workspaces"
                },
                {
                  title: "Permissions",
                  description: "Control access and sharing settings for each board"
                },
                {
                  title: "Activity",
                  description: "Track changes and contributions from team members"
                }
              ].map((item, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
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