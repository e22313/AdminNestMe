import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Image } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
  const authToken = useSelector((state) => state.auth.userData);

  const renderItemUser = ({ item }) => (
    <View style={styles.row}>
      <Image
        style={styles.profileImg}
        source={{
          uri:
            item.profile_picture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }}
      />
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>
        {moment(item.created_at).format("DD/MM/YYYY")}
      </Text>
    </View>
  );

  const renderItemPost = ({ item }) => (
    <View style={styles.row}>
      <Image
        style={styles.profileImg}
        source={{
          uri:
            item.profile_picture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        }}
      />
      <Text style={styles.cell}>{item.username}</Text>
      <Text style={styles.cell}>{item.posts_count}</Text>
      <Text style={styles.cell}>{item.latest_post.content}</Text>
    </View>
  );

  const [weekOverviewUser, setWeekOverviewUser] = useState([]);
  const [weekOverviewPost, setWeekOverviewPost] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [usersMostPost, setUsersMostPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = authToken;
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const [response0, response1, response2] = await Promise.all([
          axios.get(
            "https://nestme-server.onrender.com/api/admin/statistic",
            config
          ),
          axios.get(
            "https://nestme-server.onrender.com/api/admin/user?page=1&limit=5&search=",
            config
          ),
          axios.get(
            "https://nestme-server.onrender.com/api/admin/user/mostpost",
            config
          ),
        ]);
        setWeekOverviewUser(response0.data[0].graphCardInfo.data);
        setWeekOverviewPost(response0.data[1].graphCardInfo.data);
        setLatestUsers(response1.data.users);
        setUsersMostPost(response2.data.users);
        setLoading(false); // Đặt loading thành false khi dữ liệu đã được tải xong
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [authToken]);

  const pattern = [
    { value: 0, dataPointText: "30", label: "Mon" },
    { value: 20, dataPointText: "20", label: "Tue" },
    { value: 18, dataPointText: "18", label: "Wed" },
    { value: 40, dataPointText: "40", label: "Thu" },
    { value: 36, dataPointText: "36", label: "Fri" },
    { value: 100, dataPointText: "100", label: "Sat" },
    { value: 54, dataPointText: "54", label: "Sun" },
  ];

  const userData = pattern.map((item, index) => ({
    ...item,
    value: weekOverviewUser[index],
    dataPointText: weekOverviewUser[index],
  }));

  const postData = pattern.map((item, index) => ({
    ...item,
    value: weekOverviewPost[index],
    dataPointText: weekOverviewPost[index],
  }));

  return (
    <View>
      {/* Kiểm tra xem loading có true hay không, nếu true hiển thị văn bản "Loading...", ngược lại hiển thị dữ liệu */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={[{ key: "scrollable" }]} // Thêm một mục giả cho FlatList chính
          renderItem={() => (
            <View style={styles.container}>
              {/* Week Overviews */}
              <View>
                <View style={styles.headerTopBar}>
                  <Text style={styles.headerTopBarText}>Week Overviews</Text>
                </View>
                <LineChart
                  data={userData}
                  data2={postData}
                  initialSpacing={6}
                  spacing={55}
                  textFontSize={13}
                  thickness={5}
                  hideRules
                  hideYAxisText
                  yAxisColor="#1A3461"
                  showVerticalLines
                  verticalLinesColor="rgba(14,164,164,0.5)"
                  xAxisColor="#0BA5A4"
                  color1="skyblue"
                  color2="orange"
                  dataPointsColor1="blue"
                  dataPointsColor2="red"
                  textColor1="green"
                  textShiftY={-8}
                  textShiftX={15}
                  xAxisLabels={userData.map((dataPoint) => dataPoint.label)}
                  xAxisLabelsVerticalShift={6}
                  yAxisLabelWidth={8}
                  disableScroll
                  onlyPositive
                  yAxisThickness={false}
                />
                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColor,
                        { backgroundColor: "skyblue" },
                      ]}
                    />
                    <Text style={styles.legendText}>User</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[
                        styles.legendColor,
                        { backgroundColor: "orange" },
                      ]}
                    />
                    <Text style={styles.legendText}>Post</Text>
                  </View>
                </View>
              </View>

              {/* Lastest Users */}
              <View style={styles.containerTableView}>
                <View style={styles.headerTopBar}>
                  <Text style={styles.headerTopBarText}>Lastest Users</Text>
                </View>
                <View style={styles.header}>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Avatar</Text>
                  </View>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Name</Text>
                  </View>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Joined at</Text>
                  </View>
                </View>
                {/* FlatList cho Latest Users */}
                <FlatList
                  data={latestUsers}
                  keyExtractor={(item) => item._id}
                  renderItem={renderItemUser}
                />
              </View>

              {/* Top Authors */}
              <View style={styles.containerTableView}>
                <View style={styles.headerTopBar}>
                  <Text style={styles.headerTopBarText}>Top Authors</Text>
                </View>
                <View style={styles.header}>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Avatar</Text>
                  </View>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Author</Text>
                  </View>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Posts</Text>
                  </View>
                  <View style={styles.headercontainer}>
                    <Text style={styles.heading}>Latest Post</Text>
                  </View>
                </View>
                {/* FlatList cho Top Authors */}
                <FlatList
                  data={usersMostPost}
                  keyExtractor={(item) => item._id}
                  renderItem={renderItemPost}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  legendText: {
    color: "black",
  },
  headerTopBar: {
    backgroundColor: "#6AB7E2",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 15,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerTopBarText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  heading: {
    fontSize: 15,
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 2,
    elevation: 1,
    borderRadius: 3,
    borderColor: "#fff",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 7 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },
});
