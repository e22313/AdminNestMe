import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Touchable,
  TextInput,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import AddUserModal from "../components/AddUserModal";
import Swipeable from "react-native-swipeable";
const ManageUsersScreen = () => {
  const authToken = useSelector((state) => state.auth.userData);
  const [usersMostPost, setUsersMostPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [filterText, setFilterText] = useState(""); // State để lưu trữ giá trị của ô văn bản lọc
  const [totalPages, setTotalPages] = useState(1);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false); // State to control modal visibility

  // Function to add new user
  const handleAddUser = (userData) => {
    // Send API request to add user
    console.log("New user data:", userData);
    // Close the modal
    setIsAddUserModalVisible(false);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsAddUserModalVisible(false);
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsAddUserModalVisible(true);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterText]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const accessToken = authToken;
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      const response = await axios.get(
        `https://nestme-server.onrender.com/api/admin/user?page=${currentPage}&limit=6&search=`,
        config
      );
      setAllUsers(response.data.users);
      const totalUsers = response.data.totalUsers;
      const totalPages = Math.ceil(totalUsers / 6);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderItemUser = ({ item, handleLockUser, handleUnlockUser }) => (
    <Swipeable
      rightButtons={[
        <TouchableOpacity onPress={() => handleLockUser(item.id)} key="lock">
          <View style={styles.rightButton}>
            <Text style={styles.buttonText}>Lock</Text>
          </View>
        </TouchableOpacity>,
      ]}
      leftButtons={[
        <TouchableOpacity
          onPress={() => handleUnlockUser(item.id)}
          key="unlock"
        >
          <View style={styles.leftButton}>
            <Text style={styles.buttonText}>Unlock</Text>
          </View>
        </TouchableOpacity>,
      ]}
    >
      <View style={styles.row}>
        <View style={styles.cell}>
          <Image
            style={styles.profileImg}
            source={{
              uri:
                item.profile_picture ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            }}
          />
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.username}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.user_info.email}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>{item.full_name}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellText}>
            {moment(item.created_at).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text
            style={[{ color: item.banned ? "red" : "green" }, styles.cellText]}
          >
            {item.banned ? "BANNED" : "ACTIVE"}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text>{item.reports_count}</Text>
        </View>
      </View>
    </Swipeable>
  );

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

  return (
    <View style={styles.containerTableView}>
      <View style={styles.containerTableView}>
        {/* Thêm ô văn bản để lọc */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          onChangeText={(text) => setFilterText(text)} // Cập nhật giá trị lọc khi thay đổi
          value={filterText} // Hiển thị giá trị lọc
        />
        {/* Các mã của bạn */}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text style={styles.addButtonLabel}>Add User</Text>
      </TouchableOpacity>
      {/* Modal component */}
      <AddUserModal
        visible={isAddUserModalVisible}
        onClose={handleCloseModal}
        onAddUser={handleAddUser}
      />
      <View style={styles.header}>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Avatar</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Username</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Email</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Fullname</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Signed Up</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Status</Text>
        </View>
        <View style={styles.headercontainer}>
          <Text style={styles.heading}>Reports</Text>
        </View>
      </View>
      <FlatList
        data={allUsers}
        keyExtractor={(item) => item._id}
        renderItem={renderItemUser}
      />
      <View style={styles.pagination}>{renderPaginationButtons()}</View>
    </View>
  );
};

export default ManageUsersScreen;

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
    // marginLeft: 15,
  },
  heading: { fontWeight: "bold", fontSize: 8.2 },
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
  rightButton: {
    backgroundColor: "#ff7f7f",

    padding: 25,

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftButton: {
    backgroundColor: "#7fff7f",
    padding: 25,
    marginLeft: 317,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
