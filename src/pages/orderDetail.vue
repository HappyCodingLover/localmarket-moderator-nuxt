<template>
    <v-main>
        <div class="root"  v-if="order">
            <h2>Заказы</h2>
            <div class="mt-10 flex-layout">
                <h3>Заказ {{order.company.id}} - {{order.id}}</h3>
            </div>
            <div class="promo-information mt-2">
                <v-expansion-panels multiple :value="[0, 1]">
                    <v-expansion-panel>
                        <v-expansion-panel-header class="bold">General Promo</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="thin" style="font-size:11pt" v-html="order.company.promo_information">
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <v-row>
                <v-col md="5">
                    <div class="flex-layout">
                        <v-img :lazy-src="order.company.logo_url" :src="order.company.logo_url" max-width="60" max-height="60" width="60" height="60" style="border-radius:60px"></v-img>
                        <div class="ml-4">
                            <span>{{order.company.name}}</span>
                            <span class="grey-text">{{order.company.entity}}</span>
                        </div>
                    </div>
                    <div class="flex-layout mt-5">
                        <span class="grey-text ml-1" style="width:25%">
                            № {{ order.company.id }} - {{ order.id }}
                        </span>
                        <span style="width:75%">
                            {{order.user_address.address}}
                        </span>
                    </div>
                </v-col>
                <v-col md="7" class="relative">
                    <v-row>
                        <v-col md="3" class="pt-0 center">
                            <span class="grey-text">Выручка:</span>
                            {{order.company.income}} ₽
                        </v-col>
                        <v-col md="3" class="pt-0 center">
                            {{order.order_price}} ₽
                        </v-col>
                        <v-col md="3" class="pt-0 center pl-0 pr-0">
                            {{new Date(order.created_at).toLocaleString()}}
                        </v-col>
                        <v-col md="3" class="pt-0 right pl-0 pr-0">
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
            </v-row>
            <v-row class="mt-5">
                <v-col md="3" v-if="order.status > 0">
                    <span>Phone</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_phone"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col :md="order.status > 0 ? 3 : 4">
                    <span>Дата и время заказа</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="(new Date(order.created_at)).toLocaleString()"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col :md="order.status > 0 ? 3 : 4">
                    <span>Время доставки</span>
                    <v-autocomplete
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :items="[order.delivery_timeframe.start + ' - ' + order.delivery_timeframe.end]"
                        :value="order.delivery_timeframe.start + ' - ' + order.delivery_timeframe.end"
                        class="pt-1"
                        chips
                    ></v-autocomplete>
                </v-col>
                <v-col :md="order.status > 0 ? 3 : 4">
                    <span>Сумма заказа, ₽</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.order_price"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Адрес доставки</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.address"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Подъезд</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.entrance"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Домофон</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.intercom"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Кв/Офис</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.apt_office"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="3">
                    <span>Этаж</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.floor"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Комментарий курьеру</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.user_address.comments"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
                <v-col md="12">
                    <span>Комментарий к заказу</span>
                    <v-text-field
                        hide-details
                        outlined
                        dense
                        color="#414042"
                        readonly
                        :value="order.comment"
                        class="pt-1"
                    ></v-text-field>
                </v-col>
            </v-row>
            <h3 class="mt-10">Продукты</h3>
            <v-row
                class="pa-1"
                v-for="(item, index) in order.products"
                :key="index"
            >
                <v-col md="12" class="pt-0 pb-0 flex-layout">
                   <v-img
                    height="100"
                    width="110"
                    max-width="110"
                    :src="item.product.images[0] ? item.product.images[0].image_url : null"
                    ></v-img>
                    <div class="pa-4 ml-4">
                        <p class="flex-layout bold">
                            {{item.product.name}}
                            <span style="color:red;margin-top:2px" class="ml-3">X {{item.product_count}}</span>
                            <img v-if="item.product.hasPromo === 1" class="ml-5 mt-1" width="18px" height="18px" src="/img/promo.svg">
                        </p>
                        <span class="thin">{{item.product.subcategory}}</span>
                        <span class="bold ml-10">{{item.product.hasPromo === 1 ? item.product.promo.new_price : item.product.price}}₽</span>
                    </div>
                </v-col>
            </v-row>
        </div>
    </v-main>
</template>

<script>
export default {
    mounted() {

    },
    async created() {
        if (!this.$store.state.orders.length){
            await this.$store.dispatch("getOrders")
        }
        this.$store.state.orders.some(order =>{
            if (order.id == this.orderId){
                this.order = order
                return true
            }
        })
    },
    watch: {
        '$store.state.orders': function(){
            this.$store.state.orders.some(order =>{
                if (order.id == this.orderId){
                    this.order = order
                    return true
                }
            })
        }
    },
    data() {
        return {
            orderId: this.$route.params.id,
            order: null
        }
    },
    methods: {
        getColorByStatus(status){
            switch(status){
                case 0:
                    return 'green'
                case 1:
                    return 'blue'
                case 2:
                    return 'yellow'
                case 3:
                    return 'grey'
                case 4:
                    return 'green'
                case 5:
                    return 'red'
            }
        },
        getTextByStatus(status){
            switch (status) {
                case 0:
                    return 'Создан'
                case 1:
                    return 'Принят'
                case 2:
                    return 'Собирается'
                case 3:
                    return 'У курьера'
                case 4:
                    return 'Доставлен'
                case 5:
                    return 'Отменен'
            }
        },
        orderItemStatusChange(status) {
            this.$store
                .dispatch("reviseOrderStatus", {
                    id : this.orderId,
                    data: {
                        status,
                    },
                })
                .then(() => {
                    this.$store.dispatch("getOrders");
                });
        }
    },
}
</script>

<style>
.promo-information .v-expansion-panels .v-expansion-panel::before{
    box-shadow: none;
}
.promo-information .v-expansion-panels .v-expansion-panel{
    background: transparent;
}
.promo-information .v-expansion-panels .v-expansion-panel .v-expansion-panel-header {
    padding-left: 0px;
}
.promo-information .v-expansion-panels .v-expansion-panel .v-expansion-panel-header .v-expansion-panel-header__icon{
    margin-left: 50px;
}
.promo-information .v-expansion-panels .v-expansion-panel .v-expansion-panel-content__wrap{
    padding-left: 0px;
}
</style>
