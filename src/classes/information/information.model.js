export class InformationModel {
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


    deserialize(input ) {
        Object.assign(this.socialMedia, input.company_social_media);
        Object.assign(this.hours, input.company_hours);
        return this;
    }

    /**
     *
     * @return {{hours: {sunday: string, saturday: string, tuesday: string, wednesday: string, thursday: string, friday: string, monday: string}, social_media: {facebook: string, instagram: string}}}
     */
    serialize() {
        return {
            "company_hours": this.hours,
            "company_social_media": this.socialMedia
        }
    }
}
