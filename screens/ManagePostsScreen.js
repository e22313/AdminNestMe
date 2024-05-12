import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Touchable,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import moment from "moment";
import PostDetailsModal from "./PostDetailsModal";
import { useSelector } from "react-redux";
import ReportModalPost from "../components/ReportModalPost";
const ManagePostsScreens = () => {
  const authToken = useSelector((state) => state.auth.userData);
  const [usersMostPost, setUsersMostPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isBan, setIsBan] = useState(false);
  const flatListRef = useRef(null);
  const [filterText, setFilterText] = useState(""); // State để lưu trữ giá trị của ô văn bản lọc
  const [totalPages, setTotalPages] = useState(1);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [id, setId] = useState({});
  const openModal = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleCloseModalReport = () => {
    setIsReportModalVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterText, handleUnlockLock]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const accessToken = authToken;
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const response = await axios.get(
        `https://nestme-server.onrender.com/api/admin/post?page=${currentPage}&limit=6&search=${filterText}`, // Sử dụng giá trị của ô văn bản lọc
        config
      );
      setAllPosts(response.data.posts);
      const totalPosts = response.data.totalPosts;
      const totalPages = Math.ceil(totalPosts / 6);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItemPost = ({ item }) => (
    <Pressable onPress={() => openModal(item)}>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image
            style={styles.profileImg}
            source={{
              uri:
                item.creator.profile_picture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.creator.username}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.content}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.reacts_count}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.comments_count}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>
            {moment(item.created_at).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.visibility}</Text>
        </View>
        <View style={styles.cell}>
          {item.reports_count > 0 && (
            <TouchableOpacity onPress={() => handleViewReport(item)}>
              <Text style={styles.viewReportButton}>View Report</Text>
            </TouchableOpacity>
          )}
          <Text>{item.reports_count}</Text>
        </View>
      </View>
    </Pressable>
  );

  const handleUnlockLock = async (postId, isLock) => {
    try {
      // Hiển thị một thông báo xác nhận
      Alert.alert(
        "Xác nhận",
        `Bạn có chắc chắn muốn ${isLock ? "Mở khóa" : "Khóa"} bài viết không?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              // Tiến hành khóa hoặc mở khóa bài viết
              const accessToken = authToken;
              const config = {
                headers: { Authorization: `Bearer ${accessToken}` },
              };
              const url = isLock
                ? `https://nestme-server.onrender.com/api/admin/post/unlock/${postId}`
                : `https://nestme-server.onrender.com/api/admin/post/lock/${postId}`;
              console.log(url);
              setModalVisible(false);
              await axios.put(url, {}, config);
              fetchData();
              setModalVisible(false);
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error unlocking/locking post:", error);
      // Xử lý lỗi nếu cần
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const firstButton = Math.max(1, currentPage - 2);
    const lastButton = Math.min(totalPages, currentPage + 2);
    for (let i = firstButton; i <= lastButton; i++) {
      buttons.push(
        <TouchableOpacity
          key={i}
          style={[
            styles.pageButton,
            currentPage === i ? styles.activePageButton : null,
          ]}
          onPress={() => setCurrentPage(i)}
        >
          <Text style={styles.pageButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
    if (firstButton > 1) {
      buttons.unshift(
        <TouchableOpacity
          key={1}
          style={styles.pageButton}
          onPress={() => setCurrentPage(1)}
        >
          <Text style={styles.pageButtonText}>{"<<"}</Text>
        </TouchableOpacity>
      );
    }
    if (lastButton < totalPages) {
      buttons.push(
        <TouchableOpacity
          key={totalPages}
          style={styles.pageButton}
          onPress={() => setCurrentPage(totalPages)}
        >
          <Text style={styles.pageButtonText}>{">>"}</Text>
        </TouchableOpacity>
      );
    }
    return buttons;
  };

  const handleViewReport = (item) => {
    setIsReportModalVisible(true);
    setId(item?._id);
    console.log("vailon " + item?._id);
  };

  return (
    <View style={styles.containerTableView}>
      <View style={styles.containerTableView}>
        {/* Thêm ô văn bản để lọc */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search posts..."
          onChangeText={(text) => setFilterText(text)} // Cập nhật giá trị lọc khi thay đổi
          value={filterText} // Hiển thị giá trị lọc
        />
        {/* Các mã của bạn */}
      </View>
      <View style={styles.header}>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Avatar</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Username</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Title</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Likes</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Comments</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Created At</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Status</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Reports</Text>
        </View>
      </View>
      <ReportModalPost
        visible={isReportModalVisible}
        onClose={handleCloseModalReport}
        id={id}
      />
      <FlatList
        data={allPosts}
        keyExtractor={(item) => item._id}
        renderItem={renderItemPost}
      />
      <View style={styles.pagination}>{renderPaginationButtons()}</View>
      <PostDetailsModal
        isVisible={isModalVisible}
        post={selectedPost}
        onClose={closeModal}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.headerModalContainers}>
              <Text style={styles.modalHeaderText}>Post</Text>
            </View>
            <View style={styles.bodyModalContainers}>
              <View style={styles.avatarPost}>
                <Image
                  style={styles.imgModalAvatar}
                  source={{
                    uri:
                      selectedPost?.creator.profile_picture ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                  }}
                />
                <Text style={styles.usernameTextModal}>
                  {selectedPost?.creator.username}
                </Text>
              </View>
              <View style={styles.viewPostModal}>
                {/* <Image
                  style={styles.postImageMain}
                  source={{
                    uri: selectedPost?.media[0],
                  }}
                /> */}
                <FlatList
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  data={selectedPost?.media}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Image
                      style={styles.postImageMain}
                      source={{ uri: item }}
                    />
                  )}
                />
              </View>
            </View>
            <View style={styles.footerModal}>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.addButton]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() =>
                    handleUnlockLock(selectedPost?._id, selectedPost?.banned)
                  }
                >
                  <Text style={styles.buttonText}>
                    {selectedPost?.banned ? "Unlock" : "Lock"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ManagePostsScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor: "#1A3461",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
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
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  gridItem: {
    flex: 1,
    backgroundColor: "#264653",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  gridContent: {
    color: "white",
    marginTop: 5,
  },
  containerTableView: {
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  head: { height: 44, backgroundColor: "darkblue" },
  /////////////////
  headercontainer: {
    flex: 1,
    alignItems: "center",
    elevation: 2,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 0,
    padding: 9,
  },
  ///////////////////////
  headText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  text: { margin: 6, fontSize: 16, fontWeight: "bold", textAlign: "center" },
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
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  heading: { fontWeight: "bold", fontSize: 5.85 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,

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
    alignItems: "center",
  },
  cellText: { fontSize: 8 },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  loadMoreButton: {
    alignItems: "center",
    padding: 17,
  },
  loadMoreButtonText: { color: "blue", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu đen nhạt với độ trong suốt 50%
  },
  headerModalContainers: { flex: 0.5 },
  modalHeaderText: { fontSize: 16, textAlign: "center" },
  bodyModalContainers: {
    flex: 8,
  },
  avatarPost: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
  },
  usernameTextModal: {
    fontSize: 12,
    marginTop: -11,
  },
  viewPostModal: {
    flex: 9,
  },
  imgModalAvatar: {
    height: 25,
    width: 25,
    borderRadius: 40,
    marginHorizontal: 7,
    borderWidth: 0.2,
  },
  postImageMain: { flex: 1, height: 300, width: 350 },
  modalView: {
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    modalBody: { flex: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  footerModal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainerModal: {
    flex: 1,
    marginHorizontal: 10, // Khoảng cách giữa các nút
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  pageButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activePageButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
    color: "#fff",
  },
  pageButtonText: { fontSize: 12, color: "#000" },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
