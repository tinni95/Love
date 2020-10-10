import React, { useState } from "react";
import { StyleSheet, View, Keyboard, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Bold } from "../components/StyledText/StyledText.components";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import LoveTextInput from "../components/LoveTextInput/LoveTextInput.component";
import LoveButton from "../components/LoveButton/LoveButton.component";
import Colors from "../constants/Colors";
import PlayContext from "../play.context";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import admob from "../constants/Admob.json";

function Home({ navigation, play }) {
  const [name, setName] = useState(null);
  const [partner, setPartner] = useState(null);
  const [KeyboardShown, setKeyboardShown] = useState(false);

  React.useEffect(() => {
    const playAd = async () => {
      await AdMobInterstitial.setAdUnitID(admob.intersitial);
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    };
    if (play.play >= 3) {
      playAd();
      play.reset();
    }
  }, [play.play]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Bold style={{ fontSize: 70, color: Colors.MEDIUM_PINK }}>
          Love Index
        </Bold>
      </View>
      <View style={styles.inputs}>
        <LoveTextInput
          placeholder={"your name"}
          onFocus={() => setName("")}
          value={name}
          onChangeText={(val) => setName(val)}
        />
        <FontAwesome5 name="plus" size={24} color={Colors.DARK_PINK} />
        <LoveTextInput
          placeholder={"partner"}
          onFocus={() => setPartner("")}
          value={partner}
          onChangeText={(val) => setPartner(val)}
        />
      </View>

      <View style={styles.footer}>
        {!KeyboardShown && (
          <View style={{ alignItems: "center" }}>
            <LoveButton
              onPress={() => {
                play.increment();
                name?.length &&
                  partner?.length &&
                  navigation.navigate("Results", { name, partner });
              }}
              text={"index"}
            />
            <TouchableOpacity onPress={() => play.toggleSound()}>
              {play.sound ? (
                <Octicons
                  name="unmute"
                  style={{ marginTop: 30 }}
                  size={20}
                  color={Colors.BLACK}
                />
              ) : (
                <Octicons
                  name="mute"
                  style={{ marginTop: 30 }}
                  size={20}
                  color={Colors.BLACK}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={admob.bannerId}
        servePersonalizedAds // true or false
        onDidFailToReceiveAdWithError={(e) => console.log(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
  },
  inputs: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
});

const HomeWithContext = (props) => (
  <PlayContext.Consumer>
    {(play) => <Home {...props} play={play} />}
  </PlayContext.Consumer>
);

export default HomeWithContext;
