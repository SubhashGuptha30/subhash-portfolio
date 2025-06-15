
import { watchlist } from '@/data/personal-space-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clapperboard, Tv, Film, Play } from 'lucide-react';

const Watchlist = () => (
  <section className="mb-20">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Play className="w-8 h-8 text-pink-400" />
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text">
          My Watchlist
        </h2>
      </div>
      <p className="text-gray-400 text-lg">Stories that inspire and entertain</p>
    </div>
    
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="group bg-gradient-to-br from-gray-800 to-slate-800 border-gray-700 hover:border-red-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-400/20 hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-red-300 group-hover:text-red-200 transition-colors duration-300">
            <Clapperboard className="group-hover:rotate-12 transition-transform duration-300" /> 
            Movies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {watchlist.movies.map((item, index) => (
              <li 
                key={item} 
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer hover:translate-x-2 transform transition-transform duration-200 flex items-center gap-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-red-400 rounded-full opacity-70"></div>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="group bg-gradient-to-br from-gray-800 to-slate-800 border-gray-700 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/20 hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
            <Tv className="group-hover:scale-110 transition-transform duration-300" /> 
            Series
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {watchlist.series.map((item, index) => (
              <li 
                key={item} 
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer hover:translate-x-2 transform transition-transform duration-200 flex items-center gap-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full opacity-70"></div>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="group bg-gradient-to-br from-gray-800 to-slate-800 border-gray-700 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 hover:-translate-y-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
            <Film className="group-hover:-rotate-12 transition-transform duration-300" /> 
            Anime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {watchlist.anime.map((item, index) => (
              <li 
                key={item} 
                className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer hover:translate-x-2 transform transition-transform duration-200 flex items-center gap-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-70"></div>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default Watchlist;
