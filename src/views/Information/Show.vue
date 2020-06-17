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
                                <label
                                        for=""
                                        class="col-3"
                                >Maandag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.monday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Dinsdag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.tuesday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Woensdag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.wednesday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Donderdag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.thursday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Vrijdag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.friday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Zaterdag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.saturday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Zondag</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.hours.sunday"
                                            type="text"
                                            class=" form-control"
                                    >
                                </div>
                            </div>
                        </div>

                        <div class="card-header">
                            <span class="card-header-text">Social media</span>
                        </div>
                        <div class="card-body">
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Facebook</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.socialMedia.facebook"
                                            type="text"
                                            class="form-control"
                                    >
                                </div>
                            </div>
                            <div class="form-group row">
                                <label
                                        for=""
                                        class="col-3"
                                >Instagram</label>
                                <div class="col-9">
                                    <input
                                            v-model="information.socialMedia.instagram"
                                            type="text"
                                            class="form-control"
                                    >
                                </div>
                            </div>


                            <div class="form-group">
                                <button
                                        class="btn btn-outline-primary"
                                        @click="update"
                                >
                                    Aanpassen
                                </button>
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
                                <img
                                        :src="information.qrCodes.app"
                                        alt=""
                                        class="w-100"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    import InformationService from "@/classes/information/information.service";
    import {InformationModel} from "@/classes/information/information.model";

    @Component
    export default class Information extends Vue {
        information = new InformationModel();

        created(): void {
            this.getInformation();
        }

        update(): void {
            InformationService.post(this.information).then(response => {
                    this.information = new InformationModel().deserialize(response.data)
                }
            )
        }

        getInformation(): void {
            InformationService.fetch().then(response => {
                this.information = new InformationModel().deserialize(response.data)
            })
        }

    }
</script>

<style scoped>

</style>
