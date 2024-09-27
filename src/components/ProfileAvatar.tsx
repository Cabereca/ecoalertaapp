import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";

const ProfileAvatar = (): React.JSX.Element => {
  const [avatar, setAvatar] = useState<string>(
    "https://static.vecteezy.com/ti/vetor-gratis/p1/7319933-black-avatar-person-icons-user-profile-icon-vetor.jpg"
  );

  return (
    <View style={styles.ProfileAvatar}>
      <Image src={avatar} style={styles.Avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  ProfileAvatar: {
    flexGrow: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  Avatar: {
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  IconEdit: {
    position: "relative",
    bottom: 35,
    left: 40,
    borderRadius: 100,
    padding: 5,
    backgroundColor: "#00B603",
  },
});

export default ProfileAvatar;
