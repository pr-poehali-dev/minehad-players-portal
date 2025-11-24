import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PlayerStats {
  name: string;
  avatar: string;
  kills: number;
  deaths: number;
  playTime: number;
  description: string;
}

const playersData: Record<string, PlayerStats> = {
  'EnDay01': {
    name: 'EnDay01',
    avatar: '👑',
    kills: 59,
    deaths: 17,
    playTime: 23,
    description: 'Стример и блогер по серверу MINEHAD любитель строить. Игрок харош в пвп и в пве. Очень быстро реализовывает проекты.'
  },
  'Kamelia07': {
    name: 'Kamelia07',
    avatar: '🌸',
    kills: 1,
    deaths: 31,
    playTime: 9,
    description: 'Очень любит животных! Лучше всех справляется в добыче животных. Не любит пвп, старается избегать его. Самый безопасный и дружелюбный игрок на сервере.'
  },
  'kfcasdw': {
    name: 'kfcasdw',
    avatar: '🍗',
    kills: 4,
    deaths: 3,
    playTime: 6,
    description: 'Куча идей которые ему не терпится реализовать! Быстрее всех справляется с начальными ресурсами. Хорошо строит и добывает нужные ему ресурсы.'
  },
  'paata1234': {
    name: 'paata1234',
    avatar: '🔥',
    kills: 2,
    deaths: 11,
    playTime: 3,
    description: 'Идей у него много но нет возможности их реализовать. Хорошо добывает ресурсы, но часто ленится.'
  },
  'BleW': {
    name: 'BleW',
    avatar: '💙',
    kills: 18,
    deaths: 7,
    playTime: 10,
    description: 'Игрок который пытается захватить весь сервер. Идей полно и потихоньку они реализовываются. Пытается убивать игроков, но чаще всего умирает он. Любитель тролить и издеваться над игроками. Построил 40 дверей в которых игрок запутывается и не замечает снизу блока который отсутствует и проваливаются в его трапку. Первый получил булаву на сервере.'
  }
};

interface Player {
  rank: number;
  name: string;
  value: number;
  avatar: string;
}

const playersTimeData: Player[] = [
  { rank: 1, name: 'EnDay01', value: 23, avatar: '👑' },
  { rank: 2, name: 'BleW', value: 10, avatar: '💙' },
  { rank: 3, name: 'Kamelia07', value: 9, avatar: '🌸' },
  { rank: 4, name: 'kfcasdw', value: 6, avatar: '🍗' },
  { rank: 5, name: 'paata1234', value: 3, avatar: '🔥' },
];

const playersKillsData: Player[] = [
  { rank: 1, name: 'EnDay01', value: 59, avatar: '👑' },
  { rank: 2, name: 'BleW', value: 18, avatar: '💙' },
  { rank: 3, name: 'kfcasdw', value: 4, avatar: '🍗' },
  { rank: 4, name: 'paata1234', value: 2, avatar: '🔥' },
  { rank: 5, name: 'Kamelia07', value: 1, avatar: '🌸' },
];

const playersDeathsData: Player[] = [
  { rank: 1, name: 'Kamelia07', value: 31, avatar: '🌸' },
  { rank: 2, name: 'EnDay01', value: 17, avatar: '👑' },
  { rank: 3, name: 'paata1234', value: 11, avatar: '🔥' },
  { rank: 4, name: 'BleW', value: 7, avatar: '💙' },
  { rank: 5, name: 'kfcasdw', value: 3, avatar: '🍗' },
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

const PlayerCard = ({ player, suffix, onClick }: { player: Player; suffix: string; onClick: () => void }) => (
  <Card
    onClick={onClick}
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
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const getPlayerData = () => {
    switch (activeTab) {
      case 'kills':
        return { players: playersKillsData, suffix: 'убийств' };
      case 'deaths':
        return { players: playersDeathsData, suffix: 'смертей' };
      default:
        return { players: playersTimeData, suffix: 'часов' };
    }
  };

  const { players, suffix } = getPlayerData();
  const playerStats = selectedPlayer ? playersData[selectedPlayer] : null;

  const getKDRatio = (stats: PlayerStats) => {
    if (stats.deaths === 0) return stats.kills.toFixed(2);
    return (stats.kills / stats.deaths).toFixed(2);
  };

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
              value="kills"
              className="text-lg font-bold py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground minecraft-shadow transition-all"
            >
              <Icon name="Sword" size={20} className="mr-2" />
              Убийства
            </TabsTrigger>
            <TabsTrigger
              value="deaths"
              className="text-lg font-bold py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground minecraft-shadow transition-all"
            >
              <Icon name="Skull" size={20} className="mr-2" />
              Смерти
            </TabsTrigger>
          </TabsList>

          <TabsContent value="time" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard 
                  key={player.rank} 
                  player={player} 
                  suffix={suffix}
                  onClick={() => setSelectedPlayer(player.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kills" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard 
                  key={player.rank} 
                  player={player} 
                  suffix={suffix}
                  onClick={() => setSelectedPlayer(player.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deaths" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {players.map((player) => (
                <PlayerCard 
                  key={player.rank} 
                  player={player} 
                  suffix={suffix}
                  onClick={() => setSelectedPlayer(player.name)}
                />
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
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Zap" size={24} className="text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Онлайн сейчас</p>
                  <p className="text-2xl font-bold">3</p>
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

      <Dialog open={!!selectedPlayer} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="minecraft-shadow border-4 border-primary max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-3xl">
              <span className="text-5xl">{playerStats?.avatar}</span>
              <span className="text-primary">{playerStats?.name}</span>
            </DialogTitle>
          </DialogHeader>
          
          {playerStats && (
            <div className="space-y-6">
              <div className="p-4 bg-secondary/30 border-2 border-border">
                <p className="text-foreground/90 leading-relaxed">{playerStats.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Sword" size={20} className="text-destructive" />
                    <span className="text-sm text-muted-foreground font-semibold">Убийства</span>
                  </div>
                  <p className="text-3xl font-bold text-destructive">{playerStats.kills}</p>
                </Card>

                <Card className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Skull" size={20} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-semibold">Смерти</span>
                  </div>
                  <p className="text-3xl font-bold">{playerStats.deaths}</p>
                </Card>

                <Card className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground font-semibold">Время игры</span>
                  </div>
                  <p className="text-3xl font-bold text-primary">{playerStats.playTime}ч</p>
                </Card>

                <Card className="p-4 border-2 border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Target" size={20} className="text-gold" />
                    <span className="text-sm text-muted-foreground font-semibold">K/D Ratio</span>
                  </div>
                  <p className="text-3xl font-bold text-gold">{getKDRatio(playerStats)}</p>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
