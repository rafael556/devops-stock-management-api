import { Product } from "../../product/entities/product.entity";
import { Historic } from "../entities/historic.entity";

export const historicMock: Historic = {
    historicId: 1,
    historicCreatedAt: "2023-01-01",
    historicStatus: "CREATED",
    historicProductAmount: 10,
    historicProduct: new Product
}