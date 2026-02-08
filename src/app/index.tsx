import { ScrollView, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";
import { useAudio } from "@/components/audio-context";

// Mock data for featured playlists
const featuredPlaylists = [
  {
    id: "1",
    title: "Today's Top Hits",
    subtitle: "The most played songs right now",
    image: "https://picsum.photos/300/300?random=1",
    color: "#1DB954"
  },
  {
    id: "2",
    title: "Discover Weekly",
    subtitle: "Your weekly mixtape of fresh music",
    image: "https://picsum.photos/300/300?random=2",
    color: "#1ed760"
  },
  {
    id: "3",
    title: "Chill Vibes",
    subtitle: "Relax and unwind with these tracks",
    image: "https://picsum.photos/300/300?random=3",
    color: "#ff6b6b"
  },
  {
    id: "4",
    title: "Workout Mix",
    subtitle: "High energy tracks to fuel your workout",
    image: "https://picsum.photos/300/300?random=4",
    color: "#4ecdc4"
  }
];

const recentlyPlayed = [
  {
    id: "5",
    title: "Liked Songs",
    subtitle: "456 songs",
    image: "https://picsum.photos/150/150?random=5",
  },
  {
    id: "6",
    title: "My Playlist #1",
    subtitle: "23 songs",
    image: "https://picsum.photos/150/150?random=6",
  },
  {
    id: "7",
    title: "Road Trip Mix",
    subtitle: "67 songs",
    image: "https://picsum.photos/150/150?random=7",
  }
];

export default function HomeRoute() {
  const { playTrack, queue } = useAudio();
  const router = useRouter();

  const handlePlayTrack = async (trackId: string) => {
    const track = queue.find(t => t.id === trackId);
    if (track) {
      await playTrack(track);
      router.push('/player');
    }
  };

  return (
    <LinearGradient
      colors={[AC.systemBackground as string, AC.secondarySystemBackground as string]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ padding: 20, paddingTop: 60 }}>
          <Text style={{
            fontSize: 32,
            fontWeight: "bold",
            color: AC.label as string,
            marginBottom: 8
          }}>
            Good evening
          </Text>
          <Text style={{
            fontSize: 16,
            color: AC.secondaryLabel as string
          }}>
            What would you like to listen to?
          </Text>
        </View>

        {/* Recently Played */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            color: AC.label as string,
            marginBottom: 16
          }}>
            Recently played
          </Text>
          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12
          }}>
            {recentlyPlayed.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handlePlayTrack(item.id)}
                style={{
                  width: "48%",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: AC.tertiarySystemBackground as string,
                  borderRadius: 8,
                  borderCurve: "continuous",
                  overflow: "hidden"
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 60, height: 60 }}
                  transition={{ effect: "crossDissolve" }}
                />
                <View style={{ flex: 1, padding: 12 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: AC.label as string,
                    numberOfLines: 1,
                    selectable: true
                  }}>
                    {item.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: AC.secondaryLabel as string,
                    numberOfLines: 1,
                    selectable: true
                  }}>
                    {item.subtitle}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Featured Playlists */}
        <View style={{ paddingHorizontal: 20, marginBottom: 30 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "600",
            color: AC.label as string,
            marginBottom: 16
          }}>
            Made for you
          </Text>

          {featuredPlaylists.map((playlist) => (
            <Link key={playlist.id} href="/player" asChild>
              <Link.Trigger withAppleZoom>
                <Pressable style={{ marginBottom: 20 }}>
                  <View style={{
                    height: 200,
                    borderRadius: 16,
                    borderCurve: "continuous",
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <Image
                      source={{ uri: playlist.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                      }}
                      transition={{ effect: "crossDissolve" }}
                    />

                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60%"
                      }}
                    />

                    <GlassView
                      style={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        right: 16,
                        padding: 20,
                        borderRadius: 12,
                        borderCurve: "continuous"
                      }}
                      intensity={20}
                      tint="dark"
                    >
                      <Text style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                        marginBottom: 4,
                        selectable: true
                      }}>
                        {playlist.title}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: "rgba(255,255,255,0.8)",
                        selectable: true
                      }}>
                        {playlist.subtitle}
                      </Text>
                    </GlassView>
                  </View>
                </Pressable>
              </Link.Trigger>
              <Link.Preview />
            </Link>
          ))}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}
