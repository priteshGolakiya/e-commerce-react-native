import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
        color: '#333',
    },
    cartItemsContainer: {
        marginBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemInfo: {
        flex: 1,
    },
    brandText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    finalPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0066FF',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    quantity: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0066FF',
    },
    addressContainer: {
        marginBottom: 16,
    },
    addressCard: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    selectedCard: {
        borderColor: '#0066FF',
        backgroundColor: '#F5F8FF',
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    addressContent: {
        flex: 1,
        marginLeft: 12,
    },
    addressText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    addressSubText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#0066FF',
        borderStyle: 'dashed',
        backgroundColor: '#F5F8FF',
    },
    addButtonText: {
        color: '#0066FF',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    formContainer: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        margin: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
        color: '#333',
    },
    submitButton: {
        backgroundColor: '#0066FF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#0066FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    checkoutContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 10,
    },
    checkoutPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkoutPriceLabel: {
        fontSize: 16,
        color: '#666',
    },
    checkoutPrice: {
        fontSize: 24,
        fontWeight: '700',
        color: '#0066FF',
    },
    checkoutButton: {
        backgroundColor: '#0066FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#0066FF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8,
    },
    // Additional styles for error states
    errorInput: {
        borderColor: '#FF4444',
    },
    errorText: {
        color: '#FF4444',
        fontSize: 12,
        marginTop: -8,
        marginBottom: 8,
        marginLeft: 4,
    },
    // Loading state styles
    loadingButton: {
        opacity: 0.7,
    },
    // Disabled state styles
    disabledButton: {
        backgroundColor: '#CCCCCC',
        shadowOpacity: 0,
        elevation: 0,
    },
    disabledText: {
        color: '#888888',
    },
    // Animation styles
    animatedCard: {
        transform: [{ scale: 1 }],
    },
    // Empty state styles
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
    // Success animation container
    successContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    successText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#00CC66',
        marginTop: 16,
    },
});

export default styles