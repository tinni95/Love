import { Dimensions } from "react-native";

export const DeviceWidth = Dimensions.get("window").width;
export const DeviceHeight = Dimensions.get("window").height;

export const isSmallDevice = DeviceWidth < 412;
export const isMediumDevice = DeviceWidth > 412 && DeviceWidth < 768;
export const isLargeDevice = DeviceWidth > 768;
