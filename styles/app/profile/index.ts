import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    profileImageContainer: {
        position: "relative",
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editImageButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#007AFF",
        borderRadius: 15,
        padding: 5,
    },
    profileInfo: {
        alignItems: "center",
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#666",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#dc3545",
        padding: 10,
        borderRadius: 8,
        marginTop: 15,
    },
    logoutText: {
        color: "#FFF",
        marginLeft: 5,
    },
    tabs: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 10,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#e6f2ff",
    },
    tabText: {
        marginLeft: 5,
        color: "#666",
    },
    activeTabText: {
        color: "#007AFF",
    },
});


export default styles