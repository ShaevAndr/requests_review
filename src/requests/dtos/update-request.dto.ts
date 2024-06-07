import { Statuses } from "@prisma/client";

export type UpdateRequestDto = {
    name?: string;
    email?: string;
    message?: string;
    status?: Statuses;
    comment?: string;
}


