import { Platform, StyleSheet } from "react-native";

const SEARCH_BAR_HEIGHT = 56;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
    },
    searchBarContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: 1,
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: SEARCH_BAR_HEIGHT / 2,
        padding: 12,
        height: SEARCH_BAR_HEIGHT,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    filterButton: {
        width: SEARCH_BAR_HEIGHT,
        height: SEARCH_BAR_HEIGHT,
        backgroundColor: "#f5f5f5",
        borderRadius: SEARCH_BAR_HEIGHT / 2,
        justifyContent: "center",
        alignItems: "center",
    },
    activeFiltersContainer: {
        maxHeight: 50,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#fff",
    },
    activeFilterChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    activeFilterText: {
        fontSize: 12,
        color: "#1a1a1a",
        marginRight: 4,
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    productsContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    productItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: "#f5f5f5",
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: "space-between",
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 4,
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    productCategory: {
        fontSize: 14,
        color: "#717171",
        marginBottom: 4,
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    productPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#007AFF",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
    noResultsContainer: {
        padding: 20,
        alignItems: "center",
    },
    noResultsText: {
        fontSize: 16,
        color: "#717171",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === "ios" ? 40 : 20,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    filterSection: {
        marginBottom: 24,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 12,
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        marginRight: 8,
        marginBottom: 8,
    },
    selectedFilterChip: {
        backgroundColor: "#007AFF",
    },
    filterChipText: {
        fontSize: 14,
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    selectedFilterChipText: {
        color: "#fff",
    },
    priceInputContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    priceInput: {
        flex: 1,
        height: 44,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    priceSeparator: {
        marginHorizontal: 12,
        fontSize: 16,
        color: "#717171",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    sortOption: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#f5f5f5",
    },
    selectedSortOption: {
        backgroundColor: "#007AFF",
    },
    sortOptionText: {
        fontSize: 16,
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    selectedSortOptionText: {
        color: "#fff",
    },
    // Subcategory styles
    subcategorySection: {
        marginBottom: 24,
    },
    subcategoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },
    subcategoryChip: {
        margin: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
    },
    selectedSubcategoryChip: {
        backgroundColor: "#007AFF",
    },
    subcategoryChipText: {
        fontSize: 14,
        color: "#1a1a1a",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    selectedSubcategoryChipText: {
        color: "#fff",
    },
    // Apply button styles
    applyButton: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 16,
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    // Reset button styles
    resetButton: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        marginTop: 8,
    },
    resetButtonText: {
        color: "#1a1a1a",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    // Results count styles
    resultsCount: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#f5f5f5",
    },
    resultsCountText: {
        fontSize: 14,
        color: "#717171",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    // Empty state styles
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    emptyStateImage: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1a1a1a",
        marginBottom: 8,
        textAlign: "center",
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
    emptyStateDescription: {
        fontSize: 16,
        color: "#717171",
        textAlign: "center",
        marginBottom: 24,
        fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    },
});

export default styles