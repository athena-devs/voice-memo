import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { env } from "@shared/env";

export class TelemetryClient {
  private sdk: NodeSDK | null = null
  private readonly otlpUrl: string
  private readonly serviceName: string

  constructor() {
    this.otlpUrl = env.OTLP_URL;
    this.serviceName = env.OTLP_SERVICE_NAME;
  }

  public start() {
    const traceExporter = new OTLPTraceExporter({
      url: this.otlpUrl,
    });

    this.sdk = new NodeSDK({
      serviceName: this.serviceName,
      traceExporter,
      instrumentations: [getNodeAutoInstrumentations()],
    });

    this.sdk.start();
    console.log(`Telemetry initialized for service: ${this.serviceName}`);

    // Graceful Shutdown
    process.on("SIGTERM", () => {
      this.sdk?.shutdown()
        .then(() => console.log("Telemetria encerrada"))
        .finally(() => process.exit(0));
    });
  }
}
