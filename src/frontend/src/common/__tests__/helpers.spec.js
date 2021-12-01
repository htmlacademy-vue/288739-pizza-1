import { getNormalizedOrder } from "@/common/helpers";

import orderJson from "@/common/__tests__/fixtures/order.json";
import builderDataJson from "@/common/__tests__/fixtures/builderData.json";
import additionalListJson from "@/common/__tests__/fixtures/additionalList.json";
import normalizedOrderJson from "@/common/__tests__/fixtures/normalizedOrder.json";

describe("test helpers functions", () => {
  it("test getNormalizedOrder", () => {
    const result = getNormalizedOrder(
      orderJson,
      builderDataJson,
      additionalListJson
    );
    expect(result).toEqual(normalizedOrderJson);
  });
});
