import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Player {
  rank: number;
  name: string;
  value: number;
  avatar: string;
}

const playersTimeData: Player[] = [
  { rank: 1, name: 'EnDay01', value: 2847, avatar: '👑' },
  { rank: 2, name: 'Kamelia07', value: 2156, avatar: '🌸' },
  { rank: 3, name: 'kfcasdw', value: 1923, avatar: '🍗' },
  { rank: 4, name: 'LaWWe04', value: 1654, avatar: '⚡' },
  { rank: 5, name: 'BleW', value: 1432, avatar: '💙' },
  { rank: 6, name: 'durmaLLin', value: 1287, avatar: '🎮' },
];

const playersAchievementsData: Player[] = [
  { rank: 1, name: 'kfcasdw', value: 156, avatar: '🍗' },
  { rank: 2, name: 'EnDay01', value: 142, avatar: '👑' },
  { rank: 3, name: 'durmaLLin', value: 128, avatar: '🎮' },
  { rank: 4, name: 'Kamelia07', value: 115, avatar: '🌸' },
  { rank: 5, name: 'BleW', value: 98, avatar: '💙' },
  { rank: 6, name: 'LaWWe04', value: 87, avatar: '⚡' },
];

const playersBlocksData: Player[] = [
  { rank: 1, name: 'durmaLLin', value: 485632, avatar: '🎮' },
  { rank: 2, name: 'LaWWe04', value: 387541, avatar: '⚡' },
  { rank: 3, name: 'BleW', value: 298765, avatar: '💙' },
  { rank: 4, name: 'EnDay01', value: 245321, avatar: '👑' },
  { rank: 5, name: 'Kamelia07', value: 198432, avatar: '🌸' },
  { rank: 6, name: 'kfcasdw', value: 156789, avatar: '🍗' },
];

const getMedalColor = (rank: number) => {
  if (rank === 1) return 'text-gold';
  if (rank === 2) return 'text-silver';
  if (rank === 3) return 'text-bronze';
  return 'text-muted-foreground';
};

const getMedalIcon = (rank: number) => {
  if (rank === 1) return 'Trophy';
  if (rank === 2) return 'Medal';
  if (rank === 3) return 'Award';
  return 'Circle';
};

const PlayerCard = ({ player, suffix }: { player: Player; suffix: string }) => (
  <Card
    className="p-6 minecraft-shadow hover:scale-105 transition-transform duration-200 cursor-pointer animate-fade-in bg-card/80 backdrop-blur-sm border-4 border-border"
    style={{ animationDelay: `${player.rank * 0.05}s` }}
  >
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="text-5xl animate-pixel-float" style={{ animationDelay: `${player.rank * 0.2}s` }}>
          {player.avatar}
        </div>
        <div className={`absolute -top-2 -right-2 ${getMedalColor(player.rank)}`}>
          <Icon name={getMedalIcon(player.rank)} size={24} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-lg font-bold px-3 py-1 minecraft-shadow">
            #{player.rank}
          </Badge>
          <h3 className="text-xl font-bold truncate">{player.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-2xl font-bold text-primary">
            {player.value.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">{suffix}</span>
        </div>
      </div>
    </div>
  </Card>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState('time');

  const getPlayerData = () => {
    switch (activeTab) {
      case 'achievements':
        return { players: playersAchievementsData, suffix: 'достижений' };
      case 'blocks':
        return { players: playersBlocksData, suffix: 'блоков' };
      default:
        return { players: playersTimeData, suffix: 'часов' };
    }
  };

  const { players, suffix } = getPlayerData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Icon name="Pickaxe" size={48} className="text-primary animate-pixel-float" />
            <h1 className="text-6xl font-black text-primary minecraft-shadow uppercase tracking-wider">
              MINEHAD
            </h1>
            <Icon name="Sword" size={48} className="text-primary animate-pixel-float" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="text-xl text-foreground/90 font-semibold">Легендарные игроки сервера</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-2 gap-2 bg-card minecraft-shadow">
            <TabsTrigger
              value="time"
              className="text-lg font-bold py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground minecraft-shadow transition-all"
            >
              <Icon name="Clock" size={20} className="mr-2" />
              Время в игре
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="text-lg font-bold py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground minecraft-shadow transition-all"
            >
              <Icon name="Star" size={20} className="mr-2" />
              Достижения
            </TabsTrigger>
            <TabsTrigger
              value="blocks"
              className="text-lg font-bold py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground minecraft-shadow transition-all"
            >
              <Icon name="Box" size={20} className="mr-2" />
              Добыто блоков
            </TabsTrigger>
          </TabsList>

          <TabsContent value="time" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard key={player.rank} player={player} suffix={suffix} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard key={player.rank} player={player} suffix={suffix} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blocks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard key={player.rank} player={player} suffix={suffix} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Card className="p-6 minecraft-shadow bg-card/60 backdrop-blur-sm border-4 border-primary/30">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Всего игроков</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Онлайн сейчас</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Globe" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">IP сервера</p>
                  <p className="text-xl font-bold font-mono">play.minehad.ru</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;