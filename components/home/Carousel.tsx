import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

interface ModernCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CAROUSEL_HEIGHT = SCREEN_HEIGHT * 0.5;
const PAGE_WIDTH = SCREEN_WIDTH * 0.93;
const PAGE_HEIGHT = CAROUSEL_HEIGHT * 0.85;

const data = [
  {
    id: 1,
    title: "Beautiful Landscapes",
    description: "Explore stunning natural wonders around the world",
    image: "https://picsum.photos/1920/1080?random",
  },
  {
    id: 2,
    title: "Urban Adventures",
    description: "Discover exciting city life and architecture",
    image: "https://picsum.photos/1920/1080?random",
  },
  {
    id: 3,
    title: "Cultural Heritage",
    description: "Experience rich traditions and historical sites",
    image: "https://picsum.photos/1920/1080?random",
  },
];

const ModernCarousel: React.FC<ModernCarouselProps> = ({
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const renderItem = ({ item, animationValue }: any) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.9, 1, 0.9]
      );
      const opacity = interpolate(
        animationValue.value,
        [-1, 0, 1],
        [0.5, 1, 0.5]
      );

      return {
        transform: [{ scale: withSpring(scale) }],
        opacity: withSpring(opacity),
      };
    });

    return (
      <Animated.View style={[styles.carouselItem, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.overlay} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        autoPlay={autoPlay}
        data={data}
        scrollAnimationDuration={1000}
        autoPlayInterval={autoPlayInterval}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        style={styles.carousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  carousel: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  contentContainer: {
    padding: 20,
    height: "30%",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
});

export default ModernCarousel;
