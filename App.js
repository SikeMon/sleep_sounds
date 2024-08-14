import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ImageBackground, Dimensions, AppState } from 'react-native';
import * as React from 'react';
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, AppOpenAd, AdEventType } from 'react-native-google-mobile-ads';



  const sounds = {
  sound1: require("./assets/sounds/heavy_rain_on_roof.mp3"),
  sound2: require("./assets/sounds/thunder_storm.mp3"),
  sound3: require("./assets/sounds/fire_wood_cracking.mp3"),
  sound4: require("./assets/sounds/rain_on_leaf.mp3"),
  sound5: require("./assets/sounds/beach_waves.mp3"),
  sound6: require("./assets/sounds/desert_wind.mp3"),
  sound7: require("./assets/sounds/piano.mp3"),
}


export default function App() {
  const [audio, setAudio] = React.useState(null);
  const [status, setStatus] = React.useState(true);

  const appOpenAd = AppOpenAd.createForAdRequest("ca-app-pub-1121513561066662/8972304865", {
    keywords: ['fashion', 'clothing'],
  });

  const playSound = async(url) => {
    const sound = new Audio.Sound();
    try {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      })
      await sound.loadAsync(url, {
        progressUpdateIntervalMillis: 500,
        positionMillis: 0,
        shouldPlay: true,
        rate: 1,
        shouldCorrectPitch: false,
        volume: 1.0,
        isMuted: false,
        isLooping: true,
      });
      await sound.setStatusAsync({isLooping: true});
      setAudio(sound)
      setStatus(false)
      console.log("playing audio")
      await sound.playAsync();
    } catch (error) {
      console.error('error playing sound:', error);
    }

  }
  const stopSound = async() => {
    if(!audio) {
      return console.log("no audio loaded yet!")
    }
     console.log("stop playing")
     setStatus(true);
     audio.stopAsync();
  }

  React.useEffect(() => {
    appOpenAd.load();

      // Listen to the app state changes
      const subscription = AppState.addEventListener("change", (next_app_state) => {
        console.log(next_app_state)
        if (next_app_state === "active") {
          // Show the ad when the app returns to the foreground
          if (appOpenAd.loaded) {
            appOpenAd.show();
          } else {
            // Optionally, reload the ad if it wasn't loaded
            appOpenAd.load();
          }
        }
      });

    
    return () => {
      // unload audio 
      if (audio) {
        console.log("unloading audio");
        audio.unloadAsync();
      }
      // remvoe app state event
      subscription.remove();
    }
  }, [audio]);
  

  return (
    <ImageBackground source={require("./assets/images/night_sky.png")} resizeMode='cover' style={styles.container}>
      {/* header */}
      <StatusBar style="inverted" />
      <View style={styles.header_container}>
      <View style={styles.player_container}>
        <TouchableOpacity onPress={() => stopSound()}>
          {status?
           <AntDesign name="playcircleo" size={40} color="white"/>
          :<AntDesign name="pausecircleo" size={40} color="white"/>
          }
        </TouchableOpacity>
        <Text style={{color: "white", fontWeight: "bold", fontSize: 20, fontFamily: "monospace"}}>“Have a good sleep!”</Text>
      </View>
      </View>

      {/* main */}
      <ScrollView contentContainerStyle={styles.scroll_container}>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound1)}>
          <ImageBackground source={require("./assets/images/rain-on-roof.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        {/* banner ads */}
        <BannerAd unitId={"ca-app-pub-1121513561066662/9216278642"} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound2)}>
          <ImageBackground source={require("./assets/images/thunder-storm.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound3)}>
          <ImageBackground source={require("./assets/images/fire-wood-cracking.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound4)}>
          <ImageBackground source={require("./assets/images/rain-on-leaf.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound5)}>
          <ImageBackground source={require("./assets/images/beach-waves.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound6)}>
          <ImageBackground source={require("./assets/images/desert-wind.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>

        <TouchableOpacity style={styles.scroll_child_container} onPress={() => playSound(sounds.sound7)}>
          <ImageBackground source={require("./assets/images/piano.jpg")} resizeMode="cover" style={styles.background_img} imageStyle={{borderRadius: 20}} >
          </ImageBackground >
        </TouchableOpacity>
      </ScrollView>

    </ImageBackground>
        );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header_container: {
    width: "100%",
    height: 300, 
    justifyContent: "flex-end",
    alignItems: "center",
  },
  player_container: {
    flexDirection: "row",
    width: "auto",
    height: "auto",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 250, 0.1)",
    gap: 10,
    padding: 5
  },
  scroll_container: {
    flexGrow: 1,
    width: Dimensions.get('window').width,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
    padding: 10,
  },
  scroll_child_container: {
    width: "100%",
    height: 120,
  },
  background_img: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  text: {
    fontFamily: "monospace",
    color: "white",
    fontSize: 25
  }
})


