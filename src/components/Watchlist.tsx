import { watchlist } from "@/data/personal-space-data";
import { Card, CardContent } from "@/components/ui/card";
import { Clapperboard, Tv, Film, Play, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Watchlist = () => {
  const categories = [
    { name: "Movies", icon: Clapperboard, data: watchlist.movies },
    { name: "Series", icon: Tv, data: watchlist.series },
    { name: "Anime", icon: Film, data: watchlist.anime },
    { name: "Franchises", icon: Layers, data: watchlist.franchises },
  ];

  return (
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

      <Tabs defaultValue="Movies" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-card border border-primary/30">
          {categories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name}
              className="data-[state=active]:bg-primary/20"
            >
              <category.icon className="w-5 h-5 mr-2" />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            <Card className="bg-card border border-primary/30 mt-4">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {category.data.map((item) => (
                    <li
                      key={item}
                      className="text-foreground flex items-center gap-3 transition-colors hover:text-primary"
                    >
                      <span className="text-primary font-bold text-xl transform transition-transform hover:scale-110">
                        {">"}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Watchlist;
