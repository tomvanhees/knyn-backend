import {InformationInterface} from "@/classes/information/information.interface";

export class InformationModel implements InformationInterface {

    qrCodes = {
        app: "",
        facebook: "",
        instagram: ""
    };

    hours = {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    };

    socialMedia = {
        facebook: "",
        instagram: ""
    };


    deserialize(input: any): this {
        Object.assign(this.socialMedia, input.social_media);
        Object.assign(this.hours, input.hours);
        Object.assign(this.qrCodes, input.qr_codes);
        return this;
    }

    serialize(): any {
        return {
            "hours": this.hours,
            "social_media": this.socialMedia
        }
    }
}
