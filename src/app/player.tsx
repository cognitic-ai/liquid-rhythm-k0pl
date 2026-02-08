import { ScrollView, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { GlassView } from "expo-glass-effect";
import * as AC from "@bacons/apple-colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAudio } from "@/components/audio-context";
import Slider from "@react-native-community/slider";

export default function PlayerRoute() {
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const navigation = useNavigation();

  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    queue,
    currentIndex,
    playTrack,
    pause,
    resume,
    seekTo,
    skipNext,
    skipPrevious,
    setRepeat,
    setShuffle
  } = useAudio();

  if (!currentTrack) {
    return (
      <LinearGradient
        colors={[AC.systemBackground as string, AC.secondarySystemBackground as string]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{ color: AC.label as string, fontSize: 18 }}>No track selected</Text>
      </LinearGradient>
    );
  }

  // Generate colors based on track
  const colors = [`#${currentTrack.id}6b6b`, `#${currentTrack.id}cdc4`, `#${currentTrack.id}b7d1`];

  // Format time in MM:SS format
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await resume();
    }
  };

  const toggleShuffle = () => {
    const newShuffleState = !isShuffled;
    setIsShuffled(newShuffleState);
    setShuffle(newShuffleState);
  };

  const toggleRepeat = () => {
    const newRepeatMode = (repeatMode + 1) % 3;
    setRepeatMode(newRepeatMode);

    const modes: Array<'off' | 'all' | 'one'> = ['off', 'all', 'one'];
    setRepeat(modes[newRepeatMode]);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 1: return "sf:repeat";
      case 2: return "sf:repeat.1";
      default: return "sf:repeat";
    }
  };

  // Get queue items after current track
  const upcomingTracks = queue.slice(currentIndex + 1, currentIndex + 4);

  return (
    <LinearGradient
      colors={colors}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingTop: 60
        }}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "rgba(255,255,255,0.2)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source="sf:chevron.down"
              style={{
                fontSize: 18,
                color: "white"
              }}
            />
          </Pressable>

          <View style={{ alignItems: "center" }}>
            <Text style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.8)",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: 1,
              selectable: true
            }}>
              Playing from Library
            </Text>
            <Text style={{
              fontSize: 14,
              color: "white",
              fontWeight: "600",
              marginTop: 2,
              selectable: true
            }}>
              Liked Songs
            </Text>
          </View>

          <Pressable style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "rgba(255,255,255,0.2)",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Image
              source="sf:ellipsis"
              style={{
                fontSize: 18,
                color: "white"
              }}
            />
          </Pressable>
        </View>

        {/* Album Art */}
        <View style={{
          paddingHorizontal: 40,
          marginVertical: 40,
          alignItems: "center"
        }}>
          <GlassView
            style={{
              borderRadius: 20,
              borderCurve: "continuous",
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.3,
              shadowRadius: 30
            }}
            intensity={10}
            tint="light"
          >
            <Image
              source={{ uri: currentTrack.image }}
              style={{
                width: 320,
                height: 320
              }}
              transition={{ effect: "crossDissolve" }}
            />
          </GlassView>
        </View>

        {/* Track Info */}
        <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                marginBottom: 4,
                selectable: true
              }}>
                {currentTrack.title}
              </Text>
              <Text style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.8)",
                selectable: true
              }}>
                {currentTrack.artist}
              </Text>
            </View>

            <Pressable
              onPress={() => setIsLiked(!isLiked)}
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={isLiked ? "sf:heart.fill" : "sf:heart"}
                style={{
                  fontSize: 24,
                  color: isLiked ? "#ff6b6b" : "rgba(255,255,255,0.8)"
                }}
              />
            </Pressable>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
          <GlassView
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous"
            }}
            intensity={20}
            tint="light"
          >
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={duration}
              value={position}
              onValueChange={seekTo}
              minimumTrackTintColor="white"
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbStyle={{
                backgroundColor: "white",
                width: 16,
                height: 16
              }}
            />

            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8
            }}>
              <Text style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                selectable: true
              }}>
                {formatTime(position)}
              </Text>
              <Text style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                selectable: true
              }}>
                {formatTime(duration)}
              </Text>
            </View>
          </GlassView>
        </View>

        {/* Controls */}
        <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
          <GlassView
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous"
            }}
            intensity={20}
            tint="light"
          >
            {/* Top Row Controls */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20
            }}>
              <Pressable onPress={toggleShuffle}>
                <Image
                  source="sf:shuffle"
                  style={{
                    fontSize: 20,
                    color: isShuffled ? "#1DB954" : "rgba(255,255,255,0.8)"
                  }}
                />
              </Pressable>

              <Pressable onPress={toggleRepeat}>
                <Image
                  source={getRepeatIcon()}
                  style={{
                    fontSize: 20,
                    color: repeatMode > 0 ? "#1DB954" : "rgba(255,255,255,0.8)"
                  }}
                />
              </Pressable>
            </View>

            {/* Main Controls */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Pressable onPress={skipPrevious}>
                <Image
                  source="sf:backward.fill"
                  style={{
                    fontSize: 32,
                    color: "white"
                  }}
                />
              </Pressable>

              <Pressable
                onPress={togglePlayPause}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8
                }}
              >
                <Image
                  source={isPlaying ? "sf:pause.fill" : "sf:play.fill"}
                  style={{
                    fontSize: 36,
                    color: "#000",
                    marginLeft: isPlaying ? 0 : 3
                  }}
                />
              </Pressable>

              <Pressable onPress={skipNext}>
                <Image
                  source="sf:forward.fill"
                  style={{
                    fontSize: 32,
                    color: "white"
                  }}
                />
              </Pressable>
            </View>
          </GlassView>
        </View>

        {/* Queue Section */}
        <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
          <GlassView
            style={{
              padding: 20,
              borderRadius: 16,
              borderCurve: "continuous"
            }}
            intensity={20}
            tint="light"
          >
            <Text style={{
              fontSize: 18,
              fontWeight: "600",
              color: "white",
              marginBottom: 16,
              selectable: true
            }}>
              Next in queue
            </Text>

            {upcomingTracks.map((track, index) => (
              <Pressable
                key={track.id}
                onPress={() => playTrack(track)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < upcomingTracks.length - 1 ? 1 : 0,
                  borderBottomColor: "rgba(255,255,255,0.2)"
                }}
              >
                <Image
                  source={{ uri: track.image }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    borderCurve: "continuous"
                  }}
                  transition={{ effect: "crossDissolve" }}
                />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                    marginBottom: 2,
                    selectable: true
                  }}>
                    {track.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    selectable: true
                  }}>
                    {track.artist}
                  </Text>
                </View>

                <Pressable>
                  <Image
                    source="sf:ellipsis"
                    style={{
                      fontSize: 16,
                      color: "rgba(255,255,255,0.7)"
                    }}
                  />
                </Pressable>
              </Pressable>
            ))}
          </GlassView>
        </View>

        {/* Bottom padding for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}