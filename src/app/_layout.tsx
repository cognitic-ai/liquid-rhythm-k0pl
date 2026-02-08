import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <TabsLayout />
      </AudioProvider>
    </ThemeProvider>
  );
}

function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: (props) => <MaterialIcons {...props} name="home" />,
        }}
      />
      <WebTabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: (props) => <MaterialIcons {...props} name="search" />,
        }}
      />
      <WebTabs.Screen
        name="library"
        options={{
          title: "Your Library",
          tabBarIcon: (props) => <MaterialIcons {...props} name="library-music" />,
        }}
      />
      <WebTabs.Screen
        name="player"
        options={{
          title: "Player",
          tabBarIcon: (props) => <MaterialIcons {...props} name="play-circle-filled" />,
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "house", selected: "house.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="home" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "magnifyingglass", selected: "magnifyingglass" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="search" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="library">
        <NativeTabs.Trigger.Label>Your Library</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "books.vertical", selected: "books.vertical.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="library-music" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="player">
        <NativeTabs.Trigger.Label>Player</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "play.circle", selected: "play.circle.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="play-circle-filled" />,
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
