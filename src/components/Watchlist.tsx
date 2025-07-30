import { watchlist } from "@/data/personal-space-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clapperboard, Tv, Film, Play, Layers } from "lucide-react";

const Watchlist = () => (
  <section className="mb-20">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Play className="w-8 h-8 text-primary" />
        <h2 className="text-4xl font-bold text-foreground">My Watchlist</h2>
      </div>
      <p className="text-muted-foreground text-lg">
        Stories that inspire and entertain
      </p>
    </div>

    <div className="grid sm:grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-card border border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Clapperboard />
            Movies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {watchlist.movies.map((item) => (
              <li
                key={item}
                className="text-foreground flex items-center gap-2"
              >
                <span className="text-primary">{">"}</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card border border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Tv />
            Series
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {watchlist.series.map((item) => (
              <li
                key={item}
                className="text-foreground flex items-center gap-2"
              >
                <span className="text-primary">{">"}</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card border border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Film />
            Anime
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {watchlist.anime.map((item) => (
              <li
                key={item}
                className="text-foreground flex items-center gap-2"
              >
                <span className="text-primary">{">"}</span>
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card border border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-primary">
            <Layers />
            Franchises
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {watchlist.franchises.map((item) => (
              <li
                key={item}
                className="text-foreground flex items-center gap-2"
              >
                <span className="text-primary">{">"}</span>
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
