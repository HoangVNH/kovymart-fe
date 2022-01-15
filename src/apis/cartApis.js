import axiosClient from "./axiosClient";

const cartApis = {
  getCart() {
    const url = "/cart";
    return axiosClient.get(url);
  },
  addToCart(product) {
    const url = "/cart/add";
    return axiosClient.post(url, product);
  },
  changeQuantity(data) {
    const url = "/cart/change";
    return axiosClient.put(url, data);
  },
  removeFromCart(data) {
    const url = "/cart/remove";
    return axiosClient.put(url, data);
  },
  setIsOrderToTrue() {
    const url = "/cart/finish";
    return axiosClient.patch(url, {
      isOrder: true,
    });
  },
  clearCart() {
    const url = "/cart";
    return axiosClient.delete(url);
  },
};

export default cartApis;
