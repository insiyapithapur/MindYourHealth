import { Text, View } from "components/Themed";
import { Image } from "expo-image";

import React from "react";
import { z, ZodType } from "zod";

const HeaderTypes: ZodType<{ image: string }> = z.object({
  image: z.string(),
});

type HeaderProps = z.infer<typeof HeaderTypes>;

const Header: React.FC<HeaderProps> = ({ image }) => {
  // Your component logic here

  return (
    <View>
      {/* <Image
        source={require("../../assets/images/AppLogo.png")}
        style={{ width: 64, height: 64 }}
        onError={(error) => console.log("error", error)}
      /> */}
    </View>
  );
};

export default Header;
