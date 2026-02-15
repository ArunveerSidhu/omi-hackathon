import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View, Text } from "react-native";

const HomeScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);



  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Integrate with omi recording API
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Send transcribed data to backend
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView className="bg-slate-950 flex-1">
      <View className="flex-1 justify-center items-center px-6">
        {/* App Title */}
        <Text className="text-white text-3xl font-bold mb-2">
          Omi Recorder
        </Text>
        <Text className="text-slate-400 text-base mb-12">
          Voice to text transcription
        </Text>

        {/* Recording Status Indicator */}
        <View className="mb-8 items-center">
          {isRecording ? (
            <View className="items-center">
              <View className="bg-red-500 w-4 h-4 rounded-full mb-3 animate-pulse" />
              <Text className="text-red-500 text-lg font-semibold">
                Recording...
              </Text>
              <Text className="text-white text-4xl font-mono mt-4">
                {formatTime(elapsedTime)}
              </Text>
            </View>
          ) : (
            <View className="items-center">
              <View className="bg-slate-700 w-4 h-4 rounded-full mb-3" />
              <Text className="text-slate-400 text-lg">Ready to Record</Text>
            </View>
          )}
        </View>

        {/* Recording Controls */}
        <View className="w-full mt-12">
          {!isRecording ? (
            <TouchableOpacity
              onPress={handleStartRecording}
              className="bg-purple-600 rounded-2xl py-5 px-8 shadow-2xl shadow-purple-600/50 active:bg-purple-700"
            >
              <Text className="text-white text-center text-xl font-bold">
                Start Recording
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStopRecording}
              className="bg-slate-800 border-2 border-red-500 rounded-2xl py-5 px-8 active:bg-slate-700"
            >
              <Text className="text-red-500 text-center text-xl font-bold">
                Stop Recording
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info Text */}
        <View className="mt-16 items-center">
          <Text className="text-slate-500 text-sm text-center px-8">
            {isRecording
              ? "Tap stop when you're done speaking"
              : "Tap the button above to start recording your voice"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
