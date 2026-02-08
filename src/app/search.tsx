import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";
import { useState } from "react";

// Mock data for search categories
const browseCategories = [
  { id: "1", title: "Pop", color: "#ff6b6b", image: "https://picsum.photos/200/200?random=10" },
  { id: "2", title: "Hip-Hop", color: "#4ecdc4", image: "https://picsum.photos/200/200?random=11" },
  { id: "3", title: "Rock", color: "#45b7d1", image: "https://picsum.photos/200/200?random=12" },
  { id: "4", title: "Jazz", color: "#f39c12", image: "https://picsum.photos/200/200?random=13" },
  { id: "5", title: "Electronic", color: "#9b59b6", image: "https://picsum.photos/200/200?random=14" },
  { id: "6", title: "Classical", color: "#e74c3c", image: "https://picsum.photos/200/200?random=15" }
];

// Mock search results
const searchResults = [
  {
    id: "1",
    type: "track",
    title: "As It Was",
    artist: "Harry Styles",
    image: "https://picsum.photos/150/150?random=20"
  },
  {
    id: "2",
    type: "artist",
    title: "Taylor Swift",
    subtitle: "Artist • 80M monthly listeners",
    image: "https://picsum.photos/150/150?random=21"
  },
  {
    id: "3",
    type: "album",
    title: "Midnights",
    artist: "Taylor Swift",
    image: "https://picsum.photos/150/150?random=22"
  }
];

export default function SearchRoute() {
  const [searchText, setSearchText] = useState("");

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
        {/* Header with Search */}
        <View style={{ padding: 20, paddingTop: 60 }}>
          <Text style={{
            fontSize: 32,
            fontWeight: "bold",
            color: AC.label as string,
            marginBottom: 20
          }}>
            Search
          </Text>

          {/* Search Input */}
          <GlassView
            style={{
              padding: 16,
              borderRadius: 12,
              borderCurve: "continuous",
              marginBottom: 30
            }}
            intensity={10}
            tint={process.env.EXPO_OS === "web" ? "light" : "systemMaterial"}
          >
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12
            }}>
              <Image
                source="sf:magnifyingglass"
                style={{
                  fontSize: 18,
                  color: AC.secondaryLabel as string
                }}
              />
              <TextInput
                placeholder="What do you want to listen to?"
                placeholderTextColor={AC.placeholderText as string}
                value={searchText}
                onChangeText={setSearchText}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: AC.label as string,
                  fontWeight: "500"
                }}
              />
            </View>
          </GlassView>

          {/* Search Results or Browse Categories */}
          {searchText.length > 0 ? (
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: "600",
                color: AC.label as string,
                marginBottom: 16
              }}>
                Search results
              </Text>

              {searchResults.map((result) => (
                <Link key={result.id} href="/player" asChild>
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
                      <Image
                        source={{ uri: result.image }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: result.type === "artist" ? 30 : 8,
                          borderCurve: "continuous"
                        }}
                        transition={{ effect: "crossDissolve" }}
                      />
                      <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: AC.label as string,
                          marginBottom: 2,
                          selectable: true
                        }}>
                          {result.title}
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          color: AC.secondaryLabel as string,
                          selectable: true
                        }}>
                          {result.type === "track" ? `Song • ${result.artist}` :
                           result.type === "album" ? `Album • ${result.artist}` :
                           result.subtitle}
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
          ) : (
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: "600",
                color: AC.label as string,
                marginBottom: 16
              }}>
                Browse all
              </Text>

              <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 16
              }}>
                {browseCategories.map((category) => (
                  <Link key={category.id} href="/player" asChild>
                    <Link.Trigger withAppleZoom>
                      <Pressable style={{
                        width: "48%",
                        aspectRatio: 1,
                        borderRadius: 16,
                        borderCurve: "continuous",
                        overflow: "hidden",
                        position: "relative"
                      }}>
                        <LinearGradient
                          colors={[category.color, `${category.color}CC`]}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                          }}
                        />

                        <Image
                          source={{ uri: category.image }}
                          style={{
                            position: "absolute",
                            top: -20,
                            right: -20,
                            width: 80,
                            height: 80,
                            opacity: 0.8,
                            transform: [{ rotate: "25deg" }]
                          }}
                          transition={{ effect: "crossDissolve" }}
                        />

                        <View style={{
                          padding: 16,
                          justifyContent: "flex-end",
                          height: "100%"
                        }}>
                          <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "white",
                            selectable: true
                          }}>
                            {category.title}
                          </Text>
                        </View>
                      </Pressable>
                    </Link.Trigger>
                    <Link.Preview />
                  </Link>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}