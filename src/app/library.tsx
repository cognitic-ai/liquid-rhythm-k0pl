import { ScrollView, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";

// Mock data for user library
const libraryItems = [
  {
    id: "liked",
    title: "Liked Songs",
    subtitle: "456 songs",
    image: "sf:heart.fill",
    color: "#1DB954",
    type: "special"
  },
  {
    id: "downloaded",
    title: "Downloaded Music",
    subtitle: "23 songs",
    image: "sf:arrow.down.circle.fill",
    color: "#1ed760",
    type: "special"
  }
];

const userPlaylists = [
  {
    id: "1",
    title: "My Playlist #1",
    subtitle: "Created by you • 34 songs",
    image: "https://picsum.photos/150/150?random=30",
    type: "playlist"
  },
  {
    id: "2",
    title: "Road Trip Vibes",
    subtitle: "Created by you • 67 songs",
    image: "https://picsum.photos/150/150?random=31",
    type: "playlist"
  },
  {
    id: "3",
    title: "Workout Mix 2024",
    subtitle: "Created by you • 45 songs",
    image: "https://picsum.photos/150/150?random=32",
    type: "playlist"
  },
  {
    id: "4",
    title: "Chill Sunday",
    subtitle: "Created by you • 28 songs",
    image: "https://picsum.photos/150/150?random=33",
    type: "playlist"
  }
];

const recentlyAdded = [
  {
    id: "5",
    title: "Midnights",
    artist: "Taylor Swift",
    image: "https://picsum.photos/150/150?random=34",
    type: "album"
  },
  {
    id: "6",
    title: "Harry's House",
    artist: "Harry Styles",
    image: "https://picsum.photos/150/150?random=35",
    type: "album"
  },
  {
    id: "7",
    title: "Renaissance",
    artist: "Beyoncé",
    image: "https://picsum.photos/150/150?random=36",
    type: "album"
  }
];

export default function LibraryRoute() {
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
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30
          }}>
            <Text style={{
              fontSize: 32,
              fontWeight: "bold",
              color: AC.label as string
            }}>
              Your Library
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: AC.tertiarySystemBackground as string,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Image
                  source="sf:magnifyingglass"
                  style={{
                    fontSize: 18,
                    color: AC.label as string
                  }}
                />
              </Pressable>

              <Pressable style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: AC.tertiarySystemBackground as string,
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Image
                  source="sf:plus"
                  style={{
                    fontSize: 18,
                    color: AC.label as string
                  }}
                />
              </Pressable>
            </View>
          </View>

          {/* Quick Access */}
          <View style={{ marginBottom: 30 }}>
            {libraryItems.map((item) => (
              <Link key={item.id} href="/player" asChild>
                <Link.Trigger withAppleZoom>
                  <Pressable style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    marginBottom: 12
                  }}>
                    <LinearGradient
                      colors={[item.color, `${item.color}CC`]}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        borderCurve: "continuous",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={item.image}
                        style={{
                          fontSize: 24,
                          color: "white"
                        }}
                      />
                    </LinearGradient>

                    <View style={{ flex: 1, marginLeft: 16 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: AC.label as string,
                        marginBottom: 2,
                        selectable: true
                      }}>
                        {item.title}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: AC.secondaryLabel as string,
                        selectable: true
                      }}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </Pressable>
                </Link.Trigger>
                <Link.Preview />
              </Link>
            ))}
          </View>

          {/* Recently Added */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label as string,
              marginBottom: 16
            }}>
              Recently added
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingRight: 20 }}
            >
              {recentlyAdded.map((item) => (
                <Link key={item.id} href="/player" asChild>
                  <Link.Trigger withAppleZoom>
                    <Pressable style={{ width: 140 }}>
                      <GlassView
                        style={{
                          borderRadius: 12,
                          borderCurve: "continuous",
                          overflow: "hidden",
                          marginBottom: 12
                        }}
                        intensity={5}
                        tint={process.env.EXPO_OS === "web" ? "light" : "systemMaterial"}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: 140,
                            height: 140
                          }}
                          transition={{ effect: "crossDissolve" }}
                        />
                      </GlassView>

                      <Text style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: AC.label as string,
                        marginBottom: 2,
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
                        Album • {item.artist}
                      </Text>
                    </Pressable>
                  </Link.Trigger>
                  <Link.Preview />
                </Link>
              ))}
            </ScrollView>
          </View>

          {/* Made by You */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "600",
              color: AC.label as string,
              marginBottom: 16
            }}>
              Made by you
            </Text>

            {userPlaylists.map((playlist) => (
              <Link key={playlist.id} href="/player" asChild>
                <Link.Trigger withAppleZoom>
                  <Pressable style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    backgroundColor: AC.tertiarySystemBackground as string,
                    borderRadius: 12,
                    borderCurve: "continuous",
                    marginBottom: 12
                  }}>
                    <GlassView
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        borderCurve: "continuous",
                        overflow: "hidden"
                      }}
                      intensity={10}
                      tint={process.env.EXPO_OS === "web" ? "light" : "systemMaterial"}
                    >
                      <Image
                        source={{ uri: playlist.image }}
                        style={{
                          width: 60,
                          height: 60
                        }}
                        transition={{ effect: "crossDissolve" }}
                      />
                    </GlassView>

                    <View style={{ flex: 1, marginLeft: 16 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: AC.label as string,
                        marginBottom: 2,
                        selectable: true
                      }}>
                        {playlist.title}
                      </Text>
                      <Text style={{
                        fontSize: 14,
                        color: AC.secondaryLabel as string,
                        selectable: true
                      }}>
                        {playlist.subtitle}
                      </Text>
                    </View>

                    <Image
                      source="sf:ellipsis"
                      style={{
                        fontSize: 18,
                        color: AC.tertiaryLabel as string
                      }}
                    />
                  </Pressable>
                </Link.Trigger>
                <Link.Preview />
              </Link>
            ))}
          </View>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}