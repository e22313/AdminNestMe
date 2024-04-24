import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Border, FontSize, Padding } from "../GlobalStyles";

const AdminDashboard = () => {
  return (
    <View style={styles.adminDashboard}>
      <Text style={styles.hiAdministrator}>Hi Administrator</Text>
      <View style={[styles.walk, styles.topShadowBox]}>
        <Text style={[styles.newPosts, styles.textTypo]}>NEW POSTS</Text>
        <Text style={[styles.text, styles.textTypo]}>3500</Text>
        <Image
          style={[styles.postsIcon4, styles.postsIconLayout]}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
        <Image
          style={styles.intersectIcon}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
      </View>
      <View style={styles.water}>
        <View style={[styles.postsIcon41, styles.postsIconLayout]} />
        <Image
          style={styles.userIcon}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
        <View style={styles.graph}>
          <View style={[styles.leftSideYAxis, styles.sideFlexBox]}>
            <View style={styles.yAxisItems}>
              <View style={[styles.axisitem, styles.axisitemFlexBox]}>
                <Text style={styles.janTypo}>5000</Text>
                <Image
                  style={styles.axisitemChild}
                  contentFit="cover"
                  source={require("../assets/icon.png")}
                />
              </View>
              <View style={[styles.axisitem, styles.axisitemFlexBox]}>
                <Text style={styles.janTypo}>4000</Text>
                <Image
                  style={styles.axisitemChild}
                  contentFit="cover"
                  source={require("../assets/icon.png")}
                />
              </View>
              <View style={[styles.axisitem, styles.axisitemFlexBox]}>
                <Text style={styles.janTypo}>3000</Text>
                <Image
                  style={styles.axisitemChild}
                  contentFit="cover"
                  source={require("../assets/icon.png")}
                />
              </View>
              <View style={[styles.axisitem, styles.axisitemFlexBox]}>
                <Text style={styles.janTypo}>2000</Text>
                <Image
                  style={styles.axisitemChild}
                  contentFit="cover"
                  source={require("../assets/icon.png")}
                />
              </View>
              <View style={[styles.axisitem, styles.axisitemFlexBox]}>
                <Text style={styles.janTypo}>1000</Text>
                <Image
                  style={styles.axisitemChild}
                  contentFit="cover"
                  source={require("../assets/icon.png")}
                />
              </View>
            </View>
            <Image
              style={[styles.yAxisLine, styles.lineChildLayout]}
              contentFit="cover"
              source={require("../assets/icon.png")}
            />
          </View>
          <View style={[styles.rightSideGraphAndXAxis, styles.sideFlexBox]}>
            <View style={[styles.lineGraph, styles.axisitemFlexBox]}>
              <Image
                style={[styles.lineGraphChild, styles.lineChildLayout]}
                contentFit="cover"
                source={require("../assets/icon.png")}
              />
            </View>
            <View style={styles.xAxis}>
              <Image
                style={[styles.yAxisLine, styles.lineChildLayout]}
                contentFit="cover"
                source={require("../assets/icon.png")}
              />
              <View style={styles.xAxisItems}>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Mon</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Tue</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Wed</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Thu</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Fri</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Sat</Text>
                </View>
                <View style={styles.axisitemFlexBox}>
                  <Image
                    style={[styles.axisitemChild2, styles.lineChildLayout]}
                    contentFit="cover"
                    source={require("../assets/icon.png")}
                  />
                  <Text style={[styles.jan, styles.janTypo]}>Sun</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.navbar, styles.navbarLayout1]}>
        <View style={[styles.navbar1, styles.navbarLayout]}>
          <Image
            style={[styles.navbarChild, styles.navbarLayout]}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
          <View style={[styles.home, styles.navbarLayout]}>
            <Image
              style={[styles.apps1Icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/icon.png")}
            />
          </View>
          <Image
            style={[styles.rectangle7Stroke, styles.userIcon1Position]}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
          <Image
            style={styles.intersectIcon1}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
          <Image
            style={[styles.userIcon1, styles.userIcon1Position]}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
          <Image
            style={styles.login1Icon}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
        </View>
      </View>
      <View style={[styles.top, styles.topPosition]}>
        <Image
          style={[styles.menuBarIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
        <Text style={[styles.dashboard, styles.textTypo]}>Dashboard</Text>
        <View style={[styles.avatar, styles.avatarLayout]}>
          <View style={[styles.image1, styles.avatarLayout]} />
        </View>
      </View>
      <View style={[styles.statusBar, styles.topPosition]}>
        <View style={styles.icons}>
          <View style={styles.top1}>
            <Image
              style={[styles.signalIcon, styles.lineChildLayout]}
              contentFit="cover"
              source={require("../assets/icon.png")}
            />
            <Text style={[styles.text6, styles.text6Typo]}>9:30</Text>
          </View>
        </View>
      </View>
      <Text style={styles.quickOverview}>Quick Overview</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  textTypo: {
    color: Color.colorGray_200,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
  },
  postsIconLayout: {
    height: 28,
    width: 34,
    borderRadius: Border.br_26xl,
    position: "absolute",
    overflow: "hidden",
  },
  sideFlexBox: {
    justifyContent: "flex-end",
    alignSelf: "stretch",
  },
  axisitemFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  lineChildLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  janTypo: {
    textAlign: "center",
    color: Color.colorGray_100,
    letterSpacing: 1,
    fontSize: FontSize.chartText_size,
    fontFamily: FontFamily.chartText,
    fontWeight: "500",
  },
  navbarLayout1: {
    width: 390,
    left: 0,
  },
  navbarLayout: {
    height: 72,
    position: "absolute",
  },
  iconLayout: {
    height: 24,
    overflow: "hidden",
  },
  userIcon1Position: {
    top: 23,
    position: "absolute",
  },
  topPosition: {
    marginLeft: -195,
    width: 390,
    left: "50%",
    position: "absolute",
  },
  avatarLayout: {
    height: 40,
    width: 40,
  },
  text6Typo: {
    fontSize: FontSize.size_smi,
    position: "absolute",
  },
  hiAdministrator: {
    top: 131,
    color: "#2b2929",
    textAlign: "left",
    fontFamily: FontFamily.chartText,
    fontWeight: "500",
    fontSize: FontSize.size_xl,
    left: 16,
    position: "absolute",
  },
  newPosts: {
    marginLeft: -36,
    top: 17,
    fontSize: FontSize.size_smi,
    position: "absolute",
    left: "50%",
    fontFamily: FontFamily.robotoRegular,
  },
  text: {
    marginLeft: -22,
    top: 32,
    left: "50%",
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  postsIcon4: {
    left: 11,
    top: 10,
  },
  intersectIcon: {
    top: 27,
    left: 27,
    width: 8,
    height: 5,
    position: "absolute",
  },
  walk: {
    top: 221,
    width: 358,
    height: 278,
    elevation: 6,
    shadowRadius: 6,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    borderRadius: Border.br_8xs,
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: Color.colorWhite,
    left: 16,
    position: "absolute",
    overflow: "hidden",
  },
  postsIcon41: {
    top: 6,
    left: 7,
    backgroundColor: "#aaa",
  },
  userIcon: {
    left: 15,
    width: 18,
    height: 20,
    top: 10,
    position: "absolute",
    overflow: "hidden",
  },
  axisitemChild: {
    width: 12,
    marginLeft: 5,
    maxHeight: "100%",
  },
  axisitem: {
    flexDirection: "row",
  },
  yAxisItems: {
    paddingBottom: Padding.p_3xs,
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "flex-end",
  },
  yAxisLine: {
    maxHeight: "100%",
    alignSelf: "stretch",
    width: "100%",
  },
  leftSideYAxis: {
    paddingBottom: Padding.p_9xl,
    alignItems: "center",
    flexDirection: "row",
  },
  lineGraphChild: {
    maxHeight: "100%",
    alignSelf: "stretch",
    width: "100%",
    flex: 1,
  },
  lineGraph: {
    paddingHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_xl,
    alignSelf: "stretch",
    flex: 1,
  },
  axisitemChild2: {
    height: 10,
  },
  jan: {
    marginTop: 5,
  },
  xAxisItems: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  xAxis: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  rightSideGraphAndXAxis: {
    flex: 1,
  },
  graph: {
    top: 68,
    height: 190,
    alignItems: "flex-end",
    flexDirection: "row",
    left: 0,
    width: 364,
    position: "absolute",
  },
  water: {
    top: 511,
    height: 287,
    width: 364,
    shadowOpacity: 1,
    elevation: 6,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "rgba(0, 0, 0, 0.09)",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_8xs,
    left: 16,
    position: "absolute",
    overflow: "hidden",
  },
  navbarChild: {
    top: 0,
    width: 390,
    left: 0,
  },
  apps1Icon: {
    marginTop: -12,
    marginLeft: -12,
    width: 24,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  home: {
    width: 78,
    top: 0,
    left: 16,
    height: 72,
    overflow: "hidden",
  },
  rectangle7Stroke: {
    left: 140,
    height: 25,
    width: 24,
  },
  intersectIcon1: {
    top: 40,
    left: 151,
    width: 10,
    height: 8,
    position: "absolute",
  },
  userIcon1: {
    left: 236,
    width: 21,
    height: 24,
    overflow: "hidden",
  },
  login1Icon: {
    top: 22,
    left: 314,
    width: 38,
    height: 30,
    position: "absolute",
    overflow: "hidden",
  },
  navbar1: {
    top: 34,
    width: 390,
    left: 0,
  },
  navbar: {
    top: 740,
    height: 104,
    position: "absolute",
  },
  menuBarIcon: {
    width: 24,
  },
  dashboard: {
    fontSize: FontSize.size_xl,
  },
  image1: {
    marginTop: -20,
    marginLeft: -20,
    borderRadius: 20,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  avatar: {
    borderRadius: 25,
    shadowColor: "rgba(0, 0, 0, 0.24)",
    shadowRadius: 3,
    elevation: 3,
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    overflow: "hidden",
  },
  top: {
    top: 37,
    shadowColor: "rgba(0, 0, 0, 0.07)",
    shadowRadius: 9,
    elevation: 9,
    paddingHorizontal: 16,
    paddingVertical: Padding.p_xs,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    shadowOpacity: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: Color.colorWhite,
    marginLeft: -195,
  },
  signalIcon: {
    height: "82.94%",
    width: "16.72%",
    top: "0%",
    right: "0%",
    bottom: "17.06%",
    left: "83.28%",
    maxHeight: "100%",
    position: "absolute",
  },
  text6: {
    top: "5.88%",
    left: "0%",
    fontFamily: FontFamily.interRegular,
    color: "#f7f7f7",
    textAlign: "left",
  },
  top1: {
    width: 340,
    height: 17,
  },
  icons: {
    paddingHorizontal: 33,
    paddingVertical: Padding.p_3xs,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  statusBar: {
    backgroundColor: "#5546af",
    paddingHorizontal: Padding.p_smi,
    paddingVertical: 0,
    top: 0,
    overflow: "hidden",
  },
  quickOverview: {
    top: 175,
    left: 18,
    fontFamily: FontFamily.ribeyeRegular,
    color: "#257f85",
    textAlign: "left",
    fontSize: FontSize.size_xl,
    position: "absolute",
  },
  adminDashboard: {
    backgroundColor: "#faf9ff",
    height: 844,
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default AdminDashboard;
