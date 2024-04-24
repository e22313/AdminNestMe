// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { LineChart } from "react-native-gifted-charts";
// import LinearGradient from "react-native-linear-gradient";

// export default function LineChartExample() {
//   const data = [10, 15, 7, 20, 12, 5, 17];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Biểu đồ đường</Text>
//       <View style={styles.chartContainer}>
//         <LinearGradient
//           colors={["#4c669f", "#3b5998", "#192f6a"]}
//           style={styles.gradient}
//         >
//           <LineChart
//             data={data}
//             width={300}
//             height={200}
//             chartConfig={{
//               backgroundGradientFrom: "#ffffff",
//               backgroundGradientTo: "#ffffff",
//               color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//             }}
//           />
//         </LinearGradient>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   chartContainer: {
//     height: 200,
//     width: 300,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   gradient: {
//     flex: 1,
//     borderRadius: 5,
//     padding: 10,
//   },
// });
