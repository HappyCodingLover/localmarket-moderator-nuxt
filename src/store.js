import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiProcessing: false,
        token: localStorage.getItem("token") || "",
        user: {},
        requests: [],
        requestPageIndex: 1,
        requestComplete: false,
        orders: [],
        partners: [],
        categories: [],
        alert: {
            show: false,
            text: null
        }
    },
    mutations: {
        setApiProcessing(state, payload) {
            state.apiProcessing = payload;
        },
        auth_success(state, token, user) {
            state.token = token;
            state.user = user;
        },
        logout(state) {
            state.token = null;
        },
        setRequests(state, payload) {
            state.requests = payload;
        },
        addRequests(state, payload){
            state.requests = state.requests.concat(payload)
        },
        setRequestPageIndex(state, payload){
            state.requestPageIndex = payload
        },
        setRequestComplete(state, payload){
            state.requestComplete = payload
        },
        setOrders(state, payload){
            state.orders = payload
        },
        setPartners(state, payload){
            state.partners = payload
        },
        setCategories(state, payload){
            state.categories = payload
        },
        setAlert(state, payload){
            state.alert = payload
        }
    },
    actions: {
        setProcessing({commit}, payload){
            commit("setApiProcessing", payload);
        },
        login({ commit }, user) {
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + "/moderators/login",
                    data: user,
                    method: "POST",
                })
                    .then((resp) => {
                        const data = resp.data;
                        if (data.success) {
                            const token = `${data.data.token_type} ${data.data.access_token}`;
                            const user = data.data.user;
                            localStorage.setItem("token", token);
                            axios.defaults.headers.common["Authorization"] = token;
                            commit("auth_success", token, user);
                            commit("setApiProcessing", false);
                            resolve(true);
                        }
                    })
                    .catch((err) => {
                        localStorage.removeItem("token");
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit("logout");
                localStorage.removeItem("token");
                delete axios.defaults.headers.common["Authorization"];
                resolve();
            });
        },
        getRequests({ commit }) {
            if (this.state.requestComplete){
                return
            }
            // commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + `/moderators/requests?page=${this.state.requestPageIndex}`,
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            const data = resp.data.data;
                            if (!data){
                                commit("setRequestComplete", true)
                                commit("setApiProcessing", false);
                                return resolve()
                            }
                            commit('addRequests', data);
                            commit("setRequestPageIndex", this.state.requestPageIndex + 1);
                            commit("setApiProcessing", false);
                            return resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        clearRequests({commit}){
            commit("setRequestPageIndex", 1)
            commit("setRequests", [])
            commit("setRequestComplete", false)
        },
        approveRequest({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/approveRequest',
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        rejectRequest({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/rejectRequest',
                    data,
                    method: "PUT",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve();
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getCompanyRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/company/' + id,
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve(resp.data.data);
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getCompanyAddressRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/company_address/' + id,
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve(resp.data.data);
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getDeliveryCostInformationRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/delivery_cost_info/' + id,
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve(resp.data.data);
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getDeliveryTimeInformationRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/delivery_time_info/' + id,
                    method: "GET",
                })
                    .then((resp) => {
                        if (resp.data.success) {
                            commit("setApiProcessing", false);
                            return resolve(resp.data.data);
                        }
                        commit("setApiProcessing", false);
                        reject(resp.data.message);
                    })
                    .catch((err) => {
                        commit("setApiProcessing", false);
                        reject(err);
                    });
            });
        },
        getPromoInformationRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/promo_info/' + id,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve(resp.data.data);
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getDeliveryZoneRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/delivery_zone/' + id,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve(resp.data.data);
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getProductRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/product/' + id,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve(resp.data.data);
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getPromoRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/promo/' + id,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve(resp.data.data);
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getSubCategoryRequestById({commit}, id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/requests/subcategory/' + id,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve(resp.data.data);
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getOrders({commit}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                axios({
                    url: process.env.VUE_APP_API_URL + '/moderators/orders',
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit('setOrders', resp.data.data);
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        getPartners({commit}, category_id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + '/moderators/companies?category_id=';
                if (category_id){
                    url += category_id
                }
                axios({
                    url,
                    method: "GET",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit('setPartners', resp.data.data.companies);
                        commit('setCategories', resp.data.data.categories);
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        partnerArchive({commit}, company_id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/archive`;
                axios({
                    url,
                    method: "PUT",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        partnerRestore({commit}, company_id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/restore`;
                axios({
                    url,
                    method: "PUT",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        deletePartner({commit},company_id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}`;
                axios({
                    url,
                    method: "DELETE",
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        revisePartnerOverview({commit}, {company_id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/overview`;
                axios({
                    url,
                    method: "PUT",
                    data
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        revisePartnerAddress({commit}, {company_id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/address`;
                axios({
                    url,
                    method: "PUT",
                    data
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        revisePartnerAccount({commit}, {company_id, data}){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/account`;
                axios({
                    url,
                    method: "PUT",
                    data
                })
                .then((resp) => {
                    if (resp && resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    if (resp){
                        reject(resp.data.message);
                    }
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        createNewPartner({commit}, data){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/new`;
                axios({
                    url,
                    method: "POST",
                    data
                })
                .then((resp) => {
                    if (resp.data.success) {
                        commit("setApiProcessing", false);
                        return resolve();
                    }
                    commit("setApiProcessing", false);
                    reject(resp.data.message);
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        exportCSV({commit}, company_ids){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/exportcsv`;
                axios({
                    url,
                    method: "POST",
                    data:{
                        company_ids
                    }
                })
                .then((resp) => {
                    commit("setApiProcessing", false);
                    if (resp.data.success){
                        resolve(resp.data.data)
                    }
                    reject(resp.data.message)
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
        exportCSVforCompany({commit}, company_id){
            commit("setApiProcessing", true);
            return new Promise((resolve, reject) => {
                let url = process.env.VUE_APP_API_URL + `/moderators/companies/${company_id}/exportcsv`;
                axios({
                    url,
                    method: "GET"
                })
                .then((resp) => {
                    commit("setApiProcessing", false);
                    if (resp.data.success){
                        resolve(resp.data.data)
                    }
                    reject(resp.data.message)
                })
                .catch((err) => {
                    commit("setApiProcessing", false);
                    reject(err);
                });
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
});
