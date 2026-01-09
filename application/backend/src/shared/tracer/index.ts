import { trace, SpanStatusCode } from "@opentelemetry/api";

// Accept many args
export function tracer<TArgs extends any[], TOutput>(
  name: string,
  useCase: { execute: (...args: TArgs) => Promise<TOutput> }
) {
  const originalExecute = useCase.execute.bind(useCase);

  useCase.execute = async (...args: TArgs): Promise<TOutput> => {
    const tracer = trace.getTracer("use-case-tracer");
    
    return tracer.startActiveSpan(name, async (span) => {
      try {
        // Try to log id as firts parameter
        if (typeof args[0] === 'string') {
            span.setAttribute('entity.id', args[0]);
        }
        
        // Pass all to original functions
        const result = await originalExecute(...args);
        
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (err: any) {
        span.recordException(err);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err.message,
        });
        // Filter possible error types
        span.setAttribute('error.type', err.name || 'UnknownError');
        throw err;
      } finally {
        span.end();
      }
    });
  };

  return useCase;
}