import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label={"Email"}
            placeholder={"Enter your email address"}
            icon={icons.email}
            value={form.email}
            onChangeText={(value) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />
          <InputField
            label={"Password"}
            placeholder={"Enter your password"}
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) =>
              setForm({
                ...form,
                password: value,
              })
            }
            secureTextEntry={true}
          />

          <CustomButton
            title={"Sign In"}
            onPress={onSignInPress}
            className="mt-6"
            loading={loading}
          />

          {/* Oauth */}
          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Don't have an account? {""}</Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/* Verification */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
