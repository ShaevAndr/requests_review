import { Statuses } from "../types/statuses.type";

export type UpdateRequestDto = {
    name?: string;
    email?: string;
    message?: string;
    status?: Statuses;
    comment?: string;
}


