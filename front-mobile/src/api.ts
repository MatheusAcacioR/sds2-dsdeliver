import axios from "axios";

export function fetchOrders() {
    return axios('http://192.168.1.9:8080/orders')
}