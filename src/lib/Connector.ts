import { OutboundConnector, OutboundConnectorContext, OutboundConnectorFunction, Secret } from "camunda-connector-sdk";
import got from "got";

class DTO {
    latitude!: string;
    longitude!: string;
    units!: string;
    @Secret
    apiKey!: string;
}

@OutboundConnector({
    name: "OpenWeatherAPI",
    type: "io.camunda:weather-api:1",
    inputVariables: ["latitude", "longitude", "units", "apiKey"]
})
export class Connector implements OutboundConnectorFunction {
    async execute(context: OutboundConnectorContext) {
        const req = context.getVariablesAsType(DTO)
        context.replaceSecrets(req)
        const baseUrl = `https://api.openweathermap.org/data/2.5/weather`
        const urlString = `${baseUrl}?appid=${req.apiKey}&lat=${req.latitude}&lon=${req.longitude}&units=${req.units}`
        try {
            const res = await got.get(urlString)
            return {
                weather: {
                    forecast: res.body,
                    code: res.statusCode
                }
            }
        } catch (e: any) {
            throw new Error(`OpenWeather API failed with status code: ${e.response.statusCode}`)
        }
    }
}