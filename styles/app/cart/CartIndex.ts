import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    emptyText: {
        fontSize: 18,
        color: "#666",
        marginTop: 16,
        marginBottom: 24,
    },
    shopButton: {
        backgroundColor: "#0066FF",
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    shopButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    header: {
        padding: 20,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    itemCount: {
        fontSize: 15,
        color: "#666",
    },
    itemsContainer: {
        padding: 16,
    },
    cartItem: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    itemInfo: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    brandContainer: {
        backgroundColor: "#f0f4ff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    brandText: {
        fontSize: 12,
        color: "#0066FF",
        fontWeight: "600",
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 8,
        lineHeight: 22,
    },
    offerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#f0fff4",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginBottom: 12,
    },
    offerText: {
        fontSize: 12,
        color: "#00a760",
        flex: 1,
    },
    priceSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    priceInfo: {
        flex: 1,
    },
    finalPrice: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 4,
    },
    discountContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: "#999",
        textDecorationLine: "line-through",
    },
    discountBadge: {
        fontSize: 12,
        color: "#00a760",
        fontWeight: "600",
    },
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        borderRadius: 8,
        padding: 4,
    },
    quantityButton: {
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        paddingHorizontal: 12,
    },
    summary: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        margin: 16,
        marginTop: 8,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 15,
        color: "#666",
    },
    summaryValue: {
        fontSize: 15,
        color: "#1a1a1a",
        fontWeight: "600",
    },
    deliveryText: {
        fontSize: 15,
        color: "#00a760",
        fontWeight: "600",
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        marginTop: 8,
        paddingTop: 16,
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    totalAmount: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    checkoutContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 16,
    },
    checkoutButton: {
        backgroundColor: "#0066FF",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    checkoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});


export default styles