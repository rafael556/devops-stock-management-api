import { productMock } from "../../product/test/product.mock";
import { Historic } from "../entities/historic.entity";

export const historicMock: Historic = {
    historicId: 1,
    historicCreatedAt: "2023-01-01",
    historicStatus: "CREATED",
    historicProductAmount: 10,
    historicProduct: productMock
}