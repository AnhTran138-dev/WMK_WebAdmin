import { createGlobalState } from "@/configs";
import { User } from "@/models/responses";
import { QueryKey } from "../query_key";

export const useUserState = createGlobalState<User | null>(QueryKey.USER, null);
