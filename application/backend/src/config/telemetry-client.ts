import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { env } from "@shared/env";

export class TelemetryClient {
  private sdk: NodeSDK | null = null
  private readonly otlpUrl: string
  private readonly serviceName: string
  private readonly authHeader: string

  constructor() {
    this.otlpUrl = env.OTLP_URL;
    this.serviceName = env.OTLP_SERVICE_NAME;
    this.authHeader = env.OTLP_AUTH_HEADER;
  }

  public start() {
    // To fit on header pattern
    const headersMap: Record<string, string> = {};

    if (this.authHeader) {
      headersMap['Authorization'] = this.authHeader;
    }

    const traceExporter = new OTLPTraceExporter({
      url: this.otlpUrl,
      headers: headersMap
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
        .then(() => console.log("Finished telemetry"))
        .finally(() => process.exit(0));
    });
  }
}
