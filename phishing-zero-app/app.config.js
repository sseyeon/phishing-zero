import 'dotenv/config';

export default {
    expo: {
        name: "phishing-zero-app",
        slug: "phishing-zero-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: "phishingzero",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/images/icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.sseyeon.phishing-zero-app"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/images/icon.png",
                backgroundColor: "#ffffff"
            },
            package: "com.sseyeon.phishingzeroapp"
        },
        web: {
            favicon: "./assets/images/icon.png"
        },
        extra: {
            kakaoJsKey: process.env.KAKAO_JS_KEY
        }
    }
};
