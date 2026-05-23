import {
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    const tenantId = request.headers['x-tenant-id'] as string;

    let tenantSubtreeId: ContextId;

    const existingTenant = tenants.get(tenantId);

    if (existingTenant) {
      tenantSubtreeId = existingTenant;
    } else {
      tenantSubtreeId = ContextIdFactory.create();
      tenants.set(tenantId, tenantSubtreeId);
    }

    // If tree isn't durable, return the original contextId object
    return (info: HostComponentInfo) =>
      info.isTreeDurable ? tenantSubtreeId : contextId;

    // If we want to register a payload for durable tree.
    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubtreeId : contextId,
      payload: { tenantId },
    };
    // Now whenever we inject REQUEST provider using @Inject(REQUEST) payload object would be injected
  }
}

// Similar to the request scope, durability bubbles up the injection chain.
// That means if A depends on B which is flagged as durable, A implicitly becomes
// durable too (unless durable is explicitly set to false for A provider).
