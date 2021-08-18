<template>
    <v-main>
        <div class="root">
            <div style="display: inline">
                <h2 style="display: inline">Заказы</h2>
            </div>
            <div class="mt-5">
                <v-list-item
                    v-for="(order, index) in orders"
                    :key="index"
                    link
                    :to="'/orders/' + order.id"
                >
                    <v-row>
                        <v-col md="5">
                            <div class="flex-layout">
                                <v-img :lazy-src="order.company.logo_url" :src="order.company.logo_url" max-width="60" max-height="60" width="60" height="60" style="border-radius:60px"></v-img>
                                <div class="ml-4 mt-1">
                                    <span>{{order.company.name}}</span>
                                    <span class="grey-text">{{order.company.entity}}</span>
                                </div>
                            </div>
                            <div class="flex-layout mt-4">
                                <span class="grey-text ml-1" style="width:25%">
                                    № {{ order.company.id }} - {{ order.id }}
                                </span>
                                <span style="width:75%">
                                    {{order.user_address.address}}
                                </span>
                            </div>
                        </v-col>
                        <v-col md="7">
                            <v-row>
                                <v-col md="3" class="pt-1 center">
                                    <span class="grey-text">Выручка:</span>
                                    {{order.company.income}} ₽
                                </v-col>
                                <v-col md="3" class="pt-1 center">
                                    {{order.order_price}} ₽
                                </v-col>
                                <v-col md="3" class="pt-1 center pl-0 pr-0">
                                    {{new Date(order.created_at).toLocaleString()}}
                                </v-col>
                                <v-col md="3" class="pt-1 right pl-0 pr-0">
                                     <v-badge
                                        dot
                                        :color="getColorByStatus(order.status)"
                                        left
                                        offset-x="-7"
                                        offset-y="0"
                                        outline
                                        bordered
                                        class="mr-2"
                                    ></v-badge>
                                    <span class="grey-text">{{ getTextByStatus(order.status) }}</span>
                                </v-col>
                            </v-row>
                            <div class="absolute" style="bottom:10px;right:3px">
                                <v-chip class="mr-3">
                                    {{
                                        order.delivery_day === 0 ? "Сегодня" : "Завтра"
                                    }}
                                </v-chip>
                                <v-chip
                                    >с {{ order.delivery_timeframe.start }} до
                                    {{ order.delivery_timeframe.end }}</v-chip
                                >
                            </div>
                        </v-col>
                        <v-col cols="12" class="pt-2 pa-0">
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                </v-list-item>
            </div>
        </div>
    </v-main>
</template>

<script>
export default {
    created() {
        this.$store.dispatch("getOrders");
    },
    watch: {
        "$store.state.orders": function () {
            this.orders = this.$store.state.orders;
        },
    },
    mounted() {
        this.orders = this.$store.state.orders;
    },
    data() {
        return {
            orders: []
        };
    },
    methods: {
        getColorByStatus(status) {
            switch (status) {
                case 0:
                    return "green";
                case 1:
                    return "blue";
                case 2:
                    return "yellow";
                case 3:
                    return "grey";
                case 4:
                    return "green";
                case 5:
                    return "red";
            }
        },
        getTextByStatus(status) {
            switch (status) {
                case 0:
                    return "Создан";
                case 1:
                    return "Принят";
                case 2:
                    return "Собирается";
                case 3:
                    return "У курьера";
                case 4:
                    return "Доставлен";
                case 5:
                    return "Отменен";
            }
        }
    },
};
</script>
