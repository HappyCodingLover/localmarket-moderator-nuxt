<template>
    <v-main>
        <div class="root">
            <h2>Партнеры</h2>
        </div>
        <div class="mt-3 flex-layout">
            <div class="ml-3">
                <v-btn-toggle
                    mandatory
                    color="accent-3"
                    group
                    active-class="btn-toggle-active"
                >
                    <v-btn @click="allPartnersShow" class="normal-text" width="80">
                        Все
                    </v-btn>
                    <v-btn @click="activePartnersShow" class="normal-text" width="80">
                        Активные
                    </v-btn>
                    <v-btn @click="archivedPartnersShow" class="normal-text" width="80">
                        Архив
                    </v-btn>
                </v-btn-toggle>
            </div>
            <div style="flex:auto;text-align:right;" class="mr-3">
                <v-btn
                    outlined
                    class="normal-text"
                    height="40"
                    width="170"
                    color="red"
                    style="bottom:2px"
                    to="/partners/new"
                    >+ Добавить</v-btn
                >
            </div>
        </div>
        <div class="mt-4 flex-layout">
            <div class="ml-4">
                <v-checkbox
                    @change="selectAllCheck"
                    label="Выбрать всех"
                    color="red"
                    v-model="selectAllModel"
                >
                </v-checkbox>
            </div>
            <div style="flex:auto;text-align:right;margin:auto 0" class="mr-3">
                <v-btn
                    text
                    width="157"
                    @click="exportOrders"
                >
                    <v-icon class="mr-2">mdi-cloud-download</v-icon>
                    <span class="normal-text" style="font-size:10pt">Экспорт заказов</span>
                </v-btn>
                <v-btn
                    text
                    width="135"
                    class="ml-2"
                    @click="exportAll"
                >
                    <v-icon class="mr-2">mdi-cloud-download</v-icon>
                    <span class="normal-text" style="font-size:10pt">Экспорт всех</span>
                </v-btn>
            </div>
        </div>
        <v-chip-group
          active-class="selectedCategoryChip"
          class="CategoryChip ml-5"
        >
            <v-chip
                v-for="(category, index) in categories"
                :key="index"
                outlined
                class="mr-3 grey-text pt-5 pb-5 pr-6 pl-6"
                @click="categoryClick(category.id)"
            >
                {{category.name}}
            </v-chip>
        </v-chip-group>
        <div class="mt-4 ml-4">
            <v-row v-for="(partner, index) in showPartners" :key="index">
                <v-col md="7" class="flex-layout pt-1 pb-1">
                    <v-checkbox
                        color="red"
                        class="pt-4"
                        ref="n"
                        v-model="partner.checked"
                    >
                    </v-checkbox>
                    <v-img max-width="95" style="border-radius:5px" width="95" height="85" max-height="85" class="ml-2" :lazy-src="partner.logo_url" :src="partner.logo_url"></v-img>
                    <div class="ml-5">
                        <p class="mb-0 mt-1">{{partner.name}}</p>
                        <p class="grey-text mt-2 mb-0" style="font-size:10pt">{{partner.entity}}</p>
                        <p class="grey-text mt-1" style="font-size:10pt">INN: {{partner.inn}}</p>
                    </div>
                </v-col>
                <v-col md="2" class="flex-layout pt-1 pb-1">
                    <div style="margin:auto 2px">
                        <span class="grey-text">Выручка: </span>
                        {{partner.income}} ₽
                    </div>
                </v-col>
                <v-col class="flex-layout pt-1 pb-1" md="1">
                    <v-btn text link :to="'/partners/' + partner.id" style="margin:auto">
                        Перейти
                    </v-btn>
                </v-col>
                <v-col class="flex-layout pt-1 pb-1" md="2">
                    <div style="margin:auto">
                        <v-btn
                            v-if="partner.blocked === 0"
                            icon
                            @click="partnerArchive(partner.id)"
                        >
                            <v-icon size="18">mdi-package-down</v-icon>
                        </v-btn>
                        <v-btn
                            icon
                            v-else
                            @click="partnerRestore(partner.id)"
                        >
                            <v-icon size="18" >mdi-restore</v-icon>
                        </v-btn>
                        <v-btn icon class="ml-2" @click="deleteId = partner.id; deleteConfirmDialog = true">
                            <v-icon size="18" >mdi-close</v-icon>
                        </v-btn>
                    </div>
                </v-col>
                <v-col md="12" class="pt-1 pb-3">
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-dialog v-model="deleteConfirmDialog" width="500">
                <v-card>
                    <v-card-title class="headline">
                        <v-icon class="mr-2">mdi-delete</v-icon>
                        <h5>Подтверждение</h5>
                    </v-card-title>
                    <v-divider></v-divider>
                    <p class="pa-10">Вы уверены, что хотите удалить партнера?</p>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            outlined
                            @click="deleteConfirmDialog = false"
                            color="#7d7d7d"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Отменить
                        </v-btn>
                        <v-btn
                            dark
                            @click="confirmDelete"
                            color="red"
                            class="normal-text"
                            width="120"
                            height="40"
                        >
                            Удалить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-main>
</template>

<script>
import Papa from "papaparse";
export default {
    components:{
    },
    mounted() {

    },
    methods: {
        allPartnersShow(){
            this.showState = 0
            this.showPartners = []
            this.selectAllModel = false
            this.$forceUpdate()
            setTimeout(() => {
                this.partners.map(partner =>{
                    partner.checked = false
                    this.showPartners.push(partner)
                })
            }, 10);
        },
        activePartnersShow(){
            this.showState = 1
            this.showPartners = []
            this.selectAllModel = false
            this.$forceUpdate()
            setTimeout(() => {
                this.partners.map(partner =>{
                    if (partner.blocked === 0){
                        partner.checked = false
                        this.showPartners.push(partner)
                    }
                })
            }, 10);
        },
        archivedPartnersShow(){
            this.showState = 2
            this.showPartners = []
            this.selectAllModel = false
            this.$forceUpdate()
            setTimeout(() => {
                this.partners.map(partner =>{
                    if (partner.blocked === 1){
                        partner.checked = false
                        this.showPartners.push(partner)
                    }
                })
            }, 10);
        },
        categoryClick(category_id){
            if (this.currentCategoryId === category_id){
                this.currentCategoryId = null
                this.$store.dispatch("getPartners")
            }
            else {
                this.currentCategoryId = category_id
                this.$store.dispatch("getPartners", category_id);
            }
        },
        selectAllCheck(value){
            this.showPartners.map(partner =>{
                partner.checked = value
            })
            this.$forceUpdate()
        },
        partnerArchive(id){
            this.$store.dispatch("partnerArchive", id).then(()=>{
                if (this.currentCategoryId){
                    this.$store.dispatch("getPartners", this.currentCategoryId);
                }
                else{
                    this.$store.dispatch("getPartners")
                }
            })
        },
        partnerRestore(id){
            this.$store.dispatch("partnerRestore", id).then(()=>{
                if (this.currentCategoryId){
                    this.$store.dispatch("getPartners", this.currentCategoryId);
                }
                else{
                    this.$store.dispatch("getPartners")
                }
            })
        },
        confirmDelete(){
            this.deleteConfirmDialog = false
            this.$store.dispatch("deletePartner", this.deleteId).then(()=>{
                if (this.currentCategoryId){
                    this.$store.dispatch("getPartners", this.currentCategoryId);
                }
                else{
                    this.$store.dispatch("getPartners")
                }
            })
        },
        exportAll(){
            let company_ids = []
            this.showPartners.map(partner =>{
                company_ids.push(partner.id)
            })
            this.exportCSVByCompanyIDs(company_ids)
        },
        exportOrders(){
            let company_ids = []
            this.showPartners.map(partner =>{
                if (partner.checked){
                    company_ids.push(partner.id)
                }
            })
            if (company_ids.length === 0){
                this.$store.commit('setAlert', {
                    show: true,
                    text: 'Чтобы экспортировать заказы нескольких партнёров, выберите нужных партнёров и нажмите Экспорт Заказов / Экспорт Всех'
                })
                return
            }
            this.exportCSVByCompanyIDs(company_ids)
        },
        exportCSVByCompanyIDs(company_ids){
            this.$store.dispatch("exportCSV", company_ids).then(data =>{
                let blob = new Blob(["\uFEFF" + Papa.unparse({data, "fields": ["Номер", "ID партнера", "Название партнера", "Организация партнера", "ИНН партнера", "ID заказа", "Сумма заказа", "Сумма заказа с учетом промокода", "Комиссия", "Сумма с учетом комиссии", "Дата заказа", "Время заказа", "Статус заказа", "Адрес заказа"]}, {delimiter: ';'})], { type: 'data:text/csv;charset=UTF8;base64' });
                var link = document.createElement("a");
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", 'Merchant_Orders.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
        }
    },
    data() {
        return {
            partners: [],
            showPartners: [],
            categories: [],

            selectAllModel: false,
            showState: 0, // 0 :all, 1: active, 2: archived
            currentCategoryId: null,

            deleteConfirmDialog: false,
            deleteId: null
        }
    },
    created() {
        this.$store.dispatch("getPartners");
    },
    watch: {
        "$store.state.partners": function () {
            this.partners = this.$store.state.partners;
            switch (this.showState) {
                case 0:
                    this.allPartnersShow()
                    break;
                case 1:
                    this.activePartnersShow()
                    break;
                case 2:
                    this.archivedPartnersShow()
                    break;
            }
        },
        "$store.state.categories": function () {
            this.categories = this.$store.state.categories;
        }
    },
}
</script>
<style>
.selectedCategoryChip{
    color: #000 !important;
    caret-color: #000;
    font-weight: 500;
}
.btn-toggle-active{
    outline: 1px solid;
    outline-style: auto;
}
.CategoryChip v-chip:focus::before{
    opacity: 0;
}
.v-slide-group__prev{
    justify-content: start;
}
</style>
