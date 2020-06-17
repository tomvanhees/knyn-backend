import {InformationInterface} from "@/classes/information/information.interface";
import http from "@/http/http";
import {InformationModel} from "@/classes/information/information.model";

export default class InformationService {
    static fetch(): Promise<any> {
        return http.get("/information")
    }

    static post(information: InformationModel): Promise<any> {
        return http.post("/information", {
            content: information.serialize()
        })
    }
}
