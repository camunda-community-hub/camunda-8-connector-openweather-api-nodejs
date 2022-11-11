import { OutboundConnector, OutboundConnectorContext, OutboundConnectorFunction, Secret } from "camunda-connector-sdk";
import got from "got";

class DTO {
    latitude!: string;
    longitude!: string;
    units!: string;
    @Secret
    apiKey!: string;
    resultVariable!: string;
}

@OutboundConnector({
    name: "OpenWeatherAPI",
    type: "io.camunda:weather-api:1",
    inputVariables: ["latitude", "longitude", "units", "apiKey", "resultVariable"]
})
export class Connector implements OutboundConnectorFunction {
    baseUrl: string;

    constructor(baseUrl: string = `https://api.openweathermap.org/data/2.5/weather`) {
        this.baseUrl = baseUrl
    }

    async execute(context: OutboundConnectorContext) {
        const req = context.getVariablesAsType(DTO)
        context.replaceSecrets(req)
        return this.makeCall(req)
    }

    async makeCall(req: DTO) {
        const urlString = `${this.baseUrl}?appid=${req.apiKey}&lat=${req.latitude}&lon=${req.longitude}&units=${req.units}`
        try {
            const res = await got.get(urlString)
            return {
                [req.resultVariable || "weather"]: {
                    forecast: res.body,
                    code: res.statusCode
                }
            }
        } catch (e: any) {
            throw new Error(`OpenWeather API failed with status code: ${e.response.statusCode}`)
        }
    }
}