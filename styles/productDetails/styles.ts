import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#ff0000",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 100,
        height: 500,
        position: "relative",
    },
    productImage: {
        width: 100,
        height: "100%",
    },
    paginationContainer: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ffffff80",
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: "#fff",
    },
    shareButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productInfo: {
        padding: 20,
    },
    brandContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    brand: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    stockIndicator: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 6,
        borderRadius: 4,
    },
    stockText: {
        marginLeft: 4,
        fontSize: 12,
    },
    inStock: {
        color: "#4CAF50",
    },
    outOfStock: {
        color: "#F44336",
    },
    productName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    stars: {
        flexDirection: "row",
        marginRight: 8,
    },
    reviewCount: {
        color: "#666",
        fontSize: 14,
    },
    priceSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    price: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000",
        marginRight: 10,
    },
    discountContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    originalPrice: {
        fontSize: 18,
        color: "#666",
        textDecorationLine: "line-through",
        marginRight: 10,
    },
    discountPercentage: {
        fontSize: 16,
        color: "#4CAF50",
        fontWeight: "600",
    },
    offerCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF5F5",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    offerText: {
        marginLeft: 10,
        color: "#E31837",
        flex: 1,
        fontSize: 14,
    },
    deliverySection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    deliveryText: {
        marginLeft: 10,
        fontSize: 14,
        color: "#333",
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        color: "#000",
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: "#666",
    },
    readMore: {
        color: "#E31837",
        marginTop: 5,
        fontWeight: "600",
    },
    reviewsSection: {
        marginTop: 20,
    },
    reviewCard: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    reviewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    reviewerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    reviewerInfo: {
        flex: 1,
    },
    reviewerEmail: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    reviewStars: {
        flexDirection: "row",
    },
    reviewText: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        marginBottom: 5,
    },
    reviewDate: {
        fontSize: 12,
        color: "#666",
    },
    bottomBar: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    addToCartButton: {
        flex: 1,
        backgroundColor: "#E31837",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    addToCartText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});


export default styles