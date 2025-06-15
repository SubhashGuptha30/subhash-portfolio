import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
const PersonalSpaceLink = () => {
  return <section id="personal-space-link" className="py-20 text-center bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Beyond the Code</h2>
        <p className="text-xl text-gray-300 mb-8">
          Step into my personal space to see what I'm passionate about outside of technology.
        </p>
        <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all duration-300 hover:scale-105">
          <Link to="/personal-space">
            <Sparkles className="mr-2 h-5 w-5" />
            Explore My Personal Space
          </Link>
        </Button>
      </div>
    </section>;
};
export default PersonalSpaceLink;