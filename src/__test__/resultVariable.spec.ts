import { Connector } from "../lib/Connector";
import http from 'http';
import { OutboundConnectorContext } from "camunda-connector-sdk";

let server: http.Server

beforeAll(() => {
    const requestListener = function (_: any, res: http.ServerResponse) {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(`{"weatherForecast": "goes here"}`);
    }

    server = http.createServer(requestListener);
    server.listen(3000);
})

afterAll(() => {
    server.close()
})

test('can map output using resultVariable variable value', async () => {

    const RESULTVARIABLE = 'results'

 
    const c = new Connector('http://127.0.0.1:3000');
    const ctx = new OutboundConnectorContext({})
    ctx.setVariables({
        resultVariable: RESULTVARIABLE,
        latitude: "23",
        longitude: "52",
        apiKey: "secrets.APIKEY",
        units: "metric" 
    });
    const res = await c.execute(ctx)
    expect(res[RESULTVARIABLE].forecast).toBe(`{"weatherForecast": "goes here"}`)
})
