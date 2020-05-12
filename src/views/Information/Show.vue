<template>
    <div>
        <h1>Informatie</h1>

        <div class="container">
            <div class="row">
                <div class="col-8">
                    <div class="card mb-2">
                        <div class="card-header">
                            <span class="card-header-text">Openinguren</span>
                        </div>
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="" class="col-3">Maandag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.monday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Dinsdag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.tuesday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Woensdag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.wednesday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Donderdag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.thursday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Vrijdag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.friday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Zaterdag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.saturday">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-3">Zondag</label>
                                <div class="col-9">
                                    <input type="text" class=" form-control" v-model="information.hours.sunday">
                                </div>
                            </div>
                        </div>
                        <div class="card-header">
                            <span class="card-header-text">Social media</span>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-6">
<!--                                    <div class="d-flex justify-content-center">-->
<!--                                        <img :src="information.qr_codes.facebook" alt="" class="rounded w-50">-->
<!--                                    </div>-->
                                    <div>
                                        <label for="">Facebook</label>
                                        <input type="text" class="form-control" v-model="information.social_media.facebook">
                                    </div>
                                </div>

                                <div class="col-6">
<!--                                    <div>-->
<!--                                        <img :src="information.qr_codes.instagram" alt="">-->
<!--                                    </div>-->

                                    <div>
                                        <label for="">Instagram</label>
                                        <input type="text" class="form-control" v-model="information.social_media.instagram">
                                    </div>

                                </div>
                            </div>

                            <div class="form-group">
                                <button class="btn btn-dark" @click="update">Aanpassen</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card mb-2">
                        <div class="card-header">
                            <span class="card-header-text">Applicatiecode</span>
                        </div>

                        <div class="card-body">
                            <div class="form-group">
                                <img :src="information.qr_codes.app" alt="" class="w-100">
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http/http";

    export default {
        name   : "Information",
        data() {
            return {
                information: {
                    qr_codes    : {
                        app      : "",
                        facebook : "",
                        instagram: ""
                    },
                    hours       : {
                        monday   : "",
                        tuesday  : "",
                        wednesday: "",
                        thursday : "",
                        friday   : "",
                        saturday : "",
                        sunday   : ""
                    },
                    social_media: {
                        facebook : "",
                        instagram: ""
                    }
                }
            }
        },
        methods: {
            update() {
                http.post("/information", {
                    hours       : this.information.hours,
                    social_media: this.information.social_media
                }).then(response => {
                    this.information = response.data
                })
            },
            getInformation() {
                http.get("/information").then(response => {
                    this.information = response.data
                })
            }
        },
        created() {
            this.getInformation();
        }
    }
</script>

<style scoped>

</style>